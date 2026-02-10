"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, ChevronDown } from "../../src/icons"
import { LogoWithText } from "./Logo"

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showPluginsMenu, setShowPluginsMenu] = useState(false)

  const isActive = (href: string) => pathname === href
  const isPluginsActive = pathname.startsWith('/plugins')

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-void/80 backdrop-blur-xl border-b border-graphite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/">
          <LogoWithText iconSize={32} />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/icons"
            className={`text-sm transition-colors ${
              isActive('/icons') ? 'text-electric' : 'text-silver hover:text-electric'
            }`}
          >
            Icons
          </Link>
          <Link
            href="/playground"
            className={`text-sm transition-colors ${
              isActive('/playground') ? 'text-electric' : 'text-silver hover:text-electric'
            }`}
          >
            Playground
          </Link>

          {/* Plugins Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowPluginsMenu(!showPluginsMenu)}
              onBlur={() => setTimeout(() => setShowPluginsMenu(false), 150)}
              className={`text-sm flex items-center gap-1 transition-colors ${
                isPluginsActive ? 'text-electric' : 'text-silver hover:text-electric'
              }`}
            >
              Plugins
              <ChevronDown
                size={14}
                className={`transition-transform ${showPluginsMenu ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {showPluginsMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute top-full left-0 mt-2 bg-carbon border border-graphite min-w-[160px]"
                >
                  <Link
                    href="/plugins/vscode"
                    onClick={() => setShowPluginsMenu(false)}
                    className={`block px-4 py-2 text-sm transition-colors hover:bg-graphite ${
                      isActive('/plugins/vscode') ? 'text-electric' : 'text-silver hover:text-electric'
                    }`}
                  >
                    VS Code
                  </Link>
                  <Link
                    href="/plugins/figma"
                    onClick={() => setShowPluginsMenu(false)}
                    className={`block px-4 py-2 text-sm transition-colors hover:bg-graphite ${
                      isActive('/plugins/figma') ? 'text-electric' : 'text-silver hover:text-electric'
                    }`}
                  >
                    Figma
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/team"
            className={`text-sm transition-colors ${
              pathname.startsWith('/team') ? 'text-electric' : 'text-silver hover:text-electric'
            }`}
          >
            Team
          </Link>
          <Link
            href="/compare"
            className={`text-sm transition-colors ${
              isActive('/compare') ? 'text-electric' : 'text-silver hover:text-electric'
            }`}
          >
            Compare
          </Link>
          <Link
            href="/docs"
            className={`text-sm transition-colors ${
              isActive('/docs') ? 'text-electric' : 'text-silver hover:text-electric'
            }`}
          >
            Docs
          </Link>
          <a
            href="https://github.com/livelyicons/icons"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-silver hover:text-electric transition-colors"
          >
            GitHub
          </a>
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
                className={`text-sm py-2 transition-colors ${
                  isActive('/icons') ? 'text-electric' : 'text-silver hover:text-electric'
                }`}
              >
                Icons
              </Link>
              <Link
                href="/playground"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm py-2 transition-colors ${
                  isActive('/playground') ? 'text-electric' : 'text-silver hover:text-electric'
                }`}
              >
                Playground
              </Link>

              {/* Mobile Plugins Section */}
              <div className="text-xs text-steel uppercase tracking-wider pt-2">Plugins</div>
              <Link
                href="/plugins/vscode"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm py-2 pl-2 transition-colors ${
                  isActive('/plugins/vscode') ? 'text-electric' : 'text-silver hover:text-electric'
                }`}
              >
                VS Code
              </Link>
              <Link
                href="/plugins/figma"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm py-2 pl-2 transition-colors ${
                  isActive('/plugins/figma') ? 'text-electric' : 'text-silver hover:text-electric'
                }`}
              >
                Figma
              </Link>

              <Link
                href="/team"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm py-2 transition-colors ${
                  pathname.startsWith('/team') ? 'text-electric' : 'text-silver hover:text-electric'
                }`}
              >
                Team
              </Link>
              <Link
                href="/compare"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm py-2 transition-colors ${
                  isActive('/compare') ? 'text-electric' : 'text-silver hover:text-electric'
                }`}
              >
                Compare
              </Link>
              <Link
                href="/docs"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm py-2 transition-colors ${
                  isActive('/docs') ? 'text-electric' : 'text-silver hover:text-electric'
                }`}
              >
                Docs
              </Link>
              <a
                href="https://github.com/livelyicons/icons"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-silver hover:text-electric transition-colors py-2"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
