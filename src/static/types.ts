/**
 * Type definitions for static (RSC-compatible) icons
 */

/**
 * Props for static icon components
 *
 * These icons render as pure SVG elements without any client-side
 * JavaScript, making them compatible with React Server Components.
 */
export interface StaticIconProps {
  /**
   * Size of the icon in pixels
   * @default 24
   */
  size?: number;

  /**
   * Stroke width for SVG paths
   * @default 2
   */
  strokeWidth?: number;

  /**
   * Additional CSS classes to apply to the icon
   */
  className?: string;

  /**
   * CSS animation class to apply (for CSS-only animations)
   * @example 'motionicon-scale', 'motionicon-bounce'
   */
  animationClass?: string;

  /**
   * Accessible label for the icon
   * When provided, sets role="img" and aria-label
   * When omitted, icon is treated as decorative with aria-hidden="true"
   */
  'aria-label'?: string;

  /**
   * Custom color for the icon stroke
   * @default 'currentColor'
   */
  color?: string;

  /**
   * Additional SVG attributes to pass through
   */
  style?: React.CSSProperties;
}

/**
 * Static icon component type
 */
export type StaticIconComponent = React.FC<StaticIconProps>;
