"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useFormatPrice } from "@/lib/i18n"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set())
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const didSwipe = useRef(false)
  const fp = useFormatPrice()

  const allImages = [product.image, product.hoverImage, ...product.images].filter(
    (img, i, arr) => arr.indexOf(img) === i
  )
  const images = allImages.filter((_, idx) => !failedImages.has(idx))

  const handleImageError = (originalIdx: number) => {
    setFailedImages((prev) => new Set(prev).add(originalIdx))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    didSwipe.current = false
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const dx = Math.abs(e.touches[0].clientX - touchStartX.current)
    if (dx > 10) {
      didSwipe.current = true
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    const maxIdx = images.length - 1

    if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0 && currentImage < maxIdx) {
        setCurrentImage((prev) => Math.min(prev + 1, maxIdx))
      } else if (dx > 0 && currentImage > 0) {
        setCurrentImage((prev) => prev - 1)
      }
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    if (didSwipe.current) {
      e.preventDefault()
      e.stopPropagation()
      didSwipe.current = false
    }
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
        setCurrentImage(0)
      }}
    >
      <Link
        href={`/product/${product.slug}`}
        className="block"
        onClick={handleClick}
      >
        <div
          className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Desktop: hover swap between main and hover image */}
          <div className="hidden md:block w-full h-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="25vw"
              className={`object-cover transition-opacity duration-700 ${
                isHovered ? "opacity-0" : "opacity-100"
              }`}
            />
            <Image
              src={product.hoverImage}
              alt={`${product.name} alternate view`}
              fill
              sizes="25vw"
              className={`object-cover transition-opacity duration-700 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          {/* Mobile: swipeable gallery */}
          <div className="md:hidden w-full h-full">
            {allImages.map((img, idx) => {
              if (failedImages.has(idx)) return null
              const visibleIdx = images.indexOf(img)
              return (
                <Image
                  key={img}
                  src={img}
                  alt={`${product.name} — ${visibleIdx + 1} of ${images.length}`}
                  fill
                  sizes="50vw"
                  className={`object-cover transition-opacity duration-300 ${
                    currentImage === visibleIdx ? "opacity-100" : "opacity-0"
                  }`}
                  loading={visibleIdx === 0 ? "eager" : "lazy"}
                  onError={() => handleImageError(idx)}
                />
              )
            })}

            {/* Slide indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-[1.5px] rounded-full transition-all duration-300 ${
                      currentImage === idx
                        ? "w-4 bg-white"
                        : "w-2 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>

      <Link href={`/product/${product.slug}`} className="block space-y-1">
        <h3 className="text-sm font-normal text-foreground tracking-wide">
          {product.name}
        </h3>
        <p className="text-xs font-light text-muted-foreground tracking-wide">
          {product.material}
        </p>
        <p className="text-sm font-normal text-foreground">
          {fp(product.price)}
        </p>
      </Link>
    </motion.article>
  )
}
