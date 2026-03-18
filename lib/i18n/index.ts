"use client"

import { useI18nStore, formatPrice, type Language, type Currency } from "./store"
import en, { type Translations } from "./en"
import de from "./de"
import fr from "./fr"
import es from "./es"
import pt from "./pt"

const translations: Record<Language, Translations> = { en, de, fr, es, pt }

export function useTranslations(): Translations {
  const language = useI18nStore((s) => s.language)
  return translations[language]
}

export function useFormatPrice() {
  const currency = useI18nStore((s) => s.currency)
  return (priceUsd: number) => formatPrice(priceUsd, currency)
}

export { useI18nStore, formatPrice, languages, currencies } from "./store"
export type { Language, Currency } from "./store"
export type { Translations } from "./en"
