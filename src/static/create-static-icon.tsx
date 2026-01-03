/**
 * Factory function to create static (RSC-compatible) icon components
 *
 * Static icons are pure SVG components with zero client-side JavaScript.
 * They can be used in React Server Components without "use client".
 */

import * as React from 'react';
import type { StaticIconProps } from './types';

/**
 * SVG path data for creating static icons
 */
export interface IconPathData {
  /**
   * SVG path elements (d attribute values or element definitions)
   */
  paths: React.ReactNode;

  /**
   * Optional viewBox (defaults to "0 0 24 24")
   */
  viewBox?: string;
}

/**
 * Create a static icon component from SVG path data
 *
 * The resulting component is RSC-compatible and can be used
 * in Server Components without any client-side JavaScript.
 *
 * @param name - Display name for the component
 * @param pathData - SVG path data
 * @returns A static icon component
 *
 * @example
 * ```tsx
 * const StaticCheckIcon = createStaticIcon('StaticCheck', {
 *   paths: (
 *     <>
 *       <polyline points="20 6 9 17 4 12" />
 *     </>
 *   )
 * });
 *
 * // Use in a Server Component (no "use client" needed)
 * export default function Page() {
 *   return <StaticCheckIcon size={32} className="text-green-500" />;
 * }
 * ```
 */
export function createStaticIcon(
  name: string,
  pathData: IconPathData
): React.FC<StaticIconProps> {
  const { paths, viewBox = '0 0 24 24' } = pathData;

  const StaticIcon: React.FC<StaticIconProps> = ({
    size = 24,
    strokeWidth = 2,
    className,
    animationClass,
    'aria-label': ariaLabel,
    color = 'currentColor',
    style
  }) => {
    const combinedClassName = [className, animationClass]
      .filter(Boolean)
      .join(' ');

    return (
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={combinedClassName || undefined}
        style={style}
        role={ariaLabel ? 'img' : undefined}
        aria-label={ariaLabel}
        aria-hidden={ariaLabel ? undefined : true}
      >
        {paths}
      </svg>
    );
  };

  StaticIcon.displayName = name;

  return StaticIcon;
}

/**
 * Higher-order function to create a static version of an animated icon
 *
 * This is useful for creating static variants of existing icons
 * while maintaining the same SVG structure.
 *
 * @param AnimatedIcon - The animated icon component to create a static version of
 * @param name - Display name for the static component
 * @returns A static icon component with the same SVG content
 */
export function withStatic<P extends StaticIconProps>(
  StaticIconComponent: React.FC<P>,
  name: string
): React.FC<StaticIconProps> {
  const WrappedStatic: React.FC<StaticIconProps> = (props) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <StaticIconComponent {...(props as any)} animated={false} />;
  };

  WrappedStatic.displayName = `Static${name}`;

  return WrappedStatic;
}
