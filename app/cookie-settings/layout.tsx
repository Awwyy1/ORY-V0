import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Settings",
  description: "BROOV Cookie Settings — manage your cookie preferences and learn about the cookies we use.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function CookieSettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
