import { describe, it, expect } from 'vitest';
import { validateAndNormalizeSvg } from '@/lib/ai/svg-validator';

describe('SVG Validator', () => {
  const validSvg = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 22h20L12 2z"/></svg>';

  it('accepts a valid SVG', () => {
    const result = validateAndNormalizeSvg(validSvg);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('rejects SVG exceeding max size', () => {
    const hugeSvg = `<svg viewBox="0 0 24 24"><path d="M${'0'.repeat(60000)}"/></svg>`;
    const result = validateAndNormalizeSvg(hugeSvg);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain('exceeds maximum size');
  });

  it('rejects content with no SVG element', () => {
    const result = validateAndNormalizeSvg('<div>Not an SVG</div>');
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain('No valid SVG element');
  });

  it('rejects SVG with no drawable elements', () => {
    const result = validateAndNormalizeSvg('<svg viewBox="0 0 24 24"></svg>');
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain('no drawable elements');
  });

  it('adds viewBox when missing', () => {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><circle cx="12" cy="12" r="10"/></svg>';
    const result = validateAndNormalizeSvg(svg);
    expect(result.valid).toBe(true);
    expect(result.svg).toContain('viewBox="0 0 24 24"');
  });

  it('adds default 24x24 viewBox when no dimensions exist', () => {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="24" height="24"/></svg>';
    const result = validateAndNormalizeSvg(svg);
    expect(result.svg).toContain('viewBox="0 0 24 24"');
  });

  it('strips script elements', () => {
    const svg = '<svg viewBox="0 0 24 24"><script>alert("xss")</script><path d="M12 2z"/></svg>';
    const result = validateAndNormalizeSvg(svg);
    expect(result.svg).not.toContain('<script');
    expect(result.svg).not.toContain('alert');
  });

  it('strips inline event handlers', () => {
    const svg = '<svg viewBox="0 0 24 24"><path d="M12 2z" onclick="alert(1)"/></svg>';
    const result = validateAndNormalizeSvg(svg);
    expect(result.svg).not.toContain('onclick');
  });

  it('strips foreignObject elements', () => {
    const svg = '<svg viewBox="0 0 24 24"><foreignObject><div>XSS</div></foreignObject><path d="M12 2z"/></svg>';
    const result = validateAndNormalizeSvg(svg);
    expect(result.svg).not.toContain('foreignObject');
  });

  it('normalizes black fill to currentColor', () => {
    const svg = '<svg viewBox="0 0 24 24"><path d="M12 2z" fill="#000000"/></svg>';
    const result = validateAndNormalizeSvg(svg);
    expect(result.svg).toContain('fill="currentColor"');
    expect(result.svg).not.toContain('#000000');
  });

  it('normalizes black stroke to currentColor', () => {
    const svg = '<svg viewBox="0 0 24 24"><path d="M12 2z" stroke="black"/></svg>';
    const result = validateAndNormalizeSvg(svg);
    expect(result.svg).toContain('stroke="currentColor"');
  });

  it('warns about high path count', () => {
    const paths = Array.from({ length: 35 }, (_, i) => `<path d="M${i} 0z"/>`).join('');
    const svg = `<svg viewBox="0 0 24 24">${paths}</svg>`;
    const result = validateAndNormalizeSvg(svg);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('35 shape elements');
  });

  it('extracts SVG from markdown code blocks', () => {
    const wrapped = '```svg\n<svg viewBox="0 0 24 24"><path d="M12 2z"/></svg>\n```';
    const result = validateAndNormalizeSvg(wrapped);
    expect(result.valid).toBe(true);
  });
});
