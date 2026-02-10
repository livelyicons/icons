import Stripe from 'stripe';
import { serverEnv } from './env';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(serverEnv().STRIPE_SECRET_KEY, {
      apiVersion: '2026-01-28.clover',
      typescript: true,
    });
  }
  return _stripe;
}

// ─────────────────────────────────────────────────
// Plan configuration
// ─────────────────────────────────────────────────

export const PLAN_CONFIG = {
  free: {
    name: 'Free',
    monthlyTokens: 5,
    isLifetimeTokens: true,
    maxIcons: 20,
    maxTemplates: 0,
    maxCdnIcons: 0,
    rateLimit: { perHour: 3 },
  },
  pro: {
    name: 'Pro',
    monthlyTokens: 500,
    isLifetimeTokens: false,
    maxIcons: Infinity,
    maxTemplates: 10,
    maxCdnIcons: 50,
    rateLimit: { perHour: 50 },
    tokenRollover: { months: 1, maxBanked: 1000 },
  },
  team: {
    name: 'Team',
    monthlyTokens: 2000,
    isLifetimeTokens: false,
    maxIcons: Infinity,
    maxTemplates: 50,
    maxCdnIcons: 500,
    rateLimit: { perHour: 100 },
    tokenRollover: { months: 3, maxBanked: 5000 },
    seats: 5,
  },
  enterprise: {
    name: 'Enterprise',
    monthlyTokens: Infinity,
    isLifetimeTokens: false,
    maxIcons: Infinity,
    maxTemplates: Infinity,
    maxCdnIcons: Infinity,
    rateLimit: { perHour: Infinity },
  },
} as const;

export type PlanConfig = typeof PLAN_CONFIG;

// ─────────────────────────────────────────────────
// Token top-up packs
// ─────────────────────────────────────────────────

export const TOKEN_PACKS = [
  { name: 'Small', price: 500, tokens: 50 },    // $5.00
  { name: 'Medium', price: 1500, tokens: 200 },  // $15.00
  { name: 'Large', price: 3500, tokens: 500 },   // $35.00
] as const;

// ─────────────────────────────────────────────────
// Token costs for actions
// ─────────────────────────────────────────────────

export const TOKEN_COSTS = {
  generate: 1,
  refine: 0.5,
  batchGenerate: 1,  // per icon
  animatedExport: 0,
  svgDownload: 0,
} as const;
