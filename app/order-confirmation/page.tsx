"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Check,
  Package,
  Mail,
  ArrowRight,
  MapPin,
  Truck,
} from "lucide-react"
import { useCheckoutStore, shippingOptions } from "@/lib/checkout-store"

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("id")
  const { shippingInfo, shippingMethod, reset } = useCheckoutStore()
  const [mounted, setMounted] = useState(false)

  const shipping = shippingOptions.find((o) => o.id === shippingMethod)!

  useEffect(() => {
    setMounted(true)
  }, [])

  // Reset checkout state when leaving
  useEffect(() => {
    return () => {
      reset()
    }
  }, [reset])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex items-center justify-center h-16 md:h-20">
          <Link href="/" className="flex-shrink-0">
            <span className="font-display text-xl md:text-2xl font-bold tracking-wide text-foreground">
              ORY
            </span>
          </Link>
        </div>
      </div>

      <div className="max-w-[640px] mx-auto px-4 md:px-8 py-12 md:py-20">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-8 bg-foreground flex items-center justify-center"
        >
          <Check strokeWidth={1.5} className="w-8 h-8 md:w-10 md:h-10 text-background" />
        </motion.div>

        {/* Thank You */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mb-10"
        >
          <h1 className="text-2xl md:text-3xl font-light tracking-wide text-foreground mb-3">
            Thank You for Your Order
          </h1>
          <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-md mx-auto">
            Your order has been confirmed and will be shipped shortly.
            We&apos;ve sent a confirmation email to your inbox.
          </p>
        </motion.div>

        {/* Order Number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border border-border p-6 text-center mb-6"
        >
          <p className="text-xs font-light text-muted-foreground tracking-widest uppercase mb-2">
            Order Number
          </p>
          <p className="text-xl md:text-2xl font-normal tracking-[0.2em] text-foreground">
            {orderId || "ORY-XXXXXXXX"}
          </p>
        </motion.div>

        {/* Details Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          {/* Email */}
          <div className="border border-border p-4 text-center">
            <Mail strokeWidth={1} className="w-5 h-5 mx-auto text-muted-foreground mb-2" />
            <p className="text-xs font-light text-muted-foreground tracking-wide mb-1">
              Confirmation sent to
            </p>
            <p className="text-xs font-normal text-foreground break-all">
              {shippingInfo.email || "your@email.com"}
            </p>
          </div>

          {/* Shipping Address */}
          <div className="border border-border p-4 text-center">
            <MapPin strokeWidth={1} className="w-5 h-5 mx-auto text-muted-foreground mb-2" />
            <p className="text-xs font-light text-muted-foreground tracking-wide mb-1">
              Shipping to
            </p>
            <p className="text-xs font-normal text-foreground">
              {shippingInfo.city && shippingInfo.state
                ? `${shippingInfo.city}, ${shippingInfo.state}`
                : "Your address"}
            </p>
          </div>

          {/* Delivery */}
          <div className="border border-border p-4 text-center">
            <Truck strokeWidth={1} className="w-5 h-5 mx-auto text-muted-foreground mb-2" />
            <p className="text-xs font-light text-muted-foreground tracking-wide mb-1">
              Estimated delivery
            </p>
            <p className="text-xs font-normal text-foreground">
              {shipping.days}
            </p>
          </div>
        </motion.div>

        {/* What's Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="border border-border p-6 mb-10"
        >
          <h2 className="text-xs font-light tracking-widest uppercase text-foreground mb-5">
            What Happens Next
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Order Confirmed",
                desc: "You'll receive an email confirmation shortly",
              },
              {
                step: "2",
                title: "Order Processing",
                desc: "Your items will be carefully packaged in recycled materials",
              },
              {
                step: "3",
                title: "Shipped",
                desc: "You'll receive a tracking number when your order ships",
              },
              {
                step: "4",
                title: "Delivered",
                desc: "Enjoy the ultimate silk experience",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 items-start">
                <div className="w-7 h-7 flex-shrink-0 bg-foreground text-background text-xs font-light flex items-center justify-center">
                  {item.step}
                </div>
                <div>
                  <p className="text-sm font-normal text-foreground">{item.title}</p>
                  <p className="text-xs font-light text-muted-foreground mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
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
            Continue Shopping
            <ArrowRight strokeWidth={1} className="w-4 h-4" />
          </Link>
          <p className="text-xs font-light text-muted-foreground mt-4">
            Need help?{" "}
            <a href="#" className="underline underline-offset-2 hover:text-foreground transition-colors">
              Contact our support team
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
