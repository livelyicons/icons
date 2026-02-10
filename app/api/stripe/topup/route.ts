import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getStripe, TOKEN_PACKS } from '@/lib/stripe';
import { getSubscription } from '@/lib/subscription';
import { z } from 'zod/v4';

const topUpSchema = z.object({
  packIndex: z.number().int().min(0).max(TOKEN_PACKS.length - 1),
});

/**
 * Create a one-time Stripe payment session for token top-up.
 * Only available to Pro+ users.
 */
export async function POST(request: NextRequest) {
  try {
    const userId = await requireAuth();
    const body = await request.json();
    const parsed = topUpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.format() },
        { status: 400 },
      );
    }

    const { packIndex } = parsed.data;
    const sub = await getSubscription(userId);

    if (!sub) {
      return NextResponse.json({ error: 'No subscription found' }, { status: 404 });
    }

    if (sub.planType === 'free') {
      return NextResponse.json(
        { error: 'Token top-ups are only available for Pro and Team plans. Please upgrade first.' },
        { status: 403 },
      );
    }

    const pack = TOKEN_PACKS[packIndex];
    const stripe = getStripe();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      customer: sub.stripeCustomerId,
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${pack.name} Token Pack (${pack.tokens} tokens)`,
              description: `${pack.tokens} generation tokens for Lively Icons AI Generator. Never expires.`,
            },
            unit_amount: pack.price,
          },
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/playground?tab=ai-generate&topup=success`,
      cancel_url: `${appUrl}/playground?tab=ai-generate`,
      metadata: {
        clerkUserId: userId,
        tokens: String(pack.tokens),
        type: 'topup',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Token top-up checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create top-up session' },
      { status: 500 },
    );
  }
}
