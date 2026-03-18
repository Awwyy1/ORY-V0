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

const steps: { id: CheckoutStep; label: string; icon: React.ElementType }[] = [
  { id: "information", label: "Information", icon: ClipboardList },
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "review", label: "Review", icon: Check },
]

function StepIndicator({ currentStep }: { currentStep: CheckoutStep }) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep)

  return (
    <div className="flex items-center justify-between w-full max-w-md mx-auto mb-8 md:mb-12">
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex
        const isCurrent = index === currentIndex
        const Icon = step.icon

        return (
          <div key={step.id} className="flex items-center">
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
                  isCurrent
                    ? "text-foreground"
                    : isCompleted
                      ? "text-foreground"
                      : "text-muted-foreground/50"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
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

/* ========================================
   STEP 1 — INFORMATION
   ======================================== */
function InformationStep({
  info,
  errors,
  onChange,
  onNext,
}: {
  info: ShippingInfo
  errors: Record<string, string>
  onChange: (field: keyof ShippingInfo, value: string) => void
  onNext: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg md:text-xl font-light tracking-wide text-foreground mb-1">
        Contact & Shipping
      </h2>
      <p className="text-xs font-light text-muted-foreground mb-8">
        Where should we deliver your order?
      </p>

      <div className="space-y-5">
        {/* Email */}
        <InputField
          label="Email Address"
          value={info.email}
          error={errors.email}
          type="email"
          autoComplete="email"
          placeholder="your@email.com"
          onChange={(v) => onChange("email", v)}
        />

        {/* Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="First Name"
            value={info.firstName}
            error={errors.firstName}
            autoComplete="given-name"
            onChange={(v) => onChange("firstName", v)}
          />
          <InputField
            label="Last Name"
            value={info.lastName}
            error={errors.lastName}
            autoComplete="family-name"
            onChange={(v) => onChange("lastName", v)}
          />
        </div>

        {/* Phone */}
        <InputField
          label="Phone (optional)"
          value={info.phone}
          type="tel"
          autoComplete="tel"
          placeholder="+1 (555) 000-0000"
          onChange={(v) => onChange("phone", v)}
        />

        {/* Address */}
        <InputField
          label="Address"
          value={info.address}
          error={errors.address}
          autoComplete="address-line1"
          onChange={(v) => onChange("address", v)}
        />

        {/* Apartment */}
        <InputField
          label="Apartment, suite, etc. (optional)"
          value={info.apartment}
          autoComplete="address-line2"
          onChange={(v) => onChange("apartment", v)}
        />

        {/* City / State / Zip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="City"
            value={info.city}
            error={errors.city}
            autoComplete="address-level2"
            onChange={(v) => onChange("city", v)}
          />
          <InputField
            label="State / Region"
            value={info.state}
            error={errors.state}
            autoComplete="address-level1"
            onChange={(v) => onChange("state", v)}
          />
          <InputField
            label="ZIP / Postal Code"
            value={info.zip}
            error={errors.zip}
            autoComplete="postal-code"
            onChange={(v) => onChange("zip", v)}
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-xs font-light text-muted-foreground tracking-wide mb-2">
            Country
          </label>
          <div className="relative">
            <select
              value={info.country}
              onChange={(e) => onChange("country", e.target.value)}
              className="w-full appearance-none bg-transparent border border-border px-4 py-3 text-sm font-light text-foreground focus:outline-none focus:border-foreground transition-colors pr-10"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="CH">Switzerland</option>
              <option value="AT">Austria</option>
              <option value="NL">Netherlands</option>
              <option value="BE">Belgium</option>
              <option value="AU">Australia</option>
            </select>
            <ChevronDown
              strokeWidth={1}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={onNext}
          className="w-full py-4 text-sm font-light tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-colors duration-300 flex items-center justify-center gap-2"
        >
          Continue to Shipping
          <ArrowRight strokeWidth={1} className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

/* ========================================
   STEP 2 — SHIPPING METHOD
   ======================================== */
function ShippingStep({
  selectedMethod,
  onSelect,
  shippingInfo,
  onBack,
  onNext,
}: {
  selectedMethod: string
  onSelect: (method: "standard" | "express" | "overnight") => void
  shippingInfo: ShippingInfo
  onBack: () => void
  onNext: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Ship to summary */}
      <div className="border border-border p-4 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-light text-muted-foreground tracking-wide">
            Ship to
          </span>
          <button
            onClick={onBack}
            className="text-xs font-light text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
          >
            Change
          </button>
        </div>
        <p className="text-sm font-light text-foreground">
          {shippingInfo.firstName} {shippingInfo.lastName}
        </p>
        <p className="text-xs font-light text-muted-foreground mt-0.5">
          {shippingInfo.address}
          {shippingInfo.apartment ? `, ${shippingInfo.apartment}` : ""}
          {" · "}
          {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
        </p>
      </div>

      <h2 className="text-lg md:text-xl font-light tracking-wide text-foreground mb-1">
        Shipping Method
      </h2>
      <p className="text-xs font-light text-muted-foreground mb-8">
        Choose how you&apos;d like your order delivered
      </p>

      <div className="space-y-3">
        {shippingOptions.map((option) => {
          const isSelected = selectedMethod === option.id
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`w-full text-left p-4 border transition-all duration-200 ${
                isSelected
                  ? "border-foreground bg-foreground/[0.02]"
                  : "border-border hover:border-foreground/30"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-4 h-4 mt-0.5 border flex-shrink-0 flex items-center justify-center transition-colors ${
                      isSelected ? "border-foreground bg-foreground" : "border-border"
                    }`}
                  >
                    {isSelected && (
                      <Check strokeWidth={2} className="w-3 h-3 text-background" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-normal text-foreground">
                      {option.name}
                    </p>
                    <p className="text-xs font-light text-muted-foreground mt-0.5">
                      {option.description}
                    </p>
                    <p className="text-xs font-light text-muted-foreground mt-1">
                      {option.days}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-normal text-foreground flex-shrink-0">
                  {option.price === 0 ? "Free" : `$${option.price}`}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onBack}
          className="sm:flex-1 py-4 text-sm font-light tracking-widest uppercase border border-border text-foreground hover:bg-muted transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <ArrowLeft strokeWidth={1} className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={onNext}
          className="sm:flex-[2] py-4 text-sm font-light tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-colors duration-300 flex items-center justify-center gap-2"
        >
          Continue to Payment
          <ArrowRight strokeWidth={1} className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

/* ========================================
   STEP 3 — PAYMENT
   ======================================== */
function PaymentStep({
  info,
  errors,
  onChange,
  onBack,
  onNext,
}: {
  info: PaymentInfo
  errors: Record<string, string>
  onChange: (field: keyof PaymentInfo, value: string) => void
  onBack: () => void
  onNext: () => void
}) {
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16)
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ")
  }

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4)
    if (digits.length >= 3) {
      return digits.slice(0, 2) + " / " + digits.slice(2)
    }
    return digits
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-1">
        <h2 className="text-lg md:text-xl font-light tracking-wide text-foreground">
          Payment
        </h2>
        <Lock strokeWidth={1} className="w-4 h-4 text-muted-foreground" />
      </div>
      <p className="text-xs font-light text-muted-foreground mb-8">
        All transactions are secure and encrypted
      </p>

      <div className="border border-border p-5 md:p-6 space-y-5">
        {/* Card Number */}
        <InputField
          label="Card Number"
          value={info.cardNumber}
          error={errors.cardNumber}
          placeholder="1234 5678 9012 3456"
          autoComplete="cc-number"
          inputMode="numeric"
          onChange={(v) => onChange("cardNumber", formatCardNumber(v))}
        />

        {/* Cardholder Name */}
        <InputField
          label="Name on Card"
          value={info.cardName}
          error={errors.cardName}
          autoComplete="cc-name"
          onChange={(v) => onChange("cardName", v)}
        />

        {/* Expiry + CVC */}
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Expiry Date"
            value={info.expiry}
            error={errors.expiry}
            placeholder="MM / YY"
            autoComplete="cc-exp"
            inputMode="numeric"
            onChange={(v) => onChange("expiry", formatExpiry(v))}
          />
          <InputField
            label="Security Code"
            value={info.cvc}
            error={errors.cvc}
            placeholder="CVC"
            autoComplete="cc-csc"
            inputMode="numeric"
            maxLength={4}
            onChange={(v) => onChange("cvc", v.replace(/\D/g, "").slice(0, 4))}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 text-muted-foreground">
        <ShieldCheck strokeWidth={1} className="w-4 h-4 flex-shrink-0" />
        <span className="text-xs font-light">
          Your payment information is encrypted and never stored
        </span>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onBack}
          className="sm:flex-1 py-4 text-sm font-light tracking-widest uppercase border border-border text-foreground hover:bg-muted transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <ArrowLeft strokeWidth={1} className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={onNext}
          className="sm:flex-[2] py-4 text-sm font-light tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-colors duration-300 flex items-center justify-center gap-2"
        >
          Review Order
          <ArrowRight strokeWidth={1} className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

/* ========================================
   STEP 4 — REVIEW & PLACE ORDER
   ======================================== */
function ReviewStep({
  shippingInfo,
  shippingMethod,
  paymentInfo,
  items,
  subtotal,
  onBack,
  onPlaceOrder,
  isPlacing,
}: {
  shippingInfo: ShippingInfo
  shippingMethod: string
  paymentInfo: PaymentInfo
  items: ReturnType<typeof useCartStore.getState>["items"]
  subtotal: number
  onBack: () => void
  onPlaceOrder: () => void
  isPlacing: boolean
}) {
  const shipping = shippingOptions.find((o) => o.id === shippingMethod)!
  const total = subtotal + shipping.price

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg md:text-xl font-light tracking-wide text-foreground mb-1">
        Review Your Order
      </h2>
      <p className="text-xs font-light text-muted-foreground mb-8">
        Please confirm everything looks correct
      </p>

      {/* Shipping Info */}
      <ReviewSection
        title="Shipping Address"
        onEdit={onBack}
      >
        <p className="text-sm font-light text-foreground">
          {shippingInfo.firstName} {shippingInfo.lastName}
        </p>
        <p className="text-xs font-light text-muted-foreground mt-0.5">
          {shippingInfo.address}
          {shippingInfo.apartment ? `, ${shippingInfo.apartment}` : ""}
        </p>
        <p className="text-xs font-light text-muted-foreground">
          {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
        </p>
        <p className="text-xs font-light text-muted-foreground mt-1">
          {shippingInfo.email}
        </p>
      </ReviewSection>

      {/* Shipping Method */}
      <ReviewSection title="Delivery">
        <p className="text-sm font-light text-foreground">
          {shipping.name}
        </p>
        <p className="text-xs font-light text-muted-foreground mt-0.5">
          {shipping.days} · {shipping.price === 0 ? "Free" : `$${shipping.price}`}
        </p>
      </ReviewSection>

      {/* Payment */}
      <ReviewSection title="Payment">
        <p className="text-sm font-light text-foreground">
          Card ending in {paymentInfo.cardNumber.replace(/\s/g, "").slice(-4)}
        </p>
        <p className="text-xs font-light text-muted-foreground mt-0.5">
          {paymentInfo.cardName}
        </p>
      </ReviewSection>

      {/* Items */}
      <div className="border-t border-border pt-6 mt-6">
        <h3 className="text-xs font-light tracking-widest uppercase text-muted-foreground mb-4">
          Items ({items.reduce((a, i) => a + i.quantity, 0)})
        </h3>
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.size}`}
              className="flex gap-4"
            >
              <div className="relative w-14 h-[70px] md:w-16 md:h-20 bg-secondary flex-shrink-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 flex justify-between items-start">
                <div>
                  <p className="text-sm font-normal text-foreground">{item.name}</p>
                  <p className="text-xs font-light text-muted-foreground mt-0.5">
                    Size: {item.size} · Qty: {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-normal text-foreground">
                  ${item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="border-t border-border pt-5 mt-6 space-y-2.5">
        <div className="flex justify-between">
          <span className="text-sm font-light text-muted-foreground">Subtotal</span>
          <span className="text-sm font-light text-foreground">${subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-light text-muted-foreground">Shipping</span>
          <span className="text-sm font-light text-foreground">
            {shipping.price === 0 ? "Free" : `$${shipping.price}`}
          </span>
        </div>
        <div className="flex justify-between pt-2.5 border-t border-border">
          <span className="text-sm font-normal text-foreground tracking-wide">Total</span>
          <span className="text-lg font-normal text-foreground">${total}</span>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onBack}
          className="sm:flex-1 py-4 text-sm font-light tracking-widest uppercase border border-border text-foreground hover:bg-muted transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <ArrowLeft strokeWidth={1} className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={onPlaceOrder}
          disabled={isPlacing}
          className="sm:flex-[2] py-4 text-sm font-light tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isPlacing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full"
              />
              Processing...
            </>
          ) : (
            <>
              <Lock strokeWidth={1} className="w-4 h-4" />
              Place Order — ${subtotal + shipping.price}
            </>
          )}
        </button>
      </div>
    </motion.div>
  )
}

/* ========================================
   SHARED COMPONENTS
   ======================================== */
function InputField({
  label,
  value,
  error,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  maxLength,
  onChange,
}: {
  label: string
  value: string
  error?: string
  type?: string
  placeholder?: string
  autoComplete?: string
  inputMode?: "text" | "numeric" | "tel" | "email"
  maxLength?: number
  onChange: (value: string) => void
}) {
  return (
    <div>
      <label className="block text-xs font-light text-muted-foreground tracking-wide mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        className={`w-full bg-transparent border px-4 py-3 text-sm font-light text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-colors ${
          error
            ? "border-red-400 focus:border-red-500"
            : "border-border focus:border-foreground"
        }`}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-500 font-light mt-1.5"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}

function ReviewSection({
  title,
  onEdit,
  children,
}: {
  title: string
  onEdit?: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border-t border-border pt-5 mt-5 first:border-t-0 first:mt-0 first:pt-0">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-light tracking-widest uppercase text-muted-foreground">
          {title}
        </h3>
        {onEdit && (
          <button
            onClick={onEdit}
            className="text-xs font-light text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
          >
            Edit
          </button>
        )}
      </div>
      {children}
    </div>
  )
}

/* ========================================
   ORDER SUMMARY SIDEBAR
   ======================================== */
function OrderSummary({
  items,
  subtotal,
  shippingMethod,
  isExpanded,
  onToggle,
}: {
  items: ReturnType<typeof useCartStore.getState>["items"]
  subtotal: number
  shippingMethod: string
  isExpanded: boolean
  onToggle: () => void
}) {
  const shipping = shippingOptions.find((o) => o.id === shippingMethod)!
  const total = subtotal + shipping.price

  return (
    <div className="bg-muted/30 border border-border">
      {/* Mobile toggle */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 lg:hidden"
      >
        <span className="text-xs font-light tracking-widest uppercase text-foreground flex items-center gap-2">
          <Package strokeWidth={1} className="w-4 h-4" />
          Order Summary ({items.reduce((a, i) => a + i.quantity, 0)})
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-normal text-foreground">${total}</span>
          <ChevronDown
            strokeWidth={1}
            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Desktop always visible / Mobile expandable */}
      <div className={`${isExpanded ? "block" : "hidden"} lg:block`}>
        <div className="p-5 pt-0 lg:pt-5 space-y-4">
          {/* Header — desktop only */}
          <h3 className="text-xs font-light tracking-widest uppercase text-foreground hidden lg:block">
            Order Summary
          </h3>

          {/* Items */}
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.size}`}
                className="flex gap-3"
              >
                <div className="relative w-14 h-[70px] bg-secondary flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-[10px] flex items-center justify-center rounded-full">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 flex justify-between items-start min-w-0">
                  <div className="min-w-0">
                    <p className="text-sm font-normal text-foreground truncate">
                      {item.name}
                    </p>
                    <p className="text-xs font-light text-muted-foreground mt-0.5">
                      {item.material}
                    </p>
                    <p className="text-xs font-light text-muted-foreground">
                      Size: {item.size}
                    </p>
                  </div>
                  <p className="text-sm font-normal text-foreground flex-shrink-0 ml-2">
                    ${item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-xs font-light text-muted-foreground">Subtotal</span>
              <span className="text-sm font-light text-foreground">${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs font-light text-muted-foreground">Shipping</span>
              <span className="text-sm font-light text-foreground">
                {shipping.price === 0 ? "Free" : `$${shipping.price}`}
              </span>
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-border pt-4 flex justify-between">
            <span className="text-sm font-normal text-foreground tracking-wide">
              Total
            </span>
            <span className="text-lg font-normal text-foreground">${total}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ========================================
   MAIN CHECKOUT PAGE
   ======================================== */
export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore()
  const {
    step,
    shippingInfo,
    shippingMethod,
    paymentInfo,
    setStep,
    setShippingInfo,
    setShippingMethod,
    setPaymentInfo,
    placeOrder,
    reset: resetCheckout,
  } = useCheckoutStore()

  const [mounted, setMounted] = useState(false)
  const [summaryExpanded, setSummaryExpanded] = useState(false)
  const [infoErrors, setInfoErrors] = useState<Record<string, string>>({})
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({})
  const [isPlacing, setIsPlacing] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect to home if cart is empty
  useEffect(() => {
    if (mounted && items.length === 0 && step !== "review") {
      router.push("/")
    }
  }, [mounted, items.length, step, router])

  if (!mounted) return null

  const subtotal = getTotalPrice()

  const validateInfo = (): boolean => {
    const errors: Record<string, string> = {}
    if (!shippingInfo.email.trim()) errors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingInfo.email))
      errors.email = "Enter a valid email"
    if (!shippingInfo.firstName.trim()) errors.firstName = "First name is required"
    if (!shippingInfo.lastName.trim()) errors.lastName = "Last name is required"
    if (!shippingInfo.address.trim()) errors.address = "Address is required"
    if (!shippingInfo.city.trim()) errors.city = "City is required"
    if (!shippingInfo.state.trim()) errors.state = "Required"
    if (!shippingInfo.zip.trim()) errors.zip = "Required"
    setInfoErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validatePayment = (): boolean => {
    const errors: Record<string, string> = {}
    const cardDigits = paymentInfo.cardNumber.replace(/\s/g, "")
    if (!cardDigits) errors.cardNumber = "Card number is required"
    else if (cardDigits.length < 13) errors.cardNumber = "Enter a valid card number"
    if (!paymentInfo.cardName.trim()) errors.cardName = "Cardholder name is required"
    const expiryDigits = paymentInfo.expiry.replace(/\D/g, "")
    if (!expiryDigits) errors.expiry = "Required"
    else if (expiryDigits.length < 4) errors.expiry = "MM/YY"
    if (!paymentInfo.cvc) errors.cvc = "Required"
    else if (paymentInfo.cvc.length < 3) errors.cvc = "Invalid"
    setPaymentErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInfoNext = () => {
    if (validateInfo()) {
      setStep("shipping")
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleShippingNext = () => {
    setStep("payment")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePaymentNext = () => {
    if (validatePayment()) {
      setStep("review")
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePlaceOrder = async () => {
    setIsPlacing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const orderId = placeOrder()
    clearCart()
    router.push(`/order-confirmation?id=${orderId}`)
  }

  const handleBack = (toStep: CheckoutStep) => {
    setStep(toStep)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (items.length === 0 && step !== "review") {
    return null
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex-shrink-0">
            <span className="font-display text-xl md:text-2xl font-bold tracking-wide text-foreground">
              ORY
            </span>
          </Link>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Lock strokeWidth={1} className="w-4 h-4" />
            <span className="text-xs font-light tracking-wider uppercase">
              Secure Checkout
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Back to cart */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-light text-muted-foreground hover:text-foreground transition-colors tracking-wide mb-8"
        >
          <ArrowLeft strokeWidth={1} className="w-4 h-4" />
          Back to Shopping
        </Link>

        {/* Steps */}
        <StepIndicator currentStep={step} />

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Form column */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              {step === "information" && (
                <InformationStep
                  key="information"
                  info={shippingInfo}
                  errors={infoErrors}
                  onChange={(field, value) => {
                    setShippingInfo({ [field]: value })
                    if (infoErrors[field]) {
                      setInfoErrors((prev) => {
                        const next = { ...prev }
                        delete next[field]
                        return next
                      })
                    }
                  }}
                  onNext={handleInfoNext}
                />
              )}
              {step === "shipping" && (
                <ShippingStep
                  key="shipping"
                  selectedMethod={shippingMethod}
                  onSelect={setShippingMethod}
                  shippingInfo={shippingInfo}
                  onBack={() => handleBack("information")}
                  onNext={handleShippingNext}
                />
              )}
              {step === "payment" && (
                <PaymentStep
                  key="payment"
                  info={paymentInfo}
                  errors={paymentErrors}
                  onChange={(field, value) => {
                    setPaymentInfo({ [field]: value })
                    if (paymentErrors[field]) {
                      setPaymentErrors((prev) => {
                        const next = { ...prev }
                        delete next[field]
                        return next
                      })
                    }
                  }}
                  onBack={() => handleBack("shipping")}
                  onNext={handlePaymentNext}
                />
              )}
              {step === "review" && (
                <ReviewStep
                  key="review"
                  shippingInfo={shippingInfo}
                  shippingMethod={shippingMethod}
                  paymentInfo={paymentInfo}
                  items={items}
                  subtotal={subtotal}
                  onBack={() => handleBack("payment")}
                  onPlaceOrder={handlePlaceOrder}
                  isPlacing={isPlacing}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="lg:sticky lg:top-8">
              <OrderSummary
                items={items}
                subtotal={subtotal}
                shippingMethod={shippingMethod}
                isExpanded={summaryExpanded}
                onToggle={() => setSummaryExpanded(!summaryExpanded)}
              />

              {/* Trust badges */}
              <div className="hidden lg:flex items-center justify-center gap-6 mt-6 py-4 text-muted-foreground/50">
                <div className="flex items-center gap-1.5">
                  <Lock strokeWidth={1} className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-light tracking-wide">SSL ENCRYPTED</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck strokeWidth={1} className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-light tracking-wide">SECURE PAYMENT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
