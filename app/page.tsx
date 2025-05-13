import { Clock, Camera, MessageSquare, Trophy, Film, CalendarClock } from "lucide-react"
import HeroSection from "@/components/hero-section"
import PhotoGallery from "@/components/photo-gallery"
import Timeline from "@/components/timeline"
import MessageWall from "@/components/message-wall"
import HallOfFame from "@/components/hall-of-fame"
import VideoTheatre from "@/components/video-theatre"
import CountdownTimer from "@/components/countdown-timer"
import EasterEggButton from "@/components/easter-egg-button"
import Navigation from "@/components/navigation"
import TimePortalEffect from "@/components/time-portal-effect"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a1f] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-[#0a0a1f] to-[#0a0a1f] text-white">
      <TimePortalEffect />
      <Navigation />

      <main className="container mx-auto px-4 py-8 relative z-10">
        <HeroSection />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <section
            id="photos"
            className="col-span-1 md:col-span-2 bg-[#0c0c2d]/80 backdrop-blur-sm rounded-xl shadow-[0_0_15px_rgba(138,43,226,0.3)] p-6 transform transition-all hover:shadow-[0_0_20px_rgba(138,43,226,0.5)] border border-indigo-900"
          >
            <div className="flex items-center mb-6">
              <Camera className="h-6 w-6 text-cyan-400 mr-2" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Temporal Snapshots
              </h2>
            </div>
            <PhotoGallery />
          </section>

          <section
            id="timeline"
            className="col-span-1 md:col-span-2 bg-[#0c0c2d]/80 backdrop-blur-sm rounded-xl shadow-[0_0_15px_rgba(138,43,226,0.3)] p-6 transform transition-all hover:shadow-[0_0_20px_rgba(138,43,226,0.5)] border border-indigo-900"
          >
            <div className="flex items-center mb-6">
              <CalendarClock className="h-6 w-6 text-cyan-400 mr-2" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Chronological Voyage
              </h2>
            </div>
            <Timeline />
          </section>

          <section
            id="messages"
            className="bg-[#0c0c2d]/80 backdrop-blur-sm rounded-xl shadow-[0_0_15px_rgba(138,43,226,0.3)] p-6 transform transition-all hover:shadow-[0_0_20px_rgba(138,43,226,0.5)] border border-indigo-900"
          >
            <div className="flex items-center mb-6">
              <MessageSquare className="h-6 w-6 text-cyan-400 mr-2" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Echoes Across Time
              </h2>
            </div>
            <MessageWall />
          </section>

          <section
            id="hall-of-fame"
            className="bg-[#0c0c2d]/80 backdrop-blur-sm rounded-xl shadow-[0_0_15px_rgba(138,43,226,0.3)] p-6 transform transition-all hover:shadow-[0_0_20px_rgba(138,43,226,0.5)] border border-indigo-900"
          >
            <div className="flex items-center mb-6">
              <Trophy className="h-6 w-6 text-cyan-400 mr-2" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Legends of the Timeline
              </h2>
            </div>
            <HallOfFame />
          </section>

          <section
            id="video"
            className="col-span-1 md:col-span-2 bg-[#0c0c2d]/80 backdrop-blur-sm rounded-xl shadow-[0_0_15px_rgba(138,43,226,0.3)] p-6 transform transition-all hover:shadow-[0_0_20px_rgba(138,43,226,0.5)] border border-indigo-900"
          >
            <div className="flex items-center mb-6">
              <Film className="h-6 w-6 text-cyan-400 mr-2" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Memories Projection Chamber
              </h2>
            </div>
            <VideoTheatre />
          </section>

          <section
            id="countdown"
            className="col-span-1 md:col-span-2 bg-[#0c0c2d]/80 backdrop-blur-sm rounded-xl shadow-[0_0_15px_rgba(138,43,226,0.3)] p-6 transform transition-all hover:shadow-[0_0_20px_rgba(138,43,226,0.5)] border border-indigo-900"
          >
            <div className="flex items-center mb-6">
              <Clock className="h-6 w-6 text-cyan-400 mr-2" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Temporal Convergence
              </h2>
            </div>
            <CountdownTimer targetDate="2025-06-15T18:00:00" />
          </section>
        </div>

        <div className="fixed bottom-6 right-6 z-20">
          <EasterEggButton />
        </div>
      </main>

      <footer className="bg-indigo-950 text-white py-8 mt-16 border-t border-indigo-800 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-medium mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            "Time is a Construct, But Our Memories Are Forever..."
          </p>
          <p className="text-sm text-indigo-300">Created with ❤️ for the Time Travelers of 2025</p>
        </div>
      </footer>
    </div>
  )
}
