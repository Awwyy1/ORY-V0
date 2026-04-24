import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Statement } from "@/components/statement"
import { WhySilk } from "@/components/why-silk"
import { ProductGrid } from "@/components/product-grid"
import { Philosophy } from "@/components/philosophy"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { CartSidebar } from "@/components/cart-sidebar"
import { getAllProducts } from "@/lib/db/products"

export const revalidate = 60

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thebroov.com"

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BROOV",
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  description:
    "Premium 100% Grade 6A Mulberry silk underwear exclusively for men.",
  sameAs: [],
}

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "BROOV",
  url: siteUrl,
  description:
    "Luxury 100% pure silk underwear exclusively for men. The ultimate second skin.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
}

export default async function Home() {
  const products = await getAllProducts()

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <Header />
      <CartSidebar />
      <Hero />
      <Statement />
      <WhySilk />
      <ProductGrid products={products} />
      <Philosophy />
      <Newsletter />
      <Footer />
    </main>
  )
}
