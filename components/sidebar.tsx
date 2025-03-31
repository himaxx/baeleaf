"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function Sidebar({
  categories,
  activeCategory,
  scrollToCategory,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  const [hoveredCategory, setHoveredCategory] = useState(null)

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('[data-sidebar="true"]')) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMobileMenuOpen, setIsMobileMenuOpen])

  return (
    <>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 bg-black/50 sidebar-overlay z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            data-sidebar="true"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-dark-brown text-cream z-50 md:hidden overflow-y-auto shadow-xl sidebar-transition"
          >
            <div className="p-5 flex justify-between items-center border-b border-medium-brown">
              <div className="flex items-center">
                <div className="relative h-8 w-8 mr-2">
                  <Image
                    src="/images/BaeleafLogo.png"
                    alt="Baeleaf Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <h2 className="font-heading text-xl text-cream">Menu</h2>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-medium-brown transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-cream" />
              </button>
            </div>
            <nav className="p-5">
              <ul className="space-y-1">
                {categories.map((category) => (
                  <motion.li key={category.name} whileTap={{ scale: 0.98 }}>
                    <button
                      onClick={() => scrollToCategory(category.name)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between ${
                        activeCategory === category.name
                          ? "bg-accent-green text-dark-brown font-medium"
                          : "text-cream hover:bg-medium-brown"
                      }`}
                    >
                      <span>{category.name}</span>
                      <ChevronRight
                        className={`h-5 w-5 transition-transform ${
                          activeCategory === category.name ? "text-dark-brown rotate-90" : "text-cream/60"
                        }`}
                      />
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

