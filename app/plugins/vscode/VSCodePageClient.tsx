"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Code,
  Search,
  Palette,
  Zap,
  Copy,
  Download,
  Heart,
  Star,
  Clock,
  Grid3x3,
  Settings,
  Eye,
  ArrowRight,
  Check,
  Sparkles,
  Monitor,
  Terminal,
} from "../../../src/icons";
import { Navigation } from "../../components/Navigation";
import { LogoWithText } from "../../components/Logo";

const features = [
  {
    icon: Search,
    title: "Intelligent Search",
    description:
      "Fuzzy search across 1,300+ icons. Find what you need instantly with keyword matching and synonyms.",
  },
  {
    icon: Grid3x3,
    title: "Visual Browser",
    description:
      "Browse icons in a beautiful grid view. Filter by 36 categories to find the perfect icon.",
  },
  {
    icon: Palette,
    title: "Live Customization",
    description:
      "Adjust size, stroke width, and color in real-time. Preview exactly what you'll get.",
  },
  {
    icon: Sparkles,
    title: "Animation Preview",
    description:
      "See animations in action before you insert. Choose from 9 motion types and 4 trigger modes.",
  },
  {
    icon: Code,
    title: "Smart Code Generation",
    description:
      "Generate React, Vue, or raw SVG code. Automatically includes all your customizations.",
  },
  {
    icon: Heart,
    title: "Favorites & History",
    description:
      "Bookmark frequently used icons. Access your recent icons for faster workflow.",
  },
];

const motionTypes = [
  { name: "Scale", description: "Grows and shrinks on interaction" },
  { name: "Rotate", description: "Smooth rotation animation" },
  { name: "Translate", description: "Horizontal movement" },
  { name: "Shake", description: "Attention-grabbing shake" },
  { name: "Pulse", description: "Opacity pulsing effect" },
  { name: "Bounce", description: "Playful bouncing motion" },
  { name: "Draw", description: "SVG path drawing" },
  { name: "Spin", description: "Continuous rotation" },
  { name: "None", description: "Static, no animation" },
];

