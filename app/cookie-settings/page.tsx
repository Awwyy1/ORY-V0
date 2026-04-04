"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Check } from "lucide-react"

const COOKIE_CONSENT_KEY = "ory-cookie-consent"

interface CookieCategory {
  id: string
  name: string
  description: string
  required: boolean
  cookies: { name: string; provider: string; purpose: string; duration: string }[]
}

const cookieCategories: CookieCategory[] = [
  {
    id: "essential",
    name: "Essential",
    description:
      "These are necessary for the Site to function properly. They enable core features such as shopping cart, checkout, and cookie consent preferences. These cannot be disabled.",
    required: true,
    cookies: [
      {
        name: "ory-cart",
        provider: "ORY (localStorage)",
        purpose: "Stores your shopping cart items between sessions",
        duration: "Persistent",
      },
      {
        name: "ory-cookie-consent",
        provider: "ORY (localStorage)",
        purpose: "Remembers your cookie consent preference",
        duration: "Persistent",
      },
      {
        name: "ory-i18n",
        provider: "ORY (localStorage)",
        purpose: "Stores your language and currency preferences",
        duration: "Persistent",
      },
    ],
  },
  {
    id: "analytics",
    name: "Analytics",
    description:
      "These help us understand how visitors interact with our Site by collecting and reporting information anonymously. This data helps us improve our website and your shopping experience.",
    required: false,
    cookies: [
      {
        name: "_ga, _ga_*",
        provider: "Google Analytics 4",
        purpose: "Distinguishes unique users and tracks page views, e-commerce events (product views, add to cart, purchases)",
        duration: "Up to 2 years",
      },
      {
        name: "_clck, _clsk, CLID, ANONCHK, SM, MR",
        provider: "Microsoft Clarity",
        purpose: "Session recording, heatmaps, and click tracking for UX analysis",
        duration: "Up to 1 year",
      },
      {
        name: "va_*",
        provider: "Vercel Analytics",
        purpose: "Measures website performance (page load times, web vitals)",
        duration: "Session",
      },
    ],
  },
  {
    id: "payment",
    name: "Payment Processing",
    description:
      "These are set by our payment processor, Stripe, during checkout to enable secure payment processing and fraud prevention. They are only active during the checkout flow.",
    required: true,
    cookies: [
      {
        name: "__stripe_mid, __stripe_sid",
        provider: "Stripe",
        purpose: "Fraud prevention and secure payment processing",
        duration: "Up to 1 year",
      },
    ],
  },
]

