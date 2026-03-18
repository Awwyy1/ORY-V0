import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Statement } from "@/components/statement"
import { WhySilk } from "@/components/why-silk"
import { ProductGrid } from "@/components/product-grid"
import { Philosophy } from "@/components/philosophy"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { CartSidebar } from "@/components/cart-sidebar"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <CartSidebar />
      <Hero />
      <Statement />
      <WhySilk />
      <ProductGrid />
      <Philosophy />
      <Newsletter />
      <Footer />
    </main>
  )
}
