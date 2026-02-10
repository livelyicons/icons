import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextResponse } from 'next/server';

// Mock the DB module
vi.mock('@/db', () => ({
  db: {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    innerJoin: vi.fn().mockReturnThis(),
    limit: vi.fn(),
  },
  teams: { id: 'id', slug: 'slug', ownerClerkUserId: 'owner_clerk_user_id' },
  teamMembers: {
    teamId: 'team_id',
    clerkUserId: 'clerk_user_id',
    role: 'role',
  },
}));

// Mock drizzle operators
vi.mock('drizzle-orm', () => ({
  eq: vi.fn((...args: unknown[]) => args),
  and: vi.fn((...args: unknown[]) => args),
}));

import { requireTeamMember, getTeamsForUser, isTeamOwner } from '@/lib/team-auth';
import { db } from '@/db';

// The mock uses mockReturnThis(), so select/from/where all return db itself.
// Access terminal mock fns directly to avoid Drizzle type conflicts in tests.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockLimit = (db as any).limit as ReturnType<typeof vi.fn>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockInnerJoin = (db as any).innerJoin as ReturnType<typeof vi.fn>;

describe('Team Auth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('requireTeamMember', () => {
    it('returns member when found with sufficient role', async () => {
      const mockMember = {
        id: 'member-1',
        teamId: 'team-1',
        clerkUserId: 'user-1',
        role: 'admin',
        joinedAt: new Date(),
        updatedAt: new Date(),
      };

      mockLimit.mockResolvedValueOnce([mockMember]);

      const result = await requireTeamMember('team-1', 'user-1', 'viewer');
      expect(result).toEqual(mockMember);
    });

    it('throws 403 when user is not a team member', async () => {
      mockLimit.mockResolvedValueOnce([]);

      try {
        await requireTeamMember('team-1', 'unknown-user', 'viewer');
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(NextResponse);
        const response = error as NextResponse;
        expect(response.status).toBe(403);
        const body = await response.json();
        expect(body.message).toContain('not a member');
      }
    });

    it('throws 403 when role is insufficient', async () => {
      const mockMember = {
        id: 'member-1',
        teamId: 'team-1',
        clerkUserId: 'user-1',
        role: 'viewer',
        joinedAt: new Date(),
        updatedAt: new Date(),
      };

      mockLimit.mockResolvedValueOnce([mockMember]);

      try {
        await requireTeamMember('team-1', 'user-1', 'admin');
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(NextResponse);
        const response = error as NextResponse;
        expect(response.status).toBe(403);
        const body = await response.json();
        expect(body.message).toContain('admin');
      }
    });

    it('allows editor when minimum role is editor', async () => {
      const mockMember = {
        id: 'member-1',
        teamId: 'team-1',
        clerkUserId: 'user-1',
        role: 'editor',
        joinedAt: new Date(),
        updatedAt: new Date(),
      };

      mockLimit.mockResolvedValueOnce([mockMember]);

      const result = await requireTeamMember('team-1', 'user-1', 'editor');
      expect(result.role).toBe('editor');
    });

    it('allows admin when minimum role is editor', async () => {
      const mockMember = {
        id: 'member-1',
        teamId: 'team-1',
        clerkUserId: 'user-1',
        role: 'admin',
        joinedAt: new Date(),
        updatedAt: new Date(),
      };

      mockLimit.mockResolvedValueOnce([mockMember]);

      const result = await requireTeamMember('team-1', 'user-1', 'editor');
      expect(result.role).toBe('admin');
    });

    it('defaults to viewer minimum role', async () => {
      const mockMember = {
        id: 'member-1',
        teamId: 'team-1',
        clerkUserId: 'user-1',
        role: 'viewer',
        joinedAt: new Date(),
        updatedAt: new Date(),
      };

      mockLimit.mockResolvedValueOnce([mockMember]);

      const result = await requireTeamMember('team-1', 'user-1');
      expect(result.role).toBe('viewer');
    });
  });

  describe('isTeamOwner', () => {
    it('returns true when user is the owner', async () => {
      mockLimit.mockResolvedValueOnce([
        { ownerClerkUserId: 'user-1' },
      ]);

      const result = await isTeamOwner('team-1', 'user-1');
      expect(result).toBe(true);
    });

    it('returns false when user is not the owner', async () => {
      mockLimit.mockResolvedValueOnce([
        { ownerClerkUserId: 'other-user' },
      ]);

      const result = await isTeamOwner('team-1', 'user-1');
      expect(result).toBe(false);
    });

    it('returns false when team does not exist', async () => {
      mockLimit.mockResolvedValueOnce([]);

      const result = await isTeamOwner('nonexistent', 'user-1');
      expect(result).toBe(false);
    });
  });

  describe('getTeamsForUser', () => {
    it('returns empty array when user has no teams', async () => {
      // getTeamsForUser doesn't use .limit() — it returns all rows from the where clause
      mockInnerJoin.mockReturnValue({
        where: vi.fn().mockResolvedValue([]),
      });

      const result = await getTeamsForUser('user-no-teams');
      expect(result).toEqual([]);
    });
  });
});
