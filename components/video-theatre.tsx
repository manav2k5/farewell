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
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster="/placeholder.svg?height=720&width=1280"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        >
          <source src="#" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Time travel effect overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-600/30 via-purple-900/20 to-transparent pointer-events-none"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={togglePlay}
                  className="h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white/30"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>

                <div className="text-white text-sm">{formatTime(progress * 0.01 * 180)} / 3:00</div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={toggleMute}
                  className="h-8 w-8 rounded-full bg-white/20 text-white hover:bg-white/30"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>

                <div className="w-20 hidden sm:block">
                  <Slider
                    value={[volume]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                    className="h-1.5"
                  />
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full bg-white/20 text-white hover:bg-white/30"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl p-0 bg-black">
                    <div className="aspect-video">
                      <video
                        className="w-full h-full object-cover"
                        poster="/placeholder.svg?height=720&width=1280"
                        controls
                      >
                        <source src="#" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Slider
              value={[progress]}
              min={0}
              max={100}
              step={0.1}
              onValueChange={handleProgressChange}
              className="h-1.5"
            />
          </div>
        </div>

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
