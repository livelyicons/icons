import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { eq, and } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { createFreeSubscription, getSubscription } from '@/lib/subscription';
import { db, subscriptions, teamInvitations, teamMembers } from '@/db';
import { sendEmail } from '@/lib/email';
import { Welcome } from '@/email/templates/Welcome';

interface ClerkWebhookEvent {
  type: string;
  data: {
    id: string;
    email_addresses?: Array<{ email_address: string }>;
    first_name?: string | null;
    last_name?: string | null;
  };
}

export async function POST(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 },
    );
  }

  const headerPayload = await headers();
  const svixId = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json(
      { error: 'Missing svix headers' },
      { status: 401 },
    );
  }

  const body = await req.text();

  let event: ClerkWebhookEvent;
  try {
    const wh = new Webhook(webhookSecret);
    event = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as ClerkWebhookEvent;
  } catch {
    return NextResponse.json(
      { error: 'Invalid webhook signature' },
      { status: 401 },
    );
  }

  try {
    switch (event.type) {
      case 'user.created': {
        const clerkUserId = event.data.id;

        // Idempotency: check if subscription already exists
        const existing = await getSubscription(clerkUserId);
        if (existing) {
          return NextResponse.json({ received: true, status: 'already_exists' });
        }

        const email = event.data.email_addresses?.[0]?.email_address;
        const name = [event.data.first_name, event.data.last_name]
          .filter(Boolean)
          .join(' ') || undefined;

        const stripe = getStripe();
        const customer = await stripe.customers.create({
          email,
          name,
          metadata: { clerkUserId },
        });

        await createFreeSubscription(clerkUserId, customer.id);

        // Send welcome email (best-effort, don't fail the webhook)
        if (email) {
          const displayName = name || 'there';
          try {
            await sendEmail(email, 'Welcome to Lively Icons!', Welcome, {
              userName: displayName,
            });
          } catch (emailErr) {
            console.error('[clerk-webhook] Failed to send welcome email:', emailErr);
          }

          // Auto-accept pending team invitations matching this email
          try {
            const pendingInvitations = await db
              .select()
              .from(teamInvitations)
              .where(
                and(
                  eq(teamInvitations.email, email.toLowerCase()),
                  eq(teamInvitations.status, 'pending'),
                ),
              );

            for (const invitation of pendingInvitations) {
              if (new Date() > invitation.expiresAt) continue;

              await db.insert(teamMembers).values({
                teamId: invitation.teamId,
                clerkUserId,
                role: invitation.role,
              });

              await db
                .update(teamInvitations)
                .set({ status: 'accepted', acceptedAt: new Date() })
                .where(eq(teamInvitations.id, invitation.id));
            }
          } catch (inviteErr) {
            console.error('[clerk-webhook] Failed to auto-accept invitations:', inviteErr);
          }
        }
        break;
      }

      case 'user.deleted': {
        const clerkUserId = event.data.id;

        await db
          .update(subscriptions)
          .set({
            status: 'canceled',
            updatedAt: new Date(),
          })
          .where(eq(subscriptions.clerkUserId, clerkUserId));
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 },
    );
  }
}
