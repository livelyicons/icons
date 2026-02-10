import { inngest } from '@/lib/inngest';
import { sendEmail, getUserEmailInfo } from '@/lib/email';
import { PaymentFailed } from '@/email/templates/PaymentFailed';
import { ProAccessWarning } from '@/email/templates/ProAccessWarning';
import { AccountPaused } from '@/email/templates/AccountPaused';
import { getSubscription, downgradeToFree } from '@/lib/subscription';

/**
 * Dunning email sequence triggered by invoice.payment_failed.
 *
 * Timeline:
 *   Day 0  — In-app banner (handled by UI, not this function)
 *   Day 3  — "Payment failed" email
 *   Day 7  — "Pro access paused in 7 days" warning email
 *   Day 14 — Account downgraded + "Account paused" email
 *
 * Automatically canceled if a `payment/resolved` event arrives
 * for the same clerkUserId (i.e., user pays successfully).
 */
export const dunningSequence = inngest.createFunction(
  {
    id: 'dunning-sequence',
    cancelOn: [{ event: 'payment/resolved', match: 'data.clerkUserId' }],
  },
  { event: 'payment/failed' },
  async ({ event, step }) => {
    const clerkUserId = event.data.clerkUserId as string;

    // ── Day 3: Payment failed email ──────────────────
    await step.sleep('wait-3-days', '3d');

    const stillPastDue3 = await step.run('check-day3-status', async () => {
      const sub = await getSubscription(clerkUserId);
      return sub?.status === 'past_due';
    });

    if (!stillPastDue3) {
      return { status: 'resolved', stage: 'day3' };
    }

    await step.run('send-payment-failed-email', async () => {
      const user = await getUserEmailInfo(clerkUserId);
      if (!user) return;
      await sendEmail(
        user.email,
        'Action required: Payment failed',
        PaymentFailed,
        { userName: user.name },
      );
    });

    // ── Day 7: Warning email ─────────────────────────
    await step.sleep('wait-to-day7', '4d');

    const stillPastDue7 = await step.run('check-day7-status', async () => {
      const sub = await getSubscription(clerkUserId);
      return sub?.status === 'past_due';
    });

    if (!stillPastDue7) {
      return { status: 'resolved', stage: 'day7' };
    }

    await step.run('send-pro-access-warning', async () => {
      const user = await getUserEmailInfo(clerkUserId);
      if (!user) return;
      await sendEmail(
        user.email,
        'Your Pro access will be paused soon',
        ProAccessWarning,
        { userName: user.name },
      );
    });

    // ── Day 14: Downgrade + paused email ─────────────
    await step.sleep('wait-to-day14', '7d');

    const stillPastDue14 = await step.run('check-day14-status', async () => {
      const sub = await getSubscription(clerkUserId);
      return sub?.status === 'past_due';
    });

    if (!stillPastDue14) {
      return { status: 'resolved', stage: 'day14' };
    }

    await step.run('downgrade-to-free', async () => {
      await downgradeToFree(clerkUserId);
    });

    await step.run('send-account-paused-email', async () => {
      const user = await getUserEmailInfo(clerkUserId);
      if (!user) return;
      await sendEmail(
        user.email,
        'Your Lively Icons Pro account has been paused',
        AccountPaused,
        { userName: user.name },
      );
    });

    return { status: 'completed' };
  },
);
