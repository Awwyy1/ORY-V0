"use client"

import { motion } from "framer-motion"

const philosophyItems = [
    {
        title: "The Silk Covenant",
        text: "We believe that luxury shouldn't be fragile. Our philosophy centers on the intersection of biological comfort and mechanical precision. To wear ORY is to enter a pact with your own skin — a promise of zero friction and absolute confidence.",
    },
    {
        title: "Anatomical Engineering",
        text: "We don't design underwear; we engineer habitats. Every curve and stitch is dictated by the physics of the male body in motion. We use 100% Grade 6A Mulberry silk because it is the only material that respects the complexity of human biology.",
    },
    {
        title: "Quiet Luxury",
        text: "True confidence is silent. Our garments carry no external logos. The value of ORY is known only to the wearer. It is a private standard of excellence for the man who demands the best where it matters most.",
    },
]

export function Philosophy() {
    return (
        <section id="philosophy" className="py-24 md:py-32 px-8 lg:px-12 bg-foreground">
            <div className="max-w-[900px] mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 md:mb-20"
                >
                    <p className="text-xs font-normal tracking-[0.3em] uppercase mb-3"
                        style={{ color: '#4DC9F6' }}
                    >
                        ❝
                    </p>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-background tracking-wide">
                        Philosophy
                    </h2>
                </motion.div>

                {/* Philosophy Items */}
                <div className="space-y-14 md:space-y-16">
                    {philosophyItems.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="border-l-2 pl-6 md:pl-8"
                            style={{ borderColor: 'rgba(77, 201, 246, 0.3)' }}
                        >
                            <h3 className="text-xs font-normal tracking-[0.25em] uppercase mb-4"
                                style={{ color: '#4DC9F6' }}
                            >
                                {item.title}
                            </h3>
                            <p className="text-base md:text-lg font-light text-background/70 leading-relaxed max-w-2xl">
                                {item.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
