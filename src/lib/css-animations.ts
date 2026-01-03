/**
 * CSS-only animation fallback system
 *
 * Provides CSS keyframe animations that mirror the motion types.
 * Use this for projects that don't want the Motion dependency.
 */

/**
 * CSS animation keyframes for each motion type
 */
export const cssKeyframes = `
/* MotionIcon CSS Animations */

/* Scale animation */
@keyframes motionicon-scale {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}

/* Rotate animation */
@keyframes motionicon-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(180deg); }
}

/* Translate animation */
@keyframes motionicon-translate {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(2px, -2px); }
}

/* Shake animation */
@keyframes motionicon-shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-3px); }
  40% { transform: translateX(3px); }
  60% { transform: translateX(-3px); }
  80% { transform: translateX(3px); }
}

/* Pulse animation */
@keyframes motionicon-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

/* Bounce animation */
@keyframes motionicon-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

/* Draw animation (opacity/scale fallback) */
@keyframes motionicon-draw {
  0% { opacity: 0.4; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}

/* Spin animation */
@keyframes motionicon-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Fade animation */
@keyframes motionicon-fade {
  0% { opacity: 0.6; }
  100% { opacity: 1; }
}

/* Pop animation */
@keyframes motionicon-pop {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.15) rotate(5deg); }
}

/* Wiggle animation (custom) */
@keyframes motionicon-wiggle {
  0%, 100% { transform: rotate(0deg); }
  15% { transform: rotate(-12deg); }
  30% { transform: rotate(12deg); }
  45% { transform: rotate(-8deg); }
  60% { transform: rotate(8deg); }
  75% { transform: rotate(-4deg); }
  90% { transform: rotate(4deg); }
}

/* Heartbeat animation (custom) */
@keyframes motionicon-heartbeat {
  0%, 100% { transform: scale(1); }
  14% { transform: scale(1.15); }
  28% { transform: scale(1); }
  42% { transform: scale(1.1); }
}

/* Swing animation (custom) */
@keyframes motionicon-swing {
  0%, 100% { transform: rotate(0deg); }
  20% { transform: rotate(15deg); }
  40% { transform: rotate(-10deg); }
  60% { transform: rotate(5deg); }
  80% { transform: rotate(-5deg); }
}

/* Float animation (custom) */
@keyframes motionicon-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* Path drawing animation for SVG strokes */
@keyframes motionicon-draw-path {
  0% { stroke-dashoffset: var(--path-length, 100); opacity: 0.3; }
  100% { stroke-dashoffset: 0; opacity: 1; }
}

/* Path drawing loop animation */
@keyframes motionicon-draw-path-loop {
  0% { stroke-dashoffset: var(--path-length, 100); opacity: 0.5; }
  40% { stroke-dashoffset: 0; opacity: 1; }
  60% { stroke-dashoffset: 0; opacity: 1; }
  100% { stroke-dashoffset: var(--path-length, 100); opacity: 0.5; }
}
`;

/**
 * CSS classes for each motion type
 */
export const cssAnimationClasses = `
/* MotionIcon CSS Animation Classes */

/* Base hover animation behavior */
.motionicon-animated {
  transition: transform 0.2s ease;
}

/* Scale on hover */
.motionicon-scale:hover {
  animation: motionicon-scale 0.3s ease forwards;
}

/* Rotate on hover */
.motionicon-rotate:hover {
  animation: motionicon-rotate 0.4s ease forwards;
}

/* Translate on hover */
.motionicon-translate:hover {
  animation: motionicon-translate 0.3s ease forwards;
}

/* Shake on hover */
.motionicon-shake:hover {
  animation: motionicon-shake 0.4s ease;
}

/* Pulse loop */
.motionicon-pulse {
  animation: motionicon-pulse 0.6s ease-in-out infinite;
}

/* Bounce on hover */
.motionicon-bounce:hover {
  animation: motionicon-bounce 0.4s ease;
}

/* Draw on hover */
.motionicon-draw:hover {
  animation: motionicon-draw 0.5s ease forwards;
}

/* Spin continuous */
.motionicon-spin {
  animation: motionicon-spin 0.8s linear infinite;
}

/* Fade on hover */
.motionicon-fade {
  opacity: 0.6;
  transition: opacity 0.2s ease;
}
.motionicon-fade:hover {
  opacity: 1;
}

/* Pop on hover */
.motionicon-pop:hover {
  animation: motionicon-pop 0.3s ease forwards;
}

/* Wiggle on hover */
.motionicon-wiggle:hover {
  animation: motionicon-wiggle 0.6s ease;
}

/* Heartbeat on hover */
.motionicon-heartbeat:hover {
  animation: motionicon-heartbeat 0.8s ease;
}

/* Swing on hover */
.motionicon-swing:hover {
  animation: motionicon-swing 0.6s ease;
}

/* Float continuous */
.motionicon-float {
  animation: motionicon-float 1.5s ease-in-out infinite;
}

/* Trigger modes */
.motionicon-trigger-hover:hover {
  animation-play-state: running;
}

.motionicon-trigger-loop {
  animation-iteration-count: infinite;
}

.motionicon-trigger-mount {
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

/* SVG path drawing */
.motionicon-draw-path {
  stroke-dasharray: var(--path-length, 100);
  stroke-dashoffset: var(--path-length, 100);
}

.motionicon-draw-path-hover:hover .motionicon-draw-path {
  animation: motionicon-draw-path 1.5s ease-in-out forwards;
}

.motionicon-draw-path-loop .motionicon-draw-path {
  animation: motionicon-draw-path-loop 3s ease-in-out infinite;
}

.motionicon-draw-path-mount .motionicon-draw-path {
  animation: motionicon-draw-path 1.5s ease-in-out forwards;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .motionicon-animated,
  .motionicon-scale,
  .motionicon-rotate,
  .motionicon-translate,
  .motionicon-shake,
  .motionicon-pulse,
  .motionicon-bounce,
  .motionicon-draw,
  .motionicon-spin,
  .motionicon-fade,
  .motionicon-pop,
  .motionicon-wiggle,
  .motionicon-heartbeat,
  .motionicon-swing,
  .motionicon-float {
    animation: none !important;
    transition: none !important;
  }
}
`;

