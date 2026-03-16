"use client"

import { motion } from "framer-motion"
import { ProductCard } from "./product-card"

const products = [
  {
    id: 1,
    name: "ORY STEALTH",
    material: "BLACK OBSIDIAN SILK",
    price: "$85",
    image: "/images/products/stealth.png",
    hoverImage: "/images/products/stealth-hover.png",
  },
  {
    id: 2,
    name: "ORY CARBON",
    material: "MATTE GREY FUSION",
    price: "$95",
    image: "/images/products/carbon.png",
    hoverImage: "/images/products/carbon-hover.png",
  },
  {
    id: 3,
    name: "ORY ICE",
    material: "COLD SILVER WEAVE",
    price: "$85",
    image: "/images/products/ice.png",
    hoverImage: "/images/products/ice-hover.png",
  },
  {
    id: 4,
    name: "ORY MIDNIGHT",
    material: "ROYAL DEEP BLUE",
    price: "$110",
    image: "/images/products/midnight.png",
    hoverImage: "/images/products/midnight-hover.png",
  },
]

export function ProductGrid() {
  return (
    <section id="collection" className="py-24 md:py-32 px-8 lg:px-12 bg-white">
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
            Collection
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
