import type { Metadata } from "next"
import { getProductBySlug, products } from "@/lib/products"

interface Props {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  const title = `${product.name} — ${product.material}`
  const description = product.description
  const url = `https://oryfor.men/product/${product.slug}`
  const image = `https://oryfor.men${product.image}`

  return {
    title,
    description,
    openGraph: {
      title: `${product.name} | ORY`,
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
      title: `${product.name} | ORY`,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  }
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export default function ProductLayout({ children }: Props) {
  return children
}
