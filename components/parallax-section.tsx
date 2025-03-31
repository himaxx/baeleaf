"use client"

import { useRef, forwardRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const ParallaxSection = forwardRef(({ children, className, index = 0 }, ref) => {
  const innerRef = useRef(null)

  // Use the forwarded ref or the inner ref
  const sectionRef = ref || innerRef

  // Create parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Different parallax speeds based on index (alternating)
  const isEven = index % 2 === 0
  const y = useTransform(scrollYProgress, [0, 1], isEven ? [50, -50] : [25, -25])

  // Opacity effect
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])

  // Scale effect
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.98, 1, 1, 0.98])

  return (
    <section ref={sectionRef} className={className}>
      <motion.div style={{ y, opacity, scale }} className="relative">
        {children}
      </motion.div>
    </section>
  )
})

ParallaxSection.displayName = "ParallaxSection"

export default ParallaxSection

