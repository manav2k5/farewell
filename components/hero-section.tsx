"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  const [currentSlogan, setCurrentSlogan] = useState(0)
  const slogans = [
    "Time is a Construct, But Our Memories Are Forever...",
    "Past, Present, Future — All Converge Here.",
    "Traveling Through Time, One Memory at a Time.",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-indigo-900/20 rounded-3xl" />

      {/* Animated clock hands */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-[500px] h-[500px] border-2 border-indigo-500 rounded-full relative"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute top-1/2 left-1/2 w-1 h-[240px] bg-cyan-400 origin-bottom rounded-full"
            style={{ transformOrigin: "bottom center" }}
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute top-1/2 left-1/2 w-1 h-[180px] bg-purple-500 origin-bottom rounded-full"
            style={{ transformOrigin: "bottom center" }}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-16 md:py-24 px-6 md:px-12 rounded-3xl text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center justify-center p-2 bg-indigo-900/50 backdrop-blur-sm rounded-full mb-6 border border-indigo-700"
        >
          <Clock className="h-5 w-5 text-cyan-400 mr-2" />
          <span className="text-sm font-medium text-cyan-300">Temporal Coordinates: 2025</span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
            A Time-Traveling Tribute to Our Seniors
          </span>
        </motion.h1>

        <motion.div
          key={currentSlogan}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="h-12 flex items-center justify-center"
        >
          <p className="text-xl md:text-2xl text-indigo-300 font-medium italic">{slogans[currentSlogan]}</p>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="max-w-2xl mx-auto text-indigo-200 text-lg mt-6"
        >
          Step into our temporal vortex as we journey through the past, celebrate the present, and glimpse into the
          future of our graduating time travelers.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-none shadow-[0_0_15px_rgba(138,43,226,0.5)]"
          >
            <Zap className="mr-2 h-4 w-4" />
            <Link href="#photos">Activate Time Machine</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-indigo-500 text-indigo-300 hover:bg-indigo-900/50 hover:text-indigo-200"
          >
            <Link href="#countdown">Join Temporal Convergence</Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-600/10 rounded-full blur-3xl" />
    </section>
  )
}
