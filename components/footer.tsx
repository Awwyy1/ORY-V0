"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslations } from "@/lib/i18n"

const products = [
  { name: "ORY Stealth", href: "/product/stealth" },
  { name: "ORY Carbon", href: "/product/carbon" },
  { name: "ORY Ice", href: "/product/ice" },
  { name: "ORY Midnight", href: "/product/midnight" },
]

function PaymentIcon({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div
      className="w-10 h-6 bg-white border border-border/60 rounded flex items-center justify-center"
      aria-label={label}
    >
      {children}
    </div>
  )
}

function PaymentIcons() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Visa */}
      <PaymentIcon label="Visa">
        <svg viewBox="0 0 32 20" className="w-7 h-4" fill="none">
          <path d="M13.2 13.5l1.3-7.9h2l-1.3 7.9h-2zm8.8-7.7c-.4-.2-1-.3-1.8-.3-2 0-3.4 1-3.4 2.5 0 1.1 1 1.7 1.8 2 .8.4 1 .6 1 1 0 .5-.6.8-1.2.8-.8 0-1.2-.1-1.9-.4l-.3-.1-.3 1.7c.5.2 1.3.4 2.2.4 2.1 0 3.5-1 3.5-2.6 0-.9-.5-1.5-1.7-2.1-.7-.4-1.1-.6-1.1-.9 0-.3.4-.6 1.1-.6.6 0 1.1.1 1.5.3l.2.1.4-1.8zM26.6 5.6h-1.5c-.5 0-.8.1-1 .6l-2.9 6.9h2.1l.4-1.1h2.5l.2 1.1h1.8l-1.6-7.5zm-2.2 4.9c.2-.4.7-2 .7-2l.4 2h-1.1zM11.7 5.6L9.8 11l-.2-1c-.4-1.2-1.5-2.6-2.8-3.2l1.8 6.7h2.1l3.1-7.9h-2.1z" fill="#1A1F71"/>
          <path d="M7.8 5.6H4.6l0 .2c2.5.6 4.1 2.1 4.8 3.9l-.7-3.5c-.1-.5-.4-.6-1-.6z" fill="#F9A533"/>
        </svg>
      </PaymentIcon>

      {/* Mastercard */}
      <PaymentIcon label="Mastercard">
        <svg viewBox="0 0 32 20" className="w-7 h-4" fill="none">
          <circle cx="12" cy="10" r="6" fill="#EB001B"/>
          <circle cx="20" cy="10" r="6" fill="#F79E1B"/>
          <path d="M16 5.3a6 6 0 010 9.4 6 6 0 000-9.4z" fill="#FF5F00"/>
        </svg>
      </PaymentIcon>

      {/* Amex */}
      <PaymentIcon label="American Express">
        <svg viewBox="0 0 32 20" className="w-7 h-4" fill="none">
          <rect x="2" y="3" width="28" height="14" rx="2" fill="#016FD0"/>
          <text x="16" y="12" textAnchor="middle" fontSize="5" fontWeight="bold" fill="white" fontFamily="sans-serif">AMEX</text>
        </svg>
      </PaymentIcon>

      {/* Apple Pay */}
      <PaymentIcon label="Apple Pay">
        <svg viewBox="0 0 32 20" className="w-7 h-4" fill="none">
          <path d="M9.4 6.5c-.3.4-.8.7-1.3.6-.1-.5.2-1 .4-1.3.3-.4.8-.6 1.2-.7.1.5-.1 1-.3 1.4zm.3.7c-.7 0-1.3.4-1.7.4-.3 0-.9-.4-1.5-.4-.8 0-1.5.4-1.9 1.1-1 1.5-.2 3.7.6 4.9.4.6.9 1.2 1.5 1.2.6 0 .8-.4 1.5-.4s.9.4 1.5.4c.7 0 1.1-.6 1.5-1.2.4-.7.6-1.3.6-1.3-.5-.3-1.1-1-1.1-1.9 0-.8.5-1.5 1-1.8-.5-.6-1.2-.9-1.9-.9h-.1z" fill="#000"/>
          <text x="21" y="12.5" textAnchor="middle" fontSize="5.5" fontWeight="600" fill="#000" fontFamily="sans-serif">Pay</text>
        </svg>
      </PaymentIcon>

      {/* Google Pay */}
      <PaymentIcon label="Google Pay">
        <svg viewBox="0 0 32 20" className="w-7 h-4" fill="none">
          <path d="M15.2 10.3v2.5h-.8V6h2.1c.5 0 1 .2 1.4.5.4.3.6.8.6 1.3s-.2 1-.6 1.3c-.4.3-.8.5-1.4.5h-1.3zm0-3.5v2.7h1.3c.3 0 .6-.1.8-.4.2-.2.4-.5.4-.9 0-.4-.1-.7-.4-.9-.2-.3-.5-.4-.8-.4h-1.3z" fill="#4285F4"/>
          <path d="M21.3 8.6c.6 0 1 .2 1.4.5l-.6.6c-.2-.2-.5-.4-.8-.4-.6 0-1 .5-1 1.1 0 .6.4 1.1 1 1.1.4 0 .6-.2.8-.4l.6.6c-.3.4-.8.6-1.4.6-1 0-1.8-.8-1.8-1.8.1-1.1.8-1.9 1.8-1.9z" fill="#4285F4"/>
          <path d="M12.6 9.8c0-.2 0-.4-.1-.5h-2v1h1.2c0 .3-.1.5-.3.6v.5h.5c.4-.3.7-.9.7-1.6z" fill="#4285F4"/>
          <path d="M10.5 12c.5 0 1-.2 1.3-.5l-.5-.4c-.2.1-.4.2-.8.2-.5 0-1-.4-1-.9h-1.8v.5c.3.7 1 1.1 1.8 1.1z" fill="#34A853"/>
          <path d="M9.5 10.3c0-.2.1-.4.1-.5 0-.2-.1-.4-.1-.5v-.5H7.7c-.2.3-.2.7-.2 1s.1.7.2 1l.8-.5z" fill="#FBBC04"/>
          <path d="M10.5 8.4c.3 0 .6.1.8.3l.6-.6c-.4-.4-.9-.6-1.4-.6-.8 0-1.5.4-1.8 1.1l.8.5c.2-.5.5-.7 1-.7z" fill="#EA4335"/>
        </svg>
      </PaymentIcon>

      {/* Klarna */}
      <PaymentIcon label="Klarna">
        <svg viewBox="0 0 32 20" className="w-7 h-4" fill="none">
          <path d="M7.2 6h1.5v8H7.2V6zm1.6 0h1.4C10 7.6 9.3 9 8.2 10l2.4 4h-1.8l-2.2-3.6.5-.4c1-.8 1.6-2 1.7-3.2V6zm3.9 5.4c0 .5.4.8.9.8s.9-.3.9-.8c0-.5-.4-.8-.9-.8s-.9.3-.9.8zm3.3 0c0 1.2-1 2.2-2.4 2.2s-2.4-1-2.4-2.2 1-2.2 2.4-2.2 2.4 1 2.4 2.2zm1 .1v2.5h-1.4V9.4h1.4v.5c.3-.4.8-.7 1.4-.7 1.2 0 1.8.8 1.8 2v2.8h-1.4v-2.5c0-.6-.3-1-.9-1-.5 0-.9.4-.9 1zm6 .1c0-.6-.4-1-1-1-.5 0-1 .4-1 1s.4 1 1 1c.6 0 1-.4 1-1zm1.4 0c0 1.3-1 2.2-2.3 2.2-.5 0-.9-.1-1.2-.4v.3h-1.4V6H22v3.7c.3-.3.7-.5 1.2-.5 1.3 0 2.3 1 2.3 2.3z" fill="#0A0B09"/>
        </svg>
      </PaymentIcon>
    </div>
  )
}

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
              {products.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs font-light text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
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

        {/* Payment methods */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <span className="text-xs font-light text-muted-foreground tracking-wide whitespace-nowrap">
            {t.footer.weAccept}
          </span>
          <PaymentIcons />
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
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
