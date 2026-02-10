import { describe, it, expect } from 'vitest';
import { generateAnimatedSvg } from '@/lib/animated-export';

const sampleSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z" fill="currentColor"/></svg>';

describe('Animated SVG Export', () => {
  it('adds animateTransform for scale animation', () => {
    const result = generateAnimatedSvg({
      svgCode: sampleSvg,
      animation: 'scale',
      duration: 0.5,
    });
    expect(result).toContain('<animateTransform');
    expect(result).toContain('type="scale"');
    expect(result).toContain('0.5s');
  });

  it('adds rotate animation for spin', () => {
    const result = generateAnimatedSvg({
      svgCode: sampleSvg,
      animation: 'spin',
      duration: 1,
    });
    expect(result).toContain('type="rotate"');
    expect(result).toContain('from="0 12 12"');
    expect(result).toContain('to="360 12 12"');
  });

  it('adds translate animation for shake', () => {
    const result = generateAnimatedSvg({
      svgCode: sampleSvg,
      animation: 'shake',
      duration: 0.5,
    });
    expect(result).toContain('type="translate"');
  });

  it('adds opacity animation for pulse', () => {
    const result = generateAnimatedSvg({
      svgCode: sampleSvg,
      animation: 'pulse',
      duration: 0.8,
    });
    expect(result).toContain('opacity');
    expect(result).toContain('0.8s');
  });

  it('preserves original SVG content', () => {
    const result = generateAnimatedSvg({
      svgCode: sampleSvg,
      animation: 'bounce',
      duration: 0.5,
    });
    expect(result).toContain('M12 2L2 22h20L12 2z');
  });

  it('returns original SVG for unsupported animation type', () => {
    const result = generateAnimatedSvg({
      svgCode: sampleSvg,
      animation: 'nonexistent',
      duration: 0.5,
    });
    expect(result).toBe(sampleSvg);
  });

  it('preserves viewBox attribute', () => {
    const result = generateAnimatedSvg({
      svgCode: sampleSvg,
      animation: 'scale',
      duration: 0.5,
    });
    expect(result).toContain('viewBox="0 0 24 24"');
  });

  it('sets repeatCount to indefinite', () => {
    const result = generateAnimatedSvg({
      svgCode: sampleSvg,
      animation: 'float',
      duration: 1,
    });
    expect(result).toContain('repeatCount="indefinite"');
  });

  it('handles draw animation with stroke-dasharray', () => {
    const result = generateAnimatedSvg({
      svgCode: sampleSvg,
      animation: 'draw',
      duration: 1.5,
    });
    expect(result).toContain('stroke-dashoffset');
    expect(result).toContain('stroke-dasharray');
  });
});
