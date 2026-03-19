import type { MetadataRoute } from "next"
import { products } from "@/lib/products"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://v0-ory-v0.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
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
