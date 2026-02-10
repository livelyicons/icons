import { eq, and } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db, teams, teamMembers } from '@/db';
import type { TeamRole, Team, TeamMember } from '@/db/schema';

const ROLE_HIERARCHY: Record<TeamRole, number> = {
  viewer: 0,
  editor: 1,
  admin: 2,
};

/**
 * Verify that a user is a member of the given team with at least the specified role.
 * Throws a 403 NextResponse if the check fails.
 */
export async function requireTeamMember(
  teamId: string,
  clerkUserId: string,
  minimumRole: TeamRole = 'viewer',
): Promise<TeamMember> {
  const [member] = await db
    .select()
    .from(teamMembers)
    .where(
      and(
        eq(teamMembers.teamId, teamId),
        eq(teamMembers.clerkUserId, clerkUserId),
      ),
    )
    .limit(1);

  if (!member) {
    throw new NextResponse(
      JSON.stringify({ error: 'Forbidden', message: 'You are not a member of this team.' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } },
    );
  }

  if (ROLE_HIERARCHY[member.role as TeamRole] < ROLE_HIERARCHY[minimumRole]) {
    throw new NextResponse(
      JSON.stringify({ error: 'Forbidden', message: `This action requires ${minimumRole} role or higher.` }),
      { status: 403, headers: { 'Content-Type': 'application/json' } },
    );
  }

  return member;
}

/**
 * Resolve team context from a request. If teamId is provided, verifies
 * membership and returns the team owner's clerkUserId for token pool operations.
 */
export async function resolveTeamContext(
  clerkUserId: string,
  teamId?: string | null,
): Promise<{
  teamId: string | null;
  role: TeamRole | null;
  subscriptionOwnerId: string;
}> {
  if (!teamId) {
    return { teamId: null, role: null, subscriptionOwnerId: clerkUserId };
  }

  const [member] = await db
    .select()
    .from(teamMembers)
    .where(
      and(
        eq(teamMembers.teamId, teamId),
        eq(teamMembers.clerkUserId, clerkUserId),
      ),
    )
    .limit(1);

  if (!member) {
    throw new NextResponse(
      JSON.stringify({ error: 'Forbidden', message: 'You are not a member of this team.' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const [team] = await db
    .select({ ownerClerkUserId: teams.ownerClerkUserId })
    .from(teams)
    .where(eq(teams.id, teamId))
    .limit(1);

  if (!team) {
    throw new NextResponse(
      JSON.stringify({ error: 'Not found', message: 'Team not found.' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } },
    );
  }

  return {
    teamId,
    role: member.role as TeamRole,
    subscriptionOwnerId: team.ownerClerkUserId,
  };
}

/**
 * Get all teams a user belongs to, including their role in each.
 */
export async function getTeamsForUser(
  clerkUserId: string,
): Promise<Array<Team & { role: TeamRole }>> {
  const rows = await db
    .select({
      id: teams.id,
      name: teams.name,
      slug: teams.slug,
      ownerClerkUserId: teams.ownerClerkUserId,
      avatarUrl: teams.avatarUrl,
      slackWebhookUrl: teams.slackWebhookUrl,
      slackChannelName: teams.slackChannelName,
      createdAt: teams.createdAt,
      updatedAt: teams.updatedAt,
      role: teamMembers.role,
    })
    .from(teamMembers)
    .innerJoin(teams, eq(teams.id, teamMembers.teamId))
    .where(eq(teamMembers.clerkUserId, clerkUserId));

  return rows as Array<Team & { role: TeamRole }>;
}

/**
 * Check if a user is the owner of the specified team.
 */
export async function isTeamOwner(
  teamId: string,
  clerkUserId: string,
): Promise<boolean> {
  const [team] = await db
    .select({ ownerClerkUserId: teams.ownerClerkUserId })
    .from(teams)
    .where(eq(teams.id, teamId))
    .limit(1);

  return team?.ownerClerkUserId === clerkUserId;
}
