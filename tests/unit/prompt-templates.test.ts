import { describe, it, expect } from 'vitest';
import { buildIconPrompt, suggestAnimation, suggestTrigger } from '@/lib/ai/prompt-templates';

describe('Prompt Templates', () => {
  describe('buildIconPrompt', () => {
    it('includes the user prompt in output', () => {
      const result = buildIconPrompt('a rocket ship', 'line');
      expect(result).toContain('a rocket ship');
    });

    it('includes style-specific directives', () => {
      const linePrompt = buildIconPrompt('star', 'line');
      expect(linePrompt).toContain('Thin line art');

      const solidPrompt = buildIconPrompt('star', 'solid');
      expect(solidPrompt).toContain('Solid filled glyph');

      const pixelPrompt = buildIconPrompt('star', 'pixel');
      expect(pixelPrompt).toContain('Pixel art');
    });

    it('includes technical requirements', () => {
      const result = buildIconPrompt('arrow', 'outline');
      expect(result).toContain('24x24');
      expect(result).toContain('Maximum 20 paths');
      expect(result).toContain('No text');
    });
  });

  describe('suggestAnimation', () => {
    it('suggests heartbeat for heart-related icons', () => {
      expect(suggestAnimation('a heart icon')).toBe('heartbeat');
    });

    it('suggests ring for bell/notification icons', () => {
      expect(suggestAnimation('notification bell')).toBe('ring');
    });

    it('suggests spin for loading icons', () => {
      expect(suggestAnimation('loading spinner')).toBe('spin');
    });

    it('suggests bounce for download icons', () => {
      expect(suggestAnimation('download file')).toBe('bounce');
    });

    it('suggests translate for arrow/send icons', () => {
      expect(suggestAnimation('send mail')).toBe('translate');
    });

    it('defaults to scale for unmatched prompts', () => {
      expect(suggestAnimation('abstract geometric shape')).toBe('scale');
    });
  });

  describe('suggestTrigger', () => {
    it('suggests loop for loading-type icons', () => {
      expect(suggestTrigger('loading spinner')).toBe('loop');
    });

    it('suggests mount for notification icons', () => {
      expect(suggestTrigger('notification badge')).toBe('mount');
    });

    it('defaults to hover', () => {
      expect(suggestTrigger('a star icon')).toBe('hover');
    });
  });
});
