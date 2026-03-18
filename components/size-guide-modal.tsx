"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { sizeGuide } from "@/lib/products"
import { useTranslations } from "@/lib/i18n"

interface SizeGuideModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  const t = useTranslations()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[80]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-background z-[90] flex flex-col max-h-[90vh] md:max-h-[80vh]"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h2 className="text-sm font-light tracking-widest uppercase text-foreground">
                {t.sizeGuide.title}
              </h2>
              <button
                onClick={onClose}
                className="text-foreground hover:opacity-70 transition-opacity p-1"
                aria-label="Close size guide"
              >
                <X strokeWidth={1} className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="mb-8">
                <h3 className="text-xs font-light tracking-widest uppercase text-foreground mb-3">
                  {t.sizeGuide.howToMeasure}
                </h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  {t.sizeGuide.measureInstructions}
                </p>
              </div>

              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full min-w-[360px]">
                  <thead>
                    <tr className="border-b border-border">
                      {sizeGuide.columns.map((col) => (
                        <th
                          key={col}
                          className="text-xs font-light tracking-widest uppercase text-foreground py-3 pr-4 text-left first:pl-0"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sizeGuide.rows.map((row) => (
                      <tr key={row[0]} className="border-b border-border/50">
                        {row.map((cell, i) => (
                          <td
                            key={i}
                            className={`py-3 pr-4 text-sm font-light first:pl-0 ${
                              i === 0
                                ? "text-foreground font-normal"
                                : "text-muted-foreground"
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 p-4 bg-secondary/50">
                <p className="text-xs font-light text-muted-foreground leading-relaxed">
                  <span className="text-foreground">{t.sizeGuide.fitNote}</span>{" "}
                  {t.sizeGuide.fitDescription}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
