import type { MetadataRoute } from "next"
import { getAllProducts } from "@/lib/db/products"

export const dynamic = "force-dynamic"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://orysilk.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts()

  const productPages = products.map((product) => ({
    url: `${siteUrl}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...productPages,
  ]
}
