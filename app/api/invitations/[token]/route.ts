import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, teamInvitations, teams } from '@/db';
import { getUserEmailInfo } from '@/lib/email';

type RouteParams = { params: Promise<{ token: string }> };

/**
 * GET /api/invitations/[token]
 * Public info for the invitation landing page.
 * No auth required — this is how the recipient previews the invite.
 */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { token } = await params;

    const [invitation] = await db
      .select()
      .from(teamInvitations)
      .where(eq(teamInvitations.token, token))
      .limit(1);

    if (!invitation) {
      return NextResponse.json({ error: 'Invitation not found' }, { status: 404 });
    }

    if (invitation.status !== 'pending') {
      return NextResponse.json(
        { error: 'This invitation is no longer valid.', status: invitation.status },
        { status: 410 },
      );
    }

    if (new Date() > invitation.expiresAt) {
      return NextResponse.json(
        { error: 'This invitation has expired.', status: 'expired' },
        { status: 410 },
      );
    }

    // Get team name
    const [team] = await db
      .select({ name: teams.name, slug: teams.slug, avatarUrl: teams.avatarUrl })
      .from(teams)
      .where(eq(teams.id, invitation.teamId))
      .limit(1);

    // Get inviter name
    const inviter = await getUserEmailInfo(invitation.invitedByClerkUserId);

    return NextResponse.json({
      teamName: team?.name ?? 'Unknown Team',
      teamSlug: team?.slug ?? null,
      teamAvatarUrl: team?.avatarUrl ?? null,
      inviterName: inviter?.name ?? 'A team member',
      role: invitation.role,
      email: invitation.email,
      expiresAt: invitation.expiresAt.toISOString(),
    });
  } catch (error) {
    console.error('Invitation info error:', error);
    return NextResponse.json({ error: 'Failed to load invitation' }, { status: 500 });
  }
}
