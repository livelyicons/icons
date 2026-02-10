import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { requireAuth } from '@/lib/auth';
import { requireTeamMember } from '@/lib/team-auth';
import { db, teamInvitations } from '@/db';

type RouteParams = { params: Promise<{ teamId: string; invitationId: string }> };

/**
 * DELETE /api/teams/[teamId]/invitations/[invitationId]
 * Revoke a pending invitation. Admin only.
 */
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const userId = await requireAuth();
    const { teamId, invitationId } = await params;

    await requireTeamMember(teamId, userId, 'admin');

    const [invitation] = await db
      .select()
      .from(teamInvitations)
      .where(eq(teamInvitations.id, invitationId))
      .limit(1);

    if (!invitation || invitation.teamId !== teamId) {
      return NextResponse.json({ error: 'Invitation not found' }, { status: 404 });
    }

    if (invitation.status !== 'pending') {
      return NextResponse.json(
        { error: 'Only pending invitations can be revoked.' },
        { status: 400 },
      );
    }

    await db
      .update(teamInvitations)
      .set({ status: 'revoked' })
      .where(eq(teamInvitations.id, invitationId));

    return NextResponse.json({ revoked: true });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Invitation revoke error:', error);
    return NextResponse.json({ error: 'Failed to revoke invitation' }, { status: 500 });
  }
}
