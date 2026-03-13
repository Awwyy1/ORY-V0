"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface ProductCardProps {
  name: string
  material: string
  price: string
  image: string
  hoverImage: string
}

export function ProductCard({ name, material, price, image, hoverImage }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container - 3:4 Aspect Ratio */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#FAFAFA] mb-4">
        {/* Primary Image */}
        <img
          src={image}
          alt={name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />
        {/* Hover Image */}
        <img
          src={hoverImage}
          alt={`${name} alternate view`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
        
        {/* Add to Cart - Appears on Hover */}
        <div 
          className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-500 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <button className="w-full py-3 text-sm font-light tracking-wide text-white bg-[#1A1A1A] hover:bg-[#333] transition-colors duration-300">
            Add to Bag
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        <h3 className="text-sm font-normal text-[#1A1A1A] tracking-wide">
          {name}
        </h3>
        <p className="text-xs font-light text-[#666] tracking-wide">
          {material}
        </p>
        <p className="text-sm font-normal text-[#1A1A1A]">
          {price}
        </p>
      </div>
    </motion.article>
  )
}
