"use client"

import { motion } from "framer-motion"
import { ProductCard } from "./product-card"

const products = [
  {
    id: 1,
    name: "The Silk Boxer Brief",
    material: "100% Mulberry Silk",
    price: "€120",
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=2574&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2580&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "The Classic Trunk",
    material: "100% Mulberry Silk",
    price: "€110",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2580&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=2574&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "The Lounge Short",
    material: "100% Mulberry Silk",
    price: "€145",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2574&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=2574&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "The Slip",
    material: "100% Mulberry Silk",
    price: "€95",
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=2574&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2574&auto=format&fit=crop",
  },
]

export function ProductGrid() {
  return (
    <section id="new-arrivals" className="py-24 md:py-32 px-8 lg:px-12 bg-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-sm font-light text-foreground tracking-widest uppercase">
            New Arrivals
          </h2>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              material={product.material}
              price={product.price}
              image={product.image}
              hoverImage={product.hoverImage}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
