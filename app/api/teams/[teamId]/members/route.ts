import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { requireAuth } from '@/lib/auth';
import { requireTeamMember } from '@/lib/team-auth';
import { db, teamMembers } from '@/db';
import { clerkClient } from '@clerk/nextjs/server';

type RouteParams = { params: Promise<{ teamId: string }> };

/**
 * GET /api/teams/[teamId]/members
 * List team members with Clerk profile info.
 */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const userId = await requireAuth();
    const { teamId } = await params;

    await requireTeamMember(teamId, userId);

    const members = await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.teamId, teamId));

    // Enrich with Clerk profile data
    const client = await clerkClient();
    const enriched = await Promise.all(
      members.map(async (member) => {
        try {
          const user = await client.users.getUser(member.clerkUserId);
          return {
            ...member,
            email: user.emailAddresses[0]?.emailAddress ?? null,
            name: [user.firstName, user.lastName].filter(Boolean).join(' ') || null,
            imageUrl: user.imageUrl ?? null,
          };
        } catch {
          return {
            ...member,
            email: null,
            name: null,
            imageUrl: null,
          };
        }
      }),
    );

    return NextResponse.json({ members: enriched });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Members list error:', error);
    return NextResponse.json({ error: 'Failed to list members' }, { status: 500 });
  }
}
