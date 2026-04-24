import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Thank you for your BROOV order. Your premium silk underwear is on its way.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function OrderConfirmationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
