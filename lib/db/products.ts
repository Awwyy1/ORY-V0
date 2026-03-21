import { db } from "./index"
import type { Product, Size } from "@/lib/products"

export async function getAllProducts(): Promise<Product[]> {
  const products = await db.product.findMany({
    where: { active: true },
    include: { variants: true },
    orderBy: { createdAt: "asc" },
  })
  return products.map(toProduct)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = await db.product.findUnique({
    where: { slug },
    include: { variants: true },
  })
  if (!product || !product.active) return null
  return toProduct(product)
}

export async function getProductSlugs(): Promise<string[]> {
  const products = await db.product.findMany({
    where: { active: true },
    select: { slug: true },
  })
  return products.map((p) => p.slug)
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
