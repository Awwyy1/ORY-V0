"use client"

type GtagEvent = {
  [key: string]: unknown
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(eventName: string, params?: GtagEvent) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params)
  }
}

export function trackViewItem(product: {
  slug: string
  name: string
  price: number
  material: string
}) {
  trackEvent("view_item", {
    currency: "USD",
    value: product.price,
    items: [
      {
        item_id: product.slug,
        item_name: product.name,
        price: product.price,
        item_brand: "BROOV",
        item_category: "Silk Underwear",
        item_variant: product.material,
      },
    ],
  })
}

export function trackAddToCart(product: {
  slug: string
  name: string
  price: number
  size: string
}) {
  trackEvent("add_to_cart", {
    currency: "USD",
    value: product.price,
    items: [
      {
        item_id: product.slug,
        item_name: product.name,
        price: product.price,
        quantity: 1,
        item_variant: product.size,
        item_brand: "BROOV",
        item_category: "Silk Underwear",
      },
    ],
  })
}

export function trackBeginCheckout(
  items: { slug: string; name: string; price: number; quantity: number; size: string }[],
  total: number
) {
  trackEvent("begin_checkout", {
    currency: "USD",
    value: total,
    items: items.map((item) => ({
      item_id: item.slug,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
      item_variant: item.size,
      item_brand: "BROOV",
      item_category: "Silk Underwear",
    })),
  })
}

export function trackPurchase(
  orderId: string,
  total: number,
  shipping: number
) {
  trackEvent("purchase", {
    transaction_id: orderId,
    currency: "USD",
    value: total,
    shipping,
  })
}
