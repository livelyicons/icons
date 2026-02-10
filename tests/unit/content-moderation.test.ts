import { describe, it, expect } from 'vitest';
import { moderatePrompt } from '@/lib/ai/content-moderation';

describe('Content Moderation', () => {
  it('allows a normal icon prompt', () => {
    const result = moderatePrompt('A rocket ship launching into space');
    expect(result.allowed).toBe(true);
  });

  it('allows common icon descriptions', () => {
    expect(moderatePrompt('A shopping cart with items').allowed).toBe(true);
    expect(moderatePrompt('Calendar with a checkmark').allowed).toBe(true);
    expect(moderatePrompt('Cloud upload icon').allowed).toBe(true);
    expect(moderatePrompt('User profile avatar').allowed).toBe(true);
  });

  it('rejects prompts that are too short', () => {
    const result = moderatePrompt('hi');
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain('too short');
  });

  it('rejects prompts that are too long', () => {
    const result = moderatePrompt('a'.repeat(501));
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain('maximum length');
  });

  it('rejects prompts with blocked content', () => {
    expect(moderatePrompt('a nude figure').allowed).toBe(false);
    expect(moderatePrompt('an explosive bomb').allowed).toBe(false);
  });

  it('returns a user-friendly rejection reason', () => {
    const result = moderatePrompt('draw an explicit scene');
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain('usage policy');
  });
});
