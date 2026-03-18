"use client"

import { motion } from "framer-motion"
import { useTranslations } from "@/lib/i18n"

export function Statement() {
    const t = useTranslations()

    return (
        <section className="py-24 md:py-32 px-8 lg:px-12 bg-white">
            <div className="max-w-[1100px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 md:mb-20"
                >
                    <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-wide leading-tight">
                        {t.statement.line1}
                    </h2>
                    <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-muted-foreground/40 tracking-wide leading-tight mt-2">
                        {t.statement.line2}
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="border-l border-border pl-6 md:pl-8">
                            <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                                {t.statement.body}
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col items-start md:items-end justify-end"
                    >
                        <p className="text-xs font-normal text-foreground tracking-[0.25em] uppercase mb-4">
                            {t.statement.specTitle}
                        </p>
                        <div className="space-y-1.5 md:text-right">
                            <p className="text-xs font-light tracking-widest uppercase text-muted-foreground">
                                {t.statement.spec1}
                            </p>
                            <p className="text-xs font-light tracking-widest uppercase text-muted-foreground">
                                {t.statement.spec2}
                            </p>
                            <p className="text-xs font-light tracking-widest uppercase text-muted-foreground">
                                {t.statement.spec3}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
