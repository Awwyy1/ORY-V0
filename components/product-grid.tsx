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
    <section id="collection" className="py-24 md:py-32 bg-white">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 px-4 md:px-8 lg:px-12"
        >
          <h2 className="text-sm font-light text-foreground tracking-widest uppercase">
            {t.product.collection}
          </h2>
        </motion.div>

        {/* Mobile: horizontal swipe carousel */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar px-4 pb-2">
            {products.map((product) => (
              <div
                key={product.id}
                className="snap-start flex-shrink-0 w-[calc((100vw-3rem)/2)]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: 4-column grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 px-8 lg:px-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
