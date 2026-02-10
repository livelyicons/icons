import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getStripe } from '@/lib/stripe';
import { getSubscription } from '@/lib/subscription';
import { z } from 'zod/v4';

const checkoutSchema = z.object({
  priceId: z.string().startsWith('price_'),
  billingInterval: z.enum(['monthly', 'annual']).optional(),
});

/**
 * Create a Stripe Checkout session for subscription upgrade.
 */
export async function POST(request: NextRequest) {
  try {
    const userId = await requireAuth();
    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.format() },
        { status: 400 },
      );
    }

    const { priceId } = parsed.data;
    const sub = await getSubscription(userId);

    if (!sub) {
      return NextResponse.json(
        { error: 'No subscription found. Please sign up first.' },
        { status: 404 },
      );
    }

    const stripe = getStripe();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      customer: sub.stripeCustomerId,
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/playground?tab=ai-generate&upgraded=true`,
      cancel_url: `${appUrl}/pricing`,
      metadata: {
        clerkUserId: userId,
      },
      subscription_data: {
        metadata: {
          clerkUserId: userId,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 },
    );
  }
}
