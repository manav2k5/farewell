"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Sample timeline events - replace with actual events
const timelineEvents = [
  {
    id: 1,
    date: "September 2022",
    title: "First Day",
    description: "Remember the awkward introductions and getting lost in the hallways?",
    image: "/222.jpg?height=300&width=400",
  },
  {
    id: 2,
    date: "October 2022",
    title: "Cricket Match",
    description: "From the bleachers to the boundary ropes, we roared for every run—this wasn’t just a match, it was one of our best team huddles yet. Cheers to the seniors who made every cheer count and every moment unforgettable! 🎉🏏",
    image: "/timeline7.jpg?height=300&width=400",
  },
  {
    id: 3,
    date: "November 2022",
    title: "Ethinic Day",
    description: "When laughter mingles with the rustle of traditional textiles, magic happens. Ethnic Day was our runway of roots, where every outfit celebrated identity and unity. Cheers to the colors, the camaraderie, and the seniors who led the way! 🎨🤝",
    image: "/timeline2.jpg?height=300&width=400",
  },
  {
    id: 4,
    date: "March 2023",
    title: "Happy Holi",
    description: "The legendary group costume that won first prize. No one will forget the dancing dinosaurs!",
    image: "/timeline4.jpg?height=300&width=400",
  },
  {
    id: 5,
    date: "May 2023",
    title: "Spring Break Trip",
    description: "Our Spring Break was spent swinging hammers and raising walls for families in need—an unforgettable journey that tested our teamwork, grit, and compassion",
    image: "/timeline1.JPG?height=300&width=400",
  },
  {
    id: 6,
    date: "September 2023",
    title: "Junior Year Kickoff",
    description: "Taking on leadership roles and mentoring the new freshmen. How the tables turned!",
    image: "/timeline6.jpeg?height=300&width=400",
  },
  {
    id: 7,
    date: "February 2024",
    title: "updating ..........",
    description: "updating .....",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 8,
    date: "May 2025",
    title: "Senior Prom",
    description: "An unforgettable night of dancing, laughter, and creating memories that will last forever.",
    image: "/timeline3.jpeg?height=300&width=400",
  },
  {
    id: 9,
    date: "June 2025",
    title: "Graduation",
    description: "Caps in the air, tears in our eyes, and the future in our hands. We made it!",
    image: "/timeline3.jpeg?height=300&width=400",
  },
]

export default function Timeline() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeEvent, setActiveEvent] = useState(timelineEvents[0])

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <div className="space-y-8">
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto pb-4 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex space-x-4 px-4">
            {timelineEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => setActiveEvent(event)}
                className={`flex-shrink-0 cursor-pointer transition-all duration-300 ${
                  activeEvent.id === event.id ? "scale-105" : "opacity-70 hover:opacity-100"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${
                    activeEvent.id === event.id
                      ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                      : "bg-indigo-900/50 text-indigo-300 border border-indigo-700"
                  }`}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  {event.date}
                </div>
                <div
                  className={`h-0.5 w-full mt-2 ${
                    activeEvent.id === event.id ? "bg-gradient-to-r from-cyan-500 to-purple-600" : "bg-indigo-800"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-[#0c0c2d]/80 border-indigo-700 text-indigo-300 hover:bg-indigo-900/50 hover:text-cyan-400 shadow-md z-10"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-[#0c0c2d]/80 border-indigo-700 text-indigo-300 hover:bg-indigo-900/50 hover:text-cyan-400 shadow-md z-10"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <motion.div
        key={activeEvent.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      >
        <div className="relative aspect-video overflow-hidden rounded-xl shadow-[0_0_15px_rgba(138,43,226,0.3)] border border-indigo-800">
          <Image src={activeEvent.image || "/placeholder.svg"} alt={activeEvent.title} fill className="object-cover" />

          {/* Time portal overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-transparent to-indigo-900/20 pointer-events-none" />

          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <Clock className="h-3 w-3 mr-1 text-cyan-400" />
            <span>{activeEvent.date}</span>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
            {activeEvent.title}
          </h3>
          <p className="text-cyan-400 font-medium mb-4 flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {activeEvent.date}
          </p>
          <p className="text-indigo-200">{activeEvent.description}</p>
        </div>
      </motion.div>
    </div>
  )
}
