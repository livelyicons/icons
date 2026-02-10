import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { eq, and } from 'drizzle-orm';
import { db, teams, teamMembers } from '@/db';
import { TeamLibraryClient } from './TeamLibraryClient';

interface PageProps {
  params: Promise<{ teamSlug: string }>;
}

export default async function TeamLibraryPage({ params }: PageProps) {
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

  return <TeamLibraryClient teamId={team.id} />;
}
