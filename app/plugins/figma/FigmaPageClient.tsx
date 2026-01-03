"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Palette,
  Search,
  Grid3x3,
  Download,
  Copy,
  Eye,
  Heart,
  Star,
  Settings,
  Zap,
  ArrowRight,
  Check,
  Sparkles,
  Package,
  PenTool,
  MoveHorizontal,
  Refresh,
} from "../../../src/icons";
import { Navigation } from "../../components/Navigation";
import { LogoWithText } from "../../components/Logo";

const features = [
  {
    icon: Grid3x3,
    title: "1,319 Animated Icons",
    description:
      "Massive library of beautifully designed icons organized into 36 categories. Find the perfect icon for any design.",
  },
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Fuzzy search with synonyms and keywords. Type 'close' to find 'x', or 'mail' to find 'email'.",
  },
  {
    icon: Palette,
    title: "Full Customization",
    description:
      "Adjust size (16-64px), stroke width (0.5-4), and colors. See changes in real-time preview.",
  },
  {
    icon: Package,
    title: "Editable Vectors",
    description:
      "Icons insert as fully editable vector paths. Modify, combine, and customize in Figma.",
  },
  {
    icon: Copy,
    title: "Multiple Export Formats",
    description:
      "Export as SVG, React components, or Vue templates. Copy code with one click.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Plugin loads in under 1 second. Search responds in under 100ms. Zero network required.",
  },
];

const categories = [
  "Accessibility",
  "Analytics",
  "Animals",
  "Arrows",
  "Brands",
  "Buildings",
  "Business",
  "Charts",
  "Communication",
  "Development",
  "Devices",
  "Education",
  "Files",
  "Finance",
  "Food",
  "Gaming",
  "Health",
  "Media",
  "Nature",
  "Security",
  "Shopping",
  "Social",
  "Sports",
  "Tools",
  "Transportation",
  "Travel",
  "UI",
  "Users",
  "Weather",
];

const sizePresets = ["16px", "24px", "32px", "48px", "64px"];

