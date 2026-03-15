"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, ArrowRight } from "lucide-react"

export function Newsletter() {
    const [email, setEmail] = useState("")

    return (
        <section className="py-24 md:py-32 px-8 lg:px-12 bg-muted border-t border-border">
            <div className="max-w-[600px] mx-auto text-center">
                {/* Icon */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Mail strokeWidth={1} className="w-6 h-6 text-muted-foreground mx-auto mb-6" />

                    <h2 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-wide mb-3">
                        Stay in the Loop
                    </h2>
                    <p className="text-xs font-light text-muted-foreground leading-relaxed mb-10">
                        New drops, exclusive offers, and early access. No spam, just silk.
                    </p>
                </motion.div>

                {/* Form */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    onSubmit={(e) => e.preventDefault()}
                    className="flex flex-col sm:flex-row gap-3 mb-6"
                >
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        className="flex-1 px-4 py-3 text-xs font-light text-foreground bg-background border border-border placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-foreground text-background text-xs font-normal tracking-widest uppercase hover:bg-foreground/80 transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                        Subscribe
                        <ArrowRight strokeWidth={1} className="w-3.5 h-3.5" />
                    </button>
                </motion.form>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-[10px] font-light text-muted-foreground/60 tracking-widest uppercase"
                >
                    Unsubscribe anytime. We respect your privacy.
                </motion.p>
            </div>
        </section>
    )
}
