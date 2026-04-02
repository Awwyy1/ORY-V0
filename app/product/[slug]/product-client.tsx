"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Minus, Plus, Ruler, ChevronDown, Check } from "lucide-react"
import { sizes, type Size, type Product } from "@/lib/products"
import { useCartStore } from "@/lib/cart-store"
import { useTranslations, useFormatPrice } from "@/lib/i18n"
import { trackViewItem, trackAddToCart } from "@/lib/analytics"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartSidebar } from "@/components/cart-sidebar"
import { SizeGuideModal } from "@/components/size-guide-modal"
import { ProductSchema } from "@/components/product-schema"

interface ProductClientProps {
  product: Product
  otherProducts: Product[]
}

export function ProductClient({ product, otherProducts }: ProductClientProps) {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const [activeTab, setActiveTab] = useState<"details" | "care">("details")
  const addItem = useCartStore((s) => s.addItem)
  const t = useTranslations()
  const fp = useFormatPrice()

  useEffect(() => {
    trackViewItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      material: product.material,
    })
  }, [product.slug, product.name, product.price, product.material])

  const handleAddToBag = () => {
    if (!selectedSize) {
      setSizeError(true)
      return
    }

    const stock = product.stock[selectedSize]
    if (stock === 0) return

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      material: product.material,
      price: product.price,
      currency: product.currency,
      size: selectedSize,
      image: product.image,
    })

    trackAddToCart({
      slug: product.slug,
      name: product.name,
      price: product.price,
      size: selectedSize,
    })

    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 2000)
  }

  const currentStock = selectedSize ? product.stock[selectedSize] : null

  const getStockLabel = (count: number): string => {
    if (count === 0) return t.product.outOfStock
    if (count <= 3) return t.product.onlyLeft.replace("{count}", String(count))
    return t.product.inStock
  }

  const getStockColor = (count: number): string => {
    if (count === 0) return "text-red-500"
    if (count <= 3) return "text-amber-600"
    return "text-emerald-600"
  }

  return (
    <>
      <ProductSchema product={product} />
      <Header />
      <CartSidebar />
      <SizeGuideModal
        isOpen={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
      />

      <main className="min-h-screen bg-white pt-16 md:pt-20">
        <div className="px-4 md:px-8 lg:px-12 py-4">
          <div className="max-w-[1600px] mx-auto">
            <Link
              href="/#collection"
              className="inline-flex items-center gap-2 text-xs font-light text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              <ArrowLeft strokeWidth={1} className="w-4 h-4" />
              {t.product.backToCollection}
            </Link>
          </div>
        </div>

        <div className="px-4 md:px-8 lg:px-12 pb-24">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative aspect-[3/4] bg-secondary mb-3 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={product.images[selectedImageIndex]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative aspect-[3/4] w-20 md:w-24 bg-secondary overflow-hidden transition-all duration-200 ${
                        selectedImageIndex === idx
                          ? "ring-1 ring-foreground"
                          : "ring-1 ring-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col"
              >
                <div className="mb-6">
                  <h1 className="font-display text-2xl md:text-3xl font-bold tracking-wide text-foreground">
                    {product.name}
                  </h1>
                  <p className="text-sm font-light text-muted-foreground tracking-widest uppercase mt-1">
                    {product.material}
                  </p>
                  <p className="text-xl md:text-2xl font-light text-foreground mt-4">
                    {fp(product.price)}
                  </p>
                </div>

                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-8">
                  {product.description}
                </p>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-light tracking-widest uppercase text-foreground">
                      {t.product.size} {selectedSize && `— ${selectedSize}`}
                    </span>
                    <button
                      onClick={() => setShowSizeGuide(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-light text-muted-foreground hover:text-foreground transition-colors tracking-wide"
                    >
                      <Ruler strokeWidth={1} className="w-3.5 h-3.5" />
                      {t.product.sizeGuide}
                    </button>
                  </div>

                  <div className="flex gap-2">
                    {sizes.map((size) => {
                      const stock = product.stock[size]
                      const isSelected = selectedSize === size
                      const isOutOfStock = stock === 0

                      return (
                        <button
                          key={size}
                          onClick={() => {
                            if (!isOutOfStock) {
                              setSelectedSize(size)
                              setSizeError(false)
                            }
                          }}
                          disabled={isOutOfStock}
                          className={`
                            relative flex-1 py-3 text-sm font-light tracking-wide transition-all duration-200
                            ${isOutOfStock
                              ? "text-muted-foreground/40 cursor-not-allowed line-through border border-border/50"
                              : isSelected
                                ? "bg-foreground text-background border border-foreground"
                                : "border border-border text-foreground hover:border-foreground"
                            }
                          `}
                        >
                          {size}
                        </button>
                      )
                    })}
                  </div>

                  <AnimatePresence>
                    {sizeError && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-xs text-red-500 mt-2 font-light"
                      >
                        {t.product.selectSize}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {selectedSize && currentStock !== null && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`text-xs font-light mt-2 ${getStockColor(currentStock)}`}
                    >
                      {getStockLabel(currentStock)}
                    </motion.p>
                  )}
                </div>

                <button
                  onClick={handleAddToBag}
                  disabled={selectedSize !== null && currentStock === 0}
                  className={`
                    w-full py-4 text-sm font-light tracking-widest uppercase transition-all duration-300
                    ${justAdded
                      ? "bg-emerald-900 text-white"
                      : selectedSize && currentStock === 0
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-foreground text-background hover:bg-foreground/90"
                    }
                  `}
                >
                  {justAdded ? (
                    <span className="inline-flex items-center gap-2">
                      <Check strokeWidth={1.5} className="w-4 h-4" />
                      {t.product.addedToBag}
                    </span>
                  ) : selectedSize && currentStock === 0 ? (
                    t.product.outOfStock
                  ) : (
                    t.product.addToBag
                  )}
                </button>

                <p className="text-xs font-light text-muted-foreground text-center mt-3">
                  {t.product.freeShippingNote}
                </p>

                <div className="mt-10 border-t border-border pt-8">
                  <div className="flex gap-8 mb-6">
                    <button
                      onClick={() => setActiveTab("details")}
                      className={`text-xs font-light tracking-widest uppercase pb-2 transition-colors border-b ${
                        activeTab === "details"
                          ? "text-foreground border-foreground"
                          : "text-muted-foreground border-transparent hover:text-foreground"
                      }`}
                    >
                      {t.product.details}
                    </button>
                    <button
                      onClick={() => setActiveTab("care")}
                      className={`text-xs font-light tracking-widest uppercase pb-2 transition-colors border-b ${
                        activeTab === "care"
                          ? "text-foreground border-foreground"
                          : "text-muted-foreground border-transparent hover:text-foreground"
                      }`}
                    >
                      {t.product.care}
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.ul
                      key={activeTab}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2.5"
                    >
                      {(activeTab === "details" ? product.details : product.care).map(
                        (item, i) => (
                          <li
                            key={i}
                            className="text-sm font-light text-muted-foreground leading-relaxed flex items-start gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/50 mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        )
                      )}
                    </motion.ul>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            <div className="mt-24 md:mt-32">
              <h2 className="text-sm font-light text-foreground tracking-widest uppercase mb-12">
                {t.product.youMayAlsoLike}
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
                {otherProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.slug}`}
                    className="group"
                  >
                    <div className="relative aspect-[3/4] bg-secondary mb-4 overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-sm font-normal text-foreground tracking-wide">
                      {p.name}
                    </h3>
                    <p className="text-xs font-light text-muted-foreground tracking-wide mt-0.5">
                      {p.material}
                    </p>
                    <p className="text-sm font-normal text-foreground mt-0.5">
                      {fp(p.price)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  )
}
