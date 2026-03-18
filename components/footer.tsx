"use client"

import { motion } from "framer-motion"
import { useTranslations } from "@/lib/i18n"

export function Footer() {
  const t = useTranslations()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 md:py-20 px-8 lg:px-12 bg-muted border-t border-border"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-1">
            <span className="font-display text-xl font-bold tracking-wide text-foreground">
              ORY
            </span>
            <p className="mt-4 text-xs font-light text-muted-foreground leading-relaxed max-w-xs">
              {t.footer.brand}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-normal text-foreground tracking-widest uppercase mb-6">
              {t.footer.explore}
            </h4>
            <ul className="space-y-3">
              {[
                { name: t.header.whySilk, href: "#why-silk" },
                { name: t.header.collection, href: "#collection" },
                { name: t.header.philosophy, href: "#philosophy" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-xs font-light text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-normal text-foreground tracking-widest uppercase mb-6">
              {t.footer.shop}
            </h4>
            <ul className="space-y-3">
              {[t.footer.boxerBriefs, t.footer.trunks, t.footer.loungeShorts].map((item) => (
                <li key={item}>
                  <a
                    href="#collection"
                    className="text-xs font-light text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-normal text-foreground tracking-widest uppercase mb-6">
              {t.footer.support}
            </h4>
            <ul className="space-y-3">
              {[t.footer.contact, t.footer.shippingReturns, t.product.sizeGuide, t.footer.careInstructions].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-xs font-light text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-light text-muted-foreground">
            &copy; 2026 ORY. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            {[t.footer.privacyPolicy, t.footer.termsOfService, t.footer.cookieSettings].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs font-light text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
