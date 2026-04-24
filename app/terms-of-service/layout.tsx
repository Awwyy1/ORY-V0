import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "BROOV Terms of Service — the terms and conditions governing your use of thebroov.com.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
