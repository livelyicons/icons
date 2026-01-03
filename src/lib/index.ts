/**
 * Library utilities barrel export
 *
 * Exports types, animations, and utility functions
 */

// Types
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
} from './types';

// Icon name types (auto-generated)
export type { IconName, IconNameKebab } from './icon-names';
export {
  ICON_NAMES,
  ICON_NAMES_KEBAB,
  ICON_COUNT,
  ICON_NAME_MAP,
  isIconName,
  isIconNameKebab
} from './icon-names';

// Animations
export { animations } from './animations';
export type { AnimationName } from './animations';

// Individual animation presets for direct import
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
} from './animations';

// Motion presets
export { motionPresets, getMotionPreset, motionTypeList, easeSmooth } from './motion-presets';
export type { MotionPreset } from './motion-presets';

// Custom motion preset system
export {
  defineMotionPreset,
  composeMotionPresets,
  extendMotionPreset,
  customPresets
} from './define-motion-preset';
export type {
  CustomMotionPreset,
  CustomMotionPresetOptions,
  CustomPresetName
} from './define-motion-preset';

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
} from './css-animations';

// Lazy-loaded motion components
export {
  LazyMotionIcon,
  LazyMotionPathElement,
  isMotionLoaded,
  preloadMotion
} from './lazy-motion';
export type { LazyMotionIconProps, LazyMotionPathProps } from './lazy-motion';

// Utilities
export { cn, mergeConfig, isDefined, withDefault } from './utils';
