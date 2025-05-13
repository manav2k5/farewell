"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CountdownTimerProps {
  targetDate: string
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center space-x-2 mb-6">
        <Calendar className="h-5 w-5 text-cyan-400" />
        <p className="text-indigo-200">
          Temporal Convergence Event:{" "}
          {new Date(targetDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>

      <div className="space-y-4">
        <Button
          size="lg"
          className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-none shadow-[0_0_15px_rgba(138,43,226,0.5)]"
        >
          <Zap className="mr-2 h-4 w-4" />
          <Link href="https://zoom.us" target="_blank" rel="noopener noreferrer">
            Join Temporal Convergence
          </Link>
        </Button>

        <p className="text-sm text-indigo-400 text-center">
          Add this temporal event to your calendar to ensure proper timeline synchronization!
        </p>

        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            className="border-indigo-700 text-indigo-300 hover:bg-indigo-900/50 hover:text-cyan-400"
          >
            <Link href="#" className="flex items-center">
              Google Calendar
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-indigo-700 text-indigo-300 hover:bg-indigo-900/50 hover:text-cyan-400"
          >
            <Link href="#" className="flex items-center">
              iCal / Outlook
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

interface TimeUnitProps {
  value: number
  label: string
}

function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <motion.div
      className="bg-gradient-to-br from-indigo-900/70 to-purple-900/50 backdrop-blur-sm p-4 rounded-xl text-center shadow-[0_0_15px_rgba(138,43,226,0.2)] border border-indigo-800"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <motion.div
        key={value}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
      >
        {value.toString().padStart(2, "0")}
      </motion.div>
      <div className="text-sm text-indigo-300 mt-1">{label}</div>
    </motion.div>
  )
}
