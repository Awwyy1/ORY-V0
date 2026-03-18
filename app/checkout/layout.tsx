import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your ORY order — secure checkout with free shipping on orders over $200.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
