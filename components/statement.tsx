"use client"

import { motion } from "framer-motion"

export function Statement() {
    return (
        <section className="py-24 md:py-32 px-8 lg:px-12 bg-white">
            <div className="max-w-[1100px] mx-auto">
                {/* Main Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 md:mb-20"
                >
                    <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-wide leading-tight">
                        Ordinary cotton is for ordinary days.
                    </h2>
                    <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-muted-foreground/40 tracking-wide leading-tight mt-2">
                        Silk is for the moments that matter.
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                    {/* Left - Quote */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="border-l border-border pl-6 md:pl-8">
                            <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                                Friction-free engineering for your most valuable assets. Designed with obsession. Built for those who give a damn. The feeling of liquid titanium against your skin.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right - Technical Specification */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col items-start md:items-end justify-end"
                    >
                        <p className="text-xs font-normal text-foreground tracking-[0.25em] uppercase mb-4">
                            Technical Specification
                        </p>
                        <div className="space-y-1.5 md:text-right">
                            <p className="text-xs font-light tracking-widest uppercase text-muted-foreground">
                                100% Grade 6A Mulberry Silk
                            </p>
                            <p className="text-xs font-light tracking-widest uppercase text-muted-foreground">
                                Invisible Flat-Lock Stitching
                            </p>
                            <p className="text-xs font-light tracking-widest uppercase text-muted-foreground">
                                Zero-Pressure Waistband
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
