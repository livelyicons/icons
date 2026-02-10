import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock DB module
vi.mock('@/db', () => ({
  db: {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn(),
  },
  teams: { id: 'id', ownerClerkUserId: 'owner_clerk_user_id' },
}));

vi.mock('drizzle-orm', () => ({
  eq: vi.fn((...args: unknown[]) => args),
}));

// Mock tokens + subscription modules
const mockDeductTokens = vi.fn();
const mockGetTokenBalance = vi.fn();
const mockGetSubscription = vi.fn();

vi.mock('@/lib/tokens', () => ({
  deductTokens: (...args: unknown[]) => mockDeductTokens(...args),
  getTokenBalance: (...args: unknown[]) => mockGetTokenBalance(...args),
}));

vi.mock('@/lib/subscription', () => ({
  getSubscription: (...args: unknown[]) => mockGetSubscription(...args),
}));

import { deductTeamTokens, getTeamTokenBalance, canTeamGenerate } from '@/lib/team-tokens';
import { db } from '@/db';

// The mock uses mockReturnThis(), so select/from/where all return db itself.
// Access the terminal mock fn directly to avoid Drizzle type conflicts in tests.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockLimit = (db as any).limit as ReturnType<typeof vi.fn>;

describe('Team Tokens', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('deductTeamTokens', () => {
    it('deducts tokens from team owner subscription', async () => {
      mockLimit.mockResolvedValueOnce([
        { ownerClerkUserId: 'owner-1' },
      ]);
      mockDeductTokens.mockResolvedValueOnce({ success: true, remaining: 499 });

      const result = await deductTeamTokens('team-1', 1);
      expect(result.success).toBe(true);
      expect(result.remaining).toBe(499);
      expect(mockDeductTokens).toHaveBeenCalledWith('owner-1', 1);
    });

    it('returns failure when team not found', async () => {
      mockLimit.mockResolvedValueOnce([]);

      const result = await deductTeamTokens('nonexistent', 1);
      expect(result.success).toBe(false);
      expect(result.remaining).toBe(0);
    });
  });

  describe('getTeamTokenBalance', () => {
    it('returns token balance from team owner', async () => {
      mockLimit.mockResolvedValueOnce([
        { ownerClerkUserId: 'owner-1' },
      ]);
      mockGetTokenBalance.mockResolvedValueOnce({
        monthly: 400,
        topUp: 100,
        total: 500,
      });

      const result = await getTeamTokenBalance('team-1');
      expect(result).toEqual({ monthly: 400, topUp: 100, total: 500 });
      expect(mockGetTokenBalance).toHaveBeenCalledWith('owner-1');
    });

    it('returns null when team not found', async () => {
      mockLimit.mockResolvedValueOnce([]);

      const result = await getTeamTokenBalance('nonexistent');
      expect(result).toBeNull();
    });
  });

  describe('canTeamGenerate', () => {
    it('allows generation when owner has active team plan with tokens', async () => {
      mockLimit.mockResolvedValueOnce([
        { ownerClerkUserId: 'owner-1' },
      ]);
      mockGetSubscription.mockResolvedValueOnce({
        planType: 'team',
        status: 'active',
        tokensBalance: 1500,
        topUpTokens: 0,
        tokensRefreshDate: new Date(),
      });

      const result = await canTeamGenerate('team-1');
      expect(result.allowed).toBe(true);
      expect(result.tokensRemaining).toBe(1500);
    });

    it('rejects when owner has no subscription', async () => {
      mockLimit.mockResolvedValueOnce([
        { ownerClerkUserId: 'owner-1' },
      ]);
      mockGetSubscription.mockResolvedValueOnce(null);

      const result = await canTeamGenerate('team-1');
      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('no subscription');
    });

    it('rejects when subscription is not active', async () => {
      mockLimit.mockResolvedValueOnce([
        { ownerClerkUserId: 'owner-1' },
      ]);
      mockGetSubscription.mockResolvedValueOnce({
        planType: 'team',
        status: 'past_due',
        tokensBalance: 1000,
        topUpTokens: 0,
      });

      const result = await canTeamGenerate('team-1');
      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('not active');
    });

    it('rejects when plan is not team or enterprise', async () => {
      mockLimit.mockResolvedValueOnce([
        { ownerClerkUserId: 'owner-1' },
      ]);
      mockGetSubscription.mockResolvedValueOnce({
        planType: 'pro',
        status: 'active',
        tokensBalance: 500,
        topUpTokens: 0,
      });

      const result = await canTeamGenerate('team-1');
      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('Team or Enterprise');
    });

    it('rejects when no tokens remaining', async () => {
      mockLimit.mockResolvedValueOnce([
        { ownerClerkUserId: 'owner-1' },
      ]);
      mockGetSubscription.mockResolvedValueOnce({
        planType: 'team',
        status: 'active',
        tokensBalance: 0,
        topUpTokens: 0,
        tokensRefreshDate: new Date('2025-02-01'),
      });

      const result = await canTeamGenerate('team-1');
      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('used all tokens');
    });

    it('returns failure when team not found', async () => {
      mockLimit.mockResolvedValueOnce([]);

      const result = await canTeamGenerate('nonexistent');
      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('not found');
    });
  });
});
