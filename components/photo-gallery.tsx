"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Maximize2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

// Sample data - replace with actual senior data
const seniors = [
  {
    id: 1,
    name: "Alex Johnson",
    thenPhoto: "/photo1.JPG?height=400&width=300",
    nowPhoto: "/photo2.JPG?height=400&width=300",
    description:
      "From freshman year to graduation, Alex has transformed from a shy newcomer to the confident leader of the debate team.",
    year: {
      then: "2021",
      now: "2025",
    },
  },
  {
    id: 2,
    name: "Jamie Smith",
    thenPhoto: "/photo3.jpg?height=400&width=300",
    nowPhoto: "/photo4.jpg?height=400&width=300",
    description:
      "Jamie's journey from a quiet artist to the creator of our school's most iconic mural has been incredible to witness.",
    year: {
      then: "2021",
      now: "2025",
    },
  },
  {
    id: 3,
    name: "Taylor Williams",
    thenPhoto: "/photo5.jpg?height=400&width=300",
    nowPhoto: "/photo6.jpg?height=400&width=300",
    description: "Taylor went from struggling with calculus to becoming our math team captain. What a transformation!",
    year: {
      then: "2021",
      now: "2025",
    },
  },
  {
    id: 4,
    name: "Jordan Lee",
    thenPhoto: "/placeholder.svg?height=400&width=300",
    nowPhoto: "/placeholder.svg?height=400&width=300",
    description: "Jordan's growth from a bench player to basketball team MVP shows what dedication can achieve.",
    year: {
      then: "2021",
      now: "2025",
    },
  },
  {
    id: 5,
    name: "Casey Martinez",
    thenPhoto: "/placeholder.svg?height=400&width=300",
    nowPhoto: "/placeholder.svg?height=400&width=300",
    description: "Casey's evolution from a nervous public speaker to student body president has inspired us all.",
    year: {
      then: "2021",
      now: "2025",
    },
  },
]

export default function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showThen, setShowThen] = useState(true)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % seniors.length)
    setShowThen(true)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + seniors.length) % seniors.length)
    setShowThen(true)
  }

  const togglePhoto = () => {
    setShowThen(!showThen)
  }

  const currentSenior = seniors[currentIndex]

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-xl shadow-[0_0_15px_rgba(138,43,226,0.3)] border border-indigo-800">
          {/* <div className="absolute top-0 left-0 z-10 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-3 py-1 rounded-br-lg text-sm font-medium flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{showThen ? currentSenior.year.then : currentSenior.year.now}</span>
          </div> */}

          <Dialog>
            <DialogTrigger asChild>
              <button className="absolute top-2 right-2 z-10 bg-black/30 hover:bg-black/50 text-white p-1.5 rounded-full transition-colors">
                <Maximize2 className="h-4 w-4" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl bg-[#0c0c2d] border border-indigo-800">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={showThen ? currentSenior.thenPhoto : currentSenior.nowPhoto}
                  alt={`${currentSenior.name} ${showThen ? "then" : "now"}`}
                  fill
                  className="object-cover"
                />
              </div>
            </DialogContent>
          </Dialog>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentSenior.id}-${showThen ? "then" : "now"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative h-full w-full"
            >
              <Image
                src={showThen ? currentSenior.thenPhoto : currentSenior.nowPhoto}
                alt={`${currentSenior.name} ${showThen ? "then" : "now"}`}
                fill
                className="object-cover cursor-pointer"
                onClick={togglePhoto}
              />

              {/* Time travel effect overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showThen ? 0.2 : 0 }}
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600/30 via-indigo-900/20 to-transparent pointer-events-none"
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: !showThen ? 0.2 : 0 }}
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/30 via-indigo-900/20 to-transparent pointer-events-none"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm flex items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="mr-2"
            >
              <Clock className="h-4 w-4 text-cyan-400" />
            </motion.div>
            <span>Time Jump to {showThen ? "Future" : "Past"}</span>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSenior.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
                {currentSenior.name}
              </h3> */}
              <p className="text-indigo-200 mb-6">{currentSenior.description}</p>

              <div className="flex space-x-4 justify-center md:justify-start">
                <Button
                  variant="outline"
                  onClick={togglePhoto}
                  className="border-indigo-700 text-indigo-300 hover:bg-indigo-900/50 hover:text-cyan-400"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Time Jump to {showThen ? "2025" : "2021"}
                </Button>
                <Button
                  onClick={() => alert(`Messages for ${currentSenior.name} would appear here!`)}
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-none"
                >
                  View Temporal Messages
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="rounded-full border-indigo-700 text-indigo-300 hover:bg-indigo-900/50 hover:text-cyan-400"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="flex space-x-2">
          {seniors.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setShowThen(true)
              }}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === currentIndex ? "bg-cyan-400" : "bg-indigo-700"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="rounded-full border-indigo-700 text-indigo-300 hover:bg-indigo-900/50 hover:text-cyan-400"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
