import { describe, it, expect } from 'vitest';
import {
  generateReactComponent,
  generateComponentCode,
} from '@/lib/ai/code-generator';

const testOpts = {
  name: 'Rocket Launch',
  svgCode: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2L2 22h20L12 2z" stroke="currentColor" stroke-width="2"/></svg>',
  animation: 'scale',
  trigger: 'hover',
  duration: 0.5,
};

describe('Code Generator', () => {
  describe('generateReactComponent', () => {
    it('generates valid React TSX', () => {
      const code = generateReactComponent(testOpts);
      expect(code).toContain("'use client'");
      expect(code).toContain('motion/react');
      expect(code).toContain('RocketLaunch');
      expect(code).toContain('motion.svg');
      expect(code).toContain('variants');
    });

    it('converts name to PascalCase', () => {
      const code = generateReactComponent({ ...testOpts, name: 'my cool icon' });
      expect(code).toContain('MyCoolIcon');
    });

    it('includes animation variants for shake', () => {
      const code = generateReactComponent({ ...testOpts, animation: 'shake' });
      // Shake animation moves x: [0, -4, 4, -4, 4, 0]
      expect(code).toContain('"x"');
      expect(code).toContain('-4');
    });

    it('sets displayName', () => {
      const code = generateReactComponent(testOpts);
      expect(code).toContain("displayName = 'RocketLaunch'");
    });
  });

  describe('generateComponentCode', () => {
    it('returns React code for react format', () => {
      const code = generateComponentCode('react', testOpts);
      expect(code).toContain('motion.svg');
    });

    it('returns Vue SFC for vue format', () => {
      const code = generateComponentCode('vue', testOpts);
      expect(code).toContain('<script setup');
      expect(code).toContain('<template>');
      expect(code).toContain('<style scoped>');
    });

    it('returns HTML snippet for html format', () => {
      const code = generateComponentCode('html', testOpts);
      expect(code).toContain('class="lively-icon"');
      expect(code).toContain('@keyframes');
    });

    it('returns raw SVG for svg format', () => {
      const code = generateComponentCode('svg', testOpts);
      expect(code).toBe(testOpts.svgCode);
    });
  });
});
