import { NextRequest, NextResponse } from 'next/server';
import { getStripe, PLAN_CONFIG } from '@/lib/stripe';
import {
  updateSubscriptionPlan,
  markSubscriptionPastDue,
  downgradeToFree,
} from '@/lib/subscription';
import { refreshMonthlyTokens, creditTopUpTokens } from '@/lib/tokens';
import { db, subscriptions } from '@/db';
import { eq } from 'drizzle-orm';
import { sendEmail, getUserEmailInfo } from '@/lib/email';
import { UpgradeConfirmation } from '@/email/templates/UpgradeConfirmation';
import { CancellationConfirmation } from '@/email/templates/CancellationConfirmation';
import { inngest } from '@/lib/inngest';
import type { PlanType } from '@/db/schema';
import type Stripe from 'stripe';

/**
 * Stripe webhook handler.
 * Verifies signature, processes events idempotently.
 */
export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 401 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Stripe webhook signature verification failed:', message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      default:
        // Unhandled event type — acknowledge receipt
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(`Stripe webhook handler error for ${event.type}:`, err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

// ─────────────────────────────────────────────────
// Event Handlers
// ─────────────────────────────────────────────────

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const clerkUserId = session.metadata?.clerkUserId;
  if (!clerkUserId) {
    console.error('checkout.session.completed: Missing clerkUserId in metadata');
    return;
  }

  const subscriptionId = session.subscription as string | null;

  if (session.mode === 'subscription' && subscriptionId) {
    // Subscription checkout — upgrade plan
    const stripe = getStripe();
    const stripeSub = await stripe.subscriptions.retrieve(subscriptionId);
    const priceId = stripeSub.items.data[0]?.price.id;
    const planType = resolvePlanType(priceId);

    await updateSubscriptionPlan(clerkUserId, planType, subscriptionId);

    // Send upgrade confirmation email (best-effort)
    try {
      const user = await getUserEmailInfo(clerkUserId);
      if (user) {
        const config = PLAN_CONFIG[planType];
        const balance = config.monthlyTokens === Infinity ? 999999 : config.monthlyTokens;
        await sendEmail(
          user.email,
          'Welcome to Lively Icons Pro!',
          UpgradeConfirmation,
          { userName: user.name, planName: config.name, tokensBalance: balance },
        );
      }
    } catch (emailErr) {
      console.error('[stripe-webhook] Failed to send upgrade email:', emailErr);
    }
  } else if (session.mode === 'payment') {
    // One-time payment — token top-up
    const tokensToCredit = parseInt(session.metadata?.tokens ?? '0', 10);
    if (tokensToCredit > 0) {
      await creditTopUpTokens(clerkUserId, tokensToCredit);
    }
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  const sub = await findSubscriptionByStripeCustomer(customerId);
  if (!sub) return;

  // Monthly renewal — refresh tokens
  if (invoice.billing_reason === 'subscription_cycle') {
    await refreshMonthlyTokens(sub.clerkUserId);
  }

  // Clear any past_due status and cancel dunning sequence
  if (sub.status === 'past_due') {
    await db
      .update(subscriptions)
      .set({ status: 'active', updatedAt: new Date() })
      .where(eq(subscriptions.clerkUserId, sub.clerkUserId));

    // Cancel the dunning email sequence
    try {
      await inngest.send({
        name: 'payment/resolved',
        data: { clerkUserId: sub.clerkUserId },
      });
    } catch (inngestErr) {
      console.error('[stripe-webhook] Failed to send payment/resolved event:', inngestErr);
    }
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  const sub = await findSubscriptionByStripeCustomer(customerId);
  if (!sub) return;

  await markSubscriptionPastDue(sub.clerkUserId);

  // Start the dunning email sequence (Day 3 → Day 7 → Day 14)
  try {
    await inngest.send({
      name: 'payment/failed',
      data: { clerkUserId: sub.clerkUserId },
    });
  } catch (inngestErr) {
    console.error('[stripe-webhook] Failed to trigger dunning sequence:', inngestErr);
  }
}

async function handleSubscriptionUpdated(stripeSub: Stripe.Subscription) {
  const customerId = stripeSub.customer as string;
  const sub = await findSubscriptionByStripeCustomer(customerId);
  if (!sub) return;

  const priceId = stripeSub.items.data[0]?.price.id;
  const planType = resolvePlanType(priceId);

  if (stripeSub.status === 'active') {
    await updateSubscriptionPlan(sub.clerkUserId, planType, stripeSub.id);
  } else if (stripeSub.status === 'past_due') {
    await markSubscriptionPastDue(sub.clerkUserId);
  }
}

async function handleSubscriptionDeleted(stripeSub: Stripe.Subscription) {
  const customerId = stripeSub.customer as string;
  const sub = await findSubscriptionByStripeCustomer(customerId);
  if (!sub) return;

  await downgradeToFree(sub.clerkUserId);

  // Send cancellation confirmation email (best-effort)
  try {
    const user = await getUserEmailInfo(sub.clerkUserId);
    if (user) {
      const periodEnd = stripeSub.items.data[0]?.current_period_end ?? Math.floor(Date.now() / 1000);
      const endDate = new Date(periodEnd * 1000);
      await sendEmail(
        user.email,
        'Your subscription has been canceled',
        CancellationConfirmation,
        {
          userName: user.name,
          accessEndDate: endDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }),
        },
      );
    }
  } catch (emailErr) {
    console.error('[stripe-webhook] Failed to send cancellation email:', emailErr);
  }
}

// ─────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────

async function findSubscriptionByStripeCustomer(stripeCustomerId: string) {
  const rows = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.stripeCustomerId, stripeCustomerId))
    .limit(1);

  return rows[0] ?? null;
}

function resolvePlanType(priceId: string | undefined): PlanType {
  if (!priceId) return 'free';

  const proMonthly = process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID;
  const proAnnual = process.env.NEXT_PUBLIC_STRIPE_PRO_ANNUAL_PRICE_ID;
  const teamMonthly = process.env.NEXT_PUBLIC_STRIPE_TEAM_MONTHLY_PRICE_ID;
  const teamAnnual = process.env.NEXT_PUBLIC_STRIPE_TEAM_ANNUAL_PRICE_ID;

  if (priceId === proMonthly || priceId === proAnnual) return 'pro';
  if (priceId === teamMonthly || priceId === teamAnnual) return 'team';
  return 'free';
}
