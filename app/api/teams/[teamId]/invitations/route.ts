import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { eq, and, sql } from 'drizzle-orm';
import crypto from 'crypto';
import { requireAuth } from '@/lib/auth';
import { requireTeamMember } from '@/lib/team-auth';
import { db, teamInvitations, teamMembers } from '@/db';
import { PLAN_CONFIG } from '@/lib/stripe';
import { inngest } from '@/lib/inngest';

const inviteSchema = z.object({
  email: z.email(),
  role: z.enum(['admin', 'editor', 'viewer']),
});

type RouteParams = { params: Promise<{ teamId: string }> };

/**
 * GET /api/teams/[teamId]/invitations
 * List pending invitations. Admin only.
 */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const userId = await requireAuth();
    const { teamId } = await params;

    await requireTeamMember(teamId, userId, 'admin');

    const invitations = await db
      .select()
      .from(teamInvitations)
      .where(
        and(
          eq(teamInvitations.teamId, teamId),
          eq(teamInvitations.status, 'pending'),
        ),
      );

    return NextResponse.json({ invitations });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Invitations list error:', error);
    return NextResponse.json({ error: 'Failed to list invitations' }, { status: 500 });
  }
}

/**
 * POST /api/teams/[teamId]/invitations
 * Send an invitation. Admin only. Enforces seat limit.
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const userId = await requireAuth();
    const { teamId } = await params;

    await requireTeamMember(teamId, userId, 'admin');

    const body = await request.json();
    const parsed = inviteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', reason: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const { email, role } = parsed.data;

    // Check seat limit: members + pending invites <= 5
    const [memberCount] = await db
      .select({ count: sql<number>`COUNT(*)::int` })
      .from(teamMembers)
      .where(eq(teamMembers.teamId, teamId));

    const [pendingCount] = await db
      .select({ count: sql<number>`COUNT(*)::int` })
      .from(teamInvitations)
      .where(
        and(
          eq(teamInvitations.teamId, teamId),
          eq(teamInvitations.status, 'pending'),
        ),
      );

    const maxSeats = PLAN_CONFIG.team.seats;
    if (memberCount.count + pendingCount.count >= maxSeats) {
      return NextResponse.json(
        { error: `Your team has reached the maximum of ${maxSeats} seats (including pending invitations).` },
        { status: 403 },
      );
    }

    // Check for duplicate pending invitation
    const [existing] = await db
      .select({ id: teamInvitations.id })
      .from(teamInvitations)
      .where(
        and(
          eq(teamInvitations.teamId, teamId),
          eq(teamInvitations.email, email.toLowerCase()),
          eq(teamInvitations.status, 'pending'),
        ),
      )
      .limit(1);

    if (existing) {
      return NextResponse.json(
        { error: 'An invitation has already been sent to this email.' },
        { status: 409 },
      );
    }

    // Generate unique token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const [invitation] = await db
      .insert(teamInvitations)
      .values({
        teamId,
        email: email.toLowerCase(),
        role,
        invitedByClerkUserId: userId,
        token,
        status: 'pending',
        expiresAt,
      })
      .returning();

    // Fire Inngest event to send invitation email
    try {
      await inngest.send({
        name: 'team/invitation.send',
        data: {
          invitationId: invitation.id,
          teamId,
          email: email.toLowerCase(),
          token,
        },
      });
    } catch (err) {
      console.error('[invitations] Failed to trigger invitation email:', err);
    }

    return NextResponse.json({ invitation }, { status: 201 });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Invitation create error:', error);
    return NextResponse.json({ error: 'Failed to send invitation' }, { status: 500 });
  }
}
