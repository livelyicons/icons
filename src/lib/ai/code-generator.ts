/**
 * Component code generators for multiple frameworks.
 * Transforms validated SVG + animation config into framework-specific code.
 */

interface CodeGenOptions {
  name: string;
  svgCode: string;
  animation: string;
  trigger: string;
  duration: number;
}

/**
 * Generate a React TSX component with Motion animation.
 */
export function generateReactComponent(opts: CodeGenOptions): string {
  const { name, svgCode, animation, trigger, duration } = opts;
  const componentName = toPascalCase(name);

  const svgContent = extractSvgInner(svgCode);
  const svgAttrs = extractSvgAttributes(svgCode);

  return `'use client';

import { type SVGProps, type RefObject } from 'react';
import { motion, useAnimation } from 'motion/react';
import type { Variants } from 'motion/react';

const variants: Variants = ${generateVariantsObject(animation, duration)};

const ${componentName} = (props: SVGProps<SVGSVGElement> & { ref?: RefObject<SVGSVGElement> }) => {
  const controls = useAnimation();

  const handleTrigger = () => {
    controls.start('animate');
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      ${svgAttrs}
      variants={variants}
      initial="initial"
      ${getTriggerProps(trigger)}
      animate={controls}
      onHoverStart={${trigger === 'hover' ? 'handleTrigger' : 'undefined'}}
      {...props}
    >
${indentSvgContent(svgContent, 6)}
    </motion.svg>
  );
};

${componentName}.displayName = '${componentName}';

export default ${componentName};
`;
}

/**
 * Generate a Vue SFC component.
 */
export function generateVueComponent(opts: CodeGenOptions): string {
  const { name, svgCode, animation, trigger, duration } = opts;
  const componentName = toPascalCase(name);
  const svgContent = extractSvgInner(svgCode);
  const svgAttrs = extractSvgAttributes(svgCode);
  const cssAnimation = generateCssAnimation(animation, duration);

  return `<script setup lang="ts">
defineOptions({ name: '${componentName}' });
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    ${svgAttrs}
    class="${componentName.toLowerCase()}-icon"
    ${trigger === 'hover' ? '@mouseenter="$el.classList.add(\'animate\')" @mouseleave="$el.classList.remove(\'animate\')"' : ''}
  >
${indentSvgContent(svgContent, 4)}
  </svg>
</template>

<style scoped>
${cssAnimation}
</style>
`;
}

/**
 * Generate a vanilla HTML/CSS/JS snippet.
 */
export function generateHtmlSnippet(opts: CodeGenOptions): string {
  const { svgCode, animation, trigger, duration } = opts;
  const cssAnimation = generateCssAnimation(animation, duration);

  return `<!-- Lively Icons: Generated Icon -->
<div class="lively-icon" ${trigger === 'hover' ? 'onmouseenter="this.classList.add(\'animate\')" onmouseleave="this.classList.remove(\'animate\')"' : ''}>
  ${svgCode}
</div>

<style>
${cssAnimation}
</style>
`;
}

/**
 * Generate framework-specific code based on the chosen export format.
 */
export function generateComponentCode(
  format: 'react' | 'vue' | 'svg' | 'html',
  opts: CodeGenOptions,
): string {
  switch (format) {
    case 'react':
      return generateReactComponent(opts);
    case 'vue':
      return generateVueComponent(opts);
    case 'html':
      return generateHtmlSnippet(opts);
    case 'svg':
    default:
      return opts.svgCode;
  }
}

// ─────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────

function toPascalCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function extractSvgInner(svg: string): string {
  const match = svg.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
  return match?.[1]?.trim() ?? '';
}

function extractSvgAttributes(svg: string): string {
  const match = svg.match(/<svg([^>]*)>/i);
  if (!match) return 'viewBox="0 0 24 24" fill="none"';

  const attrs = match[1]
    .replace(/xmlns\s*=\s*"[^"]*"/g, '')
    .replace(/class\s*=\s*"[^"]*"/g, '')
    .replace(/style\s*=\s*"[^"]*"/g, '')
    .replace(/width\s*=\s*"[^"]*"/g, '')
    .replace(/height\s*=\s*"[^"]*"/g, '')
    .trim();

  return attrs || 'viewBox="0 0 24 24" fill="none"';
}

