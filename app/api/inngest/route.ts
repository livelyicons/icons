import { serve } from 'inngest/next';
import { inngest } from '@/lib/inngest';
import { dunningSequence } from '@/inngest/dunning-sequence';
import { batchGenerate } from '@/inngest/batch-generate';
import { monthlySummary } from '@/inngest/monthly-summary';
import { teamInvitationSend, teamInvitationExpire } from '@/inngest/team-invitation';
import { teamSlackNotify } from '@/inngest/team-slack-notify';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    dunningSequence,
    batchGenerate,
    monthlySummary,
    teamInvitationSend,
    teamInvitationExpire,
    teamSlackNotify,
  ],
});
