import { eq } from 'drizzle-orm';
import { inngest } from '@/lib/inngest';
import { db, teams } from '@/db';

/**
 * Sends a Slack notification when an icon is generated in team context.
 * Triggered by the 'team/icon.generated' event fired from the generate API.
 */
export const teamSlackNotify = inngest.createFunction(
  { id: 'team-slack-notify', name: 'Team Slack Notify' },
  { event: 'team/icon.generated' },
  async ({ event }) => {
    const { teamId, iconName, style, prompt, creatorName } = event.data;

    if (!teamId) return { skipped: true, reason: 'No teamId' };

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
      return { skipped: true, reason: 'No Slack webhook configured' };
    }

    const blocks = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*New icon generated in ${team.name}*`,
        },
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Name:*\n${iconName || 'Untitled'}` },
          { type: 'mrkdwn', text: `*Style:*\n${style || 'Default'}` },
          { type: 'mrkdwn', text: `*By:*\n${creatorName || 'Unknown'}` },
          { type: 'mrkdwn', text: `*Prompt:*\n${truncate(prompt || '', 100)}` },
        ],
      },
    ];

    const payload: Record<string, unknown> = {
      text: `New icon "${iconName}" generated in ${team.name} by ${creatorName}`,
      blocks,
    };

    if (team.slackChannelName) {
      payload.channel = team.slackChannelName;
    }

    const res = await fetch(team.slackWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error('Slack webhook failed:', res.status, await res.text());
      return { sent: false, status: res.status };
    }

    return { sent: true };
  },
);

function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max - 3) + '...';
}
