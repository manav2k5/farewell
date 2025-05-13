"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Moon, Sun, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#0c0c2d]/80 backdrop-blur-md border-b border-indigo-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 text-cyan-400" onClick={closeMenu}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Clock className="h-6 w-6" />
            </motion.div>
            <span className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
               Farewell 2025
            </span>
          </Link>

          <div className="hidden md:flex items-center">
            <div className="mr-6 text-sm text-indigo-300 border border-indigo-700 bg-indigo-900/50 px-3 py-1 rounded-full">
              <span className="font-mono">{time.toLocaleTimeString()}</span>
            </div>

            <div className="flex items-center space-x-6">
              <Link href="#photos" className="text-indigo-300 hover:text-cyan-400 transition-colors">
                Snapshots
              </Link>
              <Link href="#timeline" className="text-indigo-300 hover:text-cyan-400 transition-colors">
                Voyage
              </Link>
              <Link href="#messages" className="text-indigo-300 hover:text-cyan-400 transition-colors">
                Echoes
              </Link>
              <Link href="#hall-of-fame" className="text-indigo-300 hover:text-cyan-400 transition-colors">
                Legends
              </Link>
              <Link href="#video" className="text-indigo-300 hover:text-cyan-400 transition-colors">
                Projection
              </Link>
              <Link href="#countdown" className="text-indigo-300 hover:text-cyan-400 transition-colors">
                Convergence
              </Link>

              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                  className="text-indigo-300 hover:text-cyan-400 hover:bg-indigo-900/50"
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <div className="mr-2 text-xs text-indigo-300 border border-indigo-700 bg-indigo-900/50 px-2 py-1 rounded-full">
              <span className="font-mono">{time.toLocaleTimeString()}</span>
            </div>

            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="mr-2 text-indigo-300 hover:text-cyan-400 hover:bg-indigo-900/50"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="text-indigo-300 hover:text-cyan-400 hover:bg-indigo-900/50"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0c0c2d] py-4 px-4 absolute w-full border-b border-indigo-800">
          <div className="flex flex-col space-y-4">
            <Link href="#photos" className="text-indigo-300 hover:text-cyan-400 transition-colors" onClick={closeMenu}>
              Temporal Snapshots
            </Link>
            <Link
              href="#timeline"
              className="text-indigo-300 hover:text-cyan-400 transition-colors"
              onClick={closeMenu}
            >
              Chronological Voyage
            </Link>
            <Link
              href="#messages"
              className="text-indigo-300 hover:text-cyan-400 transition-colors"
              onClick={closeMenu}
            >
              Echoes Across Time
            </Link>
            <Link
              href="#hall-of-fame"
              className="text-indigo-300 hover:text-cyan-400 transition-colors"
              onClick={closeMenu}
            >
              Legends of the Timeline
            </Link>
            <Link href="#video" className="text-indigo-300 hover:text-cyan-400 transition-colors" onClick={closeMenu}>
              Memories Projection
            </Link>
            <Link
              href="#countdown"
              className="text-indigo-300 hover:text-cyan-400 transition-colors"
              onClick={closeMenu}
            >
              Temporal Convergence
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
