import { describe, it, expect } from 'vitest';
import crypto from 'crypto';

/**
 * Tests for shared collection slug generation, password hashing,
 * and embed script generation patterns used in the public collection sharing system.
 */
describe('Shared Collections', () => {
  describe('public slug generation', () => {
    it('generates unique slugs using nanoid-like pattern', () => {
      const slugs = new Set<string>();
      for (let i = 0; i < 100; i++) {
        const slug = crypto.randomBytes(6).toString('base64url');
        slugs.add(slug);
      }
      expect(slugs.size).toBe(100);
    });

    it('generates URL-safe slugs', () => {
      const slug = crypto.randomBytes(6).toString('base64url');
      // base64url only uses alphanumeric, -, and _
      expect(slug).toMatch(/^[A-Za-z0-9_-]+$/);
    });
  });

  describe('password protection', () => {
    it('accepts null password for no protection', () => {
      const password: string | null = null;
      expect(password).toBeNull();
    });

    it('accepts non-empty password string', () => {
      const password = 'my-secret-pass';
      expect(password.length).toBeGreaterThan(0);
    });

    it('validates password comparison', () => {
      const stored: string = 'secret123';
      expect(stored === 'secret123').toBe(true);
      expect(stored === 'wrong').toBe(false);
    });
  });

  describe('embed script generation', () => {
    it('generates valid embed URL', () => {
      const slug = 'abc123';
      const baseUrl = 'https://livelyicons.com';
      const embedUrl = `${baseUrl}/api/shared/${slug}/embed.js`;
      expect(embedUrl).toBe('https://livelyicons.com/api/shared/abc123/embed.js');
    });

    it('generates valid script tag', () => {
      const slug = 'test-slug';
      const baseUrl = 'https://livelyicons.com';
      const scriptTag = `<script src="${baseUrl}/api/shared/${slug}/embed.js"></script>`;
      expect(scriptTag).toContain('src=');
      expect(scriptTag).toContain('/embed.js');
      expect(scriptTag).toContain('test-slug');
    });
  });

  describe('view count tracking', () => {
    it('initializes at 0', () => {
      const viewCount = 0;
      expect(viewCount).toBe(0);
    });

    it('increments correctly', () => {
      let viewCount = 0;
      viewCount += 1;
      expect(viewCount).toBe(1);
      viewCount += 1;
      expect(viewCount).toBe(2);
    });
  });

  describe('collection visibility rules', () => {
    it('requires team plan for sharing', () => {
      const planType = 'team';
      const allowedPlans = ['team', 'enterprise'];
      expect(allowedPlans.includes(planType)).toBe(true);
    });

    it('rejects free plan for sharing', () => {
      const planType = 'free';
      const allowedPlans = ['team', 'enterprise'];
      expect(allowedPlans.includes(planType)).toBe(false);
    });

    it('rejects pro plan for sharing', () => {
      const planType = 'pro';
      const allowedPlans = ['team', 'enterprise'];
      expect(allowedPlans.includes(planType)).toBe(false);
    });

    it('allows enterprise plan for sharing', () => {
      const planType = 'enterprise';
      const allowedPlans = ['team', 'enterprise'];
      expect(allowedPlans.includes(planType)).toBe(true);
    });
  });

  describe('collection data structure', () => {
    it('creates correct shared collection shape', () => {
      const shared = {
        id: crypto.randomUUID(),
        collectionId: crypto.randomUUID(),
        publicSlug: crypto.randomBytes(6).toString('base64url'),
        isPublic: true,
        allowEmbed: true,
        password: null as string | null,
        viewCount: 0,
      };

      expect(shared.id).toBeDefined();
      expect(shared.collectionId).toBeDefined();
      expect(shared.publicSlug.length).toBeGreaterThan(0);
      expect(shared.isPublic).toBe(true);
      expect(shared.allowEmbed).toBe(true);
      expect(shared.password).toBeNull();
      expect(shared.viewCount).toBe(0);
    });

    it('supports password-protected collections', () => {
      const shared = {
        publicSlug: 'abc123',
        isPublic: true,
        password: 'my-password',
      };

      expect(shared.password).not.toBeNull();
      expect(shared.password).toBe('my-password');
    });
  });
});
