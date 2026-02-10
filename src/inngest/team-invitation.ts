import { inngest } from '@/lib/inngest';
import { db, teamInvitations, teams } from '@/db';
import { eq, and, lt } from 'drizzle-orm';
import { sendEmail, getUserEmailInfo } from '@/lib/email';
import TeamInvitationEmail from '@/emails/TeamInvitation';

/**
 * Send a team invitation email when a new invitation is created.
 */
export const teamInvitationSend = inngest.createFunction(
  { id: 'team-invitation-send' },
  { event: 'team/invitation.send' },
  async ({ event, step }) => {
    const { invitationId, teamId, email, token } = event.data as {
      invitationId: string;
      teamId: string;
      email: string;
      token: string;
    };

    await step.run('send-invitation-email', async () => {
      const [invitation] = await db
        .select()
        .from(teamInvitations)
        .where(eq(teamInvitations.id, invitationId))
        .limit(1);

      if (!invitation || invitation.status !== 'pending') return;

      const [team] = await db
        .select({ name: teams.name })
        .from(teams)
        .where(eq(teams.id, teamId))
        .limit(1);

      const inviter = await getUserEmailInfo(invitation.invitedByClerkUserId);

      const acceptUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://livelyicons.com'}/invite/${token}`;

      await sendEmail(
        email,
        `You're invited to join ${team?.name ?? 'a team'} on Lively Icons`,
        TeamInvitationEmail,
        {
          inviterName: inviter?.name ?? 'A team member',
          teamName: team?.name ?? 'a team',
          role: invitation.role,
          acceptUrl,
          expiresIn: '7 days',
        },
      );
    });
  },
);

/**
 * Daily cleanup: expire invitations past their expiresAt date.
 */
export const teamInvitationExpire = inngest.createFunction(
  { id: 'team-invitation-expire' },
  { cron: '0 3 * * *' }, // Daily at 3 AM UTC
  async ({ step }) => {
    await step.run('expire-old-invitations', async () => {
      const now = new Date();

      await db
        .update(teamInvitations)
        .set({ status: 'expired' })
        .where(
          and(
            eq(teamInvitations.status, 'pending'),
            lt(teamInvitations.expiresAt, now),
          ),
        );
    });
  },
);
