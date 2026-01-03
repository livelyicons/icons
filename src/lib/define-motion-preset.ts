/**
 * Custom motion preset definition system
 *
 * Allows users to define their own animation configurations
 * beyond the 9 built-in motion types.
 */

import type { Variants, Transition, Variant } from 'motion/react';
import type { MotionPreset } from './motion-presets';

/**
 * Animation property values that can be used in presets
 */
type AnimationValue = number | string | number[] | string[];

/**
 * Animation state object with common transform and style properties
 */
type AnimationState = {
  scale?: AnimationValue;
  scaleX?: AnimationValue;
  scaleY?: AnimationValue;
  rotate?: AnimationValue;
  rotateX?: AnimationValue;
  rotateY?: AnimationValue;
  rotateZ?: AnimationValue;
  x?: AnimationValue;
  y?: AnimationValue;
  opacity?: AnimationValue;
  pathLength?: AnimationValue;
  pathOffset?: AnimationValue;
  [key: string]: AnimationValue | undefined;
};

/**
 * Options for defining a custom motion preset
 */
export interface CustomMotionPresetOptions {
  /**
   * Initial state (optional, defaults to empty object)
   */
  initial?: AnimationState;

  /**
   * Hover state - the animated state when triggered
   */
  hover: AnimationState;

  /**
   * Optional tap state for press interactions
   */
  tap?: AnimationState;

  /**
   * Transition configuration
   */
  transition?: Transition;
}

/**
 * Extended motion preset with custom name
 */
export interface CustomMotionPreset extends MotionPreset {
  /**
   * Custom preset name for identification
   */
  name: string;
}

/**
 * Define a custom motion preset
 *
 * Creates a reusable animation configuration that can be passed to icon components.
 *
 * @param name - Unique name for the preset
 * @param options - Animation configuration
 * @returns A motion preset that can be used with icons
 *
 * @example
 * ```tsx
 * // Define a custom "wiggle" animation
 * const wiggle = defineMotionPreset('wiggle', {
 *   initial: { rotate: 0 },
 *   hover: { rotate: [0, -10, 10, -10, 10, 0] },
 *   transition: { duration: 0.5 }
 * });
 *
 * // Use with an icon
 * <Icon motionPreset={wiggle} />
 * ```
 */
export function defineMotionPreset(
  name: string,
  options: CustomMotionPresetOptions
): CustomMotionPreset {
  const variants: Variants = {
    initial: (options.initial ?? {}) as Variant,
    hover: options.hover as Variant
  };

  if (options.tap) {
    variants.tap = options.tap as Variant;
  }

  const defaultTransition: Transition = {
    type: 'spring',
    stiffness: 400,
    damping: 15
  };

  return {
    name,
    variants,
    transition: options.transition ?? defaultTransition
  };
}

/**
 * Compose multiple motion presets into one
 *
 * Combines multiple animation configurations to create complex animations.
 * Later presets override earlier ones for the same properties.
 *
 * @param presets - Array of motion presets to compose
 * @returns A combined motion preset
 *
 * @example
 * ```tsx
 * const scaleAndRotate = composeMotionPresets([
 *   defineMotionPreset('scale', { hover: { scale: 1.1 } }),
 *   defineMotionPreset('rotate', { hover: { rotate: 15 } })
 * ]);
 *
 * // Results in { hover: { scale: 1.1, rotate: 15 } }
 * ```
 */
export function composeMotionPresets(
  presets: CustomMotionPreset[]
): CustomMotionPreset {
  const combinedInitial: Record<string, unknown> = {};
  const combinedHover: Record<string, unknown> = {};
  const combinedTap: Record<string, unknown> = {};
  let combinedTransition: Transition = {};

  for (const preset of presets) {
    const initial = preset.variants.initial as Record<string, unknown> | undefined;
    const hover = preset.variants.hover as Record<string, unknown> | undefined;
    const tap = preset.variants.tap as Record<string, unknown> | undefined;

    if (initial) {
      Object.assign(combinedInitial, initial);
    }
    if (hover) {
      Object.assign(combinedHover, hover);
    }
    if (tap) {
      Object.assign(combinedTap, tap);
    }
    if (preset.transition) {
      combinedTransition = { ...combinedTransition, ...preset.transition };
    }
  }

  const variants: Variants = {
    initial: combinedInitial as Variant,
    hover: combinedHover as Variant
  };

  if (Object.keys(combinedTap).length > 0) {
    variants.tap = combinedTap as Variant;
  }

  return {
    name: 'composed',
    variants,
    transition: combinedTransition
  };
}

