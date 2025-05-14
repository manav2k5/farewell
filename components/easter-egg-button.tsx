"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"

export default function EasterEggButton() {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="relative"
      >
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
              Farewell Message
            </DialogTitle>
            <DialogClose />
          </DialogHeader>

          <div className="py-4">
            <p className="text-center text-indigo-300">
              "It's hard to imagine this place without your smiles and your strength. The bonds we've formed will last. Go forth and shine, knowing you'll be missed by us all. Farewell, seniors."
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
