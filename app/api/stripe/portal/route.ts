import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getStripe } from '@/lib/stripe';
import { getSubscription } from '@/lib/subscription';

/**
 * Create a Stripe Customer Portal session for subscription management.
 */
export async function POST() {
  try {
    const userId = await requireAuth();
    const sub = await getSubscription(userId);

    if (!sub) {
      return NextResponse.json({ error: 'No subscription found' }, { status: 404 });
    }

    const stripe = getStripe();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

    const session = await stripe.billingPortal.sessions.create({
      customer: sub.stripeCustomerId,
      return_url: `${appUrl}/playground?tab=ai-generate`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Stripe portal error:', error);
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 },
    );
  }
}
