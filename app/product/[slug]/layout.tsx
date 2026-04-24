import type { Metadata } from "next"
import { getProductBySlug, getProductSlugs } from "@/lib/db/products"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thebroov.com"

interface Props {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  const title = `${product.name} — ${product.material}`
  const description = product.description
  const url = `${siteUrl}/product/${product.slug}`
  const image = `${siteUrl}${product.image}`

  return {
    title,
    description,
    openGraph: {
      title: `${product.name} | BROOV`,
      description,
      url,
      type: "website",
      images: [
        {
          url: image,
          width: 800,
          height: 1067,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | BROOV`,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await getProductSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export default function ProductLayout({ children }: Props) {
  return children
}
