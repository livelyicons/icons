import { redirect } from 'next/navigation';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { eq, and } from 'drizzle-orm';
import { db, teams, teamMembers } from '@/db';
import { MembersClient } from './MembersClient';

interface PageProps {
  params: Promise<{ teamSlug: string }>;
}

export default async function MembersPage({ params }: PageProps) {
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

  // Fetch all members with Clerk profile info
  const allMembers = await db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.teamId, team.id));

  const clerk = await clerkClient();
  const enriched = await Promise.all(
    allMembers.map(async (m) => {
      try {
        const user = await clerk.users.getUser(m.clerkUserId);
        return {
          id: m.id,
          clerkUserId: m.clerkUserId,
          role: m.role,
          name: user.firstName
            ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}`
            : null,
          email: user.emailAddresses[0]?.emailAddress ?? null,
          imageUrl: user.imageUrl ?? null,
          joinedAt: m.joinedAt.toISOString(),
        };
      } catch {
        return {
          id: m.id,
          clerkUserId: m.clerkUserId,
          role: m.role,
          name: null,
          email: null,
          imageUrl: null,
          joinedAt: m.joinedAt.toISOString(),
        };
      }
    }),
  );

  return (
    <MembersClient
      teamId={team.id}
      currentUserId={userId}
      ownerUserId={team.ownerClerkUserId}
      role={member.role}
      initialMembers={enriched}
    />
  );
}
