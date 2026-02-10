import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { eq } from 'drizzle-orm';
import { requireAuth } from '@/lib/auth';
import { requireTeamMember } from '@/lib/team-auth';
import { db, teams } from '@/db';

const slackConfigSchema = z.object({
  webhookUrl: z.string().url().startsWith('https://hooks.slack.com/', {
    message: 'Must be a valid Slack webhook URL',
  }),
  channelName: z.string().max(255).optional(),
});

interface RouteParams {
  params: Promise<{ teamId: string }>;
}

/**
 * PUT /api/teams/:teamId/integrations/slack
 * Configure Slack webhook for team notifications. Admin only.
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const userId = await requireAuth();
    const { teamId } = await params;
    await requireTeamMember(teamId, userId, 'admin');

    const body = await request.json();
    const parsed = slackConfigSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', reason: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const { webhookUrl, channelName } = parsed.data;

    const [updated] = await db
      .update(teams)
      .set({
        slackWebhookUrl: webhookUrl,
        slackChannelName: channelName ?? null,
        updatedAt: new Date(),
      })
      .where(eq(teams.id, teamId))
      .returning();

    return NextResponse.json({
      slackWebhookUrl: updated.slackWebhookUrl,
      slackChannelName: updated.slackChannelName,
    });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Slack config error:', error);
    return NextResponse.json({ error: 'Failed to configure Slack' }, { status: 500 });
  }
}

/**
 * DELETE /api/teams/:teamId/integrations/slack
 * Remove Slack webhook configuration. Admin only.
 */
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const userId = await requireAuth();
    const { teamId } = await params;
    await requireTeamMember(teamId, userId, 'admin');

    await db
      .update(teams)
      .set({
        slackWebhookUrl: null,
        slackChannelName: null,
        updatedAt: new Date(),
      })
      .where(eq(teams.id, teamId));

    return NextResponse.json({ removed: true });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Slack remove error:', error);
    return NextResponse.json({ error: 'Failed to remove Slack' }, { status: 500 });
  }
}
