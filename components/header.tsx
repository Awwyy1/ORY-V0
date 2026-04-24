"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart, User, ShoppingBag, ChevronDown, ChevronUp, Menu, Globe, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCartStore } from "@/lib/cart-store"
import { useTranslations, useI18nStore, languages, currencies, type Language, type Currency } from "@/lib/i18n"

interface HeaderProps {
  variant?: "transparent" | "solid"
}

export function Header({ variant = "transparent" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDesktopLangOpen, setIsDesktopLangOpen] = useState(false)
  const [isDesktopCurrencyOpen, setIsDesktopCurrencyOpen] = useState(false)
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false)
  const [isMenuLangOpen, setIsMenuLangOpen] = useState(false)
  const [isMenuCurrencyOpen, setIsMenuCurrencyOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const toggleCart = useCartStore((s) => s.toggleCart)
  const getTotalItems = useCartStore((s) => s.getTotalItems)

  const t = useTranslations()
  const { language, currency, setLanguage, setCurrency } = useI18nStore()

  const currentLang = languages.find((l) => l.code === language)!
  const currentCurrency = currencies.find((c) => c.code === currency)!

  useEffect(() => {
    setMounted(true)
  }, [])

  const cartCount = mounted ? getTotalItems() : 0

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isDesktopLangOpen && !target.closest('[data-desktop-lang-dropdown]')) {
        setIsDesktopLangOpen(false)
      }
      if (isDesktopCurrencyOpen && !target.closest('[data-desktop-currency-dropdown]')) {
        setIsDesktopCurrencyOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isDesktopLangOpen, isDesktopCurrencyOpen])

  const isSolid = variant === "solid" || isScrolled || isMenuOpen
  const textClass = isSolid ? "text-foreground" : "text-white"
  const badgeClass = isSolid ? "bg-foreground text-background" : "bg-white text-foreground"

  const navLinks = [
    { name: t.header.whySilk, href: "#why-silk" },
    { name: t.header.collection, href: "#collection" },
    { name: t.header.philosophy, href: "#philosophy" },
  ]

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isSolid
          ? "bg-background"
          : "bg-transparent"
          }`}
      >
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-12 md:h-14">

            {/* Mobile Left Controls */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`transition-colors duration-300 ${textClass}`}
                aria-label="Menu"
              >
                {isMenuOpen ? (
                  <X strokeWidth={1} className="w-5 h-5" />
                ) : (
                  <Menu strokeWidth={1} className="w-5 h-5" />
                )}
              </button>
              <div className="relative">
                <button
                  onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
                  className={`flex items-center gap-1 transition-colors duration-300 ${textClass}`}
                  aria-label="Language"
                >
                  <Globe strokeWidth={1} className="w-4.5 h-4.5" />
                  {isMobileLangOpen ? (
                    <ChevronUp strokeWidth={1} className="w-3 h-3" />
                  ) : (
                    <ChevronDown strokeWidth={1} className="w-3 h-3" />
                  )}
                </button>

                <AnimatePresence>
                  {isMobileLangOpen && (
                    <motion.div
                      key="header-lang-dropdown"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 bg-background border border-border shadow-sm min-w-[120px]"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code)
                            setIsMobileLangOpen(false)
                          }}
                          className={`w-full text-left px-4 py-2 text-sm font-light transition-colors hover:bg-muted ${language === lang.code ? "text-foreground" : "text-muted-foreground"
                            }`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 md:flex-shrink-0 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
              <span
                className={`font-display text-lg md:text-xl font-bold tracking-wide transition-colors duration-500 ${textClass}`}
              >
                BROOV
              </span>
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-light tracking-wide transition-colors duration-300 hover:opacity-70 ${textClass}`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-5">
              {/* Language Selector - Desktop */}
              <div className="relative hidden lg:block" data-desktop-lang-dropdown>
                <button
                  onClick={() => {
                    setIsDesktopLangOpen(!isDesktopLangOpen)
                    setIsDesktopCurrencyOpen(false)
                  }}
                  className={`flex items-center gap-1.5 text-xs font-light transition-colors duration-300 ${textClass}`}
                >
                  <Globe strokeWidth={1} className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="w-[65px] text-left">{currentLang.name}</span>
                  {isDesktopLangOpen ? (
                    <ChevronUp strokeWidth={1} className="w-3 h-3" />
                  ) : (
                    <ChevronDown strokeWidth={1} className="w-3 h-3" />
                  )}
                </button>

                <AnimatePresence>
                  {isDesktopLangOpen && (
                    <motion.div
                      key="desktop-lang-dropdown"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 bg-background border border-border shadow-sm min-w-[140px]"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code)
                            setIsDesktopLangOpen(false)
                          }}
                          className={`w-full text-left px-4 py-2 text-xs font-light transition-colors hover:bg-muted flex items-center gap-2 ${language === lang.code ? "text-foreground" : "text-muted-foreground"
                            }`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Currency Selector - Desktop */}
              <div className="relative hidden lg:block" data-desktop-currency-dropdown>
                <button
                  onClick={() => {
                    setIsDesktopCurrencyOpen(!isDesktopCurrencyOpen)
                    setIsDesktopLangOpen(false)
                  }}
                  className={`flex items-center gap-1.5 text-xs font-light transition-colors duration-300 ${textClass}`}
                >
                  <span className="w-[65px] text-left">{currentCurrency.name}</span>
                  {isDesktopCurrencyOpen ? (
                    <ChevronUp strokeWidth={1} className="w-3 h-3" />
                  ) : (
                    <ChevronDown strokeWidth={1} className="w-3 h-3" />
                  )}
                </button>

                <AnimatePresence>
                  {isDesktopCurrencyOpen && (
                    <motion.div
                      key="desktop-currency-dropdown"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 bg-background border border-border shadow-sm min-w-[120px]"
                    >
                      {currencies.map((curr) => (
                        <button
                          key={curr.code}
                          onClick={() => {
                            setCurrency(curr.code)
                            setIsDesktopCurrencyOpen(false)
                          }}
                          className={`w-full text-left px-4 py-2 text-xs font-light transition-colors hover:bg-muted ${currency === curr.code ? "text-foreground" : "text-muted-foreground"
                            }`}
                        >
                          {curr.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Desktop Icons */}
              <div className="hidden md:flex items-center gap-4">
                <button
                  className={`transition-colors duration-300 hover:opacity-70 ${textClass}`}
                  aria-label="Account"
                >
                  <User strokeWidth={1} className="w-[18px] h-[18px]" />
                </button>
                <button
                  onClick={toggleCart}
                  className={`relative transition-colors duration-300 hover:opacity-70 ${textClass}`}
                  aria-label="Shopping Bag"
                >
                  <ShoppingBag strokeWidth={1} className="w-[18px] h-[18px]" />
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      className={`absolute -top-1.5 -right-1.5 w-4 h-4 text-[10px] font-medium flex items-center justify-center rounded-full ${badgeClass}`}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </button>
              </div>

              {/* Mobile Icons */}
              <div className="flex md:hidden items-center gap-2.5">
                <button
                  className={`transition-colors duration-300 ${textClass}`}
                  aria-label="Account"
                >
                  <User strokeWidth={1} className="w-5 h-5" />
                </button>
                <button
                  onClick={toggleCart}
                  className={`relative transition-colors duration-300 ${textClass}`}
                  aria-label="Shopping Bag"
                >
                  <ShoppingBag strokeWidth={1} className="w-5 h-5" />
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      className={`absolute -top-1.5 -right-1.5 w-4 h-4 text-[10px] font-medium flex items-center justify-center rounded-full ${badgeClass}`}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background md:hidden"
            style={{ top: '48px' }}
          >
            <div className="flex flex-col h-full">
              <nav className="flex-1 border-t border-border/50">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, delay: index * 0.03 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-5 py-3 text-sm font-light tracking-wider text-foreground border-b border-border/50 hover:bg-muted transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>

              {/* Bottom — Language & Currency */}
              <div className="border-t border-border/50 px-5 py-3">
                <div className="flex items-center gap-6">
                  <Globe strokeWidth={1} className="w-4 h-4 text-muted-foreground" />

                  {/* Language */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setIsMenuLangOpen(!isMenuLangOpen)
                        setIsMenuCurrencyOpen(false)
                      }}
                      className="flex items-center gap-1 text-xs font-light text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span>{currentLang.name}</span>
                      <ChevronDown strokeWidth={1} className="w-3 h-3" />
                    </button>

                    <AnimatePresence>
                      {isMenuLangOpen && (
                        <motion.div
                          key="menu-lang-dropdown"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute bottom-full left-0 mb-2 bg-background border border-border/50 shadow-sm min-w-[120px]"
                        >
                          {languages.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => {
                                setLanguage(lang.code)
                                setIsMenuLangOpen(false)
                              }}
                              className={`w-full text-left px-3 py-1.5 text-xs font-light transition-colors hover:bg-muted ${language === lang.code ? "text-foreground" : "text-muted-foreground"
                                }`}
                            >
                              {lang.name}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Currency */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setIsMenuCurrencyOpen(!isMenuCurrencyOpen)
                        setIsMenuLangOpen(false)
                      }}
                      className="flex items-center gap-1 text-xs font-light text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span>{currentCurrency.name}</span>
                      <ChevronDown strokeWidth={1} className="w-3 h-3" />
                    </button>

                    <AnimatePresence>
                      {isMenuCurrencyOpen && (
                        <motion.div
                          key="menu-currency-dropdown"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute bottom-full left-0 mb-2 bg-background border border-border/50 shadow-sm min-w-[120px]"
                        >
                          {currencies.map((curr) => (
                            <button
                              key={curr.code}
                              onClick={() => {
                                setCurrency(curr.code)
                                setIsMenuCurrencyOpen(false)
                              }}
                              className={`w-full text-left px-3 py-1.5 text-xs font-light transition-colors hover:bg-muted ${currency === curr.code ? "text-foreground" : "text-muted-foreground"
                                }`}
                            >
                              {curr.name}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
