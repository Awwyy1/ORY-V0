"use client"

import { useState } from "react"
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
  const fp = useFormatPrice()

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={`object-cover transition-opacity duration-700 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          />
          <Image
            src={product.hoverImage}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={`object-cover transition-opacity duration-700 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
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
