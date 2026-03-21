"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useTranslations } from "@/lib/i18n"

const COOKIE_CONSENT_KEY = "ory-cookie-consent"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const t = useTranslations()

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted")
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined")
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "tween", duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-[640px] mx-auto bg-background border border-border shadow-lg p-5 md:p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <p className="text-xs font-light text-muted-foreground leading-relaxed">
                {t.cookie.message}
              </p>
              <button
                onClick={decline}
                className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <X strokeWidth={1} className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={accept}
                className="px-6 py-2.5 text-xs font-light tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-colors duration-300"
              >
                {t.cookie.accept}
              </button>
              <button
                onClick={decline}
                className="px-6 py-2.5 text-xs font-light tracking-widest uppercase border border-border text-foreground hover:border-foreground transition-colors duration-300"
              >
                {t.cookie.decline}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
