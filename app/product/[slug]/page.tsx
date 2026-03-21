import { notFound } from "next/navigation"
import { getProductBySlug, getAllProducts } from "@/lib/db/products"
import { ProductClient } from "./product-client"

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const allProducts = await getAllProducts()
  const otherProducts = allProducts.filter((p) => p.id !== product.id)

  return <ProductClient product={product} otherProducts={otherProducts} />
}
