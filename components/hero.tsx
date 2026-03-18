"use client"

import { motion } from "framer-motion"
import { useTranslations } from "@/lib/i18n"

export function Hero() {
  const t = useTranslations()

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-[position:65%_center] md:bg-center"
        style={{
          backgroundImage: `url('/images/hero.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-white text-sm md:text-base font-light tracking-widest mb-6">
            {t.hero.title}
          </p>
          <a
            href="#collection"
            className="inline-block text-white text-sm font-light tracking-wide border-b border-white/50 pb-1 hover:border-white transition-colors duration-300"
          >
            {t.hero.cta}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
