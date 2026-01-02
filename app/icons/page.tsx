"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import * as Icons from "../../src/icons"
import { IconProvider } from "../../src/context/IconContext"
import type { MotionType, TriggerType } from "../../src/lib/types"
import { motionTypeList } from "../../src/lib/motion-presets"

// Get all icon names from exports
const iconEntries = Object.entries(Icons)
  .filter(([name]) => name !== 'default' && typeof Icons[name as keyof typeof Icons] === 'function')
  .map(([name, component]) => ({
    name,
    component: component as React.ComponentType<{ size?: number; strokeWidth?: number; motionType?: MotionType; trigger?: TriggerType; className?: string }>
  }))

const animationTypes: MotionType[] = ['scale', 'rotate', 'translate', 'shake', 'pulse', 'bounce', 'draw', 'spin', 'none']

export default function IconsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMotionType, setSelectedMotionType] = useState<MotionType>('scale')
  const [iconSize, setIconSize] = useState(24)
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null)

  const filteredIcons = useMemo(() => {
    return iconEntries.filter(icon => {
      const matchesSearch = icon.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesSearch
    })
  }, [searchQuery])

  const copyToClipboard = (iconName: string) => {
    const code = `import { ${iconName} } from 'motion-icons'\n\n<${iconName} size={${iconSize}} strokeWidth={${strokeWidth}} motionType="${selectedMotionType}" />`
    navigator.clipboard.writeText(code)
    setCopiedIcon(iconName)
    setTimeout(() => setCopiedIcon(null), 2000)
  }

  return (
    <div className="min-h-screen bg-void">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-void/80 backdrop-blur-xl border-b border-graphite">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-electric rounded-sm flex items-center justify-center">
              <Icons.Star size={18} className="text-void" />
            </div>
            <span className="font-display font-bold text-lg text-bone">
              MotionIcons
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <Link
              href="/icons"
              className="text-sm text-electric"
            >
              Icons
            </Link>
            <Link
              href="/docs"
              className="text-sm text-silver hover:text-electric transition-colors"
            >
              Docs
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* Header */}
        <div className="border-b border-graphite">
          <div className="max-w-7xl mx-auto px-6 py-12">
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
                Browse all icons in the library. Select a motion type to preview animations.
                Hover over icons to see them animate. Click to copy import code.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Controls */}
        <div className="sticky top-16 z-40 bg-void/95 backdrop-blur-xl border-b border-graphite">
          <div className="max-w-7xl mx-auto px-6 py-4">
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
                  <div className="flex items-center gap-3 pl-4 border-l border-graphite">
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

        {/* Icon Grid */}
        <IconProvider config={{ animated: true }}>
          <div className="max-w-7xl mx-auto px-6 py-12">
            <AnimatePresence mode="popLayout">
              {filteredIcons.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3"
                >
                  {filteredIcons.map((icon, i) => {
                    const IconComponent = icon.component
                    const isCopied = copiedIcon === icon.name

                    return (
                      <motion.button
                        key={icon.name}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2, delay: Math.min(i * 0.01, 0.3) }}
                        onClick={() => copyToClipboard(icon.name)}
                        className="icon-card group bg-carbon border border-graphite p-4 flex flex-col items-center gap-3 hover:border-electric/50 transition-all duration-300 cursor-pointer relative"
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
                      </motion.button>
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
                  Try adjusting your search
                </p>
              </motion.div>
            )}
            </AnimatePresence>
          </div>
        </IconProvider>

        {/* Usage hint */}
        <div className="border-t border-graphite">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="bg-carbon border border-graphite p-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-graphite flex items-center justify-center text-electric shrink-0">
                  <Icons.Copy size={24} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-bone mb-2">
                    Click any icon to copy
                  </h3>
                  <p className="text-sm text-silver mb-4">
                    Clicking an icon copies the import statement and component usage with your selected motion type.
                  </p>
                  <code className="code-block px-4 py-2 text-sm inline-block">
                    {`<Heart size={24} motionType="${selectedMotionType}" />`}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
