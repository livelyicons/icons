import type { IconStyle } from '@/db/schema';

/**
 * Build a structured prompt for the Recraft V3 API
 * to generate a high-quality SVG icon.
 */
export function buildIconPrompt(
  userPrompt: string,
  style: IconStyle,
): string {
  const styleDirectives = STYLE_DIRECTIVES[style];
  return [
    `Create a single vector icon: ${userPrompt}.`,
    styleDirectives,
    'Requirements:',
    '- Simple, clean vector icon suitable for UI/web use',
    '- Single color (currentColor), no gradients unless duotone style',
    '- Centered in a square viewBox',
    '- Maximum 20 paths, minimal complexity',
    '- No text, no background, no border',
    '- 24x24 base grid, stroke-based where appropriate',
  ].join('\n');
}

const STYLE_DIRECTIVES: Record<IconStyle, string> = {
  line: 'Style: Thin line art with 1.5-2px strokes. No fills, outlines only. Clean, minimal aesthetic similar to Lucide or Feather icons.',
  solid: 'Style: Solid filled glyph. Bold, filled shapes with no strokes. High contrast, like Material Symbols Filled.',
  outline: 'Style: Medium-weight outlined icon with 2px strokes and occasional filled accents. Similar to Heroicons outline variant.',
  duotone: 'Style: Two-tone icon with a primary stroke layer and a secondary fill layer at 20% opacity. Use two distinct visual layers.',
  pixel: 'Style: Pixel art icon on an implied 16x16 or 24x24 grid. Sharp edges, no anti-aliasing, retro aesthetic.',
  isometric: 'Style: Isometric 3D projection. Use 30-degree angles for depth. Clean vector lines, no shading.',
  'hand-drawn': 'Style: Hand-drawn, slightly irregular strokes. Organic feel with subtle wobble in paths. Sketch-like quality.',
};

/**
 * Suggest an animation type based on the icon description.
 */
export function suggestAnimation(prompt: string): string {
  const lower = prompt.toLowerCase();

  if (/\b(heart|love|like)\b/.test(lower)) return 'heartbeat';
  if (/\b(bell|notification|alert)\b/.test(lower)) return 'ring';
  if (/\b(loading|refresh|sync|spinner)\b/.test(lower)) return 'spin';
  if (/\b(arrow|send|mail|rocket|plane)\b/.test(lower)) return 'translate';
  if (/\b(check|success|done|complete)\b/.test(lower)) return 'scale';
  if (/\b(warning|error|danger)\b/.test(lower)) return 'shake';
  if (/\b(star|sparkle|magic)\b/.test(lower)) return 'pulse';
  if (/\b(download|up|down)\b/.test(lower)) return 'bounce';
  if (/\b(edit|pen|pencil|write)\b/.test(lower)) return 'draw';
  if (/\b(wave|hand|hello|hi)\b/.test(lower)) return 'wiggle';
  if (/\b(music|note|sound)\b/.test(lower)) return 'swing';
  if (/\b(cloud|balloon|bubble)\b/.test(lower)) return 'float';
  if (/\b(rotate|turn|cycle)\b/.test(lower)) return 'rotate';

  return 'scale'; // default fallback
}

/**
 * Suggest a trigger based on the icon context.
 */
export function suggestTrigger(prompt: string): string {
  const lower = prompt.toLowerCase();

  if (/\b(loading|spinner|progress)\b/.test(lower)) return 'loop';
  if (/\b(notification|alert|badge)\b/.test(lower)) return 'mount';

  return 'hover'; // most natural default
}
