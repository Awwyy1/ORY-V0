import type { Metadata } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://orysilk.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ORY | Premium Silk Underwear for Men',
    template: '%s | ORY',
  },
  description:
    'Luxury 100% Grade 6A Mulberry silk underwear exclusively for men. Thermoregulating, hypoallergenic, featherlight — the ultimate second skin. Free shipping on orders over $200.',
  keywords: [
    'silk underwear',
    'luxury mens underwear',
    'mulberry silk boxers',
    'premium boxer briefs',
    'silk boxer briefs men',
    'hypoallergenic underwear',
    'thermoregulating underwear',
    'ORY silk',
  ],
  authors: [{ name: 'ORY' }],
  creator: 'ORY',
  publisher: 'ORY',
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'ORY',
    title: 'ORY | Premium Silk Underwear for Men',
    description:
      'Luxury 100% Grade 6A Mulberry silk underwear exclusively for men. The ultimate second skin.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ORY — Premium Silk Underwear for Men',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ORY | Premium Silk Underwear for Men',
    description:
      'Luxury 100% Grade 6A Mulberry silk underwear exclusively for men. The ultimate second skin.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Outfit:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}");`}
          </Script>
        )}
      </body>
    </html>
  )
}
