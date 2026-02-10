/**
 * Animated export utilities.
 * Converts Motion animation params into native SVG <animate>/<animateTransform>
 * elements for standalone animated SVG output.
 */

interface AnimatedSvgOptions {
  svgCode: string;
  animation: string;
  duration: number;
}

/**
 * Convert an SVG + animation params into a standalone animated SVG.
 * Uses native SVG SMIL animation elements (<animate>, <animateTransform>).
 */
export function generateAnimatedSvg(opts: AnimatedSvgOptions): string {
  const { svgCode, animation, duration } = opts;
  const dur = `${duration}s`;

  const animElement = buildSvgAnimation(animation, dur);
  if (!animElement) {
    // No animation — return original SVG
    return svgCode;
  }

  // Wrap SVG content in a <g> with the animation
  const inner = extractSvgInner(svgCode);
  const viewBox = extractViewBox(svgCode);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="currentColor">
  <g>
    ${animElement}
    ${inner}
  </g>
</svg>`;
}

/**
 * Build native SVG animation elements for the given animation type.
 */
function buildSvgAnimation(animation: string, dur: string): string | null {
  const animations: Record<string, string> = {
    scale: `<animateTransform attributeName="transform" type="scale" values="1;1.2;1" dur="${dur}" repeatCount="indefinite" />`,

    rotate: `<animateTransform attributeName="transform" type="rotate" values="0 12 12;15 12 12;-15 12 12;0 12 12" dur="${dur}" repeatCount="indefinite" />`,

    translate: `<animateTransform attributeName="transform" type="translate" values="0,0;-2,-2;2,0;0,0" dur="${dur}" repeatCount="indefinite" />`,

    shake: `<animateTransform attributeName="transform" type="translate" values="0,0;-4,0;4,0;-4,0;4,0;0,0" dur="${dur}" repeatCount="indefinite" />`,

    pulse: `<animateTransform attributeName="transform" type="scale" values="1;1.1;1" dur="${dur}" repeatCount="indefinite" />
    <animate attributeName="opacity" values="1;0.8;1" dur="${dur}" repeatCount="indefinite" />`,

    bounce: `<animateTransform attributeName="transform" type="translate" values="0,0;0,-6;0,0" dur="${dur}" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" />`,

    spin: `<animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="${dur}" repeatCount="indefinite" />`,

    ring: `<animateTransform attributeName="transform" type="rotate" values="0 12 12;15 12 12;-15 12 12;10 12 12;-10 12 12;5 12 12;0 12 12" dur="${dur}" repeatCount="indefinite" />`,

    wiggle: `<animateTransform attributeName="transform" type="rotate" values="0 12 12;-8 12 12;8 12 12;-5 12 12;5 12 12;0 12 12" dur="${dur}" repeatCount="indefinite" />`,

    heartbeat: `<animateTransform attributeName="transform" type="scale" values="1;1.15;1;1.1;1" dur="${dur}" repeatCount="indefinite" />`,

    swing: `<animateTransform attributeName="transform" type="rotate" values="0 12 12;12 12 12;-12 12 12;6 12 12;-6 12 12;0 12 12" dur="${dur}" repeatCount="indefinite" />`,

    float: `<animateTransform attributeName="transform" type="translate" values="0,0;0,-4;0,0" dur="${dur}" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" />`,

    draw: `<animate attributeName="stroke-dashoffset" values="100;0" dur="${dur}" fill="freeze" />
    <animate attributeName="stroke-dasharray" values="0 100;100 0" dur="${dur}" fill="freeze" />`,
  };

  return animations[animation] ?? null;
}

function extractSvgInner(svg: string): string {
  const match = svg.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
  return match?.[1]?.trim() ?? '';
}

function extractViewBox(svg: string): string {
  const match = svg.match(/viewBox\s*=\s*"([^"]*)"/);
  return match?.[1] ?? '0 0 24 24';
}
