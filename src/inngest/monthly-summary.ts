import { inngest } from '@/lib/inngest';
import { sendEmail, getUserEmailInfo } from '@/lib/email';
import { MonthlySummary } from '@/emails/MonthlySummary';
import { db, subscriptions, generationEvents, teams, teamMembers } from '@/db';
import { eq, and, gte, lt, sql } from 'drizzle-orm';

/**
 * Monthly usage summary email cron.
 * Runs on the 1st of each month at 9:00 AM UTC.
 * Sends a summary of the previous month's activity to all active paid users.
 */
export const monthlySummary = inngest.createFunction(
  { id: 'monthly-summary-email' },
  { cron: '0 9 1 * *' },
  async ({ step }) => {
    // Calculate previous month's date range
    const { startDate, endDate, monthName } = await step.run(
      'calculate-date-range',
      async () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const end = new Date(now.getFullYear(), now.getMonth(), 1);
        const name = start.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        });
        return {
          startDate: start.toISOString(),
          endDate: end.toISOString(),
          monthName: name,
        };
      },
    );

    // Get all active paid users
    const paidUsers = await step.run('get-paid-users', async () => {
      return db
        .select({
          clerkUserId: subscriptions.clerkUserId,
          planType: subscriptions.planType,
          tokensBalance: subscriptions.tokensBalance,
          topUpTokens: subscriptions.topUpTokens,
        })
        .from(subscriptions)
        .where(
          and(
            eq(subscriptions.status, 'active'),
            sql`${subscriptions.planType} != 'free'`,
          ),
        );
    });

    let sent = 0;
    let skipped = 0;

    for (const user of paidUsers) {
      const result = await step.run(
        `send-summary-${user.clerkUserId}`,
        async () => {
          try {
            // Get user's generation stats for the previous month
            const stats = await db
              .select({
                eventType: generationEvents.eventType,
                totalTokens: sql<number>`COALESCE(SUM(${generationEvents.tokensUsed}), 0)::int`,
                count: sql<number>`COUNT(*)::int`,
              })
              .from(generationEvents)
              .where(
                and(
                  eq(generationEvents.clerkUserId, user.clerkUserId),
                  gte(generationEvents.createdAt, new Date(startDate)),
                  lt(generationEvents.createdAt, new Date(endDate)),
                ),
              )
              .groupBy(generationEvents.eventType);

            const generates = stats.find((s) => s.eventType === 'generate');
            const refines = stats.find((s) => s.eventType === 'refine');
            const exports = stats.find((s) => s.eventType === 'export');

            const totalGenerations =
              (generates?.count ?? 0) + (refines?.count ?? 0);
            const totalExports = exports?.count ?? 0;
            const tokensUsed = stats.reduce(
              (sum, s) => sum + (s.totalTokens ?? 0),
              0,
            );

            // Skip users with no activity
            if (totalGenerations === 0 && totalExports === 0) {
              return { sent: false };
            }

            // Get most used style
            const [styleResult] = await db
              .select({
                style: sql<string>`(${generationEvents.metadata}->>'style')`,
                count: sql<number>`COUNT(*)::int`,
              })
              .from(generationEvents)
              .where(
                and(
                  eq(generationEvents.clerkUserId, user.clerkUserId),
                  eq(generationEvents.eventType, 'generate'),
                  gte(generationEvents.createdAt, new Date(startDate)),
                  lt(generationEvents.createdAt, new Date(endDate)),
                ),
              )
              .groupBy(sql`${generationEvents.metadata}->>'style'`)
              .orderBy(sql`COUNT(*) DESC`)
              .limit(1);

            const userInfo = await getUserEmailInfo(user.clerkUserId);
            if (!userInfo) return { sent: false };

            // Gather team stats for team plan admins
            let teamStatsData: Array<{
              teamName: string;
              teamGenerations: number;
              teamTokensUsed: number;
              mostActiveMember: string | null;
            }> | undefined;

            if (user.planType === 'team' || user.planType === 'enterprise') {
              // Find teams where user is admin
              const adminTeams = await db
                .select({
                  teamId: teamMembers.teamId,
                  teamName: teams.name,
                })
                .from(teamMembers)
                .innerJoin(teams, eq(teams.id, teamMembers.teamId))
                .where(
                  and(
                    eq(teamMembers.clerkUserId, user.clerkUserId),
                    eq(teamMembers.role, 'admin'),
                  ),
                );

              if (adminTeams.length > 0) {
                teamStatsData = [];
                for (const at of adminTeams) {
                  const [teamGenStats] = await db
                    .select({
                      total: sql<number>`COALESCE(SUM(${generationEvents.tokensUsed}), 0)::int`,
                      count: sql<number>`COUNT(*)::int`,
                    })
                    .from(generationEvents)
                    .where(
                      and(
                        eq(generationEvents.teamId, at.teamId),
                        gte(generationEvents.createdAt, new Date(startDate)),
                        lt(generationEvents.createdAt, new Date(endDate)),
                      ),
                    );

                  const [topMember] = await db
                    .select({
                      clerkUserId: generationEvents.clerkUserId,
                      count: sql<number>`COUNT(*)::int`,
                    })
                    .from(generationEvents)
                    .where(
                      and(
                        eq(generationEvents.teamId, at.teamId),
                        gte(generationEvents.createdAt, new Date(startDate)),
                        lt(generationEvents.createdAt, new Date(endDate)),
                      ),
                    )
                    .groupBy(generationEvents.clerkUserId)
                    .orderBy(sql`COUNT(*) DESC`)
                    .limit(1);

                  let memberName: string | null = null;
                  if (topMember) {
                    const mi = await getUserEmailInfo(topMember.clerkUserId);
                    memberName = mi?.name ?? mi?.email ?? null;
                  }

                  teamStatsData.push({
                    teamName: at.teamName,
                    teamGenerations: teamGenStats?.count ?? 0,
                    teamTokensUsed: teamGenStats?.total ?? 0,
                    mostActiveMember: memberName,
                  });
                }
              }
            }

            await sendEmail(
              userInfo.email,
              `Your ${monthName} Lively Icons Summary`,
              MonthlySummary,
              {
                userName: userInfo.name,
                month: monthName,
                totalGenerations,
                totalExports,
                mostUsedStyle: styleResult?.style ?? null,
                tokensUsed,
                tokensRemaining:
                  user.tokensBalance + user.topUpTokens,
                planType: user.planType,
                teamStats: teamStatsData,
              },
            );

            return { sent: true };
          } catch (err) {
            console.error(
              `[monthly-summary] Failed to send to ${user.clerkUserId}:`,
              err,
            );
            return { sent: false };
          }
        },
      );

      if (result.sent) {
        sent++;
      } else {
        skipped++;
      }
    }

    return { sent, skipped, total: paidUsers.length };
  },
);
