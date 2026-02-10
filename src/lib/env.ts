import { z } from 'zod/v4';

/**
 * Server-side environment variables schema
 * Validated at import time to fail fast on misconfiguration
 */
const serverEnvSchema = z.object({
  // Database
  DATABASE_URL: z.url(),

  // Clerk
  CLERK_SECRET_KEY: z.string().min(1),
  CLERK_WEBHOOK_SECRET: z.string().min(1),

  // Stripe
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_'),

  // Blob Storage
  BLOB_READ_WRITE_TOKEN: z.string().min(1),

  // AI APIs
  RECRAFT_API_KEY: z.string().min(1),
  DALLE_API_KEY: z.string().optional(),
  VECTORIZER_API_KEY: z.string().optional(),

  // Redis
  UPSTASH_REDIS_REST_URL: z.url(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),

  // Inngest
  INNGEST_SIGNING_KEY: z.string().optional(),
  INNGEST_EVENT_KEY: z.string().optional(),

  // Email
  RESEND_API_KEY: z.string().startsWith('re_'),
  RESEND_FROM_EMAIL: z.email().default('notifications@livelyicons.com'),

  // App
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

/**
 * Client-side environment variables schema (NEXT_PUBLIC_ prefix)
 */
const clientEnvSchema = z.object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().startsWith('pk_'),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_'),
  NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID: z.string().startsWith('price_'),
  NEXT_PUBLIC_STRIPE_PRO_ANNUAL_PRICE_ID: z.string().startsWith('price_'),
  NEXT_PUBLIC_STRIPE_TEAM_MONTHLY_PRICE_ID: z.string().startsWith('price_'),
  NEXT_PUBLIC_STRIPE_TEAM_ANNUAL_PRICE_ID: z.string().startsWith('price_'),
  NEXT_PUBLIC_APP_URL: z.url().default('http://localhost:3000'),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type ClientEnv = z.infer<typeof clientEnvSchema>;

/**
 * Parse and validate server environment variables.
 * Lazy-loaded to avoid validation errors during client-side rendering.
 */
function getServerEnv(): ServerEnv {
  const parsed = serverEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error('❌ Invalid server environment variables:', parsed.error.format());
    throw new Error('Invalid server environment variables');
  }
  return parsed.data;
}

/**
 * Parse and validate client environment variables.
 */
function getClientEnv(): ClientEnv {
  const parsed = clientEnvSchema.safeParse({
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID,
    NEXT_PUBLIC_STRIPE_PRO_ANNUAL_PRICE_ID: process.env.NEXT_PUBLIC_STRIPE_PRO_ANNUAL_PRICE_ID,
    NEXT_PUBLIC_STRIPE_TEAM_MONTHLY_PRICE_ID: process.env.NEXT_PUBLIC_STRIPE_TEAM_MONTHLY_PRICE_ID,
    NEXT_PUBLIC_STRIPE_TEAM_ANNUAL_PRICE_ID: process.env.NEXT_PUBLIC_STRIPE_TEAM_ANNUAL_PRICE_ID,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  });
  if (!parsed.success) {
    console.error('❌ Invalid client environment variables:', parsed.error.format());
    throw new Error('Invalid client environment variables');
  }
  return parsed.data;
}

/** Lazy singleton for server env */
let _serverEnv: ServerEnv | null = null;
export function serverEnv(): ServerEnv {
  if (!_serverEnv) _serverEnv = getServerEnv();
  return _serverEnv;
}

/** Lazy singleton for client env */
let _clientEnv: ClientEnv | null = null;
export function clientEnv(): ClientEnv {
  if (!_clientEnv) _clientEnv = getClientEnv();
  return _clientEnv;
}
