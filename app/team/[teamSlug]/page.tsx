import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { eq, and, count } from 'drizzle-orm';
import { db, teams, teamMembers, generatedIcons } from '@/db';
import { getTeamTokenBalance } from '@/lib/team-tokens';
import { TeamDashboardClient } from './TeamDashboardClient';

interface PageProps {
  params: Promise<{ teamSlug: string }>;
}

export default async function TeamDashboardPage({ params }: PageProps) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const { teamSlug } = await params;

  const [team] = await db
    .select()
    .from(teams)
    .where(eq(teams.slug, teamSlug))
    .limit(1);

  if (!team) redirect('/team');

  const [member] = await db
    .select()
    .from(teamMembers)
    .where(
      and(
        eq(teamMembers.teamId, team.id),
        eq(teamMembers.clerkUserId, userId),
      ),
    )
    .limit(1);

  if (!member) redirect('/team');

  const [{ value: memberCount }] = await db
    .select({ value: count() })
    .from(teamMembers)
    .where(eq(teamMembers.teamId, team.id));

  const [{ value: iconCount }] = await db
    .select({ value: count() })
    .from(generatedIcons)
    .where(eq(generatedIcons.teamId, team.id));

  const balance = await getTeamTokenBalance(team.id);

  return (
    <TeamDashboardClient
      team={{
        id: team.id,
        name: team.name,
        slug: team.slug,
        ownerClerkUserId: team.ownerClerkUserId,
      }}
      role={member.role}
      memberCount={memberCount}
      iconCount={iconCount}
      tokenBalance={balance?.total ?? 0}
    />
  );
}
