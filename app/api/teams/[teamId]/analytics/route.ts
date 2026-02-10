import { NextRequest, NextResponse } from 'next/server';
import { eq, and, gte, sql, desc } from 'drizzle-orm';
import { requireAuth } from '@/lib/auth';
import { requireTeamMember } from '@/lib/team-auth';
import { getTeamTokenBalance } from '@/lib/team-tokens';
import { db, generationEvents, generatedIcons } from '@/db';

type RouteParams = { params: Promise<{ teamId: string }> };

const PERIOD_MAP: Record<string, number> = {
  '7d': 7,
  '30d': 30,
  '90d': 90,
};

/**
 * GET /api/teams/[teamId]/analytics?period=7d|30d|90d
 * Team analytics: token usage over time, generations by member, by style. Admin only.
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const userId = await requireAuth();
    const { teamId } = await params;

    await requireTeamMember(teamId, userId, 'admin');

    const url = new URL(request.url);
    const period = url.searchParams.get('period') ?? '30d';
    const days = PERIOD_MAP[period] ?? 30;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    // Token balance
    const balance = await getTeamTokenBalance(teamId);

    // Token usage over time (daily aggregation)
    const dailyUsage = await db
      .select({
        date: sql<string>`DATE(${generationEvents.createdAt})`.as('date'),
        tokensUsed: sql<number>`SUM(${generationEvents.tokensUsed})::int`.as('tokens_used'),
        count: sql<number>`COUNT(*)::int`.as('count'),
      })
      .from(generationEvents)
      .where(
        and(
          eq(generationEvents.teamId, teamId),
          gte(generationEvents.createdAt, since),
        ),
      )
      .groupBy(sql`DATE(${generationEvents.createdAt})`)
      .orderBy(sql`DATE(${generationEvents.createdAt})`);

    // Generations by member
    const byMember = await db
      .select({
        clerkUserId: generatedIcons.clerkUserId,
        count: sql<number>`COUNT(*)::int`.as('count'),
      })
      .from(generatedIcons)
      .where(
        and(
          eq(generatedIcons.teamId, teamId),
          gte(generatedIcons.createdAt, since),
        ),
      )
      .groupBy(generatedIcons.clerkUserId)
      .orderBy(desc(sql`COUNT(*)`));

    // Generations by style
    const byStyle = await db
      .select({
        style: generatedIcons.style,
        count: sql<number>`COUNT(*)::int`.as('count'),
      })
      .from(generatedIcons)
      .where(
        and(
          eq(generatedIcons.teamId, teamId),
          gte(generatedIcons.createdAt, since),
        ),
      )
      .groupBy(generatedIcons.style)
      .orderBy(desc(sql`COUNT(*)`));

    return NextResponse.json({
      period,
      balance,
      dailyUsage,
      byMember,
      byStyle,
    });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Team analytics error:', error);
    return NextResponse.json({ error: 'Failed to load team analytics' }, { status: 500 });
  }
}
