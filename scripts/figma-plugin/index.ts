#!/usr/bin/env node

/**
 * Main entry point for generating Figma plugin icon manifest
 *
 * This script:
 * 1. Loads category mappings from src/lib/icon-categories.ts
 * 2. Parses all icon TSX files
 * 3. Generates keywords for each icon
 * 4. Outputs a JSON manifest to packages/figma-plugin/src/data/icons.json
 */

import * as fs from 'fs'
import * as path from 'path'
import { parseAllIcons, getIconCount } from './extract-icons'
import { generateKeywords } from './generate-keywords'
import type { IconManifest, IconData } from './types'

// Import category mappings
// Note: We'll need to load this dynamically since it's TypeScript
const categoriesPath = path.join(__dirname, '../../src/lib/icon-categories.ts')

/**
 * Load icon categories from the categories file
 */
function loadCategories(): Record<string, string[]> {
  try {
    const content = fs.readFileSync(categoriesPath, 'utf-8')

    // Extract the iconCategories object using regex
    const match = content.match(/export const iconCategories[^{]*{([\s\S]*?)}\s*$/m)
    if (!match) {
      console.warn('Warning: Could not parse iconCategories, using empty mapping')
      return {}
    }

    // Parse the object (simplified parser for our specific format)
    const categories: Record<string, string[]> = {}
    const objectContent = match[1]

    // Match each line like: IconName: ['category1', 'category2'],
    const lineRegex = /(\w+):\s*\[(.*?)\]/g
    let lineMatch

    while ((lineMatch = lineRegex.exec(objectContent)) !== null) {
      const iconName = lineMatch[1]
      const categoriesStr = lineMatch[2]

      // Extract category strings
      const cats = categoriesStr
        .split(',')
        .map(cat => cat.trim().replace(/['"]/g, ''))
        .filter(cat => cat.length > 0)

      categories[iconName] = cats
    }

    return categories
  } catch (error) {
    console.error('Error loading categories:', error)
    return {}
  }
}

/**
 * Get unique categories used
 */
function getUniqueCategories(categoryMap: Record<string, string[]>): string[] {
  const categories = new Set<string>()

  Object.values(categoryMap).forEach(cats => {
    cats.forEach(cat => categories.add(cat))
  })

  return Array.from(categories).sort()
}

/**
 * Main execution
 */
function main() {
  console.log('🎨 Generating Figma plugin icon manifest...\n')

  // Paths
  const iconsDir = path.join(__dirname, '../../src/icons')
  const outputDir = path.join(__dirname, '../../packages/figma-plugin/src/data')
  const outputFile = path.join(outputDir, 'icons.json')

  // Step 1: Load categories
  console.log('📂 Loading category mappings...')
  const categoryMap = loadCategories()
  const uniqueCategories = getUniqueCategories(categoryMap)
  console.log(`   Found ${uniqueCategories.length} categories\n`)

  // Step 2: Parse icons
  console.log('🔍 Parsing icon files...')
  const iconCount = getIconCount(iconsDir)
  console.log(`   Found ${iconCount} icon files`)

  const parsedIcons = parseAllIcons(iconsDir)
  console.log(`   Successfully parsed ${parsedIcons.length} icons\n`)

  if (parsedIcons.length === 0) {
    console.error('❌ No icons were parsed successfully')
    process.exit(1)
  }

  // Step 3: Generate icon data with categories and keywords
  console.log('🔤 Generating keywords and mapping categories...')
  const icons: IconData[] = parsedIcons.map(parsed => {
    const categories = categoryMap[parsed.name] || []
    const keywords = generateKeywords(parsed.name)

    return {
      name: parsed.name,
      slug: parsed.slug,
      categories,
      keywords,
      viewBox: parsed.viewBox,
      elements: parsed.elements,
    }
  })

  // Step 4: Create manifest
  const manifest: IconManifest = {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    totalCount: icons.length,
    icons: icons.sort((a, b) => a.name.localeCompare(b.name)),
  }

  // Step 5: Ensure output directory exists
  console.log('\n📁 Creating output directory...')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
    console.log(`   Created: ${outputDir}`)
  } else {
    console.log(`   Directory exists: ${outputDir}`)
  }

  // Step 6: Write manifest
  console.log('\n💾 Writing manifest...')
  fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2), 'utf-8')
  console.log(`   Written to: ${outputFile}`)

  // Step 7: Display stats
  console.log('\n✅ Icon manifest generated successfully!\n')
  console.log('📊 Statistics:')
  console.log(`   Total icons: ${manifest.totalCount}`)
  console.log(`   Categories: ${uniqueCategories.length}`)
  console.log(`   File size: ${(fs.statSync(outputFile).size / 1024).toFixed(2)} KB`)

  // Show category breakdown
  console.log('\n📈 Category breakdown:')
  const categoryCounts: Record<string, number> = {}
  icons.forEach(icon => {
    icon.categories.forEach(cat => {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1
    })
  })

  const sortedCategories = Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)

  sortedCategories.forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count}`)
  })

  if (Object.keys(categoryCounts).length > 10) {
    console.log(`   ... and ${Object.keys(categoryCounts).length - 10} more`)
  }

  console.log('\n🎉 Done!\n')
}

// Run the script
main()