export default function CookieSettingsPage() {
  const [consent, setConsent] = useState<string | null>(null)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true)
  const [saved, setSaved] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
    setConsent(stored)
    if (stored === "declined") {
      setAnalyticsEnabled(false)
    }
  }, [])

  const handleSave = () => {
    const value = analyticsEnabled ? "accepted" : "declined"
    localStorage.setItem(COOKIE_CONSENT_KEY, value)
    setConsent(value)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)

    // If analytics was just disabled, remove GA and Clarity cookies
    if (!analyticsEnabled) {
      // Clear GA cookies
      document.cookie.split(";").forEach((c) => {
        const name = c.trim().split("=")[0]
        if (name.startsWith("_ga") || name.startsWith("_cl") || name.startsWith("CLID")) {
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
        }
      })
    }
  }

  const handleAcceptAll = () => {
    setAnalyticsEnabled(true)
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted")
    setConsent("accepted")
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleDeclineAll = () => {
    setAnalyticsEnabled(false)
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined")
    setConsent("declined")
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-light text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft strokeWidth={1} className="w-4 h-4" />
            Back
          </Link>
          <Link href="/" className="flex-shrink-0">
            <span className="font-display text-xl md:text-2xl font-bold tracking-wide text-foreground">
              ORY
            </span>
          </Link>
          <div className="w-14" />
        </div>
      </div>

      <div className="max-w-[720px] mx-auto px-4 md:px-8 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-light tracking-wide text-foreground mb-2">
            Cookie Settings
          </h1>
          <p className="text-sm font-light text-muted-foreground leading-relaxed mb-4">
            We use cookies and similar technologies to provide you with the best experience on our
            Site. You can choose which categories of cookies you allow below. Essential cookies
            cannot be disabled as they are necessary for the Site to function.
          </p>

          {consent && (
            <p className="text-xs font-light text-muted-foreground mb-8">
              Your current preference:{" "}
              <span className="text-foreground font-normal">
                {consent === "accepted" ? "All cookies accepted" : "Analytics cookies declined"}
              </span>
            </p>
          )}

          {/* Quick actions */}
          <div className="flex items-center gap-3 mb-10">
            <button
              onClick={handleAcceptAll}
              className="px-6 py-2.5 text-xs font-light tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-colors duration-300"
            >
              Accept All
            </button>
            <button
              onClick={handleDeclineAll}
              className="px-6 py-2.5 text-xs font-light tracking-widest uppercase border border-border text-foreground hover:border-foreground transition-colors duration-300"
            >
              Decline Optional
            </button>
          </div>

          {/* Cookie categories */}
          <div className="space-y-6">
            {cookieCategories.map((category) => {
              const isEnabled =
                category.required || (category.id === "analytics" && analyticsEnabled)

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border border-border"
                >
                  {/* Category header */}
                  <div className="flex items-center justify-between p-5">
                    <div className="flex-1 mr-4">
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-normal text-foreground tracking-wide">
                          {category.name}
                        </h2>
                        {category.required && (
                          <span className="text-[10px] font-light tracking-widest uppercase text-muted-foreground border border-border px-2 py-0.5">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-light text-muted-foreground leading-relaxed mt-2">
                        {category.description}
                      </p>
                    </div>
                    {!category.required && (
                      <button
                        onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                        className={`relative w-11 h-6 rounded-full transition-colors duration-300 flex-shrink-0 ${
                          isEnabled ? "bg-foreground" : "bg-border"
                        }`}
                        aria-label={`${isEnabled ? "Disable" : "Enable"} ${category.name} cookies`}
                      >
                        <div
                          className={`absolute top-0.5 w-5 h-5 rounded-full bg-background shadow transition-transform duration-300 ${
                            isEnabled ? "translate-x-[22px]" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    )}
                    {category.required && (
                      <div className="w-11 h-6 rounded-full bg-foreground flex items-center justify-center flex-shrink-0 opacity-50">
                        <Check strokeWidth={2} className="w-3 h-3 text-background" />
                      </div>
                    )}
                  </div>

                  {/* Cookie details */}
                  <div className="border-t border-border">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs font-light">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left px-5 py-2.5 text-muted-foreground font-normal tracking-wide uppercase">
                              Cookie
                            </th>
                            <th className="text-left px-5 py-2.5 text-muted-foreground font-normal tracking-wide uppercase">
                              Provider
                            </th>
                            <th className="text-left px-5 py-2.5 text-muted-foreground font-normal tracking-wide uppercase hidden md:table-cell">
                              Purpose
                            </th>
                            <th className="text-left px-5 py-2.5 text-muted-foreground font-normal tracking-wide uppercase">
                              Duration
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.cookies.map((cookie) => (
                            <tr key={cookie.name} className="border-b border-border last:border-0">
                              <td className="px-5 py-2.5 text-foreground font-normal whitespace-nowrap">
                                {cookie.name}
                              </td>
                              <td className="px-5 py-2.5 text-muted-foreground">
                                {cookie.provider}
                              </td>
                              <td className="px-5 py-2.5 text-muted-foreground hidden md:table-cell">
                                {cookie.purpose}
                              </td>
                              <td className="px-5 py-2.5 text-muted-foreground whitespace-nowrap">
                                {cookie.duration}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Save button */}
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={handleSave}
              className="px-8 py-3 text-xs font-light tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-colors duration-300"
            >
              Save Preferences
            </button>
            {saved && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs font-light text-foreground flex items-center gap-1.5"
              >
                <Check strokeWidth={1.5} className="w-3.5 h-3.5" />
                Preferences saved
              </motion.span>
            )}
          </div>

          {/* Additional info */}
          <div className="mt-12 space-y-6 text-sm font-light text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                What Are Cookies?
              </h2>
              <p>
                Cookies are small text files placed on your device by websites you visit. They are
                widely used to make websites work efficiently and to provide information to website
                owners. We also use localStorage, a similar browser technology, to store certain
                preferences on your device.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                How to Control Cookies via Your Browser
              </h2>
              <p>
                In addition to the controls above, most web browsers allow you to manage cookies
                through their settings. You can typically set your browser to block or delete cookies.
                Please note that blocking all cookies may affect the functionality of our Site,
                including your ability to place orders.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                More Information
              </h2>
              <p>
                For more details about how we handle your data, please read our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-foreground underline underline-offset-2 hover:text-foreground/80 transition-colors"
                >
                  Privacy Policy
                </Link>
                . If you have questions, contact us at{" "}
                <a
                  href="mailto:support@orysilk.com"
                  className="text-foreground underline underline-offset-2 hover:text-foreground/80 transition-colors"
                >
                  support@orysilk.com
                </a>
                .
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
