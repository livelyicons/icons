import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { eq, and } from 'drizzle-orm';
import { db, teams, teamMembers } from '@/db';
import { TeamSidebar } from '../components/TeamSidebar';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ teamSlug: string }>;
}

export default async function TeamLayout({ children, params }: LayoutProps) {
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

  return (
    <div className="flex min-h-screen bg-black">
      <TeamSidebar
        teamSlug={team.slug}
        teamName={team.name}
        role={member.role}
      />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
