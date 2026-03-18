"use client"

import { motion } from "framer-motion"
import { Thermometer, Droplets, Shield, Feather, Gem, Heart } from "lucide-react"
import { useTranslations } from "@/lib/i18n"

const benefitIcons = [Thermometer, Droplets, Shield, Feather, Gem, Heart]
const stats = ["−1.5°C", "30%", "0%", "42g", "500+", "pH 5.5"]

export function WhySilk() {
    const t = useTranslations()

    const benefits = [
        { title: t.whySilk.thermoregulation, description: t.whySilk.thermoregulationDesc },
        { title: t.whySilk.moisture, description: t.whySilk.moistureDesc },
        { title: t.whySilk.hypoallergenic, description: t.whySilk.hypoallergenicDesc },
        { title: t.whySilk.featherlight, description: t.whySilk.featherlightDesc },
        { title: t.whySilk.durable, description: t.whySilk.durableDesc },
        { title: t.whySilk.skinKind, description: t.whySilk.skinKindDesc },
    ]

    return (
        <section id="why-silk" className="py-24 md:py-32 px-8 lg:px-12 bg-muted border-t border-border">
            <div className="max-w-[1200px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <h2 className="text-sm font-light text-foreground tracking-widest uppercase mb-6">
                        {t.whySilk.title}
                    </h2>
                    <p className="text-sm font-light text-muted-foreground max-w-lg mx-auto leading-relaxed">
                        {t.whySilk.subtitle}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                    {benefits.map((benefit, index) => {
                        const Icon = benefitIcons[index]
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                className="bg-muted p-8 md:p-10"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <Icon
                                        strokeWidth={1}
                                        className="w-5 h-5 text-muted-foreground/50"
                                    />
                                    <span className="text-lg md:text-xl font-display font-bold text-border tracking-wider">
                                        {stats[index]}
                                    </span>
                                </div>
                                <h3 className="text-xs font-normal tracking-[0.2em] uppercase text-foreground mb-3">
                                    {benefit.title}
                                </h3>
                                <p className="text-xs font-light text-muted-foreground leading-relaxed">
                                    {benefit.description}
                                </p>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
