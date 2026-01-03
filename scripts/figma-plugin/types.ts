/**
 * TypeScript types for the Figma plugin icon manifest
 */

/**
 * SVG element type
 */
export type SVGElementType = 'path' | 'circle' | 'line' | 'polyline' | 'rect' | 'ellipse' | 'polygon'

/**
 * Parsed SVG element with type and attributes
 */
export interface SVGElement {
  type: SVGElementType
  attributes: Record<string, string>
}

/**
 * Individual icon data
 */
export interface IconData {
  name: string           // "Heart" (PascalCase)
  slug: string           // "heart" (kebab-case)
  categories: string[]   // ["social", "ui"]
  keywords: string[]     // ["love", "like", "favorite"]
  viewBox: string        // "0 0 24 24"
  elements: SVGElement[]
}

/**
 * Complete icon manifest for Figma plugin
 */
export interface IconManifest {
  version: string
  generatedAt: string
  totalCount: number
  icons: IconData[]
}

/**
 * Parsing result for a single icon
 */
export interface IconParseResult {
  name: string
  slug: string
  viewBox: string
  elements: SVGElement[]
}
