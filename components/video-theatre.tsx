"use client"

import { useState, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { motion } from "framer-motion"

export default function VideoTheatre() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(80)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(progress)
    }
  }

  const handleProgressChange = (value: number[]) => {
    const newProgress = value[0]
    setProgress(newProgress)
    if (videoRef.current) {
      videoRef.current.currentTime = (newProgress / 100) * videoRef.current.duration
    }
  }

  return (
    <div className="space-y-6">
      <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-[0_0_15px_rgba(138,43,226,0.3)] border border-indigo-800">

      <iframe src="https://drive.google.com/file/d/1swbB-uXDqrkUbUsTMKEQ11y6QK8VUu9r/preview" width="100%" height="100%" allow="autoplay"></iframe>

        {/* Time travel effect overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-600/30 via-purple-900/20 to-transparent pointer-events-none"
        />

        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
          Temporal Memory Projection
        </div>
      </div>

      <div className="bg-indigo-900/30 backdrop-blur-sm p-4 rounded-lg border border-indigo-800">
        <h3 className="font-medium text-indigo-200 mb-2">About This Projection</h3>
        <p className="text-indigo-300 text-sm">
          This temporal projection captures the journey of the Class of 2025 across the timeline, from their first day
          to graduation. Featuring surprise cameos from teachers, staff, and alumni across different time periods, this
          cinematic tribute celebrates the memories, achievements, and friendships that defined their temporal voyage
          with us.
        </p>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}
