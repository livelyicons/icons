import { eq } from 'drizzle-orm';
import { db, teams } from '@/db';
import { deductTokens, getTokenBalance } from './tokens';
import { getSubscription } from './subscription';

/**
 * Resolve the team owner's clerkUserId for a given teamId.
 */
async function getTeamOwnerUserId(teamId: string): Promise<string | null> {
  const [team] = await db
    .select({ ownerClerkUserId: teams.ownerClerkUserId })
    .from(teams)
    .where(eq(teams.id, teamId))
    .limit(1);

  return team?.ownerClerkUserId ?? null;
}

/**
 * Deduct tokens from the team's shared pool (the team owner's subscription).
 */
export async function deductTeamTokens(
  teamId: string,
  amount: number,
): Promise<{ success: boolean; remaining: number }> {
  const ownerUserId = await getTeamOwnerUserId(teamId);
  if (!ownerUserId) return { success: false, remaining: 0 };

  return deductTokens(ownerUserId, amount);
}

/**
 * Get the team's token balance from the team owner's subscription.
 */
export async function getTeamTokenBalance(
  teamId: string,
): Promise<{ monthly: number; topUp: number; total: number } | null> {
  const ownerUserId = await getTeamOwnerUserId(teamId);
  if (!ownerUserId) return null;

  return getTokenBalance(ownerUserId);
}

/**
 * Check if the team can generate (owner has active team subscription with tokens).
 */
export async function canTeamGenerate(
  teamId: string,
): Promise<{
  allowed: boolean;
  reason?: string;
  tokensRemaining: number;
}> {
  const ownerUserId = await getTeamOwnerUserId(teamId);
  if (!ownerUserId) {
    return { allowed: false, reason: 'Team not found.', tokensRemaining: 0 };
  }

  const sub = await getSubscription(ownerUserId);
  if (!sub) {
    return { allowed: false, reason: 'Team owner has no subscription.', tokensRemaining: 0 };
  }

  if (sub.status !== 'active') {
    return {
      allowed: false,
      reason: 'The team subscription is not active.',
      tokensRemaining: 0,
    };
  }

  if (sub.planType !== 'team' && sub.planType !== 'enterprise') {
    return {
      allowed: false,
      reason: 'The team owner does not have a Team or Enterprise plan.',
      tokensRemaining: 0,
    };
  }

  const totalTokens = sub.tokensBalance + sub.topUpTokens;
  if (totalTokens < 1) {
    return {
      allowed: false,
      reason: `The team has used all tokens this month. Tokens refresh on ${sub.tokensRefreshDate?.toLocaleDateString() ?? 'the 1st'}.`,
      tokensRemaining: 0,
    };
  }

  return { allowed: true, tokensRemaining: totalTokens };
}