/**
 * Extend an existing motion preset with additional properties
 *
 * @param basePreset - The preset to extend
 * @param overrides - Properties to add or override
 * @returns A new motion preset with the combined properties
 *
 * @example
 * ```tsx
 * import { motionPresets } from 'motionicon';
 *
 * const customScale = extendMotionPreset(
 *   { name: 'scale', ...motionPresets.scale },
 *   { hover: { scale: 1.3 }, transition: { duration: 0.5 } }
 * );
 * ```
 */
export function extendMotionPreset(
  basePreset: CustomMotionPreset,
  overrides: Partial<CustomMotionPresetOptions>
): CustomMotionPreset {
  const baseInitial = basePreset.variants.initial as Record<string, unknown> | undefined;
  const baseHover = basePreset.variants.hover as Record<string, unknown> | undefined;
  const baseTap = basePreset.variants.tap as Record<string, unknown> | undefined;

  const variants: Variants = {
    initial: { ...baseInitial, ...overrides.initial } as Variant,
    hover: { ...baseHover, ...overrides.hover } as Variant
  };

  if (baseTap || overrides.tap) {
    variants.tap = { ...baseTap, ...overrides.tap } as Variant;
  }

  return {
    name: `${basePreset.name}-extended`,
    variants,
    transition: overrides.transition ?? basePreset.transition
  };
}

/**
 * Pre-built custom presets for common effects
 */
export const customPresets = {
  /**
   * Wiggle animation - rotates back and forth
   */
  wiggle: defineMotionPreset('wiggle', {
    initial: { rotate: 0 },
    hover: { rotate: [0, -12, 12, -8, 8, -4, 4, 0] },
    transition: { duration: 0.6, ease: 'easeInOut' }
  }),

  /**
   * Jello animation - elastic squish effect
   */
  jello: defineMotionPreset('jello', {
    initial: { scaleX: 1, scaleY: 1 },
    hover: {
      scaleX: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
      scaleY: [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1]
    },
    transition: { duration: 0.6 }
  }),

  /**
   * Rubberband animation - stretchy bounce
   */
  rubberband: defineMotionPreset('rubberband', {
    initial: { scaleX: 1, scaleY: 1 },
    hover: {
      scaleX: [1, 1.2, 0.9, 1.1, 0.95, 1],
      scaleY: [1, 0.8, 1.1, 0.9, 1.05, 1]
    },
    transition: { duration: 0.5, ease: 'easeOut' }
  }),

  /**
   * Heartbeat animation - pulsing effect
   */
  heartbeat: defineMotionPreset('heartbeat', {
    initial: { scale: 1 },
    hover: { scale: [1, 1.15, 1, 1.1, 1] },
    transition: { duration: 0.8, times: [0, 0.14, 0.28, 0.42, 1] }
  }),

  /**
   * Swing animation - pendulum effect
   */
  swing: defineMotionPreset('swing', {
    initial: { rotate: 0 },
    hover: { rotate: [0, 15, -10, 5, -5, 0] },
    transition: { duration: 0.6 }
  }),

  /**
   * Tada animation - attention-grabbing effect
   */
  tada: defineMotionPreset('tada', {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: [1, 0.9, 0.9, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
      rotate: [0, -3, -3, 3, -3, 3, -3, 3, -3, 0]
    },
    transition: { duration: 0.8 }
  }),

  /**
   * Float animation - gentle up and down motion
   */
  float: defineMotionPreset('float', {
    initial: { y: 0 },
    hover: { y: [0, -8, 0] },
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
  }),

  /**
   * Glow animation - scale with opacity pulse
   */
  glow: defineMotionPreset('glow', {
    initial: { scale: 1, opacity: 1 },
    hover: {
      scale: [1, 1.1, 1.05],
      opacity: [1, 0.8, 1]
    },
    transition: { duration: 0.3 }
  })
} as const;

export type CustomPresetName = keyof typeof customPresets;