function indentSvgContent(content: string, spaces: number): string {
  const indent = ' '.repeat(spaces);
  return content
    .split('\n')
    .map((line) => `${indent}${line.trim()}`)
    .filter((line) => line.trim())
    .join('\n');
}

function generateVariantsObject(animation: string, duration: number): string {
  const d = duration;
  const variants: Record<string, Record<string, Record<string, unknown>>> = {
    scale: {
      initial: { scale: 1 },
      animate: { scale: [1, 1.2, 1], transition: { duration: d } },
    },
    rotate: {
      initial: { rotate: 0 },
      animate: { rotate: [0, 15, -15, 0], transition: { duration: d } },
    },
    translate: {
      initial: { x: 0, y: 0 },
      animate: { x: [0, -2, 2, 0], y: [0, -2, 0], transition: { duration: d } },
    },
    shake: {
      initial: { x: 0 },
      animate: { x: [0, -4, 4, -4, 4, 0], transition: { duration: d } },
    },
    pulse: {
      initial: { scale: 1, opacity: 1 },
      animate: { scale: [1, 1.1, 1], opacity: [1, 0.8, 1], transition: { duration: d } },
    },
    bounce: {
      initial: { y: 0 },
      animate: { y: [0, -6, 0], transition: { duration: d, ease: 'easeInOut' } },
    },
    draw: {
      initial: { pathLength: 0 },
      animate: { pathLength: 1, transition: { duration: d, ease: 'easeInOut' } },
    },
    spin: {
      initial: { rotate: 0 },
      animate: { rotate: 360, transition: { duration: d, ease: 'linear' } },
    },
    ring: {
      initial: { rotate: 0 },
      animate: { rotate: [0, 15, -15, 10, -10, 5, 0], transition: { duration: d } },
    },
    wiggle: {
      initial: { rotate: 0 },
      animate: { rotate: [0, -8, 8, -5, 5, 0], transition: { duration: d } },
    },
    heartbeat: {
      initial: { scale: 1 },
      animate: { scale: [1, 1.15, 1, 1.1, 1], transition: { duration: d } },
    },
    swing: {
      initial: { rotate: 0 },
      animate: { rotate: [0, 12, -12, 6, -6, 0], transition: { duration: d } },
    },
    float: {
      initial: { y: 0 },
      animate: { y: [0, -4, 0], transition: { duration: d, repeat: Infinity, ease: 'easeInOut' } },
    },
    none: {
      initial: {},
      animate: {},
    },
  };

  return JSON.stringify(variants[animation] ?? variants.scale, null, 2);
}

function getTriggerProps(trigger: string): string {
  switch (trigger) {
    case 'hover':
      return '';
    case 'loop':
      return 'animate="animate" transition={{ repeat: Infinity }}';
    case 'mount':
      return 'animate="animate"';
    case 'inView':
      return 'whileInView="animate" viewport={{ once: true }}';
    default:
      return '';
  }
}

function generateCssAnimation(animation: string, duration: number): string {
  const keyframes: Record<string, string> = {
    scale: `@keyframes lively-scale {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}`,
    rotate: `@keyframes lively-rotate {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(15deg); }
  75% { transform: rotate(-15deg); }
}`,
    shake: `@keyframes lively-shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-4px); }
  40% { transform: translateX(4px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}`,
    pulse: `@keyframes lively-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
}`,
    bounce: `@keyframes lively-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}`,
    spin: `@keyframes lively-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`,
    heartbeat: `@keyframes lively-heartbeat {
  0%, 100% { transform: scale(1); }
  20% { transform: scale(1.15); }
  40% { transform: scale(1); }
  60% { transform: scale(1.1); }
}`,
    float: `@keyframes lively-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}`,
  };

  const kf = keyframes[animation] ?? keyframes.scale;
  const animName = `lively-${animation || 'scale'}`;

  return `.lively-icon svg {
  transition: transform ${duration}s ease;
}

.lively-icon.animate svg,
.lively-icon:hover svg {
  animation: ${animName} ${duration}s ease;
}

${kf}`;
}
