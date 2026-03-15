"use client"

import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image/Video Placeholder */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero.png')`,
        }}
      >
        {/* Subtle dark overlay for text legibility */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Hero Content - Minimal */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-white text-sm md:text-base font-light tracking-widest mb-6">
            For Those with Balls
          </p>
          <a
            href="#collection"
            className="inline-block text-white text-sm font-light tracking-wide border-b border-white/50 pb-1 hover:border-white transition-colors duration-300"
          >
            Discover
          </a>
        </motion.div>
      </div>
    </section>
  )
}
