import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { requireAuth } from '@/lib/auth';
import { requireTeamMember } from '@/lib/team-auth';
import { db, teams } from '@/db';

interface RouteParams {
  params: Promise<{ teamId: string }>;
}

/**
 * POST /api/teams/:teamId/integrations/slack/test
 * Send a test message to the configured Slack webhook. Admin only.
 */
export async function POST(_request: NextRequest, { params }: RouteParams) {
  try {
    const userId = await requireAuth();
    const { teamId } = await params;
    await requireTeamMember(teamId, userId, 'admin');

    const [team] = await db
      .select({
        name: teams.name,
        slackWebhookUrl: teams.slackWebhookUrl,
        slackChannelName: teams.slackChannelName,
      })
      .from(teams)
      .where(eq(teams.id, teamId))
      .limit(1);

    if (!team?.slackWebhookUrl) {
      return NextResponse.json(
        { error: 'No Slack webhook configured for this team.' },
        { status: 400 },
      );
    }

    const res = await fetch(team.slackWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `Test message from LivelyIcons team "${team.name}" — your Slack integration is working!`,
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Slack webhook returned an error. Check your webhook URL.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ sent: true });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Slack test error:', error);
    return NextResponse.json({ error: 'Failed to send test message' }, { status: 500 });
  }
}
