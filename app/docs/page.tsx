"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import {
  Star, Check, ArrowRight, Copy, Heart, Settings,
  Bell, Loader, Eye, Menu, X
} from "../../src/icons"
import { useState } from "react"

export default function DocsPage() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const copyCode = (code: string, section: string) => {
    navigator.clipboard.writeText(code)
    setCopiedSection(section)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  const CodeBlock = ({ code, section }: { code: string; section: string }) => (
    <div className="relative code-block group">
      <button
        onClick={() => copyCode(code, section)}
        className="absolute top-3 right-3 p-2 bg-graphite hover:bg-steel transition-colors opacity-0 group-hover:opacity-100"
      >
        {copiedSection === section ? (
          <Check size={16} className="text-electric" />
        ) : (
          <Copy size={16} className="text-silver" />
        )}
      </button>
      <pre className="p-6 overflow-x-auto text-sm leading-relaxed">
        <code className="text-ghost">{code}</code>
      </pre>
    </div>
  )

  const installCode = `pnpm add motion-icons
# or
npm install motion-icons
# or
yarn add motion-icons`

  const basicUsageCode = `import { Heart, Loader, Star } from 'motion-icons'

function App() {
  return (
    <div>
      {/* Default: scale animation on hover */}
      <Heart size={24} />

      {/* Custom motion type */}
      <Star motionType="rotate" />

      {/* Continuous loop animation */}
      <Loader motionType="spin" trigger="loop" />
    </div>
  )
}`

  const motionTypesCode = `// 9 motion types available
<Star motionType="scale" />      // Grow/shrink (default)
<Settings motionType="rotate" /> // Spin rotation
<ArrowRight motionType="translate" /> // Slide movement
<Bell motionType="shake" />      // Shake/wobble
<Heart motionType="pulse" />     // Heartbeat pulse
<Check motionType="bounce" />    // Spring bounce
<Eye motionType="draw" />        // SVG path draw
<Loader motionType="spin" />     // Continuous spin
<Menu motionType="none" />       // No animation`

  const triggerModesCode = `// 4 trigger modes
<Heart trigger="hover" />   // On hover (default)
<Heart trigger="loop" />    // Continuous loop
<Heart trigger="mount" />   // Once on mount
<Heart trigger="inView" />  // When scrolled into view`

  const providerCode = `import { IconProvider } from 'motion-icons'

// Disable all animations globally
<IconProvider config={{ animated: false }}>
  <App />
</IconProvider>

// Override at component level
<IconProvider config={{ animated: false }}>
  <Check />           {/* Static */}
  <Heart animated />  {/* Animated - overrides provider */}
</IconProvider>`

  const accessibilityCode = `// Decorative icons (default)
<Heart />  {/* aria-hidden="true" */}

// Meaningful icons with labels
<Heart aria-label="Add to favorites" />
<Check aria-label="Task completed" />`

  // Migration code examples
  const migrateLucideCode = `// Before: Lucide React
import { Heart, Star, Settings } from 'lucide-react'

<Heart size={24} strokeWidth={2} />
<Star className="text-yellow-500" />
<Settings onClick={handleClick} />

// After: MotionIcons (drop-in replacement + animations)
import { Heart, Star, Settings } from 'motion-icons'

<Heart size={24} strokeWidth={2} />                    // Works exactly the same
<Star className="text-yellow-500" motionType="rotate" /> // Now with animation!
<Settings onClick={handleClick} trigger="hover" />     // Interactive feedback`

  const migrateHeroiconsCode = `// Before: Heroicons
import { HeartIcon, StarIcon } from '@heroicons/react/24/outline'

<HeartIcon className="h-6 w-6" />
<StarIcon className="h-6 w-6 text-yellow-500" />

// After: MotionIcons
import { Heart, Star } from 'motion-icons'

<Heart size={24} />                               // size prop instead of classes
<Star size={24} className="text-yellow-500" motionType="pulse" />`

  const migrateReactIconsCode = `// Before: React Icons
import { FaHeart, FaStar } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'

<FaHeart size={24} />
<FaStar color="gold" />
<FiSettings />

// After: MotionIcons
import { Heart, Star, Settings } from 'motion-icons'

<Heart size={24} motionType="pulse" />           // Built-in animations
<Star className="text-yellow-500" />              // Use className for colors
<Settings motionType="rotate" trigger="hover" /> // Interactive rotation`

  const migrateFeatherCode = `// Before: Feather Icons
import { Heart, Star, Settings } from 'react-feather'

<Heart size={24} strokeWidth={2} />
<Star color="currentColor" />

// After: MotionIcons (nearly identical API)
import { Heart, Star, Settings } from 'motion-icons'

<Heart size={24} strokeWidth={2} />              // Same props work!
<Star className="text-current" motionType="scale" /> // className for color`

  // Framework code examples
  const nextAppRouterCode = `// app/layout.tsx - Next.js App Router
// Icons work in both Server and Client Components

// Server Component (default) - static icons only
import { Star, Check } from 'motion-icons'

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {/* Static icons render on server */}
        <nav>
          <Star size={24} animated={false} />
        </nav>
        {children}
      </body>
    </html>
  )
}

// app/components/InteractiveIcon.tsx
// Client Component - for animations
'use client'

import { Heart } from 'motion-icons'

export function LikeButton() {
  return (
    <button>
      <Heart motionType="pulse" trigger="hover" />
    </button>
  )
}`

  const nextPagesRouterCode = `// pages/_app.tsx - Next.js Pages Router
import { IconProvider } from 'motion-icons'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <IconProvider config={{ animated: true }}>
      <Component {...pageProps} />
    </IconProvider>
  )
}

// pages/index.tsx
import { Heart, Star, Loader } from 'motion-icons'

export default function Home() {
  return (
    <div>
      <Heart motionType="pulse" trigger="hover" />
      <Star motionType="rotate" />
      <Loader motionType="spin" trigger="loop" />
    </div>
  )
}`

  const remixCode = `// app/root.tsx - Remix
import { IconProvider } from 'motion-icons'

export default function App() {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <IconProvider config={{ animated: true }}>
          <Outlet />
        </IconProvider>
        <Scripts />
      </body>
    </html>
  )
}

// app/routes/_index.tsx
import { Heart, Star } from 'motion-icons'

export default function Index() {
  return (
    <div>
      <Heart motionType="pulse" />
      <Star motionType="scale" trigger="hover" />
    </div>
  )
}`

  const astroCode = `---
// src/components/AnimatedIcon.tsx
// Use client:load for interactive icons
---

// AnimatedIcon.tsx (React component)
import { Heart } from 'motion-icons'

export function AnimatedHeart() {
  return <Heart motionType="pulse" trigger="hover" />
}

// src/pages/index.astro
---
import { AnimatedHeart } from '../components/AnimatedIcon'
import { Star } from 'motion-icons'
---

<html>
  <body>
    <!-- Static icon (no JS needed) -->
    <Star size={24} animated={false} />

    <!-- Interactive icon (hydrated) -->
    <AnimatedHeart client:load />
  </body>
</html>`

  const viteCode = `// main.tsx - Vite + React
import React from 'react'
import ReactDOM from 'react-dom/client'
import { IconProvider } from 'motion-icons'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IconProvider config={{ animated: true }}>
      <App />
    </IconProvider>
  </React.StrictMode>
)

// App.tsx
import { Heart, Star, Settings, Loader } from 'motion-icons'

function App() {
  return (
    <div>
      <Heart motionType="pulse" trigger="hover" />
      <Star motionType="scale" />
      <Settings motionType="rotate" trigger="hover" />
      <Loader motionType="spin" trigger="loop" />
    </div>
  )
}`

  // Performance code examples
  const bundleOptimizationCode = `// Individual imports (recommended)
// Only bundles the icons you use
import { Heart, Star, Check } from 'motion-icons'

// Namespace import (larger bundle)
// Bundles entire icon library - avoid in production
import * as Icons from 'motion-icons'

// Dynamic imports for code splitting
const LazyHeart = lazy(() =>
  import('motion-icons').then(mod => ({ default: mod.Heart }))
)`

  const staticVsAnimatedCode = `// Use static icons for:
// - Navigation menus with many icons
// - Lists with repeated icons
// - Server-rendered content
<Star animated={false} />
<Check animated={false} />

// Use animated icons for:
// - Call-to-action buttons
// - Interactive elements
// - Status indicators
// - Empty states
<Heart motionType="pulse" trigger="hover" />
<Loader motionType="spin" trigger="loop" />`

  const reducedMotionCode = `// MotionIcons respects prefers-reduced-motion automatically
// No additional code needed!

// For manual control:
import { IconProvider } from 'motion-icons'

function App() {
  // Disable animations for all icons
  return (
    <IconProvider config={{ animated: false }}>
      <YourApp />
    </IconProvider>
  )
}

// Or per-icon override
<Heart animated={false} />  // Force static
<Heart animated />          // Force animated (override provider)`

  const lazyLoadingCode = `// Lazy load icons for routes/sections not immediately visible
import { lazy, Suspense } from 'react'

// Create lazy icon components
const LazySettingsIcon = lazy(() =>
  import('motion-icons').then(mod => ({ default: mod.Settings }))
)

function SettingsPanel() {
  return (
    <Suspense fallback={<div className="w-6 h-6 bg-gray-200 animate-pulse" />}>
      <LazySettingsIcon motionType="rotate" />
    </Suspense>
  )
}

// Route-based code splitting (Next.js example)
// Icons in dynamically imported components split automatically
const DashboardIcons = dynamic(() => import('./DashboardIcons'))`

  const sections = [
    { id: "installation", label: "Installation" },
    { id: "usage", label: "Basic Usage" },
    { id: "motion-types", label: "Motion Types" },
    { id: "triggers", label: "Trigger Modes" },
    { id: "animation", label: "Animation Control" },
    { id: "accessibility", label: "Accessibility" },
    { id: "api", label: "API Reference" },
    { id: "migration", label: "Migration Guide" },
    { id: "frameworks", label: "Framework Examples" },
    { id: "performance", label: "Performance" },
  ]

  const motionTypes = [
    { name: 'Scale', type: 'scale' as const, icon: Star, desc: 'Grow and shrink' },
    { name: 'Rotate', type: 'rotate' as const, icon: Settings, desc: 'Spin rotation' },
    { name: 'Translate', type: 'translate' as const, icon: ArrowRight, desc: 'Slide movement' },
    { name: 'Shake', type: 'shake' as const, icon: Bell, desc: 'Shake wobble' },
    { name: 'Pulse', type: 'pulse' as const, icon: Heart, desc: 'Heartbeat effect' },
    { name: 'Bounce', type: 'bounce' as const, icon: Check, desc: 'Spring bounce' },
    { name: 'Draw', type: 'draw' as const, icon: Eye, desc: 'Path drawing' },
    { name: 'Spin', type: 'spin' as const, icon: Loader, desc: 'Continuous spin' },
    { name: 'None', type: 'none' as const, icon: Menu, desc: 'No animation' },
  ]

  const triggerModes = [
    { name: 'hover', desc: 'Animate on mouse hover', default: true },
    { name: 'loop', desc: 'Continuous looping animation' },
    { name: 'mount', desc: 'Animate once when component mounts' },
    { name: 'inView', desc: 'Animate when scrolled into viewport' },
  ]

  return (
    <div className="min-h-screen bg-void">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-void/80 backdrop-blur-xl border-b border-graphite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-electric rounded-sm flex items-center justify-center">
              <Star size={18} className="text-void" />
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
              className="text-sm text-silver hover:text-electric transition-colors"
            >
              Playground
            </Link>
            <Link
              href="/docs"
              className="text-sm text-electric"
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
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                  className="text-sm text-silver hover:text-electric transition-colors py-2"
                >
                  Playground
                </Link>
                <Link
                  href="/docs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-electric py-2"
                >
                  Docs
                </Link>

                {/* Mobile section navigation */}
                <div className="mt-4 pt-4 border-t border-graphite">
                  <span className="text-xs text-steel uppercase tracking-wider mb-2 block">Sections</span>
                  {sections.map(section => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm text-silver hover:text-electric transition-colors py-1.5"
                    >
                      {section.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 fixed left-0 top-16 bottom-0 border-r border-graphite overflow-y-auto">
          <nav className="p-6 space-y-1">
            {sections.map(section => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block px-4 py-2 text-sm text-silver hover:text-electric hover:bg-carbon transition-colors"
              >
                {section.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="tag tag-electric mb-4 inline-block">Documentation</span>
            <h1 className="font-display text-4xl font-bold text-bone mb-4">
              Getting Started
            </h1>
            <p className="text-silver text-lg mb-12">
              350+ animated icons with 9 motion types and 4 trigger modes for React.
            </p>
          </motion.div>

          {/* Installation */}
          <section id="installation" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">1</span>
              Installation
            </h2>
            <p className="text-silver mb-6">
              Install MotionIcons using your package manager of choice:
            </p>
            <CodeBlock code={installCode} section="install" />
            <div className="mt-6 bg-carbon border border-graphite p-4">
              <h4 className="font-display font-semibold text-bone mb-2">Peer Dependencies</h4>
              <p className="text-sm text-silver">
                MotionIcons requires <code className="text-electric">react &gt;= 18.0.0</code> and <code className="text-electric">motion &gt;= 11.0.0</code>
              </p>
            </div>
          </section>

          <div className="divider my-12" />

          {/* Basic Usage */}
          <section id="usage" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">2</span>
              Basic Usage
            </h2>
            <p className="text-silver mb-6">
              Import icons individually and use them as React components. Every icon supports <code className="text-electric">motionType</code> and <code className="text-electric">trigger</code> props.
            </p>
            <CodeBlock code={basicUsageCode} section="usage" />

            <div className="mt-8 bg-carbon border border-graphite p-6">
              <h4 className="font-display font-semibold text-bone mb-3">Default Values</h4>
              <ul className="space-y-2 text-sm text-silver">
                <li className="flex items-center gap-3">
                  <span className="text-electric w-28">size</span>
                  <span className="text-steel">—</span>
                  <span>24 pixels</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-electric w-28">strokeWidth</span>
                  <span className="text-steel">—</span>
                  <span>2</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-electric w-28">motionType</span>
                  <span className="text-steel">—</span>
                  <span>"scale"</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-electric w-28">trigger</span>
                  <span className="text-steel">—</span>
                  <span>"hover"</span>
                </li>
              </ul>
            </div>
          </section>

          <div className="divider my-12" />

          {/* Motion Types */}
          <section id="motion-types" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">3</span>
              Motion Types
            </h2>
            <p className="text-silver mb-6">
              Choose from 9 distinct animation styles using the <code className="text-electric">motionType</code> prop:
            </p>

            {/* Interactive Demo Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3 mb-8">
              {motionTypes.map((item) => (
                <div key={item.name} className="group text-center">
                  <div className="aspect-square bg-carbon border border-graphite hover:border-electric/50 flex items-center justify-center cursor-pointer transition-colors">
                    <div className="text-electric">
                      <item.icon size={24} motionType={item.type} />
                    </div>
                  </div>
                  <span className="text-xs text-silver mt-2 block">{item.name}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-steel mb-6 text-center">Hover over icons to see each animation</p>

            <CodeBlock code={motionTypesCode} section="motionTypes" />

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              <div className="bg-carbon border border-graphite p-4">
                <h4 className="text-sm font-semibold text-bone mb-2">Transform</h4>
                <p className="text-xs text-silver">scale, rotate, translate, shake</p>
              </div>
              <div className="bg-carbon border border-graphite p-4">
                <h4 className="text-sm font-semibold text-bone mb-2">Emphasis</h4>
                <p className="text-xs text-silver">pulse, bounce</p>
              </div>
              <div className="bg-carbon border border-graphite p-4">
                <h4 className="text-sm font-semibold text-bone mb-2">Special</h4>
                <p className="text-xs text-silver">draw, spin, none</p>
              </div>
            </div>
          </section>

          <div className="divider my-12" />

          {/* Trigger Modes */}
          <section id="triggers" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">4</span>
              Trigger Modes
            </h2>
            <p className="text-silver mb-6">
              Control when animations play using the <code className="text-electric">trigger</code> prop:
            </p>

            {/* Interactive Trigger Demo */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {triggerModes.map((mode) => (
                <div key={mode.name} className="bg-carbon border border-graphite p-4">
                  <div className="flex items-center justify-between mb-3">
                    <code className="text-electric text-sm">{mode.name}</code>
                    {mode.default && <span className="tag text-xs">default</span>}
                  </div>
                  <div className="h-16 flex items-center justify-center border border-graphite/50 mb-3">
                    <Heart
                      size={28}
                      motionType="pulse"
                      trigger={mode.name as 'hover' | 'loop' | 'mount' | 'inView'}
                      className="text-electric"
                    />
                  </div>
                  <p className="text-xs text-silver">{mode.desc}</p>
                </div>
              ))}
            </div>

            <CodeBlock code={triggerModesCode} section="triggers" />
          </section>

          <div className="divider my-12" />

          {/* Animation Control */}
          <section id="animation" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">5</span>
              Animation Control
            </h2>
            <p className="text-silver mb-6">
              MotionIcons provides three layers of animation control:
            </p>

            <div className="space-y-4 mb-8">
              {[
                { level: "System", desc: "Respects prefers-reduced-motion automatically", priority: "Lowest" },
                { level: "Context", desc: "IconProvider controls all child icons", priority: "Medium" },
                { level: "Component", desc: "animated prop overrides everything", priority: "Highest" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-carbon border border-graphite p-4">
                  <span className="text-xs text-electric uppercase tracking-wider w-24 shrink-0">{item.level}</span>
                  <span className="text-sm text-silver flex-1">{item.desc}</span>
                  <span className="text-xs text-steel">{item.priority}</span>
                </div>
              ))}
            </div>

            <CodeBlock code={providerCode} section="provider" />
          </section>

          <div className="divider my-12" />

          {/* Accessibility */}
          <section id="accessibility" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">6</span>
              Accessibility
            </h2>
            <p className="text-silver mb-6">
              Icons are decorative by default (<code className="text-electric">aria-hidden="true"</code>). Add meaning with the <code className="text-electric">aria-label</code> prop:
            </p>
            <CodeBlock code={accessibilityCode} section="a11y" />

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="bg-carbon border border-graphite p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Check size={18} className="text-electric" />
                  <span className="text-sm font-semibold text-bone">Reduced Motion</span>
                </div>
                <p className="text-xs text-silver">
                  Animations disable automatically when prefers-reduced-motion is set
                </p>
              </div>
              <div className="bg-carbon border border-graphite p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Check size={18} className="text-electric" />
                  <span className="text-sm font-semibold text-bone">Screen Readers</span>
                </div>
                <p className="text-xs text-silver">
                  Use aria-label for meaningful icons, omit for decorative
                </p>
              </div>
            </div>
          </section>

          <div className="divider my-12" />

          {/* API Reference */}
          <section id="api" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">7</span>
              API Reference
            </h2>

            <h3 className="font-display font-semibold text-bone mb-4 mt-8">Icon Props</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-graphite">
                    <th className="text-left py-3 px-4 text-silver font-medium">Prop</th>
                    <th className="text-left py-3 px-4 text-silver font-medium">Type</th>
                    <th className="text-left py-3 px-4 text-silver font-medium">Default</th>
                    <th className="text-left py-3 px-4 text-silver font-medium hidden sm:table-cell">Description</th>
                  </tr>
                </thead>
                <tbody className="text-ghost">
                  <tr className="border-b border-graphite/50">
                    <td className="py-3 px-4 text-electric">size</td>
                    <td className="py-3 px-4">number</td>
                    <td className="py-3 px-4">24</td>
                    <td className="py-3 px-4 hidden sm:table-cell text-silver">Icon size in pixels</td>
                  </tr>
                  <tr className="border-b border-graphite/50">
                    <td className="py-3 px-4 text-electric">strokeWidth</td>
                    <td className="py-3 px-4">number</td>
                    <td className="py-3 px-4">2</td>
                    <td className="py-3 px-4 hidden sm:table-cell text-silver">SVG stroke width</td>
                  </tr>
                  <tr className="border-b border-graphite/50">
                    <td className="py-3 px-4 text-electric">motionType</td>
                    <td className="py-3 px-4 text-xs">MotionType</td>
                    <td className="py-3 px-4">"scale"</td>
                    <td className="py-3 px-4 hidden sm:table-cell text-silver">Animation style</td>
                  </tr>
                  <tr className="border-b border-graphite/50">
                    <td className="py-3 px-4 text-electric">trigger</td>
                    <td className="py-3 px-4 text-xs">TriggerType</td>
                    <td className="py-3 px-4">"hover"</td>
                    <td className="py-3 px-4 hidden sm:table-cell text-silver">When to animate</td>
                  </tr>
                  <tr className="border-b border-graphite/50">
                    <td className="py-3 px-4 text-electric">animated</td>
                    <td className="py-3 px-4">boolean</td>
                    <td className="py-3 px-4">undefined</td>
                    <td className="py-3 px-4 hidden sm:table-cell text-silver">Override animation state</td>
                  </tr>
                  <tr className="border-b border-graphite/50">
                    <td className="py-3 px-4 text-electric">className</td>
                    <td className="py-3 px-4">string</td>
                    <td className="py-3 px-4">undefined</td>
                    <td className="py-3 px-4 hidden sm:table-cell text-silver">CSS classes</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-electric">aria-label</td>
                    <td className="py-3 px-4">string</td>
                    <td className="py-3 px-4">undefined</td>
                    <td className="py-3 px-4 hidden sm:table-cell text-silver">Accessible label</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-display font-semibold text-bone mb-4 mt-10">MotionType</h3>
            <div className="bg-carbon border border-graphite p-4">
              <code className="text-sm text-ghost">
                "scale" | "rotate" | "translate" | "shake" | "pulse" | "bounce" | "draw" | "spin" | "none"
              </code>
            </div>

            <h3 className="font-display font-semibold text-bone mb-4 mt-8">TriggerType</h3>
            <div className="bg-carbon border border-graphite p-4">
              <code className="text-sm text-ghost">
                "hover" | "loop" | "mount" | "inView"
              </code>
            </div>

            <h3 className="font-display font-semibold text-bone mb-4 mt-10">IconProvider Props</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-graphite">
                    <th className="text-left py-3 px-4 text-silver font-medium">Prop</th>
                    <th className="text-left py-3 px-4 text-silver font-medium">Type</th>
                    <th className="text-left py-3 px-4 text-silver font-medium">Default</th>
                  </tr>
                </thead>
                <tbody className="text-ghost">
                  <tr className="border-b border-graphite/50">
                    <td className="py-3 px-4 text-electric">config.animated</td>
                    <td className="py-3 px-4">boolean</td>
                    <td className="py-3 px-4">true</td>
                  </tr>
                  <tr className="border-b border-graphite/50">
                    <td className="py-3 px-4 text-electric">config.defaultSize</td>
                    <td className="py-3 px-4">number</td>
                    <td className="py-3 px-4">24</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-electric">config.defaultStrokeWidth</td>
                    <td className="py-3 px-4">number</td>
                    <td className="py-3 px-4">2</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-display font-semibold text-bone mb-4 mt-10">Available Icons</h3>
            <p className="text-silver mb-4">
              350+ icons available. <Link href="/icons" className="text-electric hover:underline">Browse all icons →</Link>
            </p>
          </section>

          <div className="divider my-12" />

          {/* Migration Guide */}
          <section id="migration" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">8</span>
              Migration Guide
            </h2>
            <p className="text-silver mb-6">
              Migrating from another icon library? MotionIcons is designed to be a drop-in replacement with minimal changes required.
            </p>

            {/* Feature Comparison */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4">Feature Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-graphite">
                      <th className="text-left py-3 px-4 text-silver font-medium">Feature</th>
                      <th className="text-center py-3 px-4 text-silver font-medium">MotionIcons</th>
                      <th className="text-center py-3 px-4 text-silver font-medium">Lucide</th>
                      <th className="text-center py-3 px-4 text-silver font-medium">Heroicons</th>
                      <th className="text-center py-3 px-4 text-silver font-medium hidden sm:table-cell">React Icons</th>
                    </tr>
                  </thead>
                  <tbody className="text-ghost">
                    <tr className="border-b border-graphite/50">
                      <td className="py-3 px-4">Built-in Animations</td>
                      <td className="py-3 px-4 text-center"><Check size={16} className="text-electric mx-auto" /></td>
                      <td className="py-3 px-4 text-center"><X size={16} className="text-steel mx-auto" /></td>
                      <td className="py-3 px-4 text-center"><X size={16} className="text-steel mx-auto" /></td>
                      <td className="py-3 px-4 text-center hidden sm:table-cell"><X size={16} className="text-steel mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-graphite/50">
                      <td className="py-3 px-4">9 Motion Types</td>
                      <td className="py-3 px-4 text-center"><Check size={16} className="text-electric mx-auto" /></td>
                      <td className="py-3 px-4 text-center"><X size={16} className="text-steel mx-auto" /></td>
                      <td className="py-3 px-4 text-center"><X size={16} className="text-steel mx-auto" /></td>
                      <td className="py-3 px-4 text-center hidden sm:table-cell"><X size={16} className="text-steel mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-graphite/50">
                      <td className="py-3 px-4">Trigger Modes</td>
                      <td className="py-3 px-4 text-center"><Check size={16} className="text-electric mx-auto" /></td>
                      <td className="py-3 px-4 text-center"><X size={16} className="text-steel mx-auto" /></td>
                      <td className="py-3 px-4 text-center"><X size={16} className="text-steel mx-auto" /></td>
                      <td className="py-3 px-4 text-center hidden sm:table-cell"><X size={16} className="text-steel mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-graphite/50">
                      <td className="py-3 px-4">Context Provider</td>
                      <td className="py-3 px-4 text-center"><Check size={16} className="text-electric mx-auto" /></td>
                      <td className="py-3 px-4 text-center"><X size={16} className="text-steel mx-auto" /></td>
                      <td className="py-3 px-4 text-center"><X size={16} className="text-steel mx-auto" /></td>
                      <td className="py-3 px-4 text-center hidden sm:table-cell"><Check size={16} className="text-electric mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-graphite/50">
                      <td className="py-3 px-4">Reduced Motion Support</td>
                      <td className="py-3 px-4 text-center"><Check size={16} className="text-electric mx-auto" /></td>
                      <td className="py-3 px-4 text-center text-silver">N/A</td>
                      <td className="py-3 px-4 text-center text-silver">N/A</td>
                      <td className="py-3 px-4 text-center hidden sm:table-cell text-silver">N/A</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Tree Shakeable</td>
                      <td className="py-3 px-4 text-center"><Check size={16} className="text-electric mx-auto" /></td>
                      <td className="py-3 px-4 text-center"><Check size={16} className="text-electric mx-auto" /></td>
                      <td className="py-3 px-4 text-center"><Check size={16} className="text-electric mx-auto" /></td>
                      <td className="py-3 px-4 text-center hidden sm:table-cell"><Check size={16} className="text-electric mx-auto" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Lucide Migration */}
            <div className="mb-8">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="tag tag-electric text-xs">Lucide React</span>
                Near-identical API
              </h3>
              <p className="text-sm text-silver mb-4">
                MotionIcons shares the same API as Lucide React. Change your imports and enjoy animations.
              </p>
              <CodeBlock code={migrateLucideCode} section="migrate-lucide" />
            </div>

            {/* Heroicons Migration */}
            <div className="mb-8">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="tag tag-electric text-xs">Heroicons</span>
                Size prop conversion
              </h3>
              <p className="text-sm text-silver mb-4">
                Replace Tailwind size classes with the <code className="text-electric">size</code> prop.
              </p>
              <CodeBlock code={migrateHeroiconsCode} section="migrate-heroicons" />
            </div>

            {/* React Icons Migration */}
            <div className="mb-8">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="tag tag-electric text-xs">React Icons</span>
                Single import source
              </h3>
              <p className="text-sm text-silver mb-4">
                No more importing from different icon packs. All icons from one source.
              </p>
              <CodeBlock code={migrateReactIconsCode} section="migrate-reacticons" />
            </div>

            {/* Feather Icons Migration */}
            <div className="mb-8">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="tag tag-electric text-xs">Feather Icons</span>
                Almost identical
              </h3>
              <p className="text-sm text-silver mb-4">
                Same prop names, same API. Just swap the import and add animations.
              </p>
              <CodeBlock code={migrateFeatherCode} section="migrate-feather" />
            </div>

            <div className="bg-carbon border border-graphite p-6">
              <h4 className="font-display font-semibold text-bone mb-3">Migration Checklist</h4>
              <ul className="space-y-2 text-sm text-silver">
                <li className="flex items-start gap-3">
                  <Check size={16} className="text-electric mt-0.5 shrink-0" />
                  <span>Update import statements to use <code className="text-electric">motion-icons</code></span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={16} className="text-electric mt-0.5 shrink-0" />
                  <span>Replace <code className="text-electric">color</code> prop with <code className="text-electric">className</code></span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={16} className="text-electric mt-0.5 shrink-0" />
                  <span>Convert Tailwind size classes to <code className="text-electric">size</code> prop</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={16} className="text-electric mt-0.5 shrink-0" />
                  <span>Add <code className="text-electric">motionType</code> and <code className="text-electric">trigger</code> for animations</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={16} className="text-electric mt-0.5 shrink-0" />
                  <span>Wrap app in <code className="text-electric">IconProvider</code> for global config (optional)</span>
                </li>
              </ul>
            </div>
          </section>

          <div className="divider my-12" />

          {/* Framework Examples */}
          <section id="frameworks" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">9</span>
              Framework Examples
            </h2>
            <p className="text-silver mb-6">
              MotionIcons works with any React framework. Here are setup patterns for popular choices.
            </p>

            {/* Next.js App Router */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="tag tag-electric text-xs">Next.js</span>
                App Router (React Server Components)
              </h3>
              <div className="bg-carbon border border-graphite p-4 mb-4">
                <p className="text-sm text-silver">
                  <strong className="text-bone">Key insight:</strong> Use <code className="text-electric">animated=&#123;false&#125;</code> in Server Components for static icons.
                  Wrap interactive icons in Client Components with <code className="text-electric">&apos;use client&apos;</code>.
                </p>
              </div>
              <CodeBlock code={nextAppRouterCode} section="next-app" />
            </div>

            {/* Next.js Pages Router */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="tag tag-electric text-xs">Next.js</span>
                Pages Router
              </h3>
              <p className="text-sm text-silver mb-4">
                Standard client-side rendering. Wrap with <code className="text-electric">IconProvider</code> in <code className="text-electric">_app.tsx</code>.
              </p>
              <CodeBlock code={nextPagesRouterCode} section="next-pages" />
            </div>

            {/* Remix */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="tag tag-electric text-xs">Remix</span>
                Full-stack React
              </h3>
              <p className="text-sm text-silver mb-4">
                Add <code className="text-electric">IconProvider</code> in your root layout for app-wide configuration.
              </p>
              <CodeBlock code={remixCode} section="remix" />
            </div>

            {/* Astro */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="tag tag-electric text-xs">Astro</span>
                Island Architecture
              </h3>
              <div className="bg-carbon border border-graphite p-4 mb-4">
                <p className="text-sm text-silver">
                  <strong className="text-bone">Key insight:</strong> Use <code className="text-electric">client:load</code> directive for interactive icons.
                  Static icons can render without JavaScript.
                </p>
              </div>
              <CodeBlock code={astroCode} section="astro" />
            </div>

            {/* Vite */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="tag tag-electric text-xs">Vite</span>
                React SPA
              </h3>
              <p className="text-sm text-silver mb-4">
                Standard React setup. Add <code className="text-electric">IconProvider</code> at the root.
              </p>
              <CodeBlock code={viteCode} section="vite" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-carbon border border-graphite p-4">
                <h4 className="text-sm font-semibold text-bone mb-2">SSR Frameworks</h4>
                <p className="text-xs text-silver">
                  Next.js, Remix, Astro - Use <code className="text-electric">animated=&#123;false&#125;</code> for server-rendered icons
                </p>
              </div>
              <div className="bg-carbon border border-graphite p-4">
                <h4 className="text-sm font-semibold text-bone mb-2">SPA Frameworks</h4>
                <p className="text-xs text-silver">
                  Vite, Create React App - Full animation support out of the box
                </p>
              </div>
            </div>
          </section>

          <div className="divider my-12" />

          {/* Performance Best Practices */}
          <section id="performance" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">10</span>
              Performance Best Practices
            </h2>
            <p className="text-silver mb-6">
              Optimize bundle size and runtime performance with these strategies.
            </p>

            {/* Bundle Size */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4">Bundle Size Optimization</h3>
              <div className="bg-carbon border border-graphite p-4 mb-4">
                <p className="text-sm text-silver">
                  <strong className="text-bone">Tree shaking:</strong> Individual imports only bundle the icons you use.
                  Avoid <code className="text-electric">import *</code> in production builds.
                </p>
              </div>
              <CodeBlock code={bundleOptimizationCode} section="bundle" />

              <div className="mt-6 grid sm:grid-cols-3 gap-4">
                <div className="bg-carbon border border-graphite p-4 text-center">
                  <div className="text-2xl font-bold text-electric mb-1">~1KB</div>
                  <div className="text-xs text-silver">Per icon (gzipped)</div>
                </div>
                <div className="bg-carbon border border-graphite p-4 text-center">
                  <div className="text-2xl font-bold text-electric mb-1">~8KB</div>
                  <div className="text-xs text-silver">Motion runtime (shared)</div>
                </div>
                <div className="bg-carbon border border-graphite p-4 text-center">
                  <div className="text-2xl font-bold text-bone mb-1">350+</div>
                  <div className="text-xs text-silver">Icons available</div>
                </div>
              </div>
            </div>

            {/* Static vs Animated */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4">When to Use Static vs Animated Icons</h3>
              <p className="text-sm text-silver mb-4">
                Not every icon needs animation. Use animations purposefully for better UX.
              </p>
              <CodeBlock code={staticVsAnimatedCode} section="static-animated" />

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="bg-carbon border border-graphite p-4">
                  <h4 className="text-sm font-semibold text-bone mb-3 flex items-center gap-2">
                    <Star size={16} className="text-steel" />
                    Static Icons
                  </h4>
                  <ul className="space-y-1 text-xs text-silver">
                    <li>Navigation menus</li>
                    <li>Data tables with icons</li>
                    <li>Lists with many items</li>
                    <li>Server-rendered content</li>
                  </ul>
                </div>
                <div className="bg-carbon border border-graphite p-4">
                  <h4 className="text-sm font-semibold text-bone mb-3 flex items-center gap-2">
                    <Heart size={16} motionType="pulse" className="text-electric" />
                    Animated Icons
                  </h4>
                  <ul className="space-y-1 text-xs text-silver">
                    <li>Call-to-action buttons</li>
                    <li>Loading states</li>
                    <li>Success/error feedback</li>
                    <li>Interactive elements</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Reduced Motion */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4">Reducing Motion for Accessibility</h3>
              <p className="text-sm text-silver mb-4">
                MotionIcons automatically respects <code className="text-electric">prefers-reduced-motion</code>. You can also control it manually.
              </p>
              <CodeBlock code={reducedMotionCode} section="reduced-motion" />

              <div className="mt-6 bg-carbon border border-graphite p-4">
                <div className="flex items-start gap-3">
                  <Check size={18} className="text-electric mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-bone font-semibold mb-1">Automatic Detection</p>
                    <p className="text-xs text-silver">
                      When users have <code className="text-electric">prefers-reduced-motion: reduce</code> enabled in their OS settings,
                      all animations are automatically disabled without any code changes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lazy Loading */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4">Lazy Loading Strategies</h3>
              <p className="text-sm text-silver mb-4">
                Split icon bundles across routes for faster initial page loads.
              </p>
              <CodeBlock code={lazyLoadingCode} section="lazy-loading" />

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="bg-carbon border border-graphite p-4">
                  <h4 className="text-sm font-semibold text-bone mb-2">Route-based Splitting</h4>
                  <p className="text-xs text-silver">
                    Icons in dynamically imported route components are automatically code-split by bundlers.
                  </p>
                </div>
                <div className="bg-carbon border border-graphite p-4">
                  <h4 className="text-sm font-semibold text-bone mb-2">Component-based Splitting</h4>
                  <p className="text-xs text-silver">
                    Use <code className="text-electric">React.lazy()</code> for icons in modals, drawers, or below-fold content.
                  </p>
                </div>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="bg-carbon border border-graphite p-6">
              <h4 className="font-display font-semibold text-bone mb-4">Performance Checklist</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm text-silver">
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-electric mt-0.5 shrink-0" />
                    <span>Use individual imports, not namespace</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-electric mt-0.5 shrink-0" />
                    <span>Set <code className="text-electric">animated=&#123;false&#125;</code> for static icons</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-electric mt-0.5 shrink-0" />
                    <span>Use <code className="text-electric">trigger=&quot;hover&quot;</code> over <code className="text-electric">trigger=&quot;loop&quot;</code></span>
                  </li>
                </ul>
                <ul className="space-y-2 text-sm text-silver">
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-electric mt-0.5 shrink-0" />
                    <span>Lazy load icons in modals/drawers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-electric mt-0.5 shrink-0" />
                    <span>Use <code className="text-electric">inView</code> trigger for long pages</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-electric mt-0.5 shrink-0" />
                    <span>Test with reduced motion enabled</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="mt-16 bg-carbon border border-graphite p-8 text-center">
            <h3 className="font-display text-xl font-bold text-bone mb-4">
              Ready to explore?
            </h3>
            <Link href="/icons" className="btn-primary inline-flex items-center gap-2">
              Browse All 350+ Icons
              <ArrowRight size={18} />
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}
