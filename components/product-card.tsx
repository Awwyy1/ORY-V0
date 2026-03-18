"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useCartStore } from "@/lib/cart-store"
import type { Product, Size } from "@/lib/products"
import { sizes } from "@/lib/products"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const [showSizes, setShowSizes] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  const handleAddToBag = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!selectedSize) {
      setShowSizes(true)
      return
    }

    if (product.stock[selectedSize] === 0) return

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

    setSelectedSize(null)
    setShowSizes(false)
  }

  const handleSizeSelect = (size: Size, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.stock[size] === 0) return
    setSelectedSize(size)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setShowSizes(false)
        setSelectedSize(null)
      }}
    >
      {/* Image Container */}
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
          {/* Primary Image */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={`object-cover transition-opacity duration-700 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          />
          {/* Hover Image */}
          <Image
            src={product.hoverImage}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={`object-cover transition-opacity duration-700 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Quick Add Section */}
          <div
            className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* Size Selector */}
            {showSizes && (
              <div className="px-3 pb-2">
                <div className="flex gap-1">
                  {sizes.map((size) => {
                    const stock = product.stock[size]
                    const isOutOfStock = stock === 0
                    const isSelected = selectedSize === size

                    return (
                      <button
                        key={size}
                        onClick={(e) => handleSizeSelect(size, e)}
                        disabled={isOutOfStock}
                        className={`
                          flex-1 py-2 text-[11px] font-light tracking-wide transition-all duration-150
                          ${isOutOfStock
                            ? "bg-white/30 text-white/40 cursor-not-allowed line-through"
                            : isSelected
                              ? "bg-white text-foreground"
                              : "bg-white/80 text-foreground hover:bg-white"
                          }
                        `}
                      >
                        {size}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Add to Bag Button */}
            <div className="p-3 pt-0">
              <button
                onClick={handleAddToBag}
                className="w-full py-3 text-sm font-light tracking-wide text-primary-foreground bg-primary hover:bg-primary/80 transition-colors duration-300"
              >
                {showSizes && selectedSize
                  ? `Add ${selectedSize} to Bag`
                  : showSizes
                    ? "Select Size"
                    : "Quick Add"}
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <Link href={`/product/${product.slug}`} className="block space-y-1">
        <h3 className="text-sm font-normal text-foreground tracking-wide">
          {product.name}
        </h3>
        <p className="text-xs font-light text-muted-foreground tracking-wide">
          {product.material}
        </p>
        <p className="text-sm font-normal text-foreground">
          {product.currency}{product.price}
        </p>
      </Link>
    </motion.article>
  )
}
