import { eq, sql } from 'drizzle-orm';
import { Redis } from '@upstash/redis';
import { db, subscriptions } from '@/db';
import { PLAN_CONFIG } from './stripe';
import { sendEmail, getUserEmailInfo } from './email';
import { TokenBalanceLow } from '@/email/templates/TokenBalanceLow';
import type { PlanType } from '@/db/schema';

let _tokenRedis: Redis | null = null;

function getTokenRedis(): Redis {
  if (!_tokenRedis) {
    _tokenRedis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
  }
  return _tokenRedis;
}

/**
 * Atomically deduct tokens from a user's balance.
 * Deducts from monthly tokens first, then top-up tokens.
 * Returns false if insufficient balance.
 */
export async function deductTokens(
  clerkUserId: string,
  amount: number,
): Promise<{ success: boolean; remaining: number }> {
  const sub = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.clerkUserId, clerkUserId))
    .limit(1)
    .then((rows) => rows[0]);

  if (!sub) return { success: false, remaining: 0 };

  const totalAvailable = sub.tokensBalance + sub.topUpTokens;
  if (totalAvailable < amount) {
    return { success: false, remaining: totalAvailable };
  }

  // Deduct from monthly tokens first, overflow to top-up
  const monthlyDeduction = Math.min(sub.tokensBalance, amount);
  const topUpDeduction = amount - monthlyDeduction;

  const [updated] = await db
    .update(subscriptions)
    .set({
      tokensBalance: sql`${subscriptions.tokensBalance} - ${monthlyDeduction}`,
      topUpTokens: sql`${subscriptions.topUpTokens} - ${topUpDeduction}`,
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.clerkUserId, clerkUserId))
    .returning({
      tokensBalance: subscriptions.tokensBalance,
      topUpTokens: subscriptions.topUpTokens,
    });

  return {
    success: true,
    remaining: updated.tokensBalance + updated.topUpTokens,
  };
}

/**
 * Get the total token balance for a user (monthly + top-up).
 */
export async function getTokenBalance(
  clerkUserId: string,
): Promise<{ monthly: number; topUp: number; total: number } | null> {
  const sub = await db
    .select({
      tokensBalance: subscriptions.tokensBalance,
      topUpTokens: subscriptions.topUpTokens,
    })
    .from(subscriptions)
    .where(eq(subscriptions.clerkUserId, clerkUserId))
    .limit(1)
    .then((rows) => rows[0]);

  if (!sub) return null;

  return {
    monthly: sub.tokensBalance,
    topUp: sub.topUpTokens,
    total: sub.tokensBalance + sub.topUpTokens,
  };
}

/**
 * Refresh monthly tokens for a user based on their plan.
 * Handles rollover logic per plan configuration.
 */
export async function refreshMonthlyTokens(
  clerkUserId: string,
): Promise<void> {
  const sub = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.clerkUserId, clerkUserId))
    .limit(1)
    .then((rows) => rows[0]);

  if (!sub) return;

  const planType = sub.planType as PlanType;
  const config = PLAN_CONFIG[planType];

  if (config.isLifetimeTokens) return; // Free tier doesn't refresh

  let newBalance = config.monthlyTokens;

  // Apply rollover logic for Pro/Team
  if ('tokenRollover' in config && config.tokenRollover) {
    const rollover = config.tokenRollover;
    const carried = Math.min(sub.tokensBalance, rollover.maxBanked - config.monthlyTokens);
    newBalance = Math.min(config.monthlyTokens + Math.max(0, carried), rollover.maxBanked);
  }

  await db
    .update(subscriptions)
    .set({
      tokensBalance: newBalance,
      tokensRefreshDate: getNextRefreshDate(),
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.clerkUserId, clerkUserId));
}

/**
 * Credit top-up tokens to a user (never expire).
 */
export async function creditTopUpTokens(
  clerkUserId: string,
  amount: number,
): Promise<void> {
  await db
    .update(subscriptions)
    .set({
      topUpTokens: sql`${subscriptions.topUpTokens} + ${amount}`,
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.clerkUserId, clerkUserId));
}

function getNextRefreshDate(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 1);
}

/**
 * Check if a user's token balance has fallen below 10% of their plan's
 * monthly allocation, and send a notification email if so.
 *
 * Uses Redis to ensure only one notification is sent per billing cycle.
 * Call this after a successful token deduction.
 */
export async function notifyLowBalance(
  clerkUserId: string,
  remainingTokens: number,
  planType: PlanType,
): Promise<void> {
  const config = PLAN_CONFIG[planType];

  // Free tier has lifetime tokens — no monthly refresh, skip notification
  if (config.isLifetimeTokens) return;

  const threshold = Math.ceil(config.monthlyTokens * 0.1);
  if (remainingTokens >= threshold) return;

  // Check cooldown — only notify once per billing cycle
  const redis = getTokenRedis();
  const key = `email:low_balance:${clerkUserId}`;
  const alreadySent = await redis.get(key);
  if (alreadySent) return;

  try {
    // Look up refresh date for the email
    const sub = await db
      .select({ tokensRefreshDate: subscriptions.tokensRefreshDate })
      .from(subscriptions)
      .where(eq(subscriptions.clerkUserId, clerkUserId))
      .limit(1)
      .then((rows) => rows[0]);

    const user = await getUserEmailInfo(clerkUserId);
    if (!user) return;

    const refreshStr = sub?.tokensRefreshDate
      ? sub.tokensRefreshDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : 'your next billing date';

    await sendEmail(
      user.email,
      'Running low on tokens',
      TokenBalanceLow,
      {
        userName: user.name,
        tokensRemaining: remainingTokens,
        refreshDate: refreshStr,
      },
    );

    // Set cooldown for 30 days
    await redis.set(key, '1', { ex: 30 * 24 * 60 * 60 });
  } catch (err) {
    console.error('[tokens] Failed to send low balance notification:', err);
  }
}
