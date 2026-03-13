"use client"

import { useState, useEffect } from "react"
import { Search, Heart, User, ShoppingBag, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { name: "Men", href: "#men" },
  { name: "NEW IN", href: "#new-in" },
  { name: "100% Pure Silk", href: "#silk" },
  { name: "The Heritage", href: "#heritage" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartCount] = useState(2)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-white border-b border-[#E5E5E5]" 
            : "bg-transparent"
        }`}
      >
        <div className="w-full px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex-shrink-0">
              <span 
                className={`font-display text-2xl font-bold tracking-wide transition-colors duration-500 ${
                  isScrolled ? "text-[#1A1A1A]" : "text-white"
                }`}
              >
                ORY
              </span>
            </a>

            {/* Navigation - Center */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-light tracking-wide transition-colors duration-300 hover:opacity-70 ${
                    isScrolled ? "text-[#1A1A1A]" : "text-white"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-6">
              {/* Language/Currency Selector */}
              <button 
                className={`hidden lg:flex items-center gap-1 text-sm font-light transition-colors duration-300 ${
                  isScrolled ? "text-[#1A1A1A]" : "text-white"
                }`}
              >
                <span>English</span>
                <span className="mx-1 opacity-30">|</span>
                <span>EUR (€)</span>
                <ChevronDown strokeWidth={1} className="w-4 h-4 ml-1" />
              </button>

              {/* Icons */}
              <div className="flex items-center gap-5">
                <button 
                  className={`transition-colors duration-300 hover:opacity-70 ${
                    isScrolled ? "text-[#1A1A1A]" : "text-white"
                  }`}
                  aria-label="Search"
                >
                  <Search strokeWidth={1} className="w-5 h-5" />
                </button>
                <button 
                  className={`transition-colors duration-300 hover:opacity-70 ${
                    isScrolled ? "text-[#1A1A1A]" : "text-white"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart strokeWidth={1} className="w-5 h-5" />
                </button>
                <button 
                  className={`transition-colors duration-300 hover:opacity-70 ${
                    isScrolled ? "text-[#1A1A1A]" : "text-white"
                  }`}
                  aria-label="Account"
                >
                  <User strokeWidth={1} className="w-5 h-5" />
                </button>
                <button 
                  className={`relative transition-colors duration-300 hover:opacity-70 ${
                    isScrolled ? "text-[#1A1A1A]" : "text-white"
                  }`}
                  aria-label="Shopping Bag"
                >
                  <ShoppingBag strokeWidth={1} className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span 
                      className={`absolute -top-1.5 -right-1.5 w-4 h-4 text-[10px] font-medium flex items-center justify-center rounded-full ${
                        isScrolled 
                          ? "bg-[#1A1A1A] text-white" 
                          : "bg-white text-[#1A1A1A]"
                      }`}
                    >
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>
    </AnimatePresence>
  )
}