/**
 * Complete CSS stylesheet with keyframes and classes
 */
export const cssStylesheet = `${cssKeyframes}\n${cssAnimationClasses}`;

/**
 * Map of motion type to CSS class name
 */
export const motionTypeToCssClass: Record<string, string> = {
  scale: 'motionicon-scale',
  rotate: 'motionicon-rotate',
  translate: 'motionicon-translate',
  shake: 'motionicon-shake',
  pulse: 'motionicon-pulse',
  bounce: 'motionicon-bounce',
  draw: 'motionicon-draw',
  spin: 'motionicon-spin',
  fade: 'motionicon-fade',
  pop: 'motionicon-pop',
  none: '',
  // Custom presets
  wiggle: 'motionicon-wiggle',
  heartbeat: 'motionicon-heartbeat',
  swing: 'motionicon-swing',
  float: 'motionicon-float'
};

/**
 * Map of trigger type to CSS class modifier
 */
export const triggerTypeToCssClass: Record<string, string> = {
  hover: 'motionicon-trigger-hover',
  loop: 'motionicon-trigger-loop',
  mount: 'motionicon-trigger-mount',
  inView: 'motionicon-trigger-mount' // Falls back to mount for CSS
};

/**
 * Get CSS classes for an icon based on motion type and trigger
 *
 * @param motionType - The type of animation
 * @param trigger - When to trigger the animation
 * @returns Space-separated CSS class string
 */
export function getCssAnimationClasses(
  motionType: string = 'scale',
  trigger: string = 'hover'
): string {
  const classes: string[] = ['motionicon-animated'];

  const motionClass = motionTypeToCssClass[motionType];
  if (motionClass) {
    classes.push(motionClass);
  }

  const triggerClass = triggerTypeToCssClass[trigger];
  if (triggerClass) {
    classes.push(triggerClass);
  }

  // Special handling for draw animation with different triggers
  if (motionType === 'draw') {
    if (trigger === 'hover') {
      classes.push('motionicon-draw-path-hover');
    } else if (trigger === 'loop') {
      classes.push('motionicon-draw-path-loop');
    } else {
      classes.push('motionicon-draw-path-mount');
    }
  }

  return classes.join(' ');
}

/**
 * Inject CSS animations into the document head
 *
 * Call this once at app initialization to enable CSS animations.
 * Only runs in browser environment.
 *
 * @example
 * ```tsx
 * // In your app entry point
 * import { injectCssAnimations } from 'motionicon/css';
 *
 * injectCssAnimations();
 * ```
 */
export function injectCssAnimations(): void {
  if (typeof document === 'undefined') {
    return;
  }

  // Check if already injected
  const existingStyle = document.getElementById('motionicon-css-animations');
  if (existingStyle) {
    return;
  }

  const styleElement = document.createElement('style');
  styleElement.id = 'motionicon-css-animations';
  styleElement.textContent = cssStylesheet;
  document.head.appendChild(styleElement);
}

/**
 * Remove injected CSS animations from the document
 */
export function removeCssAnimations(): void {
  if (typeof document === 'undefined') {
    return;
  }

  const styleElement = document.getElementById('motionicon-css-animations');
  if (styleElement) {
    styleElement.remove();
  }
}
