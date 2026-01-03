/**
 * Extract icon data from TSX component files
 *
 * Parses motion.svg elements and extracts SVG path data, shapes, and attributes
 */

import * as fs from 'fs'
import * as path from 'path'
import type { IconParseResult, SVGElement } from './types'

/**
 * Convert kebab-case to PascalCase
 */
function kebabToPascal(str: string): string {
  return str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

/**
 * Extract viewBox from SVG
 */
function extractViewBox(content: string): string {
  const viewBoxMatch = content.match(/viewBox=["']([^"']+)["']/)
  return viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24'
}

/**
 * Extract attributes from an element string
 */
function extractAttributes(elementStr: string, tagName: string): Record<string, string> {
  const attributes: Record<string, string> = {}

  // Remove the tag name and closing bracket/slash
  const attrStr = elementStr
    .replace(new RegExp(`<motion\\.${tagName}\\s*`), '')
    .replace(/\s*\/?>.*$/, '')

  // Match attribute patterns: name="value" or name={value}
  const attrRegex = /(\w+)=(?:["']([^"']*)["']|{([^}]*)})/g
  let match

  while ((match = attrRegex.exec(attrStr)) !== null) {
    const attrName = match[1]
    const attrValue = match[2] || match[3]

    // Skip React/Motion-specific props
    if (
      attrName === 'className' ||
      attrName === 'pathLength' ||
      attrName === 'initial' ||
      attrName === 'animate' ||
      attrName === 'transition' ||
      attrName === 'variants'
    ) {
      continue
    }

    // Clean up the value (remove quotes and braces)
    let cleanValue = attrValue.trim()
    if (cleanValue.startsWith('"') && cleanValue.endsWith('"')) {
      cleanValue = cleanValue.slice(1, -1)
    }

    attributes[attrName] = cleanValue
  }

  return attributes
}

/**
 * Extract motion.path elements
 */
function extractPaths(content: string): SVGElement[] {
  const paths: SVGElement[] = []
  const pathRegex = /<motion\.path\s+[^>]*\/>/g
  const matches = content.matchAll(pathRegex)

  for (const match of matches) {
    const elementStr = match[0]
    const attributes = extractAttributes(elementStr, 'path')

    if (attributes.d) {
      paths.push({ type: 'path', attributes })
    }
  }

  return paths
}

/**
 * Extract motion.circle elements
 */
function extractCircles(content: string): SVGElement[] {
  const circles: SVGElement[] = []
  const circleRegex = /<motion\.circle\s+[^>]*\/>/g
  const matches = content.matchAll(circleRegex)

  for (const match of matches) {
    const elementStr = match[0]
    const attributes = extractAttributes(elementStr, 'circle')

    if (attributes.cx && attributes.cy && attributes.r) {
      circles.push({ type: 'circle', attributes })
    }
  }

  return circles
}

/**
 * Extract motion.line elements
 */
function extractLines(content: string): SVGElement[] {
  const lines: SVGElement[] = []
  const lineRegex = /<motion\.line\s+[^>]*\/>/g
  const matches = content.matchAll(lineRegex)

  for (const match of matches) {
    const elementStr = match[0]
    const attributes = extractAttributes(elementStr, 'line')

    if (attributes.x1 && attributes.y1 && attributes.x2 && attributes.y2) {
      lines.push({ type: 'line', attributes })
    }
  }

  return lines
}

/**
 * Extract motion.polyline elements
 */
function extractPolylines(content: string): SVGElement[] {
  const polylines: SVGElement[] = []
  const polylineRegex = /<motion\.polyline\s+[^>]*\/>/g
  const matches = content.matchAll(polylineRegex)

  for (const match of matches) {
    const elementStr = match[0]
    const attributes = extractAttributes(elementStr, 'polyline')

    if (attributes.points) {
      polylines.push({ type: 'polyline', attributes })
    }
  }

  return polylines
}

/**
 * Extract motion.rect elements
 */
function extractRects(content: string): SVGElement[] {
  const rects: SVGElement[] = []
  const rectRegex = /<motion\.rect\s+[^>]*\/>/g
  const matches = content.matchAll(rectRegex)

  for (const match of matches) {
    const elementStr = match[0]
    const attributes = extractAttributes(elementStr, 'rect')

    if (attributes.width && attributes.height) {
      rects.push({ type: 'rect', attributes })
    }
  }

  return rects
}

/**
 * Extract motion.ellipse elements
 */
function extractEllipses(content: string): SVGElement[] {
  const ellipses: SVGElement[] = []
  const ellipseRegex = /<motion\.ellipse\s+[^>]*\/>/g
  const matches = content.matchAll(ellipseRegex)

  for (const match of matches) {
    const elementStr = match[0]
    const attributes = extractAttributes(elementStr, 'ellipse')

    if (attributes.cx && attributes.cy && attributes.rx && attributes.ry) {
      ellipses.push({ type: 'ellipse', attributes })
    }
  }

  return ellipses
}

/**
 * Extract motion.polygon elements
 */
function extractPolygons(content: string): SVGElement[] {
  const polygons: SVGElement[] = []
  const polygonRegex = /<motion\.polygon\s+[^>]*\/>/g
  const matches = content.matchAll(polygonRegex)

  for (const match of matches) {
    const elementStr = match[0]
    const attributes = extractAttributes(elementStr, 'polygon')

    if (attributes.points) {
      polygons.push({ type: 'polygon', attributes })
    }
  }

  return polygons
}

/**
 * Parse a single icon file
 */
export function parseIconFile(filePath: string): IconParseResult | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const fileName = path.basename(filePath, '.tsx')
    const name = kebabToPascal(fileName)

    // Extract viewBox
    const viewBox = extractViewBox(content)

    // Extract all SVG elements
    const elements: SVGElement[] = [
      ...extractPaths(content),
      ...extractCircles(content),
      ...extractLines(content),
      ...extractPolylines(content),
      ...extractRects(content),
      ...extractEllipses(content),
      ...extractPolygons(content),
    ]

    if (elements.length === 0) {
      console.warn(`Warning: No SVG elements found in ${fileName}`)
      return null
    }

    return {
      name,
      slug: fileName,
      viewBox,
      elements,
    }
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error)
    return null
  }
}

/**
 * Parse all icon files in a directory
 */
export function parseAllIcons(iconsDir: string): IconParseResult[] {
  const results: IconParseResult[] = []

  try {
    const files = fs.readdirSync(iconsDir)

    for (const file of files) {
      if (file.endsWith('.tsx') && file !== 'index.tsx') {
        const filePath = path.join(iconsDir, file)
        const result = parseIconFile(filePath)

        if (result) {
          results.push(result)
        }
      }
    }
  } catch (error) {
    console.error('Error reading icons directory:', error)
  }

  return results
}

/**
 * Get icon count by reading directory
 */
export function getIconCount(iconsDir: string): number {
  try {
    const files = fs.readdirSync(iconsDir)
    return files.filter(file => file.endsWith('.tsx') && file !== 'index.tsx').length
  } catch (error) {
    console.error('Error counting icons:', error)
    return 0
  }
}
