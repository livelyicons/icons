/**
 * SVG validation and normalization pipeline.
 * Ensures AI-generated SVGs meet our quality and security standards.
 */

export interface SvgValidationResult {
  valid: boolean;
  svg: string;
  errors: string[];
  warnings: string[];
}

const MAX_SVG_SIZE = 50_000; // 50KB
const MAX_PATH_COUNT = 30;

/**
 * Validate and normalize an SVG string.
 */
export function validateAndNormalizeSvg(rawSvg: string): SvgValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Basic size check
  if (rawSvg.length > MAX_SVG_SIZE) {
    errors.push(`SVG exceeds maximum size of ${MAX_SVG_SIZE / 1000}KB`);
    return { valid: false, svg: rawSvg, errors, warnings };
  }

  // Extract SVG content — handle cases where API returns wrapped content
  let svg = extractSvgContent(rawSvg);
  if (!svg) {
    errors.push('No valid SVG element found in response');
    return { valid: false, svg: rawSvg, errors, warnings };
  }

  // Validate XML structure (basic check)
  if (!svg.includes('</svg>')) {
    errors.push('SVG is missing closing tag');
    return { valid: false, svg, errors, warnings };
  }

  // Check path count
  const pathCount = (svg.match(/<(path|circle|rect|ellipse|line|polyline|polygon)\b/g) ?? []).length;
  if (pathCount > MAX_PATH_COUNT) {
    warnings.push(`SVG has ${pathCount} shape elements (recommended max: ${MAX_PATH_COUNT})`);
  }
  if (pathCount === 0) {
    errors.push('SVG contains no drawable elements');
    return { valid: false, svg, errors, warnings };
  }

  // Normalize viewBox
  svg = normalizeViewBox(svg);

  // Strip dangerous elements
  svg = stripDangerousElements(svg);

  // Normalize colors to currentColor for theming
  svg = normalizeColors(svg);

  // Clean whitespace
  svg = svg.replace(/\s+/g, ' ').trim();

  return { valid: errors.length === 0, svg, errors, warnings };
}

/**
 * Extract the <svg>...</svg> block from a potentially wrapped response.
 */
function extractSvgContent(raw: string): string | null {
  // Try to find SVG tags
  const svgMatch = raw.match(/<svg[\s\S]*<\/svg>/i);
  if (svgMatch) return svgMatch[0];

  // Maybe it's inside a markdown code block
  const codeBlockMatch = raw.match(/```(?:xml|svg|html)?\s*\n?([\s\S]*?)\n?```/);
  if (codeBlockMatch) {
    const inner = codeBlockMatch[1];
    const innerSvg = inner.match(/<svg[\s\S]*<\/svg>/i);
    if (innerSvg) return innerSvg[0];
  }

  return null;
}

/**
 * Ensure SVG has a proper viewBox attribute.
 */
function normalizeViewBox(svg: string): string {
  // If viewBox already exists, keep it
  if (/viewBox\s*=/.test(svg)) return svg;

  // Try to derive from width/height
  const widthMatch = svg.match(/\bwidth\s*=\s*"(\d+)"/);
  const heightMatch = svg.match(/\bheight\s*=\s*"(\d+)"/);

  if (widthMatch && heightMatch) {
    const w = widthMatch[1];
    const h = heightMatch[1];
    return svg.replace(/<svg/, `<svg viewBox="0 0 ${w} ${h}"`);
  }

  // Default to 24x24
  return svg.replace(/<svg/, '<svg viewBox="0 0 24 24"');
}

/**
 * Remove potentially dangerous SVG elements (script, foreignObject, etc).
 */
function stripDangerousElements(svg: string): string {
  return svg
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, '')
    .replace(/\bon\w+\s*=\s*"[^"]*"/gi, '') // inline event handlers
    .replace(/\bon\w+\s*=\s*'[^']*'/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, ''); // external styles can cause issues
}

/**
 * Normalize fill/stroke colors to currentColor for CSS theming support.
 */
function normalizeColors(svg: string): string {
  // Replace explicit black/dark fills with currentColor
  return svg
    .replace(/fill\s*=\s*"(?:#000(?:000)?|black|rgb\(0,\s*0,\s*0\))"/gi, 'fill="currentColor"')
    .replace(/stroke\s*=\s*"(?:#000(?:000)?|black|rgb\(0,\s*0,\s*0\))"/gi, 'stroke="currentColor"');
}
