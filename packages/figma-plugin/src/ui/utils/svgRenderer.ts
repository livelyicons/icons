import type { IconData, IconConfig, IconElement } from '../types/icon';

interface StrokeConfig {
  stroke: string;
  strokeWidth: number;
}

/**
 * Render a single SVG element
 * @param element - The icon element to render
 * @param strokeConfig - Optional stroke config. When provided, adds explicit stroke attributes
 *                       to each element (needed for Figma). When omitted, relies on CSS
 *                       inheritance from parent SVG (works for browser preview).
 */
export function renderElement(element: IconElement, strokeConfig?: StrokeConfig): string {
  // Only add explicit stroke attrs when config is provided (for Figma insertion)
  const strokeAttrs = strokeConfig
    ? `fill="none" stroke="${strokeConfig.stroke}" stroke-width="${strokeConfig.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"`
    : '';

  switch (element.type) {
    case 'path':
      return `<path d="${element.attributes.d}" ${strokeAttrs}/>`;

    case 'circle':
      return `<circle cx="${element.attributes.cx}" cy="${element.attributes.cy}" r="${element.attributes.r}" ${strokeAttrs}/>`;

    case 'rect': {
      const rx = element.attributes.rx ? `rx="${element.attributes.rx}"` : '';
      return `<rect x="${element.attributes.x}" y="${element.attributes.y}" width="${element.attributes.width}" height="${element.attributes.height}" ${rx} ${strokeAttrs}/>`;
    }

    case 'ellipse':
      return `<ellipse cx="${element.attributes.cx}" cy="${element.attributes.cy}" rx="${element.attributes.rx}" ry="${element.attributes.ry}" ${strokeAttrs}/>`;

    case 'line':
      return `<line x1="${element.attributes.x1}" y1="${element.attributes.y1}" x2="${element.attributes.x2}" y2="${element.attributes.y2}" ${strokeAttrs}/>`;

    case 'polyline':
      return `<polyline points="${element.attributes.points}" ${strokeAttrs}/>`;

    case 'polygon':
      return `<polygon points="${element.attributes.points}" ${strokeAttrs}/>`;

    default:
      return '';
  }
}

export function renderIconSvg(icon: IconData, config: IconConfig): string {
  const strokeConfig: StrokeConfig = {
    stroke: config.color,
    strokeWidth: config.strokeWidth
  };
  const elements = icon.elements.map(el => renderElement(el, strokeConfig)).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${icon.viewBox}" width="${config.size}" height="${config.size}">${elements}</svg>`;
}

export function renderIconSvgAsDataUrl(icon: IconData, config: IconConfig): string {
  const svg = renderIconSvg(icon, config);
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
