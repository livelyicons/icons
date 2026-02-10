import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { eq } from 'drizzle-orm';
import { requireAuth } from '@/lib/auth';
import { requireTeamMember } from '@/lib/team-auth';
import { db, teams, teamMembers } from '@/db';

const updateSchema = z.object({
  role: z.enum(['admin', 'editor', 'viewer']),
});

type RouteParams = { params: Promise<{ teamId: string; memberId: string }> };

/**
 * PUT /api/teams/[teamId]/members/[memberId]
 * Change a member's role. Admin only. Cannot change the owner's role.
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const userId = await requireAuth();
    const { teamId, memberId } = await params;

    await requireTeamMember(teamId, userId, 'admin');

    const body = await request.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', reason: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    // Find the target member
    const [target] = await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.id, memberId))
      .limit(1);

    if (!target || target.teamId !== teamId) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    // Cannot change the owner's role
    const [team] = await db
      .select({ ownerClerkUserId: teams.ownerClerkUserId })
      .from(teams)
      .where(eq(teams.id, teamId))
      .limit(1);

    if (team && target.clerkUserId === team.ownerClerkUserId) {
      return NextResponse.json(
        { error: "The team owner's role cannot be changed." },
        { status: 403 },
      );
    }

    const [updated] = await db
      .update(teamMembers)
      .set({ role: parsed.data.role, updatedAt: new Date() })
      .where(eq(teamMembers.id, memberId))
      .returning();

    return NextResponse.json({ member: updated });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Member role update error:', error);
    return NextResponse.json({ error: 'Failed to update member role' }, { status: 500 });
  }
}

/**
 * DELETE /api/teams/[teamId]/members/[memberId]
 * Remove a team member. Admin can remove anyone (except owner). Members can remove themselves.
 */
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const userId = await requireAuth();
    const { teamId, memberId } = await params;

    // Find target member
    const [target] = await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.id, memberId))
      .limit(1);

    if (!target || target.teamId !== teamId) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    // Check: owner cannot be removed
    const [team] = await db
      .select({ ownerClerkUserId: teams.ownerClerkUserId })
      .from(teams)
      .where(eq(teams.id, teamId))
      .limit(1);

    if (team && target.clerkUserId === team.ownerClerkUserId) {
      return NextResponse.json(
        { error: 'The team owner cannot be removed.' },
        { status: 403 },
      );
    }

    // Allow self-removal or admin removal
    const isSelf = target.clerkUserId === userId;
    if (!isSelf) {
      await requireTeamMember(teamId, userId, 'admin');
    }

    await db
      .delete(teamMembers)
      .where(eq(teamMembers.id, memberId));

    return NextResponse.json({ removed: true });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Member remove error:', error);
    return NextResponse.json({ error: 'Failed to remove member' }, { status: 500 });
  }
}
