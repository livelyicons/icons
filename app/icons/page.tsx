"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import * as Icons from "../../src/icons"
import { IconProvider } from "../../src/context/IconContext"
import type { MotionType, TriggerType } from "../../src/lib/types"
import { motionTypeList } from "../../src/lib/motion-presets"
import { categoryList, iconCategories, type IconCategory } from "../../src/lib/icon-categories"

// Export format types
type ExportFormat = 'react' | 'vue' | 'svg' | 'figma'

// Get all icon names from exports
const iconEntries = Object.entries(Icons)
  .filter(([name]) => name !== 'default' && typeof Icons[name as keyof typeof Icons] === 'function')
  .map(([name, component]) => ({
    name,
    component: component as React.ComponentType<{ size?: number; strokeWidth?: number; motionType?: MotionType; trigger?: TriggerType; className?: string }>
  }))

const animationTypes: MotionType[] = ['scale', 'rotate', 'translate', 'shake', 'pulse', 'bounce', 'draw', 'spin', 'none']

// Generate code for different formats
function generateCode(iconName: string, size: number, strokeWidth: number, motionType: MotionType, format: ExportFormat): string {
  switch (format) {
    case 'react':
      return `import { ${iconName} } from 'motion-icons'

<${iconName} size={${size}} strokeWidth={${strokeWidth}} motionType="${motionType}" />`
    case 'vue':
      return `<template>
  <${iconName} :size="${size}" :stroke-width="${strokeWidth}" motion-type="${motionType}" />
</template>

<script setup>
import { ${iconName} } from 'motion-icons/vue'
</script>`
    case 'svg':
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
  <!-- ${iconName} icon paths -->
</svg>`
    case 'figma':
      return `<!-- Figma-compatible SVG for ${iconName} -->
<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Paste paths here -->
</svg>`
    default:
      return ''
  }
}

export default function IconsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMotionType, setSelectedMotionType] = useState<MotionType>('scale')
  const [iconSize, setIconSize] = useState(24)
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<IconCategory[]>([])
  const [exportFormat, setExportFormat] = useState<ExportFormat>('react')
  const [showExportMenu, setShowExportMenu] = useState<string | null>(null)

  const filteredIcons = useMemo(() => {
    return iconEntries.filter(icon => {
      const matchesSearch = icon.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategories.length === 0 ||
        selectedCategories.some(cat => iconCategories[icon.name]?.includes(cat))
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategories])

  const toggleCategory = (category: IconCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const clearCategories = () => {
    setSelectedCategories([])
  }

  const copyToClipboard = (iconName: string, format: ExportFormat = exportFormat) => {
    const code = generateCode(iconName, iconSize, strokeWidth, selectedMotionType, format)
    navigator.clipboard.writeText(code)
    setCopiedIcon(iconName)
    setShowExportMenu(null)
    setTimeout(() => setCopiedIcon(null), 2000)
  }

  const downloadSvg = (iconName: string) => {
    // Get the SVG element from the DOM
    const iconElement = document.querySelector(`[data-icon-name="${iconName}"] svg`)
    if (iconElement) {
      const svgString = new XMLSerializer().serializeToString(iconElement)
      const blob = new Blob([svgString], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${iconName.toLowerCase()}.svg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  }

  const formatLabels: Record<ExportFormat, string> = {
    react: 'React',
    vue: 'Vue',
    svg: 'Raw SVG',
    figma: 'Figma SVG'
  }

  return (
    <div className="min-h-screen bg-void">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-void/80 backdrop-blur-xl border-b border-graphite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-electric rounded-sm flex items-center justify-center">
              <Icons.Star size={18} className="text-void" />
            </div>
            <span className="font-display font-bold text-lg text-bone">
              MotionIcons
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/icons"
              className="text-sm text-electric"
            >
              Icons
            </Link>
            <Link
              href="/playground"
              className="text-sm text-silver hover:text-electric transition-colors"
            >
              Playground
            </Link>
            <Link
              href="/docs"
              className="text-sm text-silver hover:text-electric transition-colors"
            >
              Docs
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-silver hover:text-electric transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <Icons.X size={24} /> : <Icons.Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-graphite bg-void/95 backdrop-blur-xl overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-2">
                <Link
                  href="/icons"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-electric py-2"
                >
                  Icons
                </Link>
                <Link
                  href="/playground"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-silver hover:text-electric transition-colors py-2"
                >
                  Playground
                </Link>
                <Link
                  href="/docs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-silver hover:text-electric transition-colors py-2"
                >
                  Docs
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-16">
        {/* Header */}
        <div className="border-b border-graphite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="tag tag-electric mb-4 inline-block">
                {iconEntries.length} Icons
              </span>
              <h1 className="font-display text-4xl font-bold text-bone mb-4">
                Icon Browser
              </h1>
              <p className="text-silver max-w-2xl">
                Browse all icons in the library. Filter by category, select a motion type to preview animations.
                Click icons to copy code or download SVG files.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="border-b border-graphite bg-carbon/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs text-silver uppercase tracking-wider">Categories:</span>
              {selectedCategories.length > 0 && (
                <button
                  onClick={clearCategories}
                  className="text-xs text-electric hover:text-electric-dim transition-colors flex items-center gap-1"
                >
                  <Icons.X size={12} />
                  Clear all
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {categoryList.map(category => {
                const isSelected = selectedCategories.includes(category.id)
                return (
                  <button
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-all ${
                      isSelected
                        ? "bg-electric text-void"
                        : "bg-graphite text-silver hover:text-ghost border border-graphite hover:border-steel"
                    }`}
                    title={category.description}
                  >
                    {category.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="sticky top-16 z-40 bg-void/95 backdrop-blur-xl border-b border-graphite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex flex-col gap-4">
              {/* Top row: Search and size controls */}
              <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Icons.Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-silver" />
                  <input
                    type="text"
                    placeholder="Search icons..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-dark w-full !pl-11"
                  />
                </div>

                {/* Size Controls */}
                <div className="flex flex-wrap items-center gap-4">
                  {/* Size Control */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-silver uppercase tracking-wider">Size:</span>
                    <input
                      type="range"
                      min="16"
                      max="48"
                      value={iconSize}
                      onChange={(e) => setIconSize(Number(e.target.value))}
                      className="w-20 accent-electric"
                    />
                    <span className="text-xs text-ghost w-8">{iconSize}px</span>
                  </div>

                  {/* Stroke Control */}
                  <div className="flex items-center gap-3 sm:pl-4 sm:border-l sm:border-graphite">
                    <span className="text-xs text-silver uppercase tracking-wider">Stroke:</span>
                    <input
                      type="range"
                      min="1"
                      max="4"
                      step="0.5"
                      value={strokeWidth}
                      onChange={(e) => setStrokeWidth(Number(e.target.value))}
                      className="w-16 accent-electric"
                    />
                    <span className="text-xs text-ghost w-6">{strokeWidth}</span>
                  </div>

                  {/* Export Format Selector */}
                  <div className="flex items-center gap-3 sm:pl-4 sm:border-l sm:border-graphite">
                    <span className="text-xs text-silver uppercase tracking-wider">Format:</span>
                    <select
                      value={exportFormat}
                      onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
                      className="input-dark text-xs py-1.5 px-2"
                    >
                      {Object.entries(formatLabels).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Bottom row: Motion Type selector */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-silver uppercase tracking-wider">Motion Type:</span>
                <div className="flex flex-wrap gap-2">
                  {animationTypes.map(type => {
                    const typeInfo = motionTypeList.find(t => t.type === type)
                    return (
                      <button
                        key={type}
                        onClick={() => setSelectedMotionType(type)}
                        className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-all ${
                          selectedMotionType === type
                            ? "bg-electric text-void"
                            : "bg-carbon text-silver hover:text-ghost border border-graphite"
                        }`}
                        title={typeInfo?.description}
                      >
                        {type}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        {(searchQuery || selectedCategories.length > 0) && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
            <p className="text-sm text-silver">
              Showing {filteredIcons.length} of {iconEntries.length} icons
              {selectedCategories.length > 0 && (
                <span className="text-electric"> in {selectedCategories.length} categor{selectedCategories.length === 1 ? 'y' : 'ies'}</span>
              )}
            </p>
          </div>
        )}

        {/* Icon Grid */}
        <IconProvider config={{ animated: true }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <AnimatePresence mode="popLayout">
              {filteredIcons.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3"
                >
                  {filteredIcons.map((icon, i) => {
                    const IconComponent = icon.component
                    const isCopied = copiedIcon === icon.name
                    const showMenu = showExportMenu === icon.name
                    // Category info available for display: iconCategories[icon.name]

                    return (
                      <motion.div
                        key={icon.name}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2, delay: Math.min(i * 0.01, 0.3) }}
                        className="icon-card group bg-carbon border border-graphite flex flex-col hover:border-electric/50 transition-all duration-300 relative"
                        data-icon-name={icon.name}
                      >
                        {/* Copied overlay */}
                        <AnimatePresence>
                          {isCopied && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-electric flex items-center justify-center z-20"
                            >
                              <div className="flex items-center gap-2 text-void font-semibold">
                                <Icons.Check size={16} />
                                <span className="text-xs">Copied!</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Main icon area - clickable for copy */}
                        <button
                          onClick={() => copyToClipboard(icon.name)}
                          className="p-4 flex flex-col items-center gap-3 cursor-pointer flex-1"
                        >
                          {/* Icon */}
                          <div className="relative z-10 text-silver group-hover:text-electric transition-colors duration-300 pointer-events-none">
                            <div className="pointer-events-auto">
                              <IconComponent
                                size={iconSize}
                                strokeWidth={strokeWidth}
                                motionType={selectedMotionType}
                              />
                            </div>
                          </div>

                          {/* Name */}
                          <div className="relative z-10 text-center">
                            <span className="text-[10px] text-ghost group-hover:text-bone transition-colors truncate block max-w-full">
                              {icon.name}
                            </span>
                          </div>
                        </button>

                        {/* Action buttons */}
                        <div className="flex border-t border-graphite opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => downloadSvg(icon.name)}
                            className="flex-1 py-2 text-xs text-silver hover:text-electric hover:bg-graphite transition-colors flex items-center justify-center gap-1"
                            title="Download SVG"
                          >
                            <Icons.Download size={12} />
                          </button>
                          <div className="w-px bg-graphite" />
                          <div className="relative flex-1">
                            <button
                              onClick={() => setShowExportMenu(showMenu ? null : icon.name)}
                              className="w-full py-2 text-xs text-silver hover:text-electric hover:bg-graphite transition-colors flex items-center justify-center gap-1"
                              title="Export options"
                            >
                              <Icons.Copy size={12} />
                            </button>

                            {/* Export format dropdown */}
                            <AnimatePresence>
                              {showMenu && (
                                <motion.div
                                  initial={{ opacity: 0, y: -4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -4 }}
                                  className="absolute bottom-full right-0 mb-1 bg-carbon border border-graphite shadow-lg z-30 min-w-[120px]"
                                >
                                  {Object.entries(formatLabels).map(([format, label]) => (
                                    <button
                                      key={format}
                                      onClick={() => copyToClipboard(icon.name, format as ExportFormat)}
                                      className="w-full px-3 py-2 text-xs text-left text-silver hover:text-electric hover:bg-graphite transition-colors"
                                    >
                                      {label}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Icons.Search size={48} className="mx-auto mb-4 text-steel" />
                <h3 className="font-display text-xl font-semibold text-bone mb-2">
                  No icons found
                </h3>
                <p className="text-silver">
                  Try adjusting your search or category filters
                </p>
                {selectedCategories.length > 0 && (
                  <button
                    onClick={clearCategories}
                    className="mt-4 text-sm text-electric hover:text-electric-dim transition-colors"
                  >
                    Clear all filters
                  </button>
                )}
              </motion.div>
            )}
            </AnimatePresence>
          </div>
        </IconProvider>

        {/* Usage hint */}
        <div className="border-t border-graphite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <div className="bg-carbon border border-graphite p-4 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="w-12 h-12 bg-graphite flex items-center justify-center text-electric shrink-0">
                  <Icons.Copy size={24} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-bone mb-2">
                    Click any icon to copy
                  </h3>
                  <p className="text-sm text-silver mb-4">
                    Clicking an icon copies the import statement in your selected format ({formatLabels[exportFormat]}).
                    Use the dropdown for other formats or download the raw SVG file.
                  </p>
                  <code className="code-block px-4 py-2 text-sm inline-block">
                    {`<Heart size={24} motionType="${selectedMotionType}" />`}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Try Playground CTA */}
        <div className="border-t border-graphite bg-carbon/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-center">
            <h3 className="font-display text-xl font-bold text-bone mb-3">
              Need more customization?
            </h3>
            <p className="text-silver mb-6">
              Try the interactive playground to customize icons with live preview and code generation.
            </p>
            <Link href="/playground" className="btn-primary inline-flex items-center gap-2">
              Open Playground
              <Icons.ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
