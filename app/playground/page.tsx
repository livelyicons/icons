"use client"

import { useState, useMemo, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import * as Icons from "../../src/icons"
import { IconProvider } from "../../src/context/IconContext"
import type { MotionType, TriggerType } from "../../src/lib/types"
import { motionTypeList } from "../../src/lib/motion-presets"
import { iconCategories } from "../../src/lib/icon-categories"

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
const triggerTypes: TriggerType[] = ['hover', 'loop', 'mount', 'inView']

// Generate code for different formats
function generateCode(
  iconName: string,
  size: number,
  strokeWidth: number,
  motionType: MotionType,
  trigger: TriggerType,
  format: ExportFormat,
  color: string
): string {
  const colorProp = color !== '#c4c4cc' ? ` className="text-[${color}]"` : ''

  switch (format) {
    case 'react':
      return `import { ${iconName} } from 'motion-icons'

<${iconName}
  size={${size}}
  strokeWidth={${strokeWidth}}
  motionType="${motionType}"
  trigger="${trigger}"${colorProp}
/>`
    case 'vue':
      return `<template>
  <${iconName}
    :size="${size}"
    :stroke-width="${strokeWidth}"
    motion-type="${motionType}"
    trigger="${trigger}"${color !== '#c4c4cc' ? `\n    style="color: ${color}"` : ''}
  />
</template>

<script setup>
import { ${iconName} } from 'motion-icons/vue'
</script>`
    case 'svg':
      return `<svg
  width="${size}"
  height="${size}"
  viewBox="0 0 24 24"
  fill="none"
  stroke="${color}"
  stroke-width="${strokeWidth}"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <!-- ${iconName} icon paths -->
</svg>`
    case 'figma':
      return `<!-- Figma-compatible SVG for ${iconName} -->
<svg
  width="${size}"
  height="${size}"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <!-- Copy paths from downloaded SVG -->
  <!-- Stroke: ${color}, Width: ${strokeWidth} -->
</svg>`
    default:
      return ''
  }
}

export default function PlaygroundPage() {
  // Icon selection
  const [selectedIcon, setSelectedIcon] = useState<string>('Heart')
  const [searchQuery, setSearchQuery] = useState('')
  const [showIconPicker, setShowIconPicker] = useState(false)

  // Customization options
  const [iconSize, setIconSize] = useState(64)
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [motionType, setMotionType] = useState<MotionType>('scale')
  const [trigger, setTrigger] = useState<TriggerType>('hover')
  const [iconColor, setIconColor] = useState('#c4c4cc')

  // Export
  const [exportFormat, setExportFormat] = useState<ExportFormat>('react')
  const [copied, setCopied] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Filter icons
  const filteredIcons = useMemo(() => {
    if (!searchQuery) return iconEntries.slice(0, 50) // Show first 50 by default
    return iconEntries.filter(icon =>
      icon.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 50)
  }, [searchQuery])

  // Get selected icon component
  const SelectedIconComponent = useMemo(() => {
    const entry = iconEntries.find(e => e.name === selectedIcon)
    return entry?.component
  }, [selectedIcon])

  // Generate code
  const generatedCode = useMemo(() => {
    return generateCode(selectedIcon, iconSize, strokeWidth, motionType, trigger, exportFormat, iconColor)
  }, [selectedIcon, iconSize, strokeWidth, motionType, trigger, exportFormat, iconColor])

  // Copy to clipboard
  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [generatedCode])

  // Download SVG
  const downloadSvg = useCallback(() => {
    const previewElement = document.querySelector('[data-playground-preview] svg')
    if (previewElement) {
      const svgString = new XMLSerializer().serializeToString(previewElement)
      const blob = new Blob([svgString], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${selectedIcon.toLowerCase()}.svg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  }, [selectedIcon])

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
              className="text-sm text-silver hover:text-electric transition-colors"
            >
              Icons
            </Link>
            <Link
              href="/playground"
              className="text-sm text-electric"
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
                  className="text-sm text-silver hover:text-electric transition-colors py-2"
                >
                  Icons
                </Link>
                <Link
                  href="/playground"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-electric py-2"
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
                Interactive Editor
              </span>
              <h1 className="font-display text-4xl font-bold text-bone mb-4">
                Icon Playground
              </h1>
              <p className="text-silver max-w-2xl">
                Customize any icon with live preview. Adjust size, stroke, animation type,
                and trigger mode. Copy the generated code or download the SVG file.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column: Preview */}
            <div className="space-y-6">
              {/* Preview Area */}
              <div className="bg-carbon border border-graphite">
                <div className="border-b border-graphite px-4 py-3 flex items-center justify-between">
                  <span className="text-xs text-silver uppercase tracking-wider">Preview</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={downloadSvg}
                      className="p-2 text-silver hover:text-electric transition-colors"
                      title="Download SVG"
                    >
                      <Icons.Download size={16} />
                    </button>
                  </div>
                </div>

                <div
                  className="aspect-square max-h-[400px] flex items-center justify-center p-8"
                  data-playground-preview
                  style={{ backgroundColor: 'var(--color-void)' }}
                >
                  <IconProvider config={{ animated: true }}>
                    {SelectedIconComponent && (
                      <div style={{ color: iconColor }}>
                        <SelectedIconComponent
                          size={iconSize}
                          strokeWidth={strokeWidth}
                          motionType={motionType}
                          trigger={trigger}
                        />
                      </div>
                    )}
                  </IconProvider>
                </div>

                {/* Icon info */}
                <div className="border-t border-graphite px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-bone font-semibold">{selectedIcon}</span>
                    <span className="text-xs text-silver">
                      {iconCategories[selectedIcon]?.join(', ') || 'Uncategorized'}
                    </span>
                  </div>
                  <span className="text-xs text-silver">
                    {iconSize}px / {strokeWidth}px stroke
                  </span>
                </div>
              </div>

              {/* Icon Picker */}
              <div className="bg-carbon border border-graphite">
                <button
                  onClick={() => setShowIconPicker(!showIconPicker)}
                  className="w-full px-4 py-3 flex items-center justify-between border-b border-graphite hover:bg-graphite/50 transition-colors"
                >
                  <span className="text-xs text-silver uppercase tracking-wider">Select Icon</span>
                  <motion.div
                    animate={{ rotate: showIconPicker ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icons.ChevronDown size={16} className="text-silver" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {showIconPicker && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 space-y-4">
                        {/* Search */}
                        <div className="relative">
                          <Icons.Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-silver" />
                          <input
                            type="text"
                            placeholder="Search icons..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-dark w-full !pl-9 text-sm"
                          />
                        </div>

                        {/* Icon Grid */}
                        <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 max-h-[200px] overflow-y-auto">
                          {filteredIcons.map((icon) => {
                            const IconComp = icon.component
                            const isSelected = selectedIcon === icon.name
                            return (
                              <button
                                key={icon.name}
                                onClick={() => {
                                  setSelectedIcon(icon.name)
                                  setShowIconPicker(false)
                                  setSearchQuery('')
                                }}
                                className={`aspect-square flex items-center justify-center transition-all ${
                                  isSelected
                                    ? 'bg-electric text-void'
                                    : 'bg-graphite text-silver hover:text-electric hover:border-electric/50'
                                }`}
                                title={icon.name}
                              >
                                <IconComp size={20} />
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Column: Controls & Code */}
            <div className="space-y-6">
              {/* Controls */}
              <div className="bg-carbon border border-graphite">
                <div className="border-b border-graphite px-4 py-3">
                  <span className="text-xs text-silver uppercase tracking-wider">Customization</span>
                </div>

                <div className="p-4 space-y-6">
                  {/* Size */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-ghost">Size</label>
                      <span className="text-sm text-electric">{iconSize}px</span>
                    </div>
                    <input
                      type="range"
                      min="16"
                      max="128"
                      value={iconSize}
                      onChange={(e) => setIconSize(Number(e.target.value))}
                      className="w-full accent-electric"
                    />
                    <div className="flex justify-between text-xs text-steel">
                      <span>16px</span>
                      <span>128px</span>
                    </div>
                  </div>

                  {/* Stroke Width */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-ghost">Stroke Width</label>
                      <span className="text-sm text-electric">{strokeWidth}</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="4"
                      step="0.5"
                      value={strokeWidth}
                      onChange={(e) => setStrokeWidth(Number(e.target.value))}
                      className="w-full accent-electric"
                    />
                    <div className="flex justify-between text-xs text-steel">
                      <span>0.5</span>
                      <span>4</span>
                    </div>
                  </div>

                  {/* Color */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-ghost">Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={iconColor}
                          onChange={(e) => setIconColor(e.target.value)}
                          className="w-8 h-8 rounded cursor-pointer bg-transparent"
                        />
                        <input
                          type="text"
                          value={iconColor}
                          onChange={(e) => setIconColor(e.target.value)}
                          className="input-dark text-xs py-1 px-2 w-24"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {['#c4c4cc', '#00ff88', '#00d4ff', '#ff6b35', '#ffffff'].map(color => (
                        <button
                          key={color}
                          onClick={() => setIconColor(color)}
                          className={`w-6 h-6 rounded transition-transform hover:scale-110 ${
                            iconColor === color ? 'ring-2 ring-electric ring-offset-2 ring-offset-carbon' : ''
                          }`}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-graphite" />

                  {/* Motion Type */}
                  <div className="space-y-3">
                    <label className="text-sm text-ghost block">Motion Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {animationTypes.map(type => {
                        const typeInfo = motionTypeList.find(t => t.type === type)
                        return (
                          <button
                            key={type}
                            onClick={() => setMotionType(type)}
                            className={`px-3 py-2 text-xs uppercase tracking-wider transition-all ${
                              motionType === type
                                ? 'bg-electric text-void'
                                : 'bg-graphite text-silver hover:text-ghost'
                            }`}
                            title={typeInfo?.description}
                          >
                            {type}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Trigger */}
                  <div className="space-y-3">
                    <label className="text-sm text-ghost block">Trigger</label>
                    <div className="grid grid-cols-4 gap-2">
                      {triggerTypes.map(t => (
                        <button
                          key={t}
                          onClick={() => setTrigger(t)}
                          className={`px-3 py-2 text-xs uppercase tracking-wider transition-all ${
                            trigger === t
                              ? 'bg-electric text-void'
                              : 'bg-graphite text-silver hover:text-ghost'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-steel">
                      {trigger === 'hover' && 'Animate when mouse hovers over the icon'}
                      {trigger === 'loop' && 'Continuously animate in a loop'}
                      {trigger === 'mount' && 'Animate once when the component mounts'}
                      {trigger === 'inView' && 'Animate when scrolled into the viewport'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Code Output */}
              <div className="bg-carbon border border-graphite">
                <div className="border-b border-graphite px-4 py-3 flex items-center justify-between">
                  <span className="text-xs text-silver uppercase tracking-wider">Generated Code</span>
                  <div className="flex items-center gap-2">
                    <select
                      value={exportFormat}
                      onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
                      className="input-dark text-xs py-1 px-2"
                    >
                      {Object.entries(formatLabels).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    <button
                      onClick={copyCode}
                      className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-all flex items-center gap-1 ${
                        copied
                          ? 'bg-electric text-void'
                          : 'bg-graphite text-silver hover:text-electric'
                      }`}
                    >
                      {copied ? (
                        <>
                          <Icons.Check size={12} />
                          Copied
                        </>
                      ) : (
                        <>
                          <Icons.Copy size={12} />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <pre className="p-4 overflow-x-auto text-sm leading-relaxed max-h-[300px] overflow-y-auto">
                  <code className="text-ghost">{generatedCode}</code>
                </pre>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3">
                <button
                  onClick={downloadSvg}
                  className="btn-secondary flex-1 flex items-center justify-center gap-2"
                >
                  <Icons.Download size={18} />
                  Download SVG
                </button>
                <button
                  onClick={copyCode}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <Icons.Copy size={18} />
                  Copy Code
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="border-t border-graphite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <h3 className="font-display text-xl font-bold text-bone mb-6">
              Tips for using icons
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: Icons.Zap,
                  title: 'Performance',
                  description: 'Use trigger="hover" for interactive icons. Avoid too many trigger="loop" animations on one page.'
                },
                {
                  icon: Icons.Accessibility,
                  title: 'Accessibility',
                  description: 'Add aria-label for meaningful icons. Decorative icons are automatically hidden from screen readers.'
                },
                {
                  icon: Icons.Palette,
                  title: 'Styling',
                  description: 'Icons inherit text color by default. Use className or style props to customize colors.'
                },
                {
                  icon: Icons.Settings,
                  title: 'Motion Control',
                  description: 'Use IconProvider to globally control animations. Individual icons can override with the animated prop.'
                }
              ].map((tip, i) => (
                <div key={i} className="bg-carbon border border-graphite p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <tip.icon size={18} className="text-electric" />
                    <span className="text-sm font-semibold text-bone">{tip.title}</span>
                  </div>
                  <p className="text-xs text-silver">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
