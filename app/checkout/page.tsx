"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Lock,
  Package,
  Truck,
  CreditCard,
  ClipboardList,
  ShieldCheck,
} from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import {
  useCheckoutStore,
  shippingOptions,
  type CheckoutStep,
  type ShippingInfo,
  type PaymentInfo,
} from "@/lib/checkout-store"
import { useTranslations, useFormatPrice } from "@/lib/i18n"
import type { Translations } from "@/lib/i18n/en"

const stepIcons = [ClipboardList, Truck, CreditCard, Check]

function StepIndicator({ currentStep, t }: { currentStep: CheckoutStep; t: Translations }) {
  const stepIds: CheckoutStep[] = ["information", "shipping", "payment", "review"]
  const stepLabels = [t.checkout.information, t.checkout.shipping, t.checkout.payment, t.checkout.review]
  const currentIndex = stepIds.indexOf(currentStep)

  return (
    <div className="flex items-center justify-between w-full max-w-md mx-auto mb-8 md:mb-12">
      {stepIds.map((id, index) => {
        const isCompleted = index < currentIndex
        const isCurrent = index === currentIndex
        const Icon = stepIcons[index]

        return (
          <div key={id} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`
                  w-8 h-8 md:w-9 md:h-9 flex items-center justify-center transition-all duration-300
                  ${isCompleted
                    ? "bg-foreground text-background"
                    : isCurrent
                      ? "border-2 border-foreground text-foreground"
                      : "border border-border text-muted-foreground/50"
                  }
                `}
              >
                {isCompleted ? (
                  <Check strokeWidth={1.5} className="w-4 h-4" />
                ) : (
                  <Icon strokeWidth={1} className="w-4 h-4" />
                )}
              </div>
              <span
                className={`text-[10px] md:text-xs font-light tracking-wide hidden sm:block ${
                  isCurrent || isCompleted ? "text-foreground" : "text-muted-foreground/50"
                }`}
              >
                {stepLabels[index]}
              </span>
            </div>
            {index < 3 && (
              <div
                className={`w-8 sm:w-12 md:w-16 h-px mx-1 sm:mx-2 mb-5 sm:mb-0 transition-colors duration-300 ${
                  index < currentIndex ? "bg-foreground" : "bg-border"
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function InputField({
  label, value, error, type = "text", placeholder, autoComplete, inputMode, maxLength, onChange,
}: {
  label: string; value: string; error?: string; type?: string; placeholder?: string
  autoComplete?: string; inputMode?: "text" | "numeric" | "tel" | "email"; maxLength?: number
  onChange: (value: string) => void
}) {
  return (
    <div>
      <label className="block text-xs font-light text-muted-foreground tracking-wide mb-2">{label}</label>
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder} autoComplete={autoComplete} inputMode={inputMode} maxLength={maxLength}
        className={`w-full bg-transparent border px-4 py-3 text-sm font-light text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-colors ${
          error ? "border-red-400 focus:border-red-500" : "border-border focus:border-foreground"
        }`}
      />
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-500 font-light mt-1.5">
          {error}
        </motion.p>
      )}
    </div>
  )
}

function ReviewSection({ title, onEdit, children }: { title: string; onEdit?: () => void; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-5 mt-5 first:border-t-0 first:mt-0 first:pt-0">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-light tracking-widest uppercase text-muted-foreground">{title}</h3>
        {onEdit && (
          <button onClick={onEdit} className="text-xs font-light text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">
            Edit
          </button>
        )}
      </div>
      {children}
    </div>
  )
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore()
  const {
    step, shippingInfo, shippingMethod, paymentInfo,
    setStep, setShippingInfo, setShippingMethod, setPaymentInfo, placeOrder, reset: resetCheckout,
  } = useCheckoutStore()

  const t = useTranslations()
  const fp = useFormatPrice()

  const [mounted, setMounted] = useState(false)
  const [summaryExpanded, setSummaryExpanded] = useState(false)
  const [infoErrors, setInfoErrors] = useState<Record<string, string>>({})
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({})
  const [isPlacing, setIsPlacing] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (mounted && items.length === 0 && step !== "review") {
      router.push("/")
    }
  }, [mounted, items.length, step, router])

  if (!mounted) return null

  const subtotal = getTotalPrice()
  const shipping = shippingOptions.find((o) => o.id === shippingMethod)!
  const total = subtotal + shipping.price

  const shippingOptionLabels: Record<string, { name: string; desc: string; days: string }> = {
    standard: { name: t.shippingOptions.standard, desc: t.shippingOptions.standardDesc, days: t.shippingOptions.standardDays },
    express: { name: t.shippingOptions.express, desc: t.shippingOptions.expressDesc, days: t.shippingOptions.expressDays },
    overnight: { name: t.shippingOptions.overnight, desc: t.shippingOptions.overnightDesc, days: t.shippingOptions.overnightDays },
  }

  const validateInfo = (): boolean => {
    const errors: Record<string, string> = {}
    if (!shippingInfo.email.trim()) errors.email = t.checkout.emailRequired
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingInfo.email)) errors.email = t.checkout.emailInvalid
    if (!shippingInfo.firstName.trim()) errors.firstName = t.checkout.firstNameRequired
    if (!shippingInfo.lastName.trim()) errors.lastName = t.checkout.lastNameRequired
    if (!shippingInfo.address.trim()) errors.address = t.checkout.addressRequired
    if (!shippingInfo.city.trim()) errors.city = t.checkout.cityRequired
    if (!shippingInfo.state.trim()) errors.state = t.checkout.stateRequired
    if (!shippingInfo.zip.trim()) errors.zip = t.checkout.zipRequired
    setInfoErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validatePayment = (): boolean => {
    const errors: Record<string, string> = {}
    const cardDigits = paymentInfo.cardNumber.replace(/\s/g, "")
    if (!cardDigits) errors.cardNumber = t.checkout.cardRequired
    else if (cardDigits.length < 13) errors.cardNumber = t.checkout.cardInvalid
    if (!paymentInfo.cardName.trim()) errors.cardName = t.checkout.cardNameRequired
    const expiryDigits = paymentInfo.expiry.replace(/\D/g, "")
    if (!expiryDigits) errors.expiry = t.checkout.expiryRequired
    else if (expiryDigits.length < 4) errors.expiry = t.checkout.expiryInvalid
    if (!paymentInfo.cvc) errors.cvc = t.checkout.cvcRequired
    else if (paymentInfo.cvc.length < 3) errors.cvc = t.checkout.cvcInvalid
    setPaymentErrors(errors)
    return Object.keys(errors).length === 0
  }

  const goTo = (s: CheckoutStep) => { setStep(s); window.scrollTo({ top: 0, behavior: "smooth" }) }
  const handleInfoNext = () => { if (validateInfo()) goTo("shipping") }
  const handleShippingNext = () => goTo("payment")
  const handlePaymentNext = () => { if (validatePayment()) goTo("review") }

  const handlePlaceOrder = async () => {
    setIsPlacing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const orderId = placeOrder()
    clearCart()
    router.push(`/order-confirmation?id=${orderId}`)
  }

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16)
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ")
  }
  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4)
    if (digits.length >= 3) return digits.slice(0, 2) + " / " + digits.slice(2)
    return digits
  }

  const clearError = (errors: Record<string, string>, setErrors: (e: Record<string, string>) => void, field: string) => {
    if (errors[field]) {
      const next = { ...errors }
      delete next[field]
      setErrors(next)
    }
  }

  const countryKeys = Object.keys(t.countries) as (keyof typeof t.countries)[]

  if (items.length === 0 && step !== "review") return null

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex-shrink-0">
            <span className="font-display text-xl md:text-2xl font-bold tracking-wide text-foreground">ORY</span>
          </Link>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Lock strokeWidth={1} className="w-4 h-4" />
            <span className="text-xs font-light tracking-wider uppercase">{t.header.secureCheckout}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-light text-muted-foreground hover:text-foreground transition-colors tracking-wide mb-8">
          <ArrowLeft strokeWidth={1} className="w-4 h-4" />
          {t.checkout.backToShopping}
        </Link>

        <StepIndicator currentStep={step} t={t} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Form */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              {/* INFORMATION */}
              {step === "information" && (
                <motion.div key="information" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <h2 className="text-lg md:text-xl font-light tracking-wide text-foreground mb-1">{t.checkout.contactShipping}</h2>
                  <p className="text-xs font-light text-muted-foreground mb-8">{t.checkout.contactShippingDesc}</p>
                  <div className="space-y-5">
                    <InputField label={t.checkout.email} value={shippingInfo.email} error={infoErrors.email} type="email" autoComplete="email" placeholder={t.checkout.emailPlaceholder} onChange={(v) => { setShippingInfo({ email: v }); clearError(infoErrors, setInfoErrors, "email") }} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField label={t.checkout.firstName} value={shippingInfo.firstName} error={infoErrors.firstName} autoComplete="given-name" onChange={(v) => { setShippingInfo({ firstName: v }); clearError(infoErrors, setInfoErrors, "firstName") }} />
                      <InputField label={t.checkout.lastName} value={shippingInfo.lastName} error={infoErrors.lastName} autoComplete="family-name" onChange={(v) => { setShippingInfo({ lastName: v }); clearError(infoErrors, setInfoErrors, "lastName") }} />
                    </div>
                    <InputField label={t.checkout.phone} value={shippingInfo.phone} type="tel" autoComplete="tel" placeholder={t.checkout.phonePlaceholder} onChange={(v) => setShippingInfo({ phone: v })} />
                    <InputField label={t.checkout.address} value={shippingInfo.address} error={infoErrors.address} autoComplete="address-line1" onChange={(v) => { setShippingInfo({ address: v }); clearError(infoErrors, setInfoErrors, "address") }} />
                    <InputField label={t.checkout.apartment} value={shippingInfo.apartment} autoComplete="address-line2" onChange={(v) => setShippingInfo({ apartment: v })} />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <InputField label={t.checkout.city} value={shippingInfo.city} error={infoErrors.city} autoComplete="address-level2" onChange={(v) => { setShippingInfo({ city: v }); clearError(infoErrors, setInfoErrors, "city") }} />
                      <InputField label={t.checkout.stateRegion} value={shippingInfo.state} error={infoErrors.state} autoComplete="address-level1" onChange={(v) => { setShippingInfo({ state: v }); clearError(infoErrors, setInfoErrors, "state") }} />
                      <InputField label={t.checkout.zip} value={shippingInfo.zip} error={infoErrors.zip} autoComplete="postal-code" onChange={(v) => { setShippingInfo({ zip: v }); clearError(infoErrors, setInfoErrors, "zip") }} />
                    </div>
                    <div>
                      <label className="block text-xs font-light text-muted-foreground tracking-wide mb-2">{t.checkout.country}</label>
                      <div className="relative">
                        <select value={shippingInfo.country} onChange={(e) => setShippingInfo({ country: e.target.value })} className="w-full appearance-none bg-transparent border border-border px-4 py-3 text-sm font-light text-foreground focus:outline-none focus:border-foreground transition-colors pr-10">
                          {countryKeys.map((code) => (
                            <option key={code} value={code}>{t.countries[code]}</option>
                          ))}
                        </select>
                        <ChevronDown strokeWidth={1} className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <button onClick={handleInfoNext} className="w-full py-4 text-sm font-light tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-colors duration-300 flex items-center justify-center gap-2">
                      {t.checkout.continueToShipping}
                      <ArrowRight strokeWidth={1} className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* SHIPPING */}
              {step === "shipping" && (
                <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <div className="border border-border p-4 mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-light text-muted-foreground tracking-wide">{t.checkout.shipTo}</span>
                      <button onClick={() => goTo("information")} className="text-xs font-light text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">{t.checkout.change}</button>
                    </div>
                    <p className="text-sm font-light text-foreground">{shippingInfo.firstName} {shippingInfo.lastName}</p>
                    <p className="text-xs font-light text-muted-foreground mt-0.5">
                      {shippingInfo.address}{shippingInfo.apartment ? `, ${shippingInfo.apartment}` : ""}{" · "}{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
                    </p>
                  </div>
                  <h2 className="text-lg md:text-xl font-light tracking-wide text-foreground mb-1">{t.checkout.shippingMethod}</h2>
                  <p className="text-xs font-light text-muted-foreground mb-8">{t.checkout.shippingMethodDesc}</p>
                  <div className="space-y-3">
                    {shippingOptions.map((option) => {
                      const isSelected = shippingMethod === option.id
                      const labels = shippingOptionLabels[option.id]
                      return (
                        <button key={option.id} onClick={() => setShippingMethod(option.id)} className={`w-full text-left p-4 border transition-all duration-200 ${isSelected ? "border-foreground bg-foreground/[0.02]" : "border-border hover:border-foreground/30"}`}>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <div className={`w-4 h-4 mt-0.5 border flex-shrink-0 flex items-center justify-center transition-colors ${isSelected ? "border-foreground bg-foreground" : "border-border"}`}>
                                {isSelected && <Check strokeWidth={2} className="w-3 h-3 text-background" />}
                              </div>
                              <div>
                                <p className="text-sm font-normal text-foreground">{labels.name}</p>
                                <p className="text-xs font-light text-muted-foreground mt-0.5">{labels.desc}</p>
                                <p className="text-xs font-light text-muted-foreground mt-1">{labels.days}</p>
                              </div>
                            </div>
                            <span className="text-sm font-normal text-foreground flex-shrink-0">
                              {option.price === 0 ? t.checkout.free : fp(option.price)}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button onClick={() => goTo("information")} className="sm:flex-1 py-4 text-sm font-light tracking-widest uppercase border border-border text-foreground hover:bg-muted transition-colors duration-300 flex items-center justify-center gap-2">
                      <ArrowLeft strokeWidth={1} className="w-4 h-4" />{t.checkout.back}
                    </button>
                    <button onClick={handleShippingNext} className="sm:flex-[2] py-4 text-sm font-light tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-colors duration-300 flex items-center justify-center gap-2">
                      {t.checkout.continueToPayment}<ArrowRight strokeWidth={1} className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* PAYMENT */}
              {step === "payment" && (
                <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg md:text-xl font-light tracking-wide text-foreground">{t.checkout.paymentTitle}</h2>
                    <Lock strokeWidth={1} className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs font-light text-muted-foreground mb-8">{t.checkout.paymentSecure}</p>
                  <div className="border border-border p-5 md:p-6 space-y-5">
                    <InputField label={t.checkout.cardNumber} value={paymentInfo.cardNumber} error={paymentErrors.cardNumber} placeholder={t.checkout.cardNumberPlaceholder} autoComplete="cc-number" inputMode="numeric" onChange={(v) => { setPaymentInfo({ cardNumber: formatCardNumber(v) }); clearError(paymentErrors, setPaymentErrors, "cardNumber") }} />
                    <InputField label={t.checkout.nameOnCard} value={paymentInfo.cardName} error={paymentErrors.cardName} autoComplete="cc-name" onChange={(v) => { setPaymentInfo({ cardName: v }); clearError(paymentErrors, setPaymentErrors, "cardName") }} />
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label={t.checkout.expiryDate} value={paymentInfo.expiry} error={paymentErrors.expiry} placeholder={t.checkout.expiryPlaceholder} autoComplete="cc-exp" inputMode="numeric" onChange={(v) => { setPaymentInfo({ expiry: formatExpiry(v) }); clearError(paymentErrors, setPaymentErrors, "expiry") }} />
                      <InputField label={t.checkout.securityCode} value={paymentInfo.cvc} error={paymentErrors.cvc} placeholder="CVC" autoComplete="cc-csc" inputMode="numeric" maxLength={4} onChange={(v) => { setPaymentInfo({ cvc: v.replace(/\D/g, "").slice(0, 4) }); clearError(paymentErrors, setPaymentErrors, "cvc") }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-muted-foreground">
                    <ShieldCheck strokeWidth={1} className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs font-light">{t.checkout.encryptedNote}</span>
                  </div>
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button onClick={() => goTo("shipping")} className="sm:flex-1 py-4 text-sm font-light tracking-widest uppercase border border-border text-foreground hover:bg-muted transition-colors duration-300 flex items-center justify-center gap-2">
                      <ArrowLeft strokeWidth={1} className="w-4 h-4" />{t.checkout.back}
                    </button>
                    <button onClick={handlePaymentNext} className="sm:flex-[2] py-4 text-sm font-light tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-colors duration-300 flex items-center justify-center gap-2">
                      {t.checkout.reviewOrder}<ArrowRight strokeWidth={1} className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* REVIEW */}
              {step === "review" && (
                <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <h2 className="text-lg md:text-xl font-light tracking-wide text-foreground mb-1">{t.checkout.reviewTitle}</h2>
                  <p className="text-xs font-light text-muted-foreground mb-8">{t.checkout.reviewDesc}</p>

                  <ReviewSection title={t.checkout.shippingAddress} onEdit={() => goTo("information")}>
                    <p className="text-sm font-light text-foreground">{shippingInfo.firstName} {shippingInfo.lastName}</p>
                    <p className="text-xs font-light text-muted-foreground mt-0.5">{shippingInfo.address}{shippingInfo.apartment ? `, ${shippingInfo.apartment}` : ""}</p>
                    <p className="text-xs font-light text-muted-foreground">{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}</p>
                    <p className="text-xs font-light text-muted-foreground mt-1">{shippingInfo.email}</p>
                  </ReviewSection>

                  <ReviewSection title={t.checkout.delivery}>
                    <p className="text-sm font-light text-foreground">{shippingOptionLabels[shippingMethod].name}</p>
                    <p className="text-xs font-light text-muted-foreground mt-0.5">
                      {shippingOptionLabels[shippingMethod].days} · {shipping.price === 0 ? t.checkout.free : fp(shipping.price)}
                    </p>
                  </ReviewSection>

                  <ReviewSection title={t.checkout.paymentTitle}>
                    <p className="text-sm font-light text-foreground">
                      Card ending in {paymentInfo.cardNumber.replace(/\s/g, "").slice(-4)}
                    </p>
                    <p className="text-xs font-light text-muted-foreground mt-0.5">{paymentInfo.cardName}</p>
                  </ReviewSection>

                  <div className="border-t border-border pt-6 mt-6">
                    <h3 className="text-xs font-light tracking-widest uppercase text-muted-foreground mb-4">
                      {t.cart.items} ({items.reduce((a, i) => a + i.quantity, 0)})
                    </h3>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={`${item.productId}-${item.size}`} className="flex gap-4">
                          <div className="relative w-14 h-[70px] md:w-16 md:h-20 bg-secondary flex-shrink-0 overflow-hidden">
                            <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                          </div>
                          <div className="flex-1 flex justify-between items-start">
                            <div>
                              <p className="text-sm font-normal text-foreground">{item.name}</p>
                              <p className="text-xs font-light text-muted-foreground mt-0.5">
                                {t.product.size}: {item.size} · Qty: {item.quantity}
                              </p>
                            </div>
                            <p className="text-sm font-normal text-foreground">{fp(item.price * item.quantity)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border pt-5 mt-6 space-y-2.5">
                    <div className="flex justify-between">
                      <span className="text-sm font-light text-muted-foreground">{t.cart.subtotal}</span>
                      <span className="text-sm font-light text-foreground">{fp(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-light text-muted-foreground">{t.checkout.shipping}</span>
                      <span className="text-sm font-light text-foreground">{shipping.price === 0 ? t.checkout.free : fp(shipping.price)}</span>
                    </div>
                    <div className="flex justify-between pt-2.5 border-t border-border">
                      <span className="text-sm font-normal text-foreground tracking-wide">{t.checkout.total}</span>
                      <span className="text-lg font-normal text-foreground">{fp(total)}</span>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button onClick={() => goTo("payment")} className="sm:flex-1 py-4 text-sm font-light tracking-widest uppercase border border-border text-foreground hover:bg-muted transition-colors duration-300 flex items-center justify-center gap-2">
                      <ArrowLeft strokeWidth={1} className="w-4 h-4" />{t.checkout.back}
                    </button>
                    <button onClick={handlePlaceOrder} disabled={isPlacing} className="sm:flex-[2] py-4 text-sm font-light tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-60">
                      {isPlacing ? (
                        <>
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full" />
                          {t.checkout.processing}
                        </>
                      ) : (
                        <>
                          <Lock strokeWidth={1} className="w-4 h-4" />
                          {t.checkout.placeOrder} — {fp(total)}
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="lg:sticky lg:top-8">
              <div className="bg-muted/30 border border-border">
                <button onClick={() => setSummaryExpanded(!summaryExpanded)} className="w-full flex items-center justify-between p-5 lg:hidden">
                  <span className="text-xs font-light tracking-widest uppercase text-foreground flex items-center gap-2">
                    <Package strokeWidth={1} className="w-4 h-4" />
                    {t.checkout.orderSummary} ({items.reduce((a, i) => a + i.quantity, 0)})
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-normal text-foreground">{fp(total)}</span>
                    <ChevronDown strokeWidth={1} className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${summaryExpanded ? "rotate-180" : ""}`} />
                  </div>
                </button>

                <div className={`${summaryExpanded ? "block" : "hidden"} lg:block`}>
                  <div className="p-5 pt-0 lg:pt-5 space-y-4">
                    <h3 className="text-xs font-light tracking-widest uppercase text-foreground hidden lg:block">{t.checkout.orderSummary}</h3>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={`${item.productId}-${item.size}`} className="flex gap-3">
                          <div className="relative w-14 h-[70px] bg-secondary flex-shrink-0 overflow-hidden">
                            <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-[10px] flex items-center justify-center rounded-full">{item.quantity}</span>
                          </div>
                          <div className="flex-1 flex justify-between items-start min-w-0">
                            <div className="min-w-0">
                              <p className="text-sm font-normal text-foreground truncate">{item.name}</p>
                              <p className="text-xs font-light text-muted-foreground mt-0.5">{item.material}</p>
                              <p className="text-xs font-light text-muted-foreground">{t.product.size}: {item.size}</p>
                            </div>
                            <p className="text-sm font-normal text-foreground flex-shrink-0 ml-2">{fp(item.price * item.quantity)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs font-light text-muted-foreground">{t.cart.subtotal}</span>
                        <span className="text-sm font-light text-foreground">{fp(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs font-light text-muted-foreground">{t.checkout.shipping}</span>
                        <span className="text-sm font-light text-foreground">{shipping.price === 0 ? t.checkout.free : fp(shipping.price)}</span>
                      </div>
                    </div>
                    <div className="border-t border-border pt-4 flex justify-between">
                      <span className="text-sm font-normal text-foreground tracking-wide">{t.checkout.total}</span>
                      <span className="text-lg font-normal text-foreground">{fp(total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-center gap-6 mt-6 py-4 text-muted-foreground/50">
                <div className="flex items-center gap-1.5">
                  <Lock strokeWidth={1} className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-light tracking-wide">{t.checkout.sslEncrypted}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck strokeWidth={1} className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-light tracking-wide">{t.checkout.securePayment}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
