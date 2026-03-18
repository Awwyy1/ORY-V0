"use client"

import { motion } from "framer-motion"
import { useTranslations } from "@/lib/i18n"

export function Philosophy() {
    const t = useTranslations()

    const philosophyItems = [
        { title: t.philosophy.covenantTitle, text: t.philosophy.covenantBody },
        { title: t.philosophy.engineeringTitle, text: t.philosophy.engineeringBody },
        { title: t.philosophy.luxuryTitle, text: t.philosophy.luxuryBody },
    ]

    return (
        <section id="philosophy" className="py-24 md:py-32 px-8 lg:px-12 bg-white">
            <div className="max-w-[900px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 md:mb-20"
                >
                    <h2 className="text-sm font-light text-foreground tracking-widest uppercase">
                        {t.philosophy.title}
                    </h2>
                </motion.div>

                <div className="space-y-16 md:space-y-20">
                    {philosophyItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="border-l border-border pl-6 md:pl-8"
                        >
                            <h3 className="text-xs font-normal tracking-[0.2em] uppercase text-foreground mb-4">
                                {item.title}
                            </h3>
                            <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed max-w-2xl">
                                {item.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
