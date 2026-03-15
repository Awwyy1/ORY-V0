"use client"

import { motion } from "framer-motion"
import { Thermometer, Droplets, Shield, Feather, Gem, Heart } from "lucide-react"

const benefits = [
    {
        icon: Thermometer,
        stat: "−1.5°C",
        title: "Thermoregulation",
        description: "Natural temperature regulation keeps you cool in summer and warm in winter. Silk adapts to your body.",
    },
    {
        icon: Droplets,
        stat: "30%",
        title: "Moisture Wicking",
        description: "Absorbs up to 30% of its weight in moisture without feeling damp. Keeps you dry all day.",
    },
    {
        icon: Shield,
        stat: "0%",
        title: "Hypoallergenic",
        description: "Zero synthetic irritants. Natural sericin protein resists dust mites, mold, and bacteria.",
    },
    {
        icon: Feather,
        stat: "42g",
        title: "Featherlight",
        description: "Each pair weighs just 42 grams. You'll forget you're wearing them — that's the point.",
    },
    {
        icon: Gem,
        stat: "500+",
        title: "Ultra Durable",
        description: "Grade 6A silk withstands 500+ washes without losing softness or structural integrity.",
    },
    {
        icon: Heart,
        stat: "pH 5.5",
        title: "Skin-Kind",
        description: "Matches your skin's natural pH. 18 amino acids nourish skin on contact. Dermatologist approved.",
    },
]

export function WhySilk() {
    return (
        <section id="why-silk" className="py-24 md:py-32 px-8 lg:px-12 bg-muted border-t border-border">
            <div className="max-w-[1200px] mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <h2 className="text-sm font-light text-foreground tracking-widest uppercase mb-6">
                        Why Silk?
                    </h2>
                    <p className="text-sm font-light text-muted-foreground max-w-lg mx-auto leading-relaxed">
                        Cotton is a compromise. Synthetics are a lie. Silk is the only material engineered by nature to protect what matters most.
                    </p>
                </motion.div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="bg-muted p-8 md:p-10"
                        >
                            {/* Icon + Stat Row */}
                            <div className="flex items-center justify-between mb-6">
                                <benefit.icon
                                    strokeWidth={1}
                                    className="w-5 h-5 text-muted-foreground/50"
                                />
                                <span className="text-lg md:text-xl font-display font-bold text-border tracking-wider">
                                    {benefit.stat}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-xs font-normal tracking-[0.2em] uppercase text-foreground mb-3">
                                {benefit.title}
                            </h3>

                            {/* Description */}
                            <p className="text-xs font-light text-muted-foreground leading-relaxed">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
