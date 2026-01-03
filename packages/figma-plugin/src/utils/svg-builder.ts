/**
 * SVG string builder utility
 *
 * Converts icon data structure into complete SVG strings
 * ready for insertion into Figma canvas
 */

import type { IconData, SVGElement } from '../../../../scripts/figma-plugin/types'

/**
 * Configuration for SVG rendering
 */
export interface IconConfig {
  /** Icon size in pixels */
  size: number
  /** Stroke width */
  strokeWidth: number
  /** Stroke color (hex or named color) */
  color: string
}

/**
 * Build a complete SVG string from icon data and configuration
 *
 * @param icon - Parsed icon data with elements
 * @param config - Rendering configuration (size, stroke, color)
 * @returns Complete SVG string ready for insertion
 *
 * @example
 * ```ts
 * const svg = buildSvgString(iconData, {
 *   size: 24,
 *   strokeWidth: 2,
 *   color: '#000000'
 * })
 * // Returns: '<svg xmlns="http://www.w3.org/2000/svg" width="24" ...'
 * ```
 */
export function buildSvgString(icon: IconData, config: IconConfig): string {
  const { size, strokeWidth, color } = config

  // Render all SVG elements
  const elements = icon.elements.map(el => renderElement(el)).join('\n    ')

  // Build complete SVG with proper formatting
  return `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${size}"
  height="${size}"
  viewBox="${icon.viewBox}"
  fill="none"
  stroke="${color}"
  stroke-width="${strokeWidth}"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  ${elements}
</svg>`
}

/**
 * Render a single SVG element with its attributes
 *
 * @param el - SVG element with type and attributes
 * @returns SVG element string
 *
 * @example
 * ```ts
 * renderElement({
 *   type: 'path',
 *   attributes: { d: 'M 0 0 L 10 10' }
 * })
 * // Returns: '<path d="M 0 0 L 10 10" />'
 * ```
 */
function renderElement(el: SVGElement): string {
  const attrs = Object.entries(el.attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ')

  return `<${el.type} ${attrs} />`
}

/**
 * Default icon configuration
 */
export const DEFAULT_CONFIG: IconConfig = {
  size: 24,
  strokeWidth: 2,
  color: '#000000'
}
