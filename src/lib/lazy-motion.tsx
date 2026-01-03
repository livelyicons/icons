'use client';

/**
 * Lazy-loaded motion components for bundle optimization
 *
 * This module provides lazy-loaded wrappers around motion/react
 * components to minimize bundle size for static icon usage.
 */

import * as React from 'react';
import { Suspense, lazy, forwardRef } from 'react';
import type { SVGMotionProps, Transition, Variants } from 'motion/react';

/**
 * Props for the LazyMotionIcon component
 */
export interface LazyMotionIconProps {
  /**
   * Whether animations are enabled
   */
  animated: boolean;

  /**
   * Size of the icon
   */
  size: number;

  /**
   * Stroke width
   */
  strokeWidth: number;

  /**
   * CSS class name
   */
  className?: string;

  /**
   * Animation variants
   */
  variants?: Variants;

  /**
   * Transition configuration
   */
  transition?: Transition;

  /**
   * Initial animation state
   */
  initial?: string | boolean;

  /**
   * Animate on hover
   */
  whileHover?: string;

  /**
   * Animate while in view
   */
  whileInView?: string;

  /**
   * Continuous animation
   */
  animate?: string;

  /**
   * Viewport configuration for inView
   */
  viewport?: { once?: boolean; amount?: number };

  /**
   * Accessible label
   */
  'aria-label'?: string;

  /**
   * Child SVG elements
   */
  children: React.ReactNode;

  /**
   * ViewBox for SVG
   */
  viewBox?: string;
}

/**
 * Lazy-loaded motion.svg component
 *
 * Only loads the motion library when animations are actually needed.
 */
const LazyMotionSvg = lazy(async () => {
  const { motion } = await import('motion/react');

  const MotionSvgWrapper = forwardRef<
    SVGSVGElement,
    SVGMotionProps<SVGSVGElement> & { children: React.ReactNode }
  >((props, ref) => {
    return <motion.svg ref={ref} {...props} />;
  });

  MotionSvgWrapper.displayName = 'MotionSvgWrapper';

  return { default: MotionSvgWrapper };
});

/**
 * Static SVG component (no motion dependency)
 */
const StaticSvg = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => {
    return <svg ref={ref} {...props} />;
  }
);
StaticSvg.displayName = 'StaticSvg';

/**
 * LazyMotionIcon - Smart icon wrapper that lazy-loads motion only when needed
 *
 * When animated=false, renders a static SVG with zero motion overhead.
 * When animated=true, lazy-loads the motion library on demand.
 *
 * @example
 * ```tsx
 * // Static usage - no motion loaded
 * <LazyMotionIcon animated={false} size={24} strokeWidth={2}>
 *   <path d="..." />
 * </LazyMotionIcon>
 *
 * // Animated usage - motion loaded on demand
 * <LazyMotionIcon
 *   animated={true}
 *   size={24}
 *   strokeWidth={2}
 *   variants={{ hover: { scale: 1.1 } }}
 *   whileHover="hover"
 * >
 *   <path d="..." />
 * </LazyMotionIcon>
 * ```
 */
export function LazyMotionIcon({
  animated,
  size,
  strokeWidth,
  className,
  variants,
  transition,
  initial,
  whileHover,
  whileInView,
  animate,
  viewport,
  'aria-label': ariaLabel,
  children,
  viewBox = '0 0 24 24'
}: LazyMotionIconProps): React.JSX.Element {
  const commonProps = {
    width: size,
    height: size,
    viewBox,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    role: ariaLabel ? 'img' : undefined,
    'aria-label': ariaLabel,
    'aria-hidden': ariaLabel ? undefined : true
  };

  // Static rendering - no motion library loaded
  if (!animated) {
    return (
      <StaticSvg {...commonProps}>
        {children}
      </StaticSvg>
    );
  }

  // Animated rendering - lazy load motion
  return (
    <Suspense
      fallback={
        <StaticSvg {...commonProps}>
          {children}
        </StaticSvg>
      }
    >
      <LazyMotionSvg
        {...commonProps}
        variants={variants}
        transition={transition}
        initial={initial}
        whileHover={whileHover}
        whileInView={whileInView}
        animate={animate}
        viewport={viewport}
      >
        {children}
      </LazyMotionSvg>
    </Suspense>
  );
}

/**
 * Lazy motion path component
 */
const LazyMotionPath = lazy(async () => {
  const { motion } = await import('motion/react');

  const MotionPathWrapper = forwardRef<
    SVGPathElement,
    SVGMotionProps<SVGPathElement>
  >((props, ref) => {
    return <motion.path ref={ref} {...props} />;
  });

  MotionPathWrapper.displayName = 'MotionPathWrapper';

  return { default: MotionPathWrapper };
});

/**
 * Static path component
 */
const StaticPath = forwardRef<SVGPathElement, React.SVGProps<SVGPathElement>>(
  (props, ref) => {
    return <path ref={ref} {...props} />;
  }
);
StaticPath.displayName = 'StaticPath';

/**
 * LazyMotionPath - Lazy-loaded motion.path for draw animations
 */
export interface LazyMotionPathProps {
  animated: boolean;
  d?: string;
  pathLength?: number;
  variants?: Variants;
  transition?: Transition;
  initial?: string | { pathLength?: number; opacity?: number };
  animate?: string | { pathLength?: number | number[]; opacity?: number | number[] };
  className?: string;
}

export function LazyMotionPathElement({
  animated,
  d,
  pathLength = 1,
  variants,
  transition,
  initial,
  animate,
  className
}: LazyMotionPathProps): React.JSX.Element {
  if (!animated) {
    return <StaticPath d={d} pathLength={pathLength} className={className} />;
  }

  return (
    <Suspense fallback={<StaticPath d={d} pathLength={pathLength} className={className} />}>
      <LazyMotionPath
        d={d}
        pathLength={pathLength}
        variants={variants}
        transition={transition}
        initial={initial}
        animate={animate}
        className={className}
      />
    </Suspense>
  );
}

/**
 * Check if motion library is already loaded
 */
export function isMotionLoaded(): boolean {
  try {
    // Check if motion is in the module cache
    require.resolve('motion/react');
    return true;
  } catch {
    return false;
  }
}

/**
 * Preload motion library
 *
 * Call this to warm up the motion import for better perceived performance.
 * Useful when you know animations will be needed soon.
 */
export function preloadMotion(): void {
  import('motion/react').catch(() => {
    // Silently fail if motion is not available
  });
}
