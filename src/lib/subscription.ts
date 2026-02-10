import { eq } from 'drizzle-orm';
import { db, subscriptions } from '@/db';
import { PLAN_CONFIG } from './stripe';
import type { Subscription, PlanType } from '@/db/schema';

/**
 * Get a user's subscription by Clerk user ID.
 */
export async function getSubscription(
  clerkUserId: string,
): Promise<Subscription | null> {
  const rows = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.clerkUserId, clerkUserId))
    .limit(1);

  return rows[0] ?? null;
}

/**
 * Get plan limits for a given plan type.
 */
export function getPlanLimits(planType: PlanType) {
  return PLAN_CONFIG[planType];
}

/**
 * Check if a user can generate (has tokens + active subscription).
 */
export async function canGenerate(
  clerkUserId: string,
): Promise<{
  allowed: boolean;
  reason?: string;
  tokensRemaining: number;
  planType: PlanType;
}> {
  const sub = await getSubscription(clerkUserId);

  if (!sub) {
    return {
      allowed: false,
      reason: 'No subscription found. Please sign up.',
      tokensRemaining: 0,
      planType: 'free',
    };
  }

  if (sub.status === 'canceled') {
    return {
      allowed: false,
      reason: 'Your subscription has been canceled.',
      tokensRemaining: 0,
      planType: sub.planType as PlanType,
    };
  }

  const totalTokens = sub.tokensBalance + sub.topUpTokens;

  if (totalTokens < 1) {
    const planType = sub.planType as PlanType;
    const config = PLAN_CONFIG[planType];
    const message = config.isLifetimeTokens
      ? "You've used all your free trial tokens. Upgrade to Pro for 500 monthly tokens."
      : `You've used all your tokens this month. Tokens refresh on ${sub.tokensRefreshDate?.toLocaleDateString() ?? 'the 1st'}.`;

    return {
      allowed: false,
      reason: message,
      tokensRemaining: 0,
      planType,
    };
  }

  return {
    allowed: true,
    tokensRemaining: totalTokens,
    planType: sub.planType as PlanType,
  };
}

/**
 * Create a free-tier subscription for a new user.
 */
export async function createFreeSubscription(
  clerkUserId: string,
  stripeCustomerId: string,
): Promise<Subscription> {
  const [subscription] = await db
    .insert(subscriptions)
    .values({
      clerkUserId,
      stripeCustomerId,
      planType: 'free',
      status: 'active',
      tokensBalance: PLAN_CONFIG.free.monthlyTokens,
      topUpTokens: 0,
    })
    .returning();

  return subscription;
}

/**
 * Update subscription after a plan change.
 */
export async function updateSubscriptionPlan(
  clerkUserId: string,
  planType: PlanType,
  stripeSubscriptionId: string,
): Promise<void> {
  const config = PLAN_CONFIG[planType];

  await db
    .update(subscriptions)
    .set({
      planType,
      stripeSubscriptionId,
      status: 'active',
      tokensBalance: config.monthlyTokens === Infinity ? 999999 : config.monthlyTokens,
      tokensRefreshDate: config.isLifetimeTokens ? null : getNextRefreshDate(),
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.clerkUserId, clerkUserId));
}

/**
 * Mark subscription as past_due after payment failure.
 */
export async function markSubscriptionPastDue(
  clerkUserId: string,
): Promise<void> {
  await db
    .update(subscriptions)
    .set({
      status: 'past_due',
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.clerkUserId, clerkUserId));
}

/**
 * Downgrade subscription to free tier.
 */
export async function downgradeToFree(
  clerkUserId: string,
): Promise<void> {
  await db
    .update(subscriptions)
    .set({
      planType: 'free',
      status: 'active',
      stripeSubscriptionId: null,
      tokensBalance: 0,
      topUpTokens: 0,
      tokensRefreshDate: null,
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.clerkUserId, clerkUserId));
}

function getNextRefreshDate(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 1);
}
