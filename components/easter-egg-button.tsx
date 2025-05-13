"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Gift, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import confetti from "canvas-confetti"

// Sample quiz questions - replace with actual questions
const quizQuestions = [
  {
    id: 1,
    question: "Which senior was known for bringing homemade cookies to every study session?",
    options: ["Alex", "Jamie", "Taylor", "Jordan"],
    correctAnswer: "Jamie",
  },
  {
    id: 2,
    question: "Who famously fell asleep during the principal's speech at orientation?",
    options: ["Casey", "Alex", "Jordan", "Taylor"],
    correctAnswer: "Casey",
  },
  {
    id: 3,
    question: "Which senior holds the school record for most community service hours?",
    options: ["Taylor", "Alex", "Jamie", "Jordan"],
    correctAnswer: "Taylor",
  },
]

export default function EasterEggButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOpen = () => {
    setIsOpen(true)
    setCurrentQuestion(0)
    setScore(0)
    setShowResults(false)
    setSelectedOption(null)
  }

  const handleAnswer = (option: string) => {
    setSelectedOption(option)

    const isCorrect = option === quizQuestions[currentQuestion].correctAnswer

    if (isCorrect) {
      setScore(score + 1)
      // Trigger confetti for correct answer
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#67e8f9", "#8b5cf6", "#c026d3"],
      })
    }

    // Move to next question after a short delay
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null)
      } else {
        setShowResults(true)
      }
    }, 1000)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResults(false)
    setSelectedOption(null)
  }

  return (
    <>
      <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }} className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur-md opacity-70"></div>
        <Button
          onClick={handleOpen}
          className="relative rounded-full h-14 w-14 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-lg"
        >
          <Gift className="h-6 w-6" />
        </Button>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-[#0c0c2d] border border-indigo-800">
          <DialogHeader>
            <DialogTitle className="text-indigo-200">
              {showResults ? "Temporal Quiz Results" : "Identify the Time Traveler!"}
            </DialogTitle>
            <DialogClose />
          </DialogHeader>

          <div className="py-4">
            {!showResults ? (
              <div className="space-y-4">
                <h3 className="font-medium text-lg text-center text-indigo-200">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </h3>

                <p className="text-center mb-4 text-indigo-300">{quizQuestions[currentQuestion].question}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {quizQuestions[currentQuestion].options.map((option) => (
                    <Button
                      key={option}
                      variant={
                        selectedOption === option
                          ? option === quizQuestions[currentQuestion].correctAnswer
                            ? "default"
                            : "destructive"
                          : "outline"
                      }
                      className={
                        selectedOption === option && option === quizQuestions[currentQuestion].correctAnswer
                          ? "bg-green-600 hover:bg-green-700"
                          : selectedOption !== option
                            ? "border-indigo-700 text-indigo-300 hover:bg-indigo-900/50 hover:text-cyan-400"
                            : ""
                      }
                      onClick={() => !selectedOption && handleAnswer(option)}
                      disabled={!!selectedOption}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  You scored {score} out of {quizQuestions.length}!
                </h3>

                {score === quizQuestions.length ? (
                  <p className="text-green-400">Perfect score! You're a true time traveler!</p>
                ) : score >= quizQuestions.length / 2 ? (
                  <p className="text-amber-400">Not bad! Your temporal awareness is developing nicely.</p>
                ) : (
                  <p className="text-red-400">
                    You need more time in the temporal field with the seniors before they depart!
                  </p>
                )}

                <Button
                  onClick={resetQuiz}
                  className="mt-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Reset Timeline
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
