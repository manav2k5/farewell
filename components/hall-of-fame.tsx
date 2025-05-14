"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import confetti from "canvas-confetti"

// Sample awards - replace with actual awards
const awards = [
  {
    id: 1,
    title: "CEO of Sarcasm 🤨💼",
    recipient: "Karan",
    avatar: "/placeholder.svg?height=100&width=100",
    description: "Karan’s razor-sharp wit and playful sarcasm keep our team on its toes—and in stitches!",
    icon: "👑",
  },
  {
    id: 2,
    title: "The Walking Meme 😂📸",
    recipient: "Threeshal",
    avatar: "/threeshal.jpeg?height=100&width=100",
    description: "Threeshal drops memes like confetti—always the life of our group chat!",
    icon: "🎉",
  },
  {
    id: 3,
    title: "Life of the Party 🥳🎉",
    recipient: "Vikram",
    avatar: "/placeholder.svg?height=100&width=100",
    description: "Vikram turns every moment into a celebration—dance floor champion and joy spreader!",
    icon: "🎈",
  },
  {
    id: 4,
    title: "Captain Cool 🧊😎",
    recipient: "Aliya",
    avatar: "/placeholder.svg?height=100&width=100",
    description: "Aliya stays calm under pressure, radiating chill vibes and smooth leadership. ",
    icon: "❄️",
  },
  {
    id: 5,
    title: "Chai Addict ☕❤️",
    recipient: "Kavya",
    avatar: "/kavya.jpeg?height=100&width=100",
    description: "Fueled by countless cups of chai, Kavya keeps our spirits—and energy levels—boiling!",
    icon: "🍵",
  },
  {
    id: 6,
    title: "Google Scholar 📚🧠",
    recipient: "Kedhar",
    avatar: "/kedhar.jpeg?height=100&width=100",
    description: "Kedhar’s brain is an endless library—always ready with facts, insights, and study hacks!",
    icon: "📖",
  },
  {
    id: 7,
    title: "Social Butterfly 🦋💬",
    recipient: "David",
    avatar: "/placeholder.svg?height=100&width=100",
    description: "David flutters through every friend circle, connecting hearts and sparking smiles!",
    icon: "🦋",
  },
  {
    id: 8,
    title: "Walking Spotify 🎧🎶",
    recipient: "Siddhi",
    avatar: "/placeholder.svg?height=100&width=100",
    description: "Siddhi’s playlists set the mood for every occasion—our personal DJ and vibe curator!",
    icon: "🎵",
  },
  {
    id: 9,
    title: "The Lost Soul 🤔🗺️",
    recipient: "Dhananjay",
    avatar: "/placeholder.svg?height=100&width=100",
    description: "Dhananjay finds wonder in every corner, leading us on spontaneous adventures!",
    icon: "🗺️",
  },
  {
    id: 10,
    title: "The Foodie 🍕🍔🍟",
    recipient: "Siddharth",
    avatar: "/sidd.jpeg?height=100&width=100",
    description: "Siddharth’s culinary quests uncover the best bites in town—our go-to food critic!",
    icon: "🍽️",
  },
]

export default function HallOfFame() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextAward = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % awards.length)
  }

  const prevAward = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + awards.length) % awards.length)
  }

  const handleAwardClick = () => {
    // Trigger confetti effect when award is clicked
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#67e8f9", "#8b5cf6", "#c026d3"],
    })
  }

  const currentAward = awards[currentIndex]

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={prevAward}
          className="rounded-full border-indigo-700 text-indigo-300 hover:bg-indigo-900/50 hover:text-cyan-400"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="text-center">
          <Badge variant="outline" className="mb-2 bg-indigo-900/50 text-cyan-300 border-indigo-700">
            Award {currentIndex + 1} of {awards.length}
          </Badge>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={nextAward}
          className="rounded-full border-indigo-700 text-indigo-300 hover:bg-indigo-900/50 hover:text-cyan-400"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentAward.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-br from-indigo-900/50 to-purple-900/30 backdrop-blur-sm rounded-xl p-6 shadow-[0_0_15px_rgba(138,43,226,0.3)] border border-indigo-800"
          onClick={handleAwardClick}
        >
          <div className="flex flex-col items-center text-center">
            <div className="text-4xl mb-4">{currentAward.icon}</div>

            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
              {currentAward.title}
            </h3>

            <div className="relative mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur opacity-30"></div>
              <Avatar className="h-24 w-24 border-4 border-indigo-900">
                <AvatarImage src={currentAward.avatar || "/placeholder.svg"} alt={currentAward.recipient} />
                <AvatarFallback className="bg-indigo-900 text-cyan-400">
                  {currentAward.recipient.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-lg text-indigo-200">{currentAward.recipient}</h4>
              <p className="text-indigo-300">{currentAward.description}</p>
            </div>

            <Button
              className="mt-6 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-none shadow-[0_0_10px_rgba(138,43,226,0.3)]"
              onClick={(e) => {
                e.stopPropagation()
                handleAwardClick()
              }}
            >
              <Award className="h-4 w-4 mr-2" />
              Celebrate Legend
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center mt-6 space-x-2">
        {awards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentIndex ? "bg-cyan-400" : "bg-indigo-700"
            }`}
            aria-label={`Go to award ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
