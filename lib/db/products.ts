import { db } from "./index"
import type { Product, Size } from "@/lib/products"

// Fallback products when DB is unavailable or empty
const fallbackProducts: Product[] = [
  {
    id: "fallback-stealth",
    slug: "stealth",
    name: "BROOV STEALTH",
    material: "BLACK OBSIDIAN SILK",
    price: 110,
    currency: "$",
    image: "/images/products/stealth.png",
    hoverImage: "/images/products/stealth-hover.png",
    images: ["/images/products/stealth-1.png", "/images/products/stealth-2.png", "/images/products/stealth-3.png", "/images/products/stealth-4.png", "/images/products/stealth-5.png"],
    description: "Pure black obsidian silk boxer. Invisible under any clothing, engineered for zero friction and absolute comfort. The darkest expression of quiet luxury.",
    details: ["100% Grade 6A Mulberry Silk", "Invisible flat-lock stitching", "Zero-pressure waistband", "Anatomical 3D pouch construction", "Anti-roll leg openings", "Weight: 42g"],
    care: ["Hand wash cold or machine wash on delicate cycle", "Use silk-specific or pH-neutral detergent", "Do not bleach or tumble dry", "Lay flat to dry away from direct sunlight", "Iron on low heat if needed (silk setting)"],
    stock: { S: 8, M: 12, L: 6, XL: 3, XXL: 2 },
  },
  {
    id: "fallback-carbon",
    slug: "carbon",
    name: "BROOV CARBON",
    material: "MATTE GREY FUSION",
    price: 110,
    currency: "$",
    image: "/images/products/carbon.png",
    hoverImage: "/images/products/carbon-hover.png",
    images: ["/images/products/carbon-1.png", "/images/products/carbon-2.png", "/images/products/carbon-3.png", "/images/products/carbon-4.png", "/images/products/carbon-5.png"],
    description: "Matte grey fusion silk boxer with carbon-tone finish. A refined neutral that pairs with everything. Engineered for those who demand both form and function.",
    details: ["100% Grade 6A Mulberry Silk", "Invisible flat-lock stitching", "Zero-pressure waistband", "Anatomical 3D pouch construction", "Anti-roll leg openings", "Weight: 42g"],
    care: ["Hand wash cold or machine wash on delicate cycle", "Use silk-specific or pH-neutral detergent", "Do not bleach or tumble dry", "Lay flat to dry away from direct sunlight", "Iron on low heat if needed (silk setting)"],
    stock: { S: 5, M: 10, L: 7, XL: 4, XXL: 1 },
  },
  {
    id: "fallback-ice",
    slug: "ice",
    name: "BROOV ICE",
    material: "COLD SILVER WEAVE",
    price: 110,
    currency: "$",
    image: "/images/products/ice.png",
    hoverImage: "/images/products/ice-hover.png",
    images: ["/images/products/ice-1.png", "/images/products/ice-2.png", "/images/products/ice-3.png", "/images/products/ice-4.png", "/images/products/ice-5.png"],
    description: "Cold silver weave silk boxer with a subtle metallic sheen. Thermoregulating properties keep you cool when it matters. The lightest touch against your skin.",
    details: ["100% Grade 6A Mulberry Silk", "Invisible flat-lock stitching", "Zero-pressure waistband", "Anatomical 3D pouch construction", "Anti-roll leg openings", "Weight: 42g"],
    care: ["Hand wash cold or machine wash on delicate cycle", "Use silk-specific or pH-neutral detergent", "Do not bleach or tumble dry", "Lay flat to dry away from direct sunlight", "Iron on low heat if needed (silk setting)"],
    stock: { S: 3, M: 9, L: 11, XL: 6, XXL: 0 },
  },
  {
    id: "fallback-midnight",
    slug: "midnight",
    name: "BROOV MIDNIGHT",
    material: "ROYAL DEEP BLUE",
    price: 110,
    currency: "$",
    image: "/images/products/midnight.png",
    hoverImage: "/images/products/midnight-hover.png",
    images: ["/images/products/midnight-1.png", "/images/products/midnight-2.png", "/images/products/midnight-3.png", "/images/products/midnight-4.png", "/images/products/midnight-5.png"],
    description: "Royal deep blue silk boxer — our flagship piece. The deepest indigo meets the finest 6A Mulberry silk. For moments that demand your absolute best.",
    details: ["100% Grade 6A Mulberry Silk", "Invisible flat-lock stitching", "Zero-pressure waistband", "Anatomical 3D pouch construction", "Anti-roll leg openings", "Weight: 42g", "Premium indigo dye — colorfast guaranteed"],
    care: ["Hand wash cold or machine wash on delicate cycle", "Use silk-specific or pH-neutral detergent", "Do not bleach or tumble dry", "Lay flat to dry away from direct sunlight", "Iron on low heat if needed (silk setting)", "Wash separately for first 2–3 washes"],
    stock: { S: 2, M: 7, L: 5, XL: 3, XXL: 1 },
  },
]

export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await db.product.findMany({
      where: { active: true },
      include: { variants: true },
      orderBy: { createdAt: "asc" },
    })
    if (products.length === 0) return fallbackProducts
    return products.map(toProduct)
  } catch {
    return fallbackProducts
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const product = await db.product.findUnique({
      where: { slug },
      include: { variants: true },
    })
    if (!product || !product.active) {
      return fallbackProducts.find((p) => p.slug === slug) || null
    }
    return toProduct(product)
  } catch {
    return fallbackProducts.find((p) => p.slug === slug) || null
  }
}

export async function getProductSlugs(): Promise<string[]> {
  try {
    const products = await db.product.findMany({
      where: { active: true },
      select: { slug: true },
    })
    if (products.length === 0) return fallbackProducts.map((p) => p.slug)
    return products.map((p) => p.slug)
  } catch {
    return fallbackProducts.map((p) => p.slug)
  }
}

function toProduct(dbProduct: {
  id: string
  slug: string
  name: string
  material: string
  price: number
  image: string
  hoverImage: string
  images: string[]
  description: string
  details: string[]
  care: string[]
  variants: { size: string; stock: number }[]
}): Product {
  const stock = {} as Record<Size, number>
  for (const v of dbProduct.variants) {
    stock[v.size as Size] = v.stock
  }
  return {
    id: dbProduct.id,
    slug: dbProduct.slug,
    name: dbProduct.name,
    material: dbProduct.material,
    price: dbProduct.price / 100,
    currency: "$",
    image: dbProduct.image,
    hoverImage: dbProduct.hoverImage,
    images: dbProduct.images,
    description: dbProduct.description,
    details: dbProduct.details,
    care: dbProduct.care,
    stock,
  }
}
