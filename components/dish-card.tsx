"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export default function DishCard({ dish, onClick, delay = 0, categoryName }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)

  // Mouse parallax effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

  const rotateX = useTransform(mouseY, [-15, 15], [2, -2])
  const rotateY = useTransform(mouseX, [-15, 15], [-2, 2])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    x.set(mouseX / 15)
    y.set(mouseY / 15)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  // Generate a unique gradient based on category name
  const getGradient = () => {
    const gradients = {
      Pastas: "from-amber-50 to-amber-100",
      Pizzas: "from-red-50 to-red-100",
      Chinese: "from-emerald-50 to-emerald-100",
      Maggie: "from-yellow-50 to-yellow-100",
      Sandwiches: "from-blue-50 to-blue-100",
      "Hot Coffee & Tea": "from-orange-50 to-orange-100",
      "Cold Coffee": "from-cyan-50 to-cyan-100",
    }

    return gradients[categoryName] || "from-gray-50 to-gray-100"
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay,
        type: "spring",
        stiffness: 100,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="dish-card rounded-xl overflow-hidden shadow-lg transition-all cursor-pointer group border-2 border-gray-300 hover:shadow-xl hover:border-accent-green"
    >
      <div className="relative h-52 overflow-hidden">
        {/* Enhanced gradient overlay for better image visibility */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getGradient()} opacity-30 z-0`}></div>

        {/* Image with enhanced hover effect */}
        <Image
          src={`images/${dish.name}.jpg?height=400&width=600`}
          alt={dish.name}
          fill
          className="object-cover dish-card-image z-10"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Improved gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-20"></div>

        {/* Price tag with enhanced styling */}
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-dark-brown font-bold shadow-md z-30 transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent-green group-hover:text-dark-brown">
          {dish.price}
        </div>
      </div>

      <div className="p-5 relative z-20">
        <h3 className="font-heading font-bold text-xl text-dark-brown mb-2 group-hover:text-medium-brown transition-colors">
          {dish.name}
        </h3>

        <p className="text-medium-brown text-sm line-clamp-2 mb-3">{dish.description.substring(0, 80)}...</p>

        <div className="flex flex-wrap gap-1.5">
          {dish.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs px-2.5 py-1 rounded-full transition-all duration-300 ${
                tag === "Vegetarian"
                  ? "bg-emerald-100 text-emerald-800 group-hover:bg-emerald-200"
                  : tag === "Spicy"
                    ? "bg-red-100 text-red-800 group-hover:bg-red-200"
                    : tag === "Chef's Special"
                      ? "bg-amber-100 text-amber-800 group-hover:bg-amber-200"
                      : "bg-gray-100 text-gray-800 group-hover:bg-gray-200"
              } ${isHovered ? "scale-110" : ""}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Enhanced hover indicator */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1.5 bg-accent-green origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  )
}

