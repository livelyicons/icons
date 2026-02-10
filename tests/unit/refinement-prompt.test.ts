import { describe, it, expect } from 'vitest';
import { buildRefinementPrompt } from '@/lib/ai/prompt-templates';

describe('buildRefinementPrompt', () => {
  it('includes original prompt context', () => {
    const result = buildRefinementPrompt('a rocket ship', 'make it simpler', 'line');
    expect(result).toContain('a rocket ship');
  });

  it('includes the refinement instruction', () => {
    const result = buildRefinementPrompt('a star icon', 'add more detail', 'solid');
    expect(result).toContain('add more detail');
  });

  it('includes style directives', () => {
    const result = buildRefinementPrompt('arrow', 'thicker lines', 'line');
    expect(result).toContain('Thin line art');
  });

  it('includes quality requirements', () => {
    const result = buildRefinementPrompt('cloud', 'simplify paths', 'outline');
    expect(result).toContain('Maximum 20 paths');
    expect(result).toContain('No text');
  });

  it('maintains recognizability instruction', () => {
    const result = buildRefinementPrompt('heart', 'change color', 'duotone');
    expect(result).toContain('Keep the same overall concept');
  });
});
