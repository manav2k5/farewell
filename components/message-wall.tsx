"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Volume2, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import confetti from "canvas-confetti"

// Sample messages - replace with actual messages
const messages = [
  {
    id: 1,
    sender: "Emma",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "You've been such an inspiration to all of us! Your kindness and leadership will be missed.",
    hasVoiceNote: true,
  },
  {
    id: 2,
    sender: "Michael",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "Remember that time we stayed up all night finishing the science project? Good times!",
    hasVoiceNote: false,
  },
  {
    id: 3,
    sender: "Sophia",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "I'll never forget our coffee study sessions. You helped me pass calculus!",
    hasVoiceNote: true,
  },
  {
    id: 4,
    sender: "Daniel",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "From debate team rivals to best friends. What a journey it's been!",
    hasVoiceNote: false,
  },
  {
    id: 5,
    sender: "Olivia",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "Your passion for helping others has inspired me to volunteer more. Thank you!",
    hasVoiceNote: true,
  },
  {
    id: 6,
    sender: "Ethan",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "You're going to crush it in college! Can't wait to see what you accomplish next.",
    hasVoiceNote: false,
  },
  {
    id: 7,
    sender: "Ava",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "Thanks for always being there when I needed someone to talk to. You're the best!",
    hasVoiceNote: true,
  },
  {
    id: 8,
    sender: "Noah",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "The basketball team won't be the same without you. You're a legend!",
    hasVoiceNote: false,
  },
]

export default function MessageWall() {
  const [selectedMessage, setSelectedMessage] = useState<(typeof messages)[0] | null>(null)
  const [visibleMessages, setVisibleMessages] = useState<typeof messages>([])
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Start with a few messages and gradually add more for animation effect
    setVisibleMessages(messages.slice(0, 3))

    const interval = setInterval(() => {
      setVisibleMessages((prev) => {
        if (prev.length >= messages.length) return prev
        return [...prev, messages[prev.length]]
      })
    }, 800)

    return () => clearInterval(interval)
  }, [])

  const handleMessageClick = (message: (typeof messages)[0]) => {
    setSelectedMessage(message)

    // Trigger confetti effect when message is opened
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#67e8f9", "#8b5cf6", "#c026d3"],
    })
  }

  const toggleAudio = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence>
          {visibleMessages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(138,43,226,0.5)" }}
              className="bg-gradient-to-br from-indigo-900/50 to-purple-900/30 backdrop-blur-sm p-4 rounded-lg shadow-[0_0_15px_rgba(138,43,226,0.2)] cursor-pointer border border-indigo-800"
              onClick={() => handleMessageClick(message)}
            >
              <div className="flex items-start space-x-3">
                <Avatar className="border-2 border-indigo-700">
                  <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.sender} />
                  <AvatarFallback className="bg-indigo-900 text-cyan-400">{message.sender.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-indigo-200">{message.sender}</h4>
                  <p className="text-indigo-300 text-sm line-clamp-3">{message.message}</p>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                {message.hasVoiceNote && (
                  <div className="text-cyan-400">
                    <Volume2 className="h-4 w-4" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visibleMessages.length < messages.length && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => setVisibleMessages(messages)}
            className="border-indigo-700 text-indigo-300 hover:bg-indigo-900/50 hover:text-cyan-400"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Retrieve All Messages
          </Button>
        </div>
      )}

      <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
        <DialogContent className="sm:max-w-md bg-[#0c0c2d] border border-indigo-800">
          <DialogHeader>
            <DialogTitle className="text-indigo-200">Message from {selectedMessage?.sender}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-start space-x-4">
              <Avatar className="h-12 w-12 border-2 border-indigo-700">
                <AvatarImage src={selectedMessage?.avatar || "/placeholder.svg"} alt={selectedMessage?.sender} />
                <AvatarFallback className="bg-indigo-900 text-cyan-400">
                  {selectedMessage?.sender.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="font-medium text-indigo-200 text-lg">{selectedMessage?.sender}</h4>
                <p className="text-indigo-300">{selectedMessage?.message}</p>
              </div>
            </div>

            {selectedMessage?.hasVoiceNote && (
              <div className="bg-indigo-900/50 backdrop-blur-sm p-3 rounded-lg border border-indigo-800">
                <div className="flex items-center space-x-3">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={toggleAudio}
                    className="h-10 w-10 rounded-full bg-indigo-900 text-cyan-400 hover:bg-indigo-800 hover:text-cyan-300"
                  >
                    <Volume2 className="h-5 w-5" />
                  </Button>
                  <div className="w-full">
                    <div className="h-2 bg-indigo-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-300 ${isPlaying ? "w-[45%]" : "w-0"}`}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-indigo-400 mt-1">
                      <span>{isPlaying ? "0:15" : "0:00"}</span>
                      <span>0:35</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={() => {
                  confetti({
                    particleCount: 50,
                    spread: 70,
                    origin: { y: 0.8 },
                    colors: ["#67e8f9", "#8b5cf6", "#c026d3"],
                  })
                }}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-none"
              >
                <Heart className="h-4 w-4 mr-2" />
                Send Temporal Love
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
