import { Resend } from 'resend';
import { createElement, type ReactElement } from 'react';
import { clerkClient } from '@clerk/nextjs/server';
import { serverEnv } from './env';

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(serverEnv().RESEND_API_KEY);
  }
  return _resend;
}

interface SendEmailOptions {
  /** Plain text fallback. If omitted, Resend auto-generates from HTML. */
  text?: string;
}

/**
 * Send a transactional email using a React Email template.
 *
 * Resend automatically generates a plain text fallback from the React template.
 * Pass `options.text` to override with a custom plain text version.
 *
 * @example
 * await sendEmail('user@example.com', 'Welcome!', Welcome, { userName: 'Nick' });
 */
export async function sendEmail<T extends Record<string, unknown>>(
  to: string,
  subject: string,
  template: (props: T) => ReactElement,
  props: T,
  options?: SendEmailOptions,
) {
  const resend = getResend();
  const env = serverEnv();

  const { data, error } = await resend.emails.send({
    from: `Lively Icons <${env.RESEND_FROM_EMAIL}>`,
    to: [to],
    subject,
    react: createElement(template, props),
    ...(options?.text ? { text: options.text } : {}),
  });

  if (error) {
    console.error('[email] Failed to send:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return data;
}

/**
 * Look up a user's email and display name from Clerk.
 * Returns null if the user cannot be found or has no email.
 */
export async function getUserEmailInfo(clerkUserId: string): Promise<{
  email: string;
  name: string;
} | null> {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(clerkUserId);
    const email = user.emailAddresses[0]?.emailAddress;
    if (!email) return null;
    const name =
      [user.firstName, user.lastName].filter(Boolean).join(' ') || 'there';
    return { email, name };
  } catch (err) {
    console.error('[email] Failed to look up Clerk user:', err);
    return null;
  }
}
