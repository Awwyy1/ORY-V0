"use client"

import { motion } from "framer-motion"
import { ProductCard } from "./product-card"
import { useTranslations } from "@/lib/i18n"
import type { Product } from "@/lib/products"

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const t = useTranslations()

  return (
    <section id="collection" className="py-24 md:py-32 px-8 lg:px-12 bg-white">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-sm font-light text-foreground tracking-widest uppercase">
            {t.product.collection}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
