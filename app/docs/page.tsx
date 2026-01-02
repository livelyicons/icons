"use client"

import Link from "next/link"
import { motion } from "motion/react"
import {
  Star, Check, ArrowRight, Copy, Heart, Settings,
  Bell, Loader, Eye, Menu
} from "../../src/icons"
import { useState } from "react"

export default function DocsPage() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

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

  const sections = [
    { id: "installation", label: "Installation" },
    { id: "usage", label: "Basic Usage" },
    { id: "motion-types", label: "Motion Types" },
    { id: "triggers", label: "Trigger Modes" },
    { id: "animation", label: "Animation Control" },
    { id: "accessibility", label: "Accessibility" },
    { id: "api", label: "API Reference" },
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
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-electric rounded-sm flex items-center justify-center">
              <Star size={18} className="text-void" />
            </div>
            <span className="font-display font-bold text-lg text-bone">
              MotionIcons
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <Link
              href="/icons"
              className="text-sm text-silver hover:text-electric transition-colors"
            >
              Icons
            </Link>
            <Link
              href="/docs"
              className="text-sm text-electric"
            >
              Docs
            </Link>
          </div>
        </div>
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
        <main className="flex-1 lg:ml-64 max-w-4xl mx-auto px-6 py-12">
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
