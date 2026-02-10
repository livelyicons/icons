import { serve } from 'inngest/next';
import { inngest } from '@/lib/inngest';
import { dunningSequence } from '@/inngest/dunning-sequence';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [dunningSequence],
});
