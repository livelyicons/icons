"use client"

import Link from "next/link"
import { motion } from "motion/react"
import {
  Monitor, PenTool, ArrowRight, Check, Download
} from "../../src/icons"
import { Navigation } from "../components/Navigation"
import { LogoWithText } from "../components/Logo"

const plugins = [
  {
    id: 'vscode',
    name: 'VS Code Extension',
    tagline: 'For Developers',
    description: 'Browse, preview, and insert animated icons directly in your code editor. Generate React, Vue, or SVG code with one click.',
    icon: Monitor,
    color: '#007ACC',
    href: '/plugins/vscode',
    installUrl: 'https://marketplace.visualstudio.com/items?itemName=livelyicons.livelyicons-picker',
    features: [
      'Fuzzy search across 1,300+ icons',
      'Live animation preview',
      'React/Vue/SVG code generation',
      'Favorites and recent icons',
      'Direct code insertion'
    ]
  },
  {
    id: 'figma',
    name: 'Figma Plugin',
    tagline: 'For Designers',
    description: 'Browse, customize, and insert 1,319 animated icons directly into your designs. Fully editable vectors with zero network required.',
    icon: PenTool,
    color: '#a259ff',
    href: '/plugins/figma',
    installUrl: 'https://www.figma.com/community/plugin/livelyicons',
    features: [
      '1,319 animated icons',
      '36 organized categories',
      'Size, stroke, color customization',
      'Insert as editable vectors',
      'Works completely offline'
    ]
  }
]

export default function PluginsPageClient() {
  return (
    <div className="min-h-screen bg-void">
      <Navigation />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-plasma/10 rounded-full blur-[120px]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="tag tag-electric mb-4 inline-block">Plugins & Extensions</span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-bone mb-6">
                LivelyIcons everywhere
              </h1>
              <p className="text-lg sm:text-xl text-silver max-w-2xl mx-auto">
                Use animated icons directly in your favorite tools.
                Available for VS Code and Figma, with more integrations coming soon.
              </p>
            </motion.div>

            {/* Plugin Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {plugins.map((plugin, i) => (
                <motion.div
                  key={plugin.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-carbon border border-graphite overflow-hidden hover:border-electric/30 transition-colors group"
                >
                  {/* Header */}
                  <div
                    className="p-6 border-b border-graphite"
                    style={{ background: `linear-gradient(135deg, ${plugin.color}10 0%, transparent 100%)` }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-14 h-14 flex items-center justify-center"
                        style={{ backgroundColor: `${plugin.color}20`, border: `1px solid ${plugin.color}30` }}
                      >
                        <span style={{ color: plugin.color }}><plugin.icon size={28} /></span>
                      </div>
                      <div>
                        <h2 className="font-display text-xl font-bold text-bone">{plugin.name}</h2>
                        <span className="text-sm" style={{ color: plugin.color }}>{plugin.tagline}</span>
                      </div>
                    </div>
                    <p className="text-silver">{plugin.description}</p>
                  </div>

                  {/* Features */}
                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      {plugin.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm">
                          <span style={{ color: plugin.color }} className="shrink-0"><Check size={16} /></span>
                          <span className="text-ghost">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex gap-3">
                      <Link
                        href={plugin.href}
                        className="flex-1 btn-secondary text-center flex items-center justify-center gap-2"
                      >
                        Learn More
                        <ArrowRight size={16} />
                      </Link>
                      <span
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-white opacity-60 cursor-not-allowed"
                        style={{ backgroundColor: plugin.color }}
                      >
                        Coming Soon
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16 sm:py-24 bg-carbon">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone mb-4">
                Which plugin is right for you?
              </h2>
              <p className="text-silver max-w-2xl mx-auto">
                Both plugins provide access to the full LivelyIcons library.
                Choose based on your workflow.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* VS Code */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-void border border-graphite p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Monitor size={24} className="text-[#007ACC]" />
                  <h3 className="font-display text-lg font-semibold text-bone">VS Code Extension</h3>
                </div>
                <p className="text-silver mb-6">Best for developers who want to:</p>
                <ul className="space-y-3">
                  {[
                    'Insert icon code directly into editor',
                    'Generate React/Vue components',
                    'Preview animations before using',
                    'Access icons without leaving the IDE',
                    'Copy code to clipboard instantly'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <Check size={16} className="text-[#007ACC] shrink-0" />
                      <span className="text-ghost">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Figma */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-void border border-graphite p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <PenTool size={24} className="text-[#a259ff]" />
                  <h3 className="font-display text-lg font-semibold text-bone">Figma Plugin</h3>
                </div>
                <p className="text-silver mb-6">Best for designers who want to:</p>
                <ul className="space-y-3">
                  {[
                    'Insert icons into design files',
                    'Customize colors and sizes visually',
                    'Work with editable vector paths',
                    'Build consistent icon systems',
                    'Export for development handoff'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <Check size={16} className="text-[#a259ff] shrink-0" />
                      <span className="text-ghost">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Coming Soon */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <span className="tag mb-4 inline-block">Coming Soon</span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-bone mb-4">
                More integrations on the way
              </h2>
              <p className="text-silver max-w-xl mx-auto mb-8">
                We're working on bringing LivelyIcons to more tools and platforms.
                Have a suggestion? Let us know on GitHub.
              </p>
              <a
                href="https://github.com/livelyicons/icons/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                Request Integration
                <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-graphite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/">
              <LogoWithText iconSize={24} />
            </Link>
            <p className="text-sm text-silver">
              Built with Motion for React
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
