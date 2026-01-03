import type { IconData, IconConfig, ExportFormat } from '../types/icon';
import { renderIconSvg } from './svgRenderer';

export function generateCode(icon: IconData, config: IconConfig, format: ExportFormat): string {
  switch (format) {
    case 'svg':
      return renderIconSvg(icon, config);

    case 'react':
      return generateReactComponent(icon, config);

    case 'vue':
      return generateVueComponent(icon, config);

    default:
      return '';
  }
}

function generateReactComponent(icon: IconData, config: IconConfig): string {
  const componentName = icon.name.replace(/[^a-zA-Z0-9]/g, '');
  const elements = icon.elements.map(el => {
    const attrs = Object.entries(el.attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');
    return `<${el.type} ${attrs} />`;
  }).join('\n      ');

  return `export const ${componentName} = () => (
  <svg
    viewBox="${icon.viewBox}"
    width="${config.size}"
    height="${config.size}"
    fill="none"
    stroke="${config.color}"
    strokeWidth="${config.strokeWidth}"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    ${elements}
  </svg>
);`;
}

function generateVueComponent(icon: IconData, config: IconConfig): string {
  const componentName = icon.name.replace(/[^a-zA-Z0-9]/g, '');
  const elements = icon.elements.map(el => {
    const attrs = Object.entries(el.attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');
    return `<${el.type} ${attrs} />`;
  }).join('\n      ');

  return `<template>
  <svg
    viewBox="${icon.viewBox}"
    width="${config.size}"
    height="${config.size}"
    fill="none"
    stroke="${config.color}"
    :stroke-width="${config.strokeWidth}"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    ${elements}
  </svg>
</template>

<script>
export default {
  name: '${componentName}'
}
</script>`;
}
