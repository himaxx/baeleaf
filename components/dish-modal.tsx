"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Heart, Share2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DishModal({ dish, onClose }) {
  const [activeTab, setActiveTab] = useState("description")
  const [isFavorite, setIsFavorite] = useState(false)

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  // Simulate preparation time based on dish name length
  const prepTime = Math.max(10, dish.name.length * 2)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          mass: 0.5,
        }}
        className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 rounded-full p-2 hover:bg-white transition-colors shadow-md"
          aria-label="Close modal"
          onTouchEnd={onClose}
        >
          <X className="h-6 w-6 text-dark-brown" />
        </button>

        <div className="relative w-full md:w-2/5 h-64 md:h-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
          <Image
            src={`/placeholder.svg?height=600&width=800`}
            alt={dish.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <div className="absolute top-4 left-4 z-10 flex space-x-2">
            {dish.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs px-3 py-1 rounded-full backdrop-blur-sm ${
                  tag === "Vegetarian"
                    ? "bg-emerald-100/90 text-emerald-800"
                    : tag === "Spicy"
                      ? "bg-red-100/90 text-red-800"
                      : tag === "Chef's Special"
                        ? "bg-amber-100/90 text-amber-800"
                        : "bg-gray-100/90 text-gray-800"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark-brown">{dish.name}</h2>
            <span className="font-bold text-xl text-medium-brown">{dish.price}</span>
          </div>

          <div className="flex items-center mb-6 text-medium-brown text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span>Prep time: {prepTime} mins</span>
          </div>

          <div className="mb-6">
            <div className="flex border-b border-medium-brown/20">
              <button
                className={`px-4 py-2 font-medium text-sm transition-colors relative ${
                  activeTab === "description" ? "text-dark-brown" : "text-medium-brown hover:text-dark-brown"
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
                {activeTab === "description" && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-green" />
                )}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "description" ? (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="py-4"
                >
                  <p className="text-medium-brown leading-relaxed">{dish.description}</p>
                </motion.div>
              ) : (
                <motion.div
                  key="ingredients"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="py-4"
                >
                  <ul className="list-disc list-inside text-medium-brown space-y-1">
                    {/* Generate fake ingredients based on dish name */}
                    {dish.name.split(" ").map((word, i) => (
                      <li key={i}>Premium {word.toLowerCase()}</li>
                    ))}
                    <li>Fresh herbs and spices</li>
                    <li>Locally sourced ingredients</li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1 bg-dark-brown hover:bg-medium-brown text-cream">Add to Order</Button>
            <Button
              variant="outline"
              className={`${isFavorite ? "bg-red-50 text-red-600 border-red-200" : "text-medium-brown border-medium-brown/30"}`}
              onClick={(e) => {
                e.stopPropagation()
                setIsFavorite(!isFavorite)
              }}
            >
              <Heart className={`h-5 w-5 mr-2 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              {isFavorite ? "Saved" : "Save"}
            </Button>
            <Button variant="outline" className="text-medium-brown border-medium-brown/30">
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

