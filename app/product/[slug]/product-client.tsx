"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { Ruler, Check, ChevronRight } from "lucide-react"
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

const SWIPE_THRESHOLD = 50

export function ProductClient({ product, otherProducts }: ProductClientProps) {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const [activeTab, setActiveTab] = useState<"details" | "care">("details")
  const [isDragging, setIsDragging] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const t = useTranslations()
  const fp = useFormatPrice()

  const galleryImages = product.images
  const totalSlides = galleryImages.length

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

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)
    const { offset, velocity } = info
    if (Math.abs(offset.x) > SWIPE_THRESHOLD || Math.abs(velocity.x) > 300) {
      if (offset.x < 0 && currentSlide < totalSlides - 1) {
        setCurrentSlide((s) => s + 1)
      } else if (offset.x > 0 && currentSlide > 0) {
        setCurrentSlide((s) => s - 1)
      }
    }
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
      <Header variant="solid" />
      <CartSidebar />
      <SizeGuideModal
        isOpen={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
      />

      <main className="min-h-screen bg-white pt-12 md:pt-14">
        {/* Breadcrumbs */}
        <div className="px-4 md:px-8 lg:px-12 py-3">
          <div className="max-w-[1400px] mx-auto">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
              <Link
                href="/"
                className="text-[11px] font-light text-muted-foreground hover:text-foreground transition-colors tracking-wide"
              >
                BROOV
              </Link>
              <ChevronRight strokeWidth={1} className="w-2.5 h-2.5 text-muted-foreground/40" />
              <Link
                href="/#collection"
                className="text-[11px] font-light text-muted-foreground hover:text-foreground transition-colors tracking-wide"
              >
                {t.product.collection}
              </Link>
              <ChevronRight strokeWidth={1} className="w-2.5 h-2.5 text-muted-foreground/40" />
              <span className="text-[11px] font-light text-foreground tracking-wide">
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        <div className="px-4 md:px-8 lg:px-12 pb-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start">
              {/* Image Gallery — Horizontal Swipe */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="lg:sticky lg:top-16"
              >
                <div className="relative aspect-[4/5] lg:aspect-[4/5] bg-secondary overflow-hidden select-none">
                  <motion.div
                    className="flex h-full"
                    animate={{ x: `-${currentSlide * 100}%` }}
                    transition={{ type: "tween", duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.12}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={handleDragEnd}
                    style={{ cursor: isDragging ? "grabbing" : "grab" }}
                  >
                    {galleryImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative w-full h-full flex-shrink-0"
                      >
                        <Image
                          src={img}
                          alt={`${product.name} — ${idx + 1} of ${totalSlides}`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover pointer-events-none"
                          priority={idx === 0}
                          draggable={false}
                        />
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Thin slide indicators */}
                <div className="flex gap-1.5 mt-2.5 px-0.5">
                  {Array.from({ length: totalSlides }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`View image ${idx + 1}`}
                      className="relative h-[1.5px] flex-1 group"
                    >
                      <div className="absolute inset-0 bg-border rounded-full" />
                      <motion.div
                        className="absolute inset-0 bg-foreground rounded-full origin-left"
                        initial={false}
                        animate={{ scaleX: currentSlide === idx ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col lg:py-2"
              >
                <div className="mb-4">
                  <h1 className="font-display text-xl md:text-2xl font-bold tracking-wide text-foreground">
                    {product.name}
                  </h1>
                  <p className="text-xs font-light text-muted-foreground tracking-widest uppercase mt-0.5">
                    {product.material}
                  </p>
                  <p className="text-lg md:text-xl font-light text-foreground mt-3">
                    {fp(product.price)}
                  </p>
                </div>

                <p className="text-xs font-light text-muted-foreground leading-relaxed mb-5">
                  {product.description}
                </p>

                {/* Size Selector */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-light tracking-widest uppercase text-foreground">
                      {t.product.size} {selectedSize && `— ${selectedSize}`}
                    </span>
                    <button
                      onClick={() => setShowSizeGuide(true)}
                      className="inline-flex items-center gap-1 text-[11px] font-light text-muted-foreground hover:text-foreground transition-colors tracking-wide"
                    >
                      <Ruler strokeWidth={1} className="w-3 h-3" />
                      {t.product.sizeGuide}
                    </button>
                  </div>

                  <div className="flex gap-1.5">
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
                            relative flex-1 py-2.5 text-xs font-light tracking-wide transition-all duration-200
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
                        className="text-[11px] text-red-500 mt-1.5 font-light"
                      >
                        {t.product.selectSize}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {selectedSize && currentStock !== null && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`text-[11px] font-light mt-1.5 ${getStockColor(currentStock)}`}
                    >
                      {getStockLabel(currentStock)}
                    </motion.p>
                  )}
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToBag}
                  disabled={selectedSize !== null && currentStock === 0}
                  className={`
                    w-full py-3.5 text-xs font-light tracking-widest uppercase transition-all duration-300
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
                      <Check strokeWidth={1.5} className="w-3.5 h-3.5" />
                      {t.product.addedToBag}
                    </span>
                  ) : selectedSize && currentStock === 0 ? (
                    t.product.outOfStock
                  ) : (
                    t.product.addToBag
                  )}
                </button>

                <p className="text-[11px] font-light text-muted-foreground text-center mt-2">
                  {t.product.freeShippingNote}
                </p>

                {/* Details / Care Tabs */}
                <div className="mt-6 border-t border-border pt-5">
                  <div className="flex gap-6 mb-4">
                    <button
                      onClick={() => setActiveTab("details")}
                      className={`text-[11px] font-light tracking-widest uppercase pb-1.5 transition-colors border-b ${
                        activeTab === "details"
                          ? "text-foreground border-foreground"
                          : "text-muted-foreground border-transparent hover:text-foreground"
                      }`}
                    >
                      {t.product.details}
                    </button>
                    <button
                      onClick={() => setActiveTab("care")}
                      className={`text-[11px] font-light tracking-widest uppercase pb-1.5 transition-colors border-b ${
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
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-1.5"
                    >
                      {(activeTab === "details" ? product.details : product.care).map(
                        (item, i) => (
                          <li
                            key={i}
                            className="text-xs font-light text-muted-foreground leading-relaxed flex items-start gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/50 mt-1.5 flex-shrink-0" />
                            {item}
                          </li>
                        )
                      )}
                    </motion.ul>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Related Products */}
            <div className="mt-20 md:mt-28">
              <h2 className="text-xs font-light text-foreground tracking-widest uppercase mb-10">
                {t.product.youMayAlsoLike}
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {otherProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.slug}`}
                    className="group"
                  >
                    <div className="relative aspect-[4/5] bg-secondary mb-3 overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-xs font-normal text-foreground tracking-wide">
                      {p.name}
                    </h3>
                    <p className="text-[11px] font-light text-muted-foreground tracking-wide mt-0.5">
                      {p.material}
                    </p>
                    <p className="text-xs font-normal text-foreground mt-0.5">
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
