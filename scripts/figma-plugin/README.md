# Figma Plugin Icon Data Pipeline

This script generates a JSON manifest of all MotionIcon icons for use in the Figma plugin.

## Overview

The pipeline parses all 1,319 TSX icon components and extracts:
- Icon name (PascalCase) and slug (kebab-case)
- Categories from `src/lib/icon-categories.ts`
- Auto-generated search keywords
- SVG viewBox
- SVG elements (path, circle, line, polyline, rect, ellipse, polygon)

## Files

### `types.ts`
TypeScript type definitions for the manifest:
- `IconManifest` - Top-level manifest structure
- `IconData` - Individual icon metadata
- `SVGElement` - Parsed SVG element data

### `generate-keywords.ts`
Keyword generation logic:
- Splits PascalCase into words: "HeartPulse" → ["heart", "pulse"]
- Adds common synonyms (e.g., "heart" → ["love", "like", "favorite"])
- Generates compound variations

### `extract-icons.ts`
Icon parsing logic:
- Reads TSX files from `src/icons/`
- Extracts `viewBox` attribute
- Parses `motion.path`, `motion.circle`, `motion.line`, etc.
- Converts to plain SVG element data

### `index.ts`
Main entry point that orchestrates the pipeline:
1. Loads category mappings
2. Parses all icon files
3. Generates keywords
4. Writes JSON manifest

## Usage

Run the script from the project root:

```bash
npx tsx scripts/figma-plugin/index.ts
```

This generates:
```
packages/figma-plugin/src/data/icons.json
```

## Output Format

```json
{
  "version": "1.0.0",
  "generatedAt": "2026-01-03T21:39:38.237Z",
  "totalCount": 1319,
  "icons": [
    {
      "name": "Heart",
      "slug": "heart",
      "categories": ["social"],
      "keywords": ["heart", "love", "like", "favorite"],
      "viewBox": "0 0 24 24",
      "elements": [
        {
          "type": "path",
          "attributes": {
            "d": "M20.84 4.61a5.5..."
          }
        }
      ]
    }
  ]
}
```

## Statistics

- **Total Icons**: 1,319
- **Categories**: 36
- **File Size**: ~1 MB
- **Top Categories**: 
  - UI (201 icons)
  - Social (100 icons)
  - Brands (80 icons)
  - Devices (79 icons)
  - Health (75 icons)

## SVG Element Types

The parser supports all standard SVG elements:
- `<motion.path>` - Paths with `d` attribute
- `<motion.circle>` - Circles with `cx`, `cy`, `r`
- `<motion.line>` - Lines with `x1`, `y1`, `x2`, `y2`
- `<motion.polyline>` - Polylines with `points`
- `<motion.rect>` - Rectangles with `width`, `height`, `x`, `y`
- `<motion.ellipse>` - Ellipses with `cx`, `cy`, `rx`, `ry`
- `<motion.polygon>` - Polygons with `points`

## Development

To add new synonyms for better search:
1. Edit `SYNONYMS` in `generate-keywords.ts`
2. Re-run the script

To support new SVG elements:
1. Add extraction function in `extract-icons.ts`
2. Add element type to `SVGElementType` in `types.ts`
3. Re-run the script
