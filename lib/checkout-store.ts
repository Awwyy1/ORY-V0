"use client"

import { create } from "zustand"

export interface ShippingInfo {
  email: string
  firstName: string
  lastName: string
  phone: string
  address: string
  apartment: string
  city: string
  country: string
  state: string
  zip: string
}

export type ShippingMethod = "standard" | "express" | "overnight"

export interface ShippingOption {
  id: ShippingMethod
  name: string
  description: string
  price: number
  days: string
}

export const shippingOptions: ShippingOption[] = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "Delivered in recycled packaging",
    price: 0,
    days: "5–7 business days",
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "Priority handling & tracking",
    price: 12,
    days: "2–3 business days",
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    description: "Next business day delivery",
    price: 25,
    days: "1 business day",
  },
]

export type CheckoutStep = "information" | "shipping" | "review"

interface CheckoutState {
  step: CheckoutStep
  shippingInfo: ShippingInfo
  shippingMethod: ShippingMethod
  orderId: string | null

  setStep: (step: CheckoutStep) => void
  setShippingInfo: (info: Partial<ShippingInfo>) => void
  setShippingMethod: (method: ShippingMethod) => void
  reset: () => void
}

const initialShippingInfo: ShippingInfo = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  apartment: "",
  city: "",
  country: "US",
  state: "",
  zip: "",
}

export const useCheckoutStore = create<CheckoutState>()((set) => ({
  step: "information",
  shippingInfo: initialShippingInfo,
  shippingMethod: "standard",
  orderId: null,

  setStep: (step) => set({ step }),

  setShippingInfo: (info) =>
    set((state) => ({
      shippingInfo: { ...state.shippingInfo, ...info },
    })),

  setShippingMethod: (method) => set({ shippingMethod: method }),

  reset: () =>
    set({
      step: "information",
      shippingInfo: initialShippingInfo,
      shippingMethod: "standard",
      orderId: null,
    }),
}))
