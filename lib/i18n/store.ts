"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Language = "en" | "de" | "fr" | "es" | "pt"
export type Currency = "usd" | "eur" | "chf" | "gbp" | "brl"

export interface LanguageOption {
  code: Language
  name: string
  flag: string
}

export interface CurrencyOption {
  code: Currency
  name: string
  symbol: string
  rate: number
}

export const languages: LanguageOption[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
]

export const currencies: CurrencyOption[] = [
  { code: "usd", name: "USD ($)", symbol: "$", rate: 1 },
  { code: "eur", name: "EUR (€)", symbol: "€", rate: 0.92 },
  { code: "chf", name: "CHF (Fr)", symbol: "Fr", rate: 0.88 },
  { code: "gbp", name: "GBP (£)", symbol: "£", rate: 0.79 },
  { code: "brl", name: "BRL (R$)", symbol: "R$", rate: 4.97 },
]

interface I18nState {
  language: Language
  currency: Currency
  setLanguage: (lang: Language) => void
  setCurrency: (currency: Currency) => void
}

export const useI18nStore = create<I18nState>()(
  persist(
    (set) => ({
      language: "en",
      currency: "usd",
      setLanguage: (language) => set({ language }),
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: "broov-i18n",
    }
  )
)

export function formatPrice(priceUsd: number, currency: Currency): string {
  const curr = currencies.find((c) => c.code === currency)!
  const converted = Math.round(priceUsd * curr.rate * 100) / 100

  // Format based on currency
  if (currency === "brl") {
    return `${curr.symbol} ${converted.toFixed(2).replace(".", ",")}`
  }
  if (currency === "eur" || currency === "chf") {
    return `${converted.toFixed(2).replace(".", ",")} ${curr.symbol}`
  }
  return `${curr.symbol}${converted.toFixed(2)}`
}
