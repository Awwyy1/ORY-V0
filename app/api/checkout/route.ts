import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { getProductBySlug } from "@/lib/db/products"

interface CartItem {
  slug: string
  name: string
  size: string
  quantity: number
  price: number
  image: string
}

interface CheckoutBody {
  items: CartItem[]
  shippingMethod: string
  shippingCost: number
  shippingInfo: {
    email: string
    firstName: string
    lastName: string
    phone?: string
    address: string
    apartment: string
    city: string
    state: string
    zip: string
    country: string
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutBody = await req.json()
    const { items, shippingMethod, shippingCost, shippingInfo } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thebroov.com"

    // Build line items from cart — verify prices from our product data
    const lineItems = await Promise.all(
      items.map(async (item) => {
        const product = await getProductBySlug(item.slug)
        // Use server-side price (not client-sent) to prevent manipulation
        const unitPrice = product ? product.price : item.price

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              description: `Size: ${item.size}`,
              images: [`${siteUrl}${item.image}`],
            },
            unit_amount: Math.round(unitPrice * 100), // Stripe uses cents
          },
          quantity: item.quantity,
        }
      })
    )

    // Add shipping as a line item if not free
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: `Shipping — ${shippingMethod}`,
            description: shippingMethod === "express" ? "2–3 business days" : "Next business day",
            images: [],
          },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      })
    }

    // Encode items as metadata for webhook to create order
    const itemsMeta = items.map((i) => ({
      slug: i.slug,
      size: i.size,
      qty: i.quantity,
    }))

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      customer_email: shippingInfo.email,
      metadata: {
        shippingMethod,
        shippingCost: String(shippingCost),
        customerFirstName: shippingInfo.firstName,
        customerLastName: shippingInfo.lastName,
        phone: shippingInfo.phone || "",
        address: shippingInfo.address,
        apartment: shippingInfo.apartment || "",
        city: shippingInfo.city,
        state: shippingInfo.state,
        zip: shippingInfo.zip,
        country: shippingInfo.country || "US",
        items: JSON.stringify(itemsMeta),
      },
      success_url: `${siteUrl}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    )
  }
}
