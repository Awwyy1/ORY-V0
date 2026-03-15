"use client"

import { motion } from "framer-motion"

export function Statement() {
    return (
        <section className="py-24 md:py-32 px-8 lg:px-12 bg-foreground">
            <div className="max-w-[1100px] mx-auto">
                {/* Main Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-background/90 tracking-wide leading-tight mb-4">
                        Ordinary cotton is for ordinary days.
                    </h2>
                    <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-wide leading-tight mb-16 md:mb-20"
                        style={{ color: '#4DC9F6' }}
                    >
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
                        <div className="border-l-2 border-background/20 pl-6 md:pl-8">
                            <p className="text-base md:text-lg font-light text-background/70 leading-relaxed">
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
                        <p className="text-xs font-normal tracking-[0.25em] uppercase mb-4"
                            style={{ color: '#4DC9F6' }}
                        >
                            Technical Specification
                        </p>
                        <div className="space-y-1.5 md:text-right">
                            <p className="text-xs font-light tracking-widest uppercase text-background/50">
                                100% Grade 6A Mulberry Silk
                            </p>
                            <p className="text-xs font-light tracking-widest uppercase text-background/50">
                                Invisible Flat-Lock Stitching
                            </p>
                            <p className="text-xs font-light tracking-widest uppercase text-background/50">
                                Zero-Pressure Waistband
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
