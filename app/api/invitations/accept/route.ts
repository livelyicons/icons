import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { eq, and } from 'drizzle-orm';
import { requireAuth } from '@/lib/auth';
import { db, teamInvitations, teamMembers } from '@/db';

const acceptSchema = z.object({
  token: z.string().min(1),
});

/**
 * POST /api/invitations/accept
 * Accept a team invitation. User must be signed in.
 */
export async function POST(request: NextRequest) {
  try {
    const userId = await requireAuth();

    const body = await request.json();
    const parsed = acceptSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', reason: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const { token } = parsed.data;

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
        { error: 'This invitation is no longer valid.' },
        { status: 410 },
      );
    }

    if (new Date() > invitation.expiresAt) {
      // Mark as expired
      await db
        .update(teamInvitations)
        .set({ status: 'expired' })
        .where(eq(teamInvitations.id, invitation.id));

      return NextResponse.json(
        { error: 'This invitation has expired.' },
        { status: 410 },
      );
    }

    // Check if already a member
    const [existing] = await db
      .select({ id: teamMembers.id })
      .from(teamMembers)
      .where(
        and(
          eq(teamMembers.teamId, invitation.teamId),
          eq(teamMembers.clerkUserId, userId),
        ),
      )
      .limit(1);

    if (existing) {
      // Mark invitation as accepted even though user is already a member
      await db
        .update(teamInvitations)
        .set({ status: 'accepted', acceptedAt: new Date() })
        .where(eq(teamInvitations.id, invitation.id));

      return NextResponse.json({ accepted: true, alreadyMember: true });
    }

    // Create team member
    await db.insert(teamMembers).values({
      teamId: invitation.teamId,
      clerkUserId: userId,
      role: invitation.role,
    });

    // Mark invitation as accepted
    await db
      .update(teamInvitations)
      .set({ status: 'accepted', acceptedAt: new Date() })
      .where(eq(teamInvitations.id, invitation.id));

    return NextResponse.json({
      accepted: true,
      teamId: invitation.teamId,
      role: invitation.role,
    });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Invitation accept error:', error);
    return NextResponse.json({ error: 'Failed to accept invitation' }, { status: 500 });
  }
}
