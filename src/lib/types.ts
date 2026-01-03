/**
 * Core type definitions for the MotionIcons library
 */

import type { Variant, Variants, Transition } from 'motion/react';

/**
 * Available motion/animation types for icons
 */
export type MotionType =
  | 'scale'      // Grow/shrink on hover
  | 'rotate'     // Spin on hover
  | 'translate'  // Move/slide on hover
  | 'shake'      // Shake/wobble on hover
  | 'pulse'      // Pulse/heartbeat effect
  | 'bounce'     // Bouncy spring effect
  | 'draw'       // SVG path drawing effect
  | 'spin'       // Continuous rotation
  | 'none';      // No animation

/**
 * Animation trigger modes
 */
export type TriggerType =
  | 'hover'      // Animate on hover (default)
  | 'loop'       // Continuous looping animation
  | 'mount'      // Animate once on mount
  | 'inView';    // Animate when scrolled into view

/**
 * Animation mode for icons
 */
export type AnimationMode =
  | 'motion'     // Use motion/react for animations (default)
  | 'css'        // Use CSS keyframe animations
  | 'none';      // No animations (static)

/**
 * Custom motion preset interface for user-defined animations
 */
export interface CustomMotionPresetConfig {
  /**
   * Animation variants (initial, hover, tap states)
   */
  variants: Variants;

  /**
   * Transition configuration
   */
  transition: Transition;

  /**
   * Custom preset name
   */
  name: string;
}

/**
 * Props for individual icon components
 */
export interface IconProps {
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
   * Whether the icon should be animated
   * Overrides context and system preferences
   */
  animated?: boolean;

  /**
   * The type of motion/animation to apply
   * @default 'scale'
   */
  motionType?: MotionType;

  /**
   * When to trigger the animation
   * - 'hover': Animate on hover (default)
   * - 'loop': Continuous looping animation
   * - 'mount': Animate once on mount
   * - 'inView': Animate when scrolled into view
   * @default 'hover'
   */
  trigger?: TriggerType;

  /**
   * Animation mode
   * - 'motion': Use motion/react (default, requires motion dependency)
   * - 'css': Use CSS keyframe animations (no JS dependency)
   * - 'none': Static, no animations
   * @default 'motion'
   */
  animationMode?: AnimationMode;

  /**
   * Custom motion preset for user-defined animations
   * When provided, overrides motionType
   */
  motionPreset?: CustomMotionPresetConfig;

  /**
   * Accessible label for the icon
   * When provided, sets role="img" and aria-label
   * When omitted, icon is treated as decorative with aria-hidden="true"
   */
  'aria-label'?: string;
}

/**
 * Configuration for icon behavior and defaults
 */
export interface IconConfig {
  /**
   * Global animation toggle
   * @default true
   */
  animated: boolean;

  /**
   * Default size for all icons in pixels
   * @default 24
   */
  defaultSize: number;

  /**
   * Default stroke width for all icons
   * @default 2
   */
  defaultStrokeWidth: number;
}

/**
 * Animation variants for Motion components
 * Re-export of Motion's Variants type for consistency
 */
export type AnimationVariants = Variants;

/**
 * Transition configuration for animations
 */
export interface TransitionConfig {
  /**
   * Duration of the animation in seconds
   */
  duration?: number;

  /**
   * Easing function
   */
  ease?: string | number[];

  /**
   * Type of animation (spring, tween, etc.)
   */
  type?: string;

  /**
   * Spring stiffness
   */
  stiffness?: number;

  /**
   * Spring damping
   */
  damping?: number;

  /**
   * Delay before animation starts
   */
  delay?: number;
}

/**
 * Complete animation preset definition
 */
export interface AnimationPreset {
  /**
   * Initial state
   */
  initial?: Variant;

  /**
   * Hover state
   */
  hover?: Variant;

  /**
   * Tap state
   */
  tap?: Variant;

  /**
   * Exit state
   */
  exit?: Variant;

  /**
   * Transition configuration
   */
  transition?: TransitionConfig;
}