export default function FigmaPageClient() {
  const [selectedSize, setSelectedSize] = useState("24px");

  return (
    <div className="min-h-screen bg-void">
      <Navigation />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#a259ff]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric/10 rounded-full blur-[120px]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Figma Badge */}
              <div className="inline-flex items-center gap-2 bg-[#a259ff]/20 border border-[#a259ff]/30 px-4 py-2 mb-8">
                <PenTool size={18} className="text-[#a259ff]" />
                <span className="text-sm text-[#a259ff] font-medium">
                  Figma Plugin - Coming Soon
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-bone mb-6">
                LivelyIcons for
                <span className="text-[#a259ff]"> Figma</span>
              </h1>

              <p className="text-lg sm:text-xl text-silver max-w-2xl mx-auto mb-10">
                Browse, customize, and insert 1,319 animated icons directly into
                your designs. Fully editable vectors with zero network required.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <span
                  className="btn-primary flex items-center justify-center gap-2 opacity-60 cursor-not-allowed"
                  style={{
                    background:
                      "linear-gradient(135deg, #a259ff 0%, #ff7262 100%)",
                  }}
                >
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

            {/* Hero Visual - Figma Plugin Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16 relative"
            >
              <div className="bg-[#2c2c2c] border border-[#444] rounded-lg overflow-hidden max-w-4xl mx-auto shadow-2xl">
                {/* Plugin Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#383838] border-b border-[#444]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-leaf to-electric rounded flex items-center justify-center">
                      <Sparkles size={14} className="text-void" />
                    </div>
                    <span className="text-sm text-white font-medium">
                      LivelyIcons
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#999]">1,319 icons</span>
                  </div>
                </div>

                {/* Plugin Content */}
                <div className="p-4">
                  {/* Search Bar */}
                  <div className="flex items-center gap-2 bg-[#383838] border border-[#444] px-3 py-2 mb-4">
                    <Search size={16} className="text-[#666]" />
                    <span className="text-sm text-[#666]">Search icons...</span>
                  </div>

                  {/* Category Pills */}
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    {["All", "UI", "Arrows", "Media", "Communication"].map(
                      (cat, i) => (
                        <button
                          key={cat}
                          className={`px-3 py-1 text-xs whitespace-nowrap transition-colors ${
                            i === 0
                              ? "bg-[#a259ff] text-white"
                              : "bg-[#383838] text-[#999] hover:text-white"
                          }`}
                        >
                          {cat}
                        </button>
                      )
                    )}
                  </div>

                  {/* Icon Grid */}
                  <div className="grid grid-cols-8 gap-2 mb-4">
                    {[
                      Heart,
                      Star,
                      Settings,
                      Eye,
                      Search,
                      Zap,
                      Copy,
                      Download,
                      Grid3x3,
                      Package,
                      MoveHorizontal,
                      Refresh,
                      Sparkles,
                      Palette,
                      ArrowRight,
                      Check,
                    ].map((Icon, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + idx * 0.03 }}
                        className={`aspect-square bg-[#383838] border flex items-center justify-center cursor-pointer hover:border-[#a259ff] transition-colors ${
                          idx === 0
                            ? "border-[#a259ff] bg-[#a259ff]/10"
                            : "border-[#444]"
                        }`}
                      >
                        <Icon
                          size={18}
                          className={
                            idx === 0 ? "text-[#a259ff]" : "text-[#ccc]"
                          }
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Customization Panel */}
                  <div className="bg-[#383838] border border-[#444] p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Heart size={24} className="text-[#a259ff]" />
                        <span className="text-sm text-white font-medium">
                          Heart
                        </span>
                      </div>
                      <button className="px-3 py-1.5 bg-[#a259ff] text-white text-xs font-medium hover:bg-[#b366ff] transition-colors">
                        Insert
                      </button>
                    </div>

                    {/* Size Presets */}
                    <div className="mb-4">
                      <div className="text-xs text-[#666] mb-2">Size</div>
                      <div className="flex gap-2">
                        {sizePresets.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-2 py-1 text-xs transition-colors ${
                              selectedSize === size
                                ? "bg-[#a259ff] text-white"
                                : "bg-[#2c2c2c] text-[#999] hover:text-white"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Stroke & Color */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-[#666] mb-2">
                          Stroke Width
                        </div>
                        <div className="h-1 bg-[#2c2c2c] rounded-full">
                          <div className="h-full w-1/2 bg-[#a259ff] rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-[#666] mb-2">Color</div>
                        <div className="flex gap-1">
                          {[
                            "#fff",
                            "#a259ff",
                            "#ff7262",
                            "#00d084",
                            "#fcb900",
                          ].map((color) => (
                            <div
                              key={color}
                              className="w-5 h-5 rounded cursor-pointer border border-[#444]"
                              style={{ backgroundColor: color }}
                            />
                          ))}
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
              <span
                className="tag mb-4 inline-block"
                style={{ borderColor: "#a259ff33", color: "#a259ff" }}
              >
                Features
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone">
                Design faster with animated icons
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
                  className="bg-void border border-graphite p-6 hover:border-[#a259ff]/30 transition-colors group"
                >
                  <div className="w-12 h-12 bg-graphite border border-[#a259ff]/20 flex items-center justify-center mb-4 group-hover:border-[#a259ff]/40 transition-colors">
                    <feature.icon size={24} className="text-[#a259ff]" />
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

        {/* Categories Section */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="tag mb-4 inline-block">36 Categories</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone mb-4">
                Icons for every use case
              </h2>
              <p className="text-silver max-w-2xl mx-auto">
                From UI elements to industry-specific icons, find exactly what
                you need organized into thoughtfully curated categories.
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category, i) => (
                <motion.span
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                  className="px-3 py-1.5 text-xs bg-carbon border border-graphite text-silver hover:border-[#a259ff]/50 hover:text-ghost transition-colors cursor-default"
                >
                  {category}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* Export Options */}
        <section className="py-16 sm:py-24 bg-carbon">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span
                  className="tag mb-4 inline-block"
                  style={{ borderColor: "#a259ff33", color: "#a259ff" }}
                >
                  Export Options
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone mb-6">
                  From design to development
                </h2>
                <p className="text-silver mb-8">
                  Insert icons directly to your Figma canvas as editable
                  vectors, or export code for React, Vue, and raw SVG. Perfect
                  for design systems.
                </p>

                <ul className="space-y-4">
                  {[
                    "Insert as editable Figma vectors",
                    "Export SVG with custom attributes",
                    "Generate React component code",
                    "Generate Vue template code",
                    "One-click clipboard copy",
                    "Works offline - no network needed",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check size={18} className="text-[#a259ff] shrink-0" />
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
                className="grid grid-cols-2 gap-4"
              >
                {[
                  {
                    title: "Figma Insert",
                    desc: "Editable vectors",
                    icon: Package,
                  },
                  {
                    title: "SVG Export",
                    desc: "Custom attributes",
                    icon: Download,
                  },
                  { title: "React Code", desc: "JSX components", icon: Copy },
                  { title: "Vue Code", desc: "Template syntax", icon: Copy },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-void border border-graphite p-5 hover:border-[#a259ff]/30 transition-colors"
                  >
                    <item.icon size={24} className="text-[#a259ff] mb-3" />
                    <h4 className="font-display font-semibold text-bone mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-silver">{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Performance Stats */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="tag tag-electric mb-4 inline-block">
                Performance
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone">
                Built for speed
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { value: "<1s", label: "Plugin Load Time" },
                { value: "<100ms", label: "Search Response" },
                { value: "<50ms", label: "Icon Insert" },
                { value: "0 KB", label: "Network Required" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-carbon border border-graphite p-6 text-center"
                >
                  <div className="text-3xl font-display font-bold text-electric mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-silver">{stat.label}</div>
                </motion.div>
              ))}
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
                Ready to enhance your designs?
              </h2>
              <p className="text-lg text-silver mb-10 max-w-2xl mx-auto">
                Install the Figma plugin and start using 1,319 animated icons in
                your designs today. It's free, works offline, and takes seconds
                to get started.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <span
                  className="btn-primary flex items-center justify-center gap-2 opacity-60 cursor-not-allowed"
                  style={{
                    background:
                      "linear-gradient(135deg, #a259ff 0%, #ff7262 100%)",
                  }}
                >
                  Coming Soon
                </span>
                <Link
                  href="/plugins/vscode"
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  Try VS Code Extension
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
