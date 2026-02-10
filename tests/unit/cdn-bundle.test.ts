import { describe, it, expect } from 'vitest';
import { buildCdnBundle } from '@/lib/cdn';

const testIcons = [
  {
    slug: 'arrow-right',
    svgCode: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    animation: 'translate',
    trigger: 'hover',
    duration: 0.5,
  },
  {
    slug: 'heart',
    svgCode: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor"/></svg>',
    animation: 'heartbeat',
    trigger: 'hover',
    duration: 0.6,
  },
];

describe('CDN Bundle Generation', () => {
  it('generates a self-executing function', () => {
    const bundle = buildCdnBundle('user123', testIcons);
    expect(bundle).toMatch(/^\(function\(\)\{/);
    expect(bundle).toContain('})();');
  });

  it('includes SVG sprite symbols', () => {
    const bundle = buildCdnBundle('user123', testIcons);
    expect(bundle).toContain('li-arrow-right');
    expect(bundle).toContain('li-heart');
  });

  it('uses DOMParser for safe SVG injection', () => {
    const bundle = buildCdnBundle('user123', testIcons);
    expect(bundle).toContain('DOMParser');
    expect(bundle).toContain('document.importNode');
    expect(bundle).not.toContain('.innerHTML');
  });

  it('includes CSS keyframe animations', () => {
    const bundle = buildCdnBundle('user123', testIcons);
    expect(bundle).toContain('@keyframes li-translate');
    expect(bundle).toContain('@keyframes li-heartbeat');
  });

  it('includes icon data as JSON', () => {
    const bundle = buildCdnBundle('user123', testIcons);
    expect(bundle).toContain('"arrow-right"');
    expect(bundle).toContain('"heart"');
    expect(bundle).toContain('"translate"');
    expect(bundle).toContain('"heartbeat"');
  });

  it('supports hover trigger setup', () => {
    const bundle = buildCdnBundle('user123', testIcons);
    expect(bundle).toContain('mouseenter');
    expect(bundle).toContain('mouseleave');
  });

  it('sets up DOMContentLoaded listener', () => {
    const bundle = buildCdnBundle('user123', testIcons);
    expect(bundle).toContain('DOMContentLoaded');
  });

  it('marks elements as rendered to prevent duplicates', () => {
    const bundle = buildCdnBundle('user123', testIcons);
    expect(bundle).toContain('data-li-rendered');
  });

  it('clears element children safely (no innerHTML)', () => {
    const bundle = buildCdnBundle('user123', testIcons);
    expect(bundle).toContain('removeChild');
  });
});
