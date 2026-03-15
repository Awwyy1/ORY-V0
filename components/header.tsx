"use client"

import { useState, useEffect } from "react"
import { Search, Heart, User, ShoppingBag, ChevronDown, ChevronUp, Menu, Globe, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { name: "Why Silk", href: "#why-silk" },
  { name: "Collection", href: "#collection" },
  { name: "Philosophy", href: "#philosophy" },
]

const languages = [
  { code: "de", name: "Deutsch" },
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
]

const currencies = [
  { code: "usd", name: "United States ($)" },
  { code: "eur", name: "Europe (€)" },
  { code: "chf", name: "Switzerland (CHF)" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartCount] = useState(2)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState("en")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuLangOpen, setIsMenuLangOpen] = useState(false)
  const [isMenuCurrencyOpen, setIsMenuCurrencyOpen] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState("eur")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || isMenuOpen
          ? "bg-background border-b border-border"
          : "bg-transparent md:bg-transparent bg-background"
          }`}
      >
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Mobile Left Controls */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground transition-colors duration-300"
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
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-1 text-foreground transition-colors duration-300"
                  aria-label="Language"
                >
                  <Globe strokeWidth={1} className="w-5 h-5" />
                  {isLangOpen ? (
                    <ChevronUp strokeWidth={1} className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown strokeWidth={1} className="w-3.5 h-3.5" />
                  )}
                </button>

                {/* Language Dropdown */}
                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      key="header-lang-dropdown"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 bg-background border border-border shadow-sm min-w-[100px]"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setSelectedLang(lang.code)
                            setIsLangOpen(false)
                          }}
                          className={`w-full text-left px-4 py-2 text-sm font-light transition-colors hover:bg-muted ${selectedLang === lang.code ? "text-foreground" : "text-muted-foreground"
                            }`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                className="text-foreground transition-colors duration-300"
                aria-label="Wishlist"
              >
                <Heart strokeWidth={1} className="w-5 h-5" />
              </button>
            </div>

            {/* Logo - Desktop: Left, Mobile: Center */}
            <a href="/" className="flex-shrink-0 md:flex-shrink-0 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
              <span
                className={`font-display text-xl md:text-2xl font-bold tracking-wide transition-colors duration-500 ${isScrolled ? "text-foreground" : "md:text-white text-foreground"
                  }`}
              >
                ORY
              </span>
            </a>

            {/* Navigation - Center (Desktop only) */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-light tracking-wide transition-colors duration-300 hover:opacity-70 ${isScrolled ? "text-foreground" : "text-white"
                    }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-6">
              {/* Language/Currency Selector - Desktop only */}
              <button
                className={`hidden lg:flex items-center gap-1 text-sm font-light transition-colors duration-300 ${isScrolled ? "text-foreground" : "text-white"
                  }`}
              >
                <span>English</span>
                <span className="mx-1 opacity-30">|</span>
                <span>EUR (€)</span>
                <ChevronDown strokeWidth={1} className="w-4 h-4 ml-1" />
              </button>

              {/* Desktop Icons */}
              <div className="hidden md:flex items-center gap-5">
                <button
                  className={`transition-colors duration-300 hover:opacity-70 ${isScrolled ? "text-foreground" : "text-white"
                    }`}
                  aria-label="Search"
                >
                  <Search strokeWidth={1} className="w-5 h-5" />
                </button>
                <button
                  className={`transition-colors duration-300 hover:opacity-70 ${isScrolled ? "text-foreground" : "text-white"
                    }`}
                  aria-label="Wishlist"
                >
                  <Heart strokeWidth={1} className="w-5 h-5" />
                </button>
                <button
                  className={`transition-colors duration-300 hover:opacity-70 ${isScrolled ? "text-foreground" : "text-white"
                    }`}
                  aria-label="Account"
                >
                  <User strokeWidth={1} className="w-5 h-5" />
                </button>
                <button
                  className={`relative transition-colors duration-300 hover:opacity-70 ${isScrolled ? "text-foreground" : "text-white"
                    }`}
                  aria-label="Shopping Bag"
                >
                  <ShoppingBag strokeWidth={1} className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span
                      className={`absolute -top-1.5 -right-1.5 w-4 h-4 text-[10px] font-medium flex items-center justify-center rounded-full ${isScrolled
                        ? "bg-foreground text-background"
                        : "bg-white text-foreground"
                        }`}
                    >
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Mobile Icons - Compact spacing */}
              <div className="flex md:hidden items-center gap-2.5">
                <button
                  className="text-foreground transition-colors duration-300"
                  aria-label="Search"
                >
                  <Search strokeWidth={1} className="w-5 h-5" />
                </button>
                <button
                  className="text-foreground transition-colors duration-300"
                  aria-label="Account"
                >
                  <User strokeWidth={1} className="w-5 h-5" />
                </button>
                <button
                  className="relative text-foreground transition-colors duration-300"
                  aria-label="Shopping Bag"
                >
                  <ShoppingBag strokeWidth={1} className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 text-[10px] font-medium flex items-center justify-center rounded-full bg-foreground text-background">
                      {cartCount}
                    </span>
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
            style={{ top: '64px' }}
          >
            <div className="flex flex-col h-full">
              {/* Navigation Links */}
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

              {/* Bottom Section with Language and Currency */}
              <div className="border-t border-border/50 px-5 py-3">
                <div className="flex items-center gap-6">
                  <Globe strokeWidth={1} className="w-4 h-4 text-muted-foreground" />

                  {/* Language Selector */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setIsMenuLangOpen(!isMenuLangOpen)
                        setIsMenuCurrencyOpen(false)
                      }}
                      className="flex items-center gap-1 text-xs font-light text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span>{languages.find(l => l.code === selectedLang)?.name}</span>
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
                          className="absolute bottom-full left-0 mb-2 bg-background border border-border/50 shadow-sm min-w-[100px]"
                        >
                          {languages.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => {
                                setSelectedLang(lang.code)
                                setIsMenuLangOpen(false)
                              }}
                              className={`w-full text-left px-3 py-1.5 text-xs font-light transition-colors hover:bg-muted ${selectedLang === lang.code ? "text-foreground" : "text-muted-foreground"
                                }`}
                            >
                              {lang.name}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Currency Selector */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setIsMenuCurrencyOpen(!isMenuCurrencyOpen)
                        setIsMenuLangOpen(false)
                      }}
                      className="flex items-center gap-1 text-xs font-light text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span>{currencies.find(c => c.code === selectedCurrency)?.name}</span>
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
                          className="absolute bottom-full left-0 mb-2 bg-background border border-border/50 shadow-sm min-w-[140px]"
                        >
                          {currencies.map((currency) => (
                            <button
                              key={currency.code}
                              onClick={() => {
                                setSelectedCurrency(currency.code)
                                setIsMenuCurrencyOpen(false)
                              }}
                              className={`w-full text-left px-3 py-1.5 text-xs font-light transition-colors hover:bg-muted ${selectedCurrency === currency.code ? "text-foreground" : "text-muted-foreground"
                                }`}
                            >
                              {currency.name}
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
