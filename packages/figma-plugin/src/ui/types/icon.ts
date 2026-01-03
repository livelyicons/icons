export interface IconElement {
  type: 'path' | 'circle' | 'rect' | 'ellipse' | 'line' | 'polyline' | 'polygon';
  attributes: Record<string, string | number>;
}

export interface IconData {
  name: string;
  slug: string;
  categories: string[];
  keywords: string[];
  viewBox: string;
  elements: IconElement[];
}

export interface IconManifest {
  version: string;
  generatedAt: string;
  totalCount: number;
  icons: IconData[];
}

export interface IconConfig {
  size: number;
  strokeWidth: number;
  color: string;
}

export type ExportFormat = 'svg' | 'react' | 'vue';