export default function VSCodePageClient() {
  return (
    <div className="min-h-screen bg-void">
      <Navigation />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#007ACC]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric/10 rounded-full blur-[120px]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* VS Code Badge */}
              <div className="inline-flex items-center gap-2 bg-[#007ACC]/20 border border-[#007ACC]/30 px-4 py-2 mb-8">
                <Monitor size={18} className="text-[#007ACC]" />
                <span className="text-sm text-[#007ACC] font-medium">
                  VS Code Extension - Coming Soon
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-bone mb-6">
                LivelyIcons for
                <span className="text-[#007ACC]"> VS Code</span>
              </h1>

              <p className="text-lg sm:text-xl text-silver max-w-2xl mx-auto mb-10">
                Browse, preview, and insert animated icons directly in your
                editor. No context switching. Just beautiful, animated icons at
                your fingertips.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <span className="btn-primary flex items-center justify-center gap-2 opacity-60 cursor-not-allowed">
                  Coming Soon
                </span>
                <a
                  href="https://github.com/livelyicons/icons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  View on GitHub
                  <ArrowRight size={18} />
                </a>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16 relative"
            >
              <div className="bg-carbon border border-graphite overflow-hidden max-w-4xl mx-auto">
                {/* Mock VS Code Title Bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#1e1e1e] border-b border-graphite">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27ca3f]" />
                  </div>
                  <span className="ml-4 text-xs text-silver">
                    LivelyIcons Picker - Visual Studio Code
                  </span>
                </div>

                {/* Mock Extension Panel */}
                <div className="grid grid-cols-[200px_1fr] min-h-[400px]">
                  {/* Sidebar */}
                  <div className="bg-[#252526] border-r border-graphite p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Search size={16} className="text-silver" />
                      <div className="flex-1 h-7 bg-[#3c3c3c] rounded px-2 flex items-center">
                        <span className="text-xs text-steel">
                          Search icons...
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="text-silver/50 uppercase tracking-wider mb-2">
                        Categories
                      </div>
                      {[
                        "All Icons",
                        "UI",
                        "Arrows",
                        "Media",
                        "Communication",
                      ].map((cat, i) => (
                        <div
                          key={cat}
                          className={`px-2 py-1.5 cursor-pointer transition-colors ${
                            i === 0
                              ? "bg-electric/20 text-electric"
                              : "text-silver hover:bg-graphite"
                          }`}
                        >
                          {cat}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main Panel */}
                  <div className="p-4">
                    <div className="grid grid-cols-6 gap-2 mb-6">
                      {[
                        Heart,
                        Star,
                        Settings,
                        Eye,
                        Code,
                        Search,
                        Zap,
                        Copy,
                        Download,
                        Grid3x3,
                        Clock,
                        Terminal,
                      ].map((Icon, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + i * 0.05 }}
                          className={`aspect-square bg-graphite/50 border border-graphite flex items-center justify-center cursor-pointer hover:border-electric/50 transition-colors ${
                            i === 0 ? "border-electric bg-electric/10" : ""
                          }`}
                        >
                          <Icon
                            size={20}
                            className={
                              i === 0 ? "text-electric" : "text-silver"
                            }
                            lively={i === 0 ? "pulse" : "none"}
                            trigger={i === 0 ? "loop" : "hover"}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Customization Panel */}
                    <div className="bg-[#1e1e1e] border border-graphite p-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-bone font-medium">
                          Heart
                        </span>
                        <span className="text-xs text-silver">
                          UI / Actions
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-xs">
                        <div>
                          <div className="text-silver/50 mb-1">Size</div>
                          <div className="text-ghost">24px</div>
                        </div>
                        <div>
                          <div className="text-silver/50 mb-1">Lively</div>
                          <div className="text-electric">pulse</div>
                        </div>
                        <div>
                          <div className="text-silver/50 mb-1">Trigger</div>
                          <div className="text-ghost">hover</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 sm:py-24 bg-carbon">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="tag tag-electric mb-4 inline-block">
                Features
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone">
                Everything you need, in your editor
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-void border border-graphite p-6 hover:border-electric/30 transition-colors group"
                >
                  <div className="w-12 h-12 bg-graphite border border-electric/20 flex items-center justify-center mb-4 group-hover:border-electric/40 transition-colors">
                    <feature.icon size={24} className="text-electric" />
                  </div>
                  <h3 className="font-display font-semibold text-bone mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-silver">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Animation Types */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="tag mb-4 inline-block">9 Animation Types</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone mb-4">
                Pick the perfect motion
              </h2>
              <p className="text-silver max-w-2xl mx-auto">
                Preview any animation style directly in VS Code. Choose from 9
                motion types and see exactly how your icons will animate.
              </p>
            </motion.div>

            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
              {motionTypes.map((type, i) => (
                <motion.div
                  key={type.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="text-center group"
                >
                  <div className="aspect-square bg-carbon border border-graphite flex items-center justify-center mb-2 group-hover:border-electric/50 transition-colors">
                    <Star
                      size={24}
                      className="text-silver group-hover:text-electric transition-colors"
                      lively={
                        type.name.toLowerCase() as
                          | "scale"
                          | "rotate"
                          | "translate"
                          | "shake"
                          | "pulse"
                          | "bounce"
                          | "draw"
                          | "spin"
                          | "none"
                      }
                      trigger="loop"
                    />
                  </div>
                  <span className="text-xs text-ghost">{type.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Code Generation */}
        <section className="py-16 sm:py-24 bg-carbon">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="tag tag-electric mb-4 inline-block">
                  Code Generation
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone mb-6">
                  Insert code in one click
                </h2>
                <p className="text-silver mb-8">
                  The extension generates ready-to-use code with all your
                  customizations applied. Insert directly into your editor or
                  copy to clipboard. Supports React, Vue, and raw SVG.
                </p>

                <ul className="space-y-4">
                  {[
                    "React/JSX component with props",
                    "Vue template with bindings",
                    "Raw SVG with custom attributes",
                    "Automatic import statements",
                    "All customizations included",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check size={18} className="text-electric shrink-0" />
                      <span className="text-ghost">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-void border border-graphite overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-graphite">
                    <div className="w-3 h-3 rounded-full bg-amber" />
                    <div className="w-3 h-3 rounded-full bg-leaf-dim" />
                    <div className="w-3 h-3 rounded-full bg-leaf" />
                    <span className="ml-4 text-xs text-silver">
                      Generated Code
                    </span>
                  </div>
                  <pre className="p-6 text-sm leading-relaxed overflow-x-auto">
                    <code className="text-ghost">{`import { Heart } from 'livelyicons'

<Heart
  size={24}
  strokeWidth={2}
  lively="pulse"
  trigger="hover"
  className="text-rose-500"
/>`}</code>
                  </pre>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-carbon to-void" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone mb-6">
                Ready to supercharge your workflow?
              </h2>
              <p className="text-lg text-silver mb-10 max-w-2xl mx-auto">
                Install the VS Code extension and start using animated icons in
                your projects today. It's free, open-source, and takes seconds
                to set up.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <span className="btn-primary flex items-center justify-center gap-2 opacity-60 cursor-not-allowed">
                  Coming Soon
                </span>
                <Link
                  href="/plugins/figma"
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  Try Figma Plugin
                  <ArrowRight size={18} />
                </Link>
              </div>
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
            <p className="text-sm text-silver">Built with Motion for React</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
