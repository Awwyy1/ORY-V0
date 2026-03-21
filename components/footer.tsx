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

function VisaIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-8" fill="none" aria-label="Visa">
      <rect width="48" height="32" rx="4" fill="#fff" stroke="#E5E7EB" strokeWidth="1"/>
      <path d="M20.5 21h-2.7l1.7-10.5h2.7L20.5 21zm11.3-10.2c-.5-.2-1.4-.4-2.4-.4-2.7 0-4.5 1.4-4.5 3.4 0 1.5 1.3 2.3 2.4 2.8 1 .5 1.4.8 1.4 1.3 0 .7-.8 1-1.6 1-1.1 0-1.6-.2-2.5-.5l-.3-.2-.4 2.2c.6.3 1.8.5 3 .5 2.8 0 4.7-1.4 4.7-3.5 0-1.2-.7-2.1-2.3-2.8-.9-.5-1.5-.8-1.5-1.3 0-.4.5-.9 1.5-.9.9 0 1.5.2 2 .4l.2.1.3-2.1zm6.8-.3h-2.1c-.6 0-1.1.2-1.4.8l-3.9 9.3h2.8l.6-1.5h3.4l.3 1.5h2.5l-2.2-10.1zm-3 6.5c.2-.5 1-2.7 1-2.7l.6 2.7h-1.6zM17.5 10.5l-2.5 7.2-.3-1.3c-.5-1.7-2-3.5-3.8-4.4l2.4 8.9h2.8l4.2-10.4h-2.8z" fill="#1A1F71"/>
      <path d="M12.5 10.5H8.4l0 .2c3.3.8 5.5 2.9 6.4 5.3l-.9-4.7c-.2-.7-.6-.8-1.4-.8z" fill="#F9A533"/>
    </svg>
  )
}

function MastercardIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-8" fill="none" aria-label="Mastercard">
      <rect width="48" height="32" rx="4" fill="#fff" stroke="#E5E7EB" strokeWidth="1"/>
      <circle cx="19" cy="16" r="8" fill="#EB001B"/>
      <circle cx="29" cy="16" r="8" fill="#F79E1B"/>
      <path d="M24 9.8a8 8 0 010 12.4 8 8 0 000-12.4z" fill="#FF5F00"/>
    </svg>
  )
}

function AmexIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-8" fill="none" aria-label="American Express">
      <rect width="48" height="32" rx="4" fill="#016FD0"/>
      <path d="M6 15.5l1.5-3.5h2.2l.9 2 .8-2h2.2l-1.9 3.5 2 3.5H11.5l-.9-2.1-.9 2.1H7.5l2-3.5zm14.5-3.5h-3l-2 7h2l.4-1.3h2.2l.4 1.3h2l-2-7zm-1.8 4.2l.6-2 .6 2h-1.2zM24 12v7h1.8v-2.5l1.8 2.5h2.3l-2.2-2.8 2-2.7h-2.1l-1.6 2.2V12H24zm7 0v7h5.5v-1.5h-3.5v-1.2h3.4v-1.4h-3.4V13.5h3.5V12H31z" fill="#fff"/>
    </svg>
  )
}

function ApplePayIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-8" fill="none" aria-label="Apple Pay">
      <rect width="48" height="32" rx="4" fill="#000"/>
      <path d="M14.2 11.5c-.5.6-1.2 1-1.9.9-.1-.7.3-1.5.7-2 .5-.5 1.2-.9 1.8-.9.1.8-.2 1.5-.6 2zm.6 1c-1 0-2 .6-2.5.6s-1.3-.6-2.2-.6c-1.1 0-2.2.7-2.7 1.7-1.2 2-.3 5 .8 6.7.6.8 1.2 1.7 2.1 1.7.8 0 1.2-.5 2.2-.5 1 0 1.3.5 2.1.5.9 0 1.4-.8 2-1.7.6-.9.9-1.8.9-1.8-1-.4-1.6-1.5-1.6-2.7 0-1.1.7-2.1 1.5-2.5-.7-.9-1.6-1.3-2.6-1.4z" fill="#fff"/>
      <path d="M22 14.5v6.7h1.2v-2.3h1.7c1.5 0 2.5-1 2.5-2.2s-1-2.2-2.5-2.2H22zm1.2 1h1.4c1 0 1.5.5 1.5 1.2s-.5 1.2-1.5 1.2h-1.4v-2.4zm5.5 4.8c0-.9.7-1.4 2-1.5l1.4-.1v-.4c0-.5-.4-.9-1.1-.9-.6 0-1 .3-1.1.7h-1.1c.1-1 1-1.7 2.2-1.7 1.3 0 2.2.7 2.2 1.8v3.7h-1.1v-.9c-.3.6-1 1-1.7 1-1.1 0-1.7-.6-1.7-1.7zm3.4-.5v-.4l-1.3.1c-.7 0-1 .3-1 .7 0 .4.4.7.9.7.7 0 1.4-.5 1.4-1.1zm2.5 3.4v-.9c.1 0 .3 0 .4 0 .5 0 .8-.2 1-.8l.1-.2-2-5.8h1.2l1.4 4.6 1.4-4.6h1.2l-2.1 6.1c-.5 1.3-1 1.7-2.1 1.7-.2 0-.4 0-.5-.1z" fill="#fff"/>
    </svg>
  )
}

function GooglePayIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-8" fill="none" aria-label="Google Pay">
      <rect width="48" height="32" rx="4" fill="#fff" stroke="#E5E7EB" strokeWidth="1"/>
      <path d="M22.8 16.3v3h-1V10.8h2.6c.6 0 1.2.2 1.7.7.5.4.7 1 .7 1.6 0 .7-.2 1.2-.7 1.6-.5.4-1 .6-1.7.6h-1.6zm0-4.4v3.4h1.6c.4 0 .8-.2 1.1-.5.3-.3.4-.6.4-1.1 0-.5-.1-.8-.4-1.1-.3-.3-.7-.5-1.1-.5h-1.6z" fill="#3C4043"/>
      <path d="M29.8 13.4c.7 0 1.3.2 1.7.6.4.4.6 1 .6 1.7v3.6h-1v-.8c-.3.5-.8.9-1.5.9-.6 0-1.1-.2-1.5-.5-.4-.3-.6-.8-.6-1.3 0-.5.2-1 .6-1.3.4-.3.9-.5 1.6-.5.5 0 1 .1 1.3.4v-.3c0-.4-.2-.7-.4-.9-.3-.3-.6-.4-1-.4-.6 0-1 .2-1.3.7l-.9-.5c.4-.7 1.1-1 2.1-1h-.1zm-1.3 4.3c0 .3.1.5.4.7.2.2.5.3.8.3.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1-.4-.3-.8-.4-1.3-.4-.4 0-.7.1-1 .3-.3.2-.5.4-.5.7z" fill="#3C4043"/>
      <path d="M37 13.6l-3.4 7.8h-1l1.3-2.7-2.2-5.1h1.1l1.6 3.9 1.6-3.9H37z" fill="#3C4043"/>
      <path d="M18.8 15.6c0-.3 0-.6-.1-.9h-4.4v1.7h2.5c-.1.6-.4 1-.8 1.4v1.1h1.3c.8-.7 1.3-1.8 1.5-3.3z" fill="#4285F4"/>
      <path d="M14.3 19.2c1.1 0 2.1-.4 2.8-1l-1.3-1.1c-.4.3-.9.4-1.4.4-1.1 0-2-.7-2.3-1.7h-1.4v1.1c.7 1.4 2 2.3 3.6 2.3z" fill="#34A853"/>
      <path d="M12 15.8c0-.3.1-.6.2-.9v-1.1h-1.4c-.3.6-.4 1.3-.4 2s.2 1.4.4 2h1.4c-.1-.3-.2-.6-.2-.9v-1.1z" fill="#FBBC04"/>
      <path d="M14.3 12.3c.6 0 1.1.2 1.5.6l1.1-1.1c-.7-.6-1.6-1-2.6-1-1.5 0-2.9.9-3.6 2.3l1.4 1.1c.3-1 1.2-1.9 2.2-1.9z" fill="#EA4335"/>
    </svg>
  )
}

function KlarnaIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-8" fill="none" aria-label="Klarna">
      <rect width="48" height="32" rx="4" fill="#FFB3C7"/>
      <path d="M11 10h2.1v12H11V10zm2.2 0h2c-.1 2.2-1 4.2-2.5 5.7l-.1.1 3 6.2h-2.3l-2.8-5.8.6-.5c1.3-1.2 2-2.9 2.1-4.7V10zm5.5 7.5c0 .7.6 1.2 1.3 1.2s1.3-.5 1.3-1.2-.6-1.2-1.3-1.2-1.3.5-1.3 1.2zm4.6.2v4.3h-1.9v-8h1.9v.6c.4-.5 1.1-.8 1.8-.8 1.6 0 2.5 1.1 2.5 2.8v5.4h-1.9v-3.4c0-.9-.4-1.3-1.1-1.3-.8 0-1.3.5-1.3 1.3v.1zm8.2.1c0-.8-.5-1.4-1.3-1.4-.7 0-1.3.6-1.3 1.4s.5 1.4 1.3 1.4c.8 0 1.3-.6 1.3-1.4zm1.9 0c0 1.7-1.3 3-3 3-.7 0-1.3-.2-1.7-.6v.4h-1.9V10h1.9v5c.4-.4 1-.7 1.7-.7 1.7 0 3 1.3 3 3z" fill="#0A0B09"/>
      <circle cx="37" cy="20" r="1.2" fill="#0A0B09"/>
    </svg>
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

        <div className="mt-16 pt-8 border-t border-border">
          {/* Copyright + Payment Icons + Policy Links */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs font-light text-muted-foreground">
                &copy; 2026 ORY. {t.footer.rights}
              </p>

              <div className="flex items-center gap-2">
                <VisaIcon />
                <MastercardIcon />
                <AmexIcon />
                <ApplePayIcon />
                <GooglePayIcon />
                <KlarnaIcon />
              </div>

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
        </div>
      </div>
    </motion.footer>
  )
}
