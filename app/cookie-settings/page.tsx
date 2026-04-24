"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Check, AlertCircle } from "lucide-react"
import { Footer } from "@/components/footer"
import {
  CONSENT_CHANGE_EVENT,
  clearAnalyticsCookies,
  getConsent,
  setConsent,
} from "@/lib/consent"

interface CookieCategory {
  id: "essential" | "analytics" | "payment"
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
      "Necessary for the Site to function properly. They enable core features such as shopping cart, checkout, and your cookie preferences. These cannot be disabled.",
    required: true,
    cookies: [
      {
        name: "broov-cart",
        provider: "BROOV (localStorage)",
        purpose: "Stores your shopping cart items between sessions",
        duration: "Persistent",
      },
      {
        name: "broov-cookie-consent",
        provider: "BROOV (localStorage)",
        purpose: "Remembers your cookie consent preference",
        duration: "Persistent",
      },
      {
        name: "broov-i18n",
        provider: "BROOV (localStorage)",
        purpose: "Stores your language and currency preferences",
        duration: "Persistent",
      },
    ],
  },
  {
    id: "analytics",
    name: "Analytics & Performance",
    description:
      "Help us understand how visitors interact with our Site and improve the shopping experience. Disabled by default until you consent.",
    required: false,
    cookies: [
      {
        name: "_ga, _ga_*",
        provider: "Google Analytics 4",
        purpose:
          "Distinguishes unique users and tracks page views and e-commerce events (product views, add to cart, purchases)",
        duration: "Up to 2 years",
      },
      {
        name: "_clck, _clsk, CLID, ANONCHK, SM, MR",
        provider: "Microsoft Clarity",
        purpose: "Session recordings, heatmaps, and click tracking for UX analysis",
        duration: "Up to 1 year",
      },
      {
        name: "va_*",
        provider: "Vercel Analytics",
        purpose: "Measures website performance and Core Web Vitals",
        duration: "Session",
      },
    ],
  },
  {
    id: "payment",
    name: "Payment Processing",
    description:
      "Set by our payment processor, Stripe, only during checkout to enable secure payment and fraud prevention. Not active on other pages.",
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
  const [mounted, setMounted] = useState(false)
  const [savedAnalytics, setSavedAnalytics] = useState(false)
  const [pendingAnalytics, setPendingAnalytics] = useState(false)
  const [justSaved, setJustSaved] = useState(false)

  useEffect(() => {
    setMounted(true)
    const current = getConsent() === "accepted"
    setSavedAnalytics(current)
    setPendingAnalytics(current)

    const handleChange = () => {
      const updated = getConsent() === "accepted"
      setSavedAnalytics(updated)
      setPendingAnalytics(updated)
    }
    window.addEventListener(CONSENT_CHANGE_EVENT, handleChange)
    window.addEventListener("storage", handleChange)
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, handleChange)
      window.removeEventListener("storage", handleChange)
    }
  }, [])

  const hasUnsavedChanges = mounted && pendingAnalytics !== savedAnalytics

  const applyConsent = (analyticsOn: boolean) => {
    setConsent(analyticsOn ? "accepted" : "declined")
    if (!analyticsOn) clearAnalyticsCookies()
    setSavedAnalytics(analyticsOn)
    setPendingAnalytics(analyticsOn)
    setJustSaved(true)
    setTimeout(() => setJustSaved(false), 2500)
  }

  const handleSave = () => applyConsent(pendingAnalytics)
  const handleAcceptAll = () => applyConsent(true)
  const handleDeclineAll = () => applyConsent(false)

  if (!mounted) return null

  return (
    <>
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
                BROOV
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
              cannot be disabled as they are required for the Site to function.
            </p>

            <p className="text-xs font-light text-muted-foreground mb-8">
              Current status:{" "}
              <span className="text-foreground font-normal">
                {savedAnalytics
                  ? "Analytics cookies enabled"
                  : "Only essential cookies active"}
              </span>
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-10">
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

            <div className="space-y-6">
              {cookieCategories.map((category) => {
                const isEnabled =
                  category.required ||
                  (category.id === "analytics" && pendingAnalytics)
                const canToggle = !category.required

                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border border-border"
                  >
                    <div className="flex items-start justify-between gap-4 p-5">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-sm font-normal text-foreground tracking-wide">
                            {category.name}
                          </h2>
                          {category.required && (
                            <span className="text-[10px] font-light tracking-widest uppercase text-muted-foreground border border-border px-2 py-0.5">
                              Always Active
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-light text-muted-foreground leading-relaxed mt-2">
                          {category.description}
                        </p>
                      </div>
                      {canToggle ? (
                        <button
                          onClick={() => setPendingAnalytics(!pendingAnalytics)}
                          className={`relative w-11 h-6 rounded-full transition-colors duration-300 flex-shrink-0 mt-0.5 ${
                            isEnabled ? "bg-foreground" : "bg-border"
                          }`}
                          aria-label={`${isEnabled ? "Disable" : "Enable"} ${category.name} cookies`}
                          aria-pressed={isEnabled}
                        >
                          <div
                            className={`absolute top-0.5 w-5 h-5 rounded-full bg-background shadow transition-transform duration-300 ${
                              isEnabled ? "translate-x-[22px]" : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      ) : (
                        <div className="w-11 h-6 rounded-full bg-foreground flex items-center justify-center flex-shrink-0 mt-0.5 opacity-40">
                          <Check strokeWidth={2} className="w-3 h-3 text-background" />
                        </div>
                      )}
                    </div>

                    <div className="border-t border-border overflow-x-auto">
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
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={handleSave}
                disabled={!hasUnsavedChanges}
                className="px-8 py-3 text-xs font-light tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Save Preferences
              </button>
              <AnimatePresence mode="wait">
                {hasUnsavedChanges && (
                  <motion.span
                    key="unsaved"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs font-light text-foreground flex items-center gap-1.5"
                  >
                    <AlertCircle strokeWidth={1.5} className="w-3.5 h-3.5" />
                    Unsaved changes
                  </motion.span>
                )}
                {!hasUnsavedChanges && justSaved && (
                  <motion.span
                    key="saved"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs font-light text-foreground flex items-center gap-1.5"
                  >
                    <Check strokeWidth={1.5} className="w-3.5 h-3.5" />
                    Preferences saved
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-12 space-y-6 text-sm font-light text-muted-foreground leading-relaxed">
              <section>
                <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                  What Are Cookies?
                </h2>
                <p>
                  Cookies are small text files placed on your device by websites you visit. They are
                  widely used to make websites work efficiently and to provide information to site
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
                  through their settings. You can typically set your browser to block or delete
                  cookies. Note that blocking all cookies may affect the functionality of our Site,
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
                    href="mailto:support@thebroov.com"
                    className="text-foreground underline underline-offset-2 hover:text-foreground/80 transition-colors"
                  >
                    support@thebroov.com
                  </a>
                  .
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
