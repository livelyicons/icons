import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { PLAN_CONFIG } from './stripe';
import type { PlanType } from '@/db/schema';

let _redis: Redis | null = null;

function getRedis(): Redis {
  if (!_redis) {
    _redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
  }
  return _redis;
}

// Rate limiters per plan tier (sliding window)
const rateLimiters = new Map<PlanType, Ratelimit>();

function getRateLimiter(planType: PlanType): Ratelimit {
  if (!rateLimiters.has(planType)) {
    const config = PLAN_CONFIG[planType];
    const limit = config.rateLimit.perHour;

    if (limit === Infinity) {
      // Enterprise: effectively unlimited (10k/hour)
      rateLimiters.set(
        planType,
        new Ratelimit({
          redis: getRedis(),
          limiter: Ratelimit.slidingWindow(10000, '1 h'),
          prefix: `ratelimit:${planType}`,
        }),
      );
    } else {
      rateLimiters.set(
        planType,
        new Ratelimit({
          redis: getRedis(),
          limiter: Ratelimit.slidingWindow(limit, '1 h'),
          prefix: `ratelimit:${planType}`,
        }),
      );
    }
  }
  return rateLimiters.get(planType)!;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
  retryAfter: number; // seconds
}

/**
 * Check rate limit for a user based on their plan tier.
 */
export async function checkRateLimit(
  userId: string,
  planType: PlanType,
): Promise<RateLimitResult> {
  const limiter = getRateLimiter(planType);
  const result = await limiter.limit(userId);

  return {
    allowed: result.success,
    remaining: result.remaining,
    resetAt: new Date(result.reset),
    retryAfter: result.success ? 0 : Math.ceil((result.reset - Date.now()) / 1000),
  };
}
