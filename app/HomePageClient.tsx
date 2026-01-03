"use client"

import Link from "next/link"
import { motion } from "motion/react"
import {
  Check, Heart, Star, Bell, Settings,
  Search, Refresh, Loader, ArrowRight,
  Copy, Download, Eye, Mail,
  User, Home, Calendar, Menu
} from "../src/icons"
import { Navigation } from "./components/Navigation"

export default function HomePageClient() {
  const features = [
    {
      icon: <Refresh size={24} />,
      title: "Smooth Motion",
      description: "Powered by Motion for silky 60fps animations"
    },
    {
      icon: <Settings size={24} />,
      title: "Full Control",
      description: "Component, context, or system-level animation control"
    },
    {
      icon: <Eye size={24} />,
      title: "Accessible",
      description: "Respects prefers-reduced-motion automatically"
    },
    {
      icon: <Copy size={24} />,
      title: "TypeScript",
      description: "Full type safety with excellent IDE support"
    }
  ]

  const codeExample = `import { Heart, Loader, Star } from 'lively-icons'

// 9 lively types × 4 trigger modes
<Heart lively="pulse" />
<Star lively="scale" trigger="hover" />
<Loader lively="spin" trigger="loop" />

// Trigger modes:
// hover (default), loop, mount, inView

// Lively types:
// scale, rotate, translate, shake
// pulse, bounce, draw, spin, none`

  return (
    <div className="min-h-screen bg-void">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 grid-bg opacity-50" />

        {/* Gradient orbs - use max-w to prevent mobile overflow */}
        <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-electric/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-plasma/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="tag tag-electric">
              1300+ Icons • 9 Motion Types
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
          >
            <span className="text-bone">Icons that</span>
            <br />
            <span className="gradient-text">come alive</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-silver max-w-2xl mx-auto mb-12"
          >
            A React icon library with beautiful hover animations.
            Powered by Motion. Accessible by default.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
          >
            <Link href="/icons" className="btn-primary flex items-center gap-2">
              Browse Icons
              <ArrowRight size={18} />
            </Link>
            <Link href="/docs" className="btn-secondary">
              Documentation
            </Link>
          </motion.div>

          {/* Icon Demo Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-3xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent z-10 pointer-events-none" />

            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-1">
              {[
                Check, Heart, Star, Bell, Settings, Search, Refresh, Loader,
                Menu, Copy, Download, Eye, Mail, User, Home, Calendar
              ].map((Icon, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.03 }}
                  className="aspect-square bg-carbon border border-graphite flex items-center justify-center hover:border-electric/50 hover:bg-graphite transition-all duration-300 cursor-pointer group"
                >
                  <div className="text-silver group-hover:text-electric transition-colors">
                    <Icon size={24} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-steel rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-silver rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Features */}
            <div className="min-w-0">
              <span className="tag mb-4 inline-block">Why LivelyIcons</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone mb-6">
                Built for modern React
              </h2>
              <p className="text-silver mb-8 sm:mb-12 break-words">
                Every icon is a fully typed React component with customizable size,
                stroke width, and animation behavior.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group min-w-0"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-carbon border border-graphite flex items-center justify-center text-electric group-hover:border-electric/50 transition-colors">
                        {feature.icon}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display font-semibold text-bone mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-silver break-words">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Code Example */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-leaf/5 to-sage/5 blur-xl" />
              <div className="relative code-block overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-graphite">
                  <div className="w-3 h-3 rounded-full bg-amber" />
                  <div className="w-3 h-3 rounded-full bg-leaf-dim" />
                  <div className="w-3 h-3 rounded-full bg-leaf" />
                  <span className="ml-4 text-xs text-silver">example.tsx</span>
                </div>
                <pre className="p-6 overflow-x-auto text-sm leading-relaxed">
                  <code className="text-ghost">{codeExample}</code>
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Animation Types Section */}
      <section className="py-16 sm:py-32 bg-carbon relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="tag mb-4 inline-block">Animation Types</span>
            <h2 className="font-display text-4xl font-bold text-bone">
              9 distinct animation styles
            </h2>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-4">
            {[
              { name: 'Scale', icon: Star, type: 'scale' as const },
              { name: 'Rotate', icon: Settings, type: 'rotate' as const },
              { name: 'Translate', icon: ArrowRight, type: 'translate' as const },
              { name: 'Shake', icon: Bell, type: 'shake' as const },
              { name: 'Pulse', icon: Heart, type: 'pulse' as const },
              { name: 'Bounce', icon: Check, type: 'bounce' as const },
              { name: 'Draw', icon: Eye, type: 'draw' as const },
              { name: 'Spin', icon: Loader, type: 'spin' as const },
              { name: 'None', icon: Menu, type: 'none' as const },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group text-center"
              >
                <div className="aspect-square bg-graphite border border-electric/30 flex items-center justify-center mb-3 cursor-pointer">
                  <div className="text-electric">
                    <item.icon size={28} lively={item.type} trigger="loop" />
                  </div>
                </div>
                <span className="text-xs text-silver uppercase tracking-wider">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-carbon to-void" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-bone mb-6">
              Start building with
              <span className="gradient-text"> animated icons</span>
            </h2>
            <p className="text-lg text-silver mb-10 max-w-2xl mx-auto">
              1300+ beautifully crafted icons with 9 motion types, ready to bring life to your React applications.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/icons" className="btn-primary flex items-center justify-center gap-2">
                Explore All Icons
                <ArrowRight size={18} />
              </Link>
              <Link href="/docs" className="btn-secondary">
                Read Documentation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 border-t border-graphite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-leaf rounded-sm flex items-center justify-center">
                {/* Leaf icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-void">
                  <path
                    d="M12 3C7 3 3 7 3 12C3 14 4 16 6 17.5C8 19 10 19.5 12 19.5C14 19.5 16 19 18 17.5C20 16 21 14 21 12C21 7 17 3 12 3Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 19.5V12M12 12C12 12 9 9 6 8"
                    stroke="var(--color-moss)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="text-sm text-silver">
                LivelyIcons
              </span>
            </div>

            <p className="text-sm text-silver">
              Built with Motion for React
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
