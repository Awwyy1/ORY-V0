"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, Mail, ArrowRight, MapPin, Truck } from "lucide-react"
import { useCheckoutStore, shippingOptions } from "@/lib/checkout-store"
import { useCartStore } from "@/lib/cart-store"
import { useTranslations } from "@/lib/i18n"

interface SessionData {
  customerEmail: string
  amountTotal: number
  paymentStatus: string
  shippingMethod: string
  customerName: string
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const legacyOrderId = searchParams.get("id") // backward compat
  const { shippingInfo, shippingMethod, reset } = useCheckoutStore()
  const { clearCart } = useCartStore()
  const [mounted, setMounted] = useState(false)
  const [sessionData, setSessionData] = useState<SessionData | null>(null)
  const t = useTranslations()

  const shipping = shippingOptions.find((o) => o.id === shippingMethod)!

  const shippingDays: Record<string, string> = {
    standard: t.shippingOptions.standardDays,
    express: t.shippingOptions.expressDays,
    overnight: t.shippingOptions.overnightDays,
  }

  useEffect(() => {
    setMounted(true)
    // Clear cart after successful payment
    if (sessionId) {
      clearCart()
    }
  }, [sessionId, clearCart])

  useEffect(() => {
    return () => {
      reset()
    }
  }, [reset])

  if (!mounted) return null

  const displayOrderId = sessionId
    ? `ORY-${sessionId.slice(-8).toUpperCase()}`
    : legacyOrderId || "ORY-XXXXXXXX"

  const displayEmail = shippingInfo.email || sessionData?.customerEmail || "your@email.com"
  const displayCity = shippingInfo.city && shippingInfo.state
    ? `${shippingInfo.city}, ${shippingInfo.state}`
    : "—"

  const steps = [
    { title: t.confirmation.step1Title, desc: t.confirmation.step1Desc },
    { title: t.confirmation.step2Title, desc: t.confirmation.step2Desc },
    { title: t.confirmation.step3Title, desc: t.confirmation.step3Desc },
    { title: t.confirmation.step4Title, desc: t.confirmation.step4Desc },
  ]

  return (
    <main className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex items-center justify-center h-16 md:h-20">
          <Link href="/" className="flex-shrink-0">
            <span className="font-display text-xl md:text-2xl font-bold tracking-wide text-foreground">ORY</span>
          </Link>
        </div>
      </div>

      <div className="max-w-[640px] mx-auto px-4 md:px-8 py-12 md:py-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-8 bg-foreground flex items-center justify-center"
        >
          <Check strokeWidth={1.5} className="w-8 h-8 md:w-10 md:h-10 text-background" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mb-10"
        >
          <h1 className="text-2xl md:text-3xl font-light tracking-wide text-foreground mb-3">
            {t.confirmation.thankYou}
          </h1>
          <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-md mx-auto">
            {t.confirmation.thankYouDesc}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border border-border p-6 text-center mb-6"
        >
          <p className="text-xs font-light text-muted-foreground tracking-widest uppercase mb-2">
            {t.confirmation.orderNumber}
          </p>
          <p className="text-xl md:text-2xl font-normal tracking-[0.2em] text-foreground">
            {displayOrderId}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          <div className="border border-border p-4 text-center">
            <Mail strokeWidth={1} className="w-5 h-5 mx-auto text-muted-foreground mb-2" />
            <p className="text-xs font-light text-muted-foreground tracking-wide mb-1">{t.confirmation.confirmationSent}</p>
            <p className="text-xs font-normal text-foreground break-all">{displayEmail}</p>
          </div>
          <div className="border border-border p-4 text-center">
            <MapPin strokeWidth={1} className="w-5 h-5 mx-auto text-muted-foreground mb-2" />
            <p className="text-xs font-light text-muted-foreground tracking-wide mb-1">{t.confirmation.shippingTo}</p>
            <p className="text-xs font-normal text-foreground">{displayCity}</p>
          </div>
          <div className="border border-border p-4 text-center">
            <Truck strokeWidth={1} className="w-5 h-5 mx-auto text-muted-foreground mb-2" />
            <p className="text-xs font-light text-muted-foreground tracking-wide mb-1">{t.confirmation.estimatedDelivery}</p>
            <p className="text-xs font-normal text-foreground">{shippingDays[shippingMethod]}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="border border-border p-6 mb-10"
        >
          <h2 className="text-xs font-light tracking-widest uppercase text-foreground mb-5">{t.confirmation.whatsNext}</h2>
          <div className="space-y-4">
            {steps.map((item, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="w-7 h-7 flex-shrink-0 bg-foreground text-background text-xs font-light flex items-center justify-center">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm font-normal text-foreground">{item.title}</p>
                  <p className="text-xs font-light text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 py-4 px-10 text-sm font-light tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-colors duration-300"
          >
            {t.confirmation.continueShopping}
            <ArrowRight strokeWidth={1} className="w-4 h-4" />
          </Link>
          <p className="text-xs font-light text-muted-foreground mt-4">
            {t.confirmation.needHelp}{" "}
            <a href="#" className="underline underline-offset-2 hover:text-foreground transition-colors">
              {t.confirmation.contactSupport}
            </a>
          </p>
        </motion.div>
      </div>
    </main>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <OrderConfirmationContent />
    </Suspense>
  )
}
