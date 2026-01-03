/**
 * MotionIcons - Main library entry point
 *
 * A comprehensive library of animated icons powered by Motion for React.
 * Features 350+ icons with 9 animation types and 4 trigger modes.
 *
 * @packageDocumentation
 *
 * @example Basic usage
 * ```tsx
 * import { Heart, Settings, Bell } from 'motionicon';
 *
 * function App() {
 *   return (
 *     <div>
 *       <Heart motionType="pulse" trigger="hover" />
 *       <Settings motionType="rotate" />
 *       <Bell motionType="shake" />
 *     </div>
 *   );
 * }
 * ```
 *
 * @example Using IconProvider for global config
 * ```tsx
 * import { IconProvider, Heart } from 'motionicon';
 *
 * function App() {
 *   return (
 *     <IconProvider config={{ defaultSize: 32, animated: true }}>
 *       <Heart />
 *     </IconProvider>
 *   );
 * }
 * ```
 *
 * @example Custom motion presets
 * ```tsx
 * import { defineMotionPreset, Heart } from 'motionicon';
 *
 * const wiggle = defineMotionPreset('wiggle', {
 *   hover: { rotate: [0, -10, 10, -10, 10, 0] },
 *   transition: { duration: 0.5 }
 * });
 *
 * <Heart motionPreset={wiggle} />
 * ```
 *
 * @example CSS-only animations (no motion dependency)
 * ```tsx
 * import { injectCssAnimations } from 'motionicon';
 * import { StaticHeart } from 'motionicon/static';
 *
 * injectCssAnimations();
 * <StaticHeart animationClass="motionicon-pulse" />
 * ```
 *
 * @example Type-safe icon names
 * ```tsx
 * import type { IconName, MotionType, TriggerType } from 'motionicon';
 * import { isIconName } from 'motionicon';
 *
 * function isValidIcon(name: string): name is IconName {
 *   return isIconName(name);
 * }
 * ```
 */

// Context
export { IconProvider, useIconContext } from './context';
export type { IconProviderProps } from './context';

// Hooks
export { useIconAnimation, useIconConfig } from './hooks';
export type { UseIconAnimationReturn, UseIconConfigReturn } from './hooks';

// Types - Core
export type {
  IconProps,
  IconConfig,
  AnimationVariants,
  TransitionConfig,
  AnimationPreset,
  MotionType,
  TriggerType,
  AnimationMode,
  CustomMotionPresetConfig
} from './lib';

// Types - Icon Names (auto-generated)
export type { IconName, IconNameKebab } from './lib';
export {
  ICON_NAMES,
  ICON_NAMES_KEBAB,
  ICON_COUNT,
  ICON_NAME_MAP,
  isIconName,
  isIconNameKebab
} from './lib';

// Animations
export { animations } from './lib';
export type { AnimationName } from './lib';

// Individual animation presets
export {
  draw,
  rotate,
  pulse,
  bounce,
  translate,
  stagger,
  shake,
  spin,
  fade,
  pop
} from './lib';

// Motion presets
export { motionPresets, getMotionPreset, motionTypeList, easeSmooth } from './lib';
export type { MotionPreset } from './lib';

// Custom motion preset system
export {
  defineMotionPreset,
  composeMotionPresets,
  extendMotionPreset,
  customPresets
} from './lib';
export type {
  CustomMotionPreset,
  CustomMotionPresetOptions,
  CustomPresetName
} from './lib';

// CSS animations fallback
export {
  cssKeyframes,
  cssAnimationClasses,
  cssStylesheet,
  motionTypeToCssClass,
  triggerTypeToCssClass,
  getCssAnimationClasses,
  injectCssAnimations,
  removeCssAnimations
} from './lib';

// Lazy-loaded motion components for bundle optimization
export {
  LazyMotionIcon,
  LazyMotionPathElement,
  isMotionLoaded,
  preloadMotion
} from './lib';
export type { LazyMotionIconProps, LazyMotionPathProps } from './lib';

// Utilities
export { cn, mergeConfig, isDefined, withDefault } from './lib';

// Icons - export all 350 icons
export * from './icons';

// Static icons (RSC-compatible) - re-exported for convenience
// For tree-shaking, import directly from 'motionicon/static'
export * from './static';
