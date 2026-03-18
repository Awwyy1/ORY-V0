"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"

export function CartSidebar() {
  const router = useRouter()
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice, getTotalItems } =
    useCartStore()

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-light tracking-widest uppercase text-foreground">
                  Your Bag
                </h2>
                {totalItems > 0 && (
                  <span className="text-xs font-light text-muted-foreground">
                    ({totalItems} {totalItems === 1 ? "item" : "items"})
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="text-foreground hover:opacity-70 transition-opacity p-1"
                aria-label="Close cart"
              >
                <X strokeWidth={1} className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <ShoppingBag strokeWidth={0.5} className="w-16 h-16 text-muted-foreground/30 mb-6" />
                <p className="text-sm font-light text-muted-foreground mb-2">
                  Your bag is empty
                </p>
                <p className="text-xs font-light text-muted-foreground/70 mb-8">
                  Discover our collection of premium silk underwear
                </p>
                <Link
                  href="/#collection"
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 text-xs font-light tracking-widest uppercase text-foreground border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-300"
                >
                  Shop Collection
                  <ArrowRight strokeWidth={1} className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                <div className="px-6 py-4 space-y-0">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.productId}-${item.size}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="flex gap-4 py-5 border-b border-border last:border-b-0"
                    >
                      {/* Product Image */}
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="relative w-20 h-[106px] md:w-24 md:h-32 bg-secondary flex-shrink-0 overflow-hidden"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <Link
                                href={`/product/${item.slug}`}
                                onClick={closeCart}
                                className="text-sm font-normal text-foreground tracking-wide hover:opacity-70 transition-opacity"
                              >
                                {item.name}
                              </Link>
                              <p className="text-xs font-light text-muted-foreground tracking-wide mt-0.5">
                                {item.material}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.productId, item.size)}
                              className="text-muted-foreground hover:text-foreground transition-colors p-0.5 flex-shrink-0"
                              aria-label={`Remove ${item.name}`}
                            >
                              <X strokeWidth={1} className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs font-light text-muted-foreground mt-1">
                            Size: {item.size}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-border">
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.size, item.quantity - 1)
                              }
                              className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus strokeWidth={1} className="w-3 h-3" />
                            </button>
                            <span className="w-8 h-8 flex items-center justify-center text-xs font-light text-foreground border-x border-border">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.size, item.quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus strokeWidth={1} className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Item Total */}
                          <p className="text-sm font-normal text-foreground">
                            {item.currency}{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer - Summary & Checkout */}
            {items.length > 0 && (
              <div className="border-t border-border px-6 py-5 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-light text-muted-foreground tracking-wide">
                    Subtotal
                  </span>
                  <span className="text-sm font-normal text-foreground">
                    ${totalPrice}
                  </span>
                </div>

                {/* Shipping Note */}
                <p className="text-xs font-light text-muted-foreground">
                  Shipping & taxes calculated at checkout
                </p>

                {/* Checkout Button */}
                <button
                  onClick={() => {
                    closeCart()
                    router.push("/checkout")
                  }}
                  className="w-full py-4 text-sm font-light tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-colors duration-300"
                >
                  Proceed to Checkout
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={closeCart}
                  className="w-full py-3 text-xs font-light tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors text-center"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
