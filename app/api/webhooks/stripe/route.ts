import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { db } from "@/lib/db"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    )
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object
      try {
        await handleCheckoutCompleted(session)
      } catch (error) {
        console.error("Failed to process order:", error)
      }
      break
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object
      console.log("Payment failed:", paymentIntent.id)
      break
    }

    default:
      console.log("Unhandled event:", event.type)
  }

  return NextResponse.json({ received: true })
}

async function handleCheckoutCompleted(session: {
  id: string
  customer_email?: string | null
  amount_total?: number | null
  metadata?: Record<string, string> | null
  payment_intent?: string | { id: string } | null
  currency?: string | null
}) {
  const meta = session.metadata || {}

  const email = session.customer_email
  if (!email) {
    console.error("No customer email in session:", session.id)
    return
  }

  const firstName = meta.customerFirstName || ""
  const lastName = meta.customerLastName || ""
  const phone = meta.phone || null

  // Find or create customer
  const customer = await db.customer.upsert({
    where: { email },
    update: { firstName, lastName, phone },
    create: { email, firstName, lastName, phone },
  })

  // Create address
  const address = await db.address.create({
    data: {
      customerId: customer.id,
      address: meta.address || "",
      apartment: meta.apartment || "",
      city: meta.city || "",
      state: meta.state || "",
      zip: meta.zip || "",
      country: meta.country || "US",
    },
  })

  // Parse items from metadata
  let items: { slug: string; size: string; qty: number }[] = []
  try {
    items = JSON.parse(meta.items || "[]")
  } catch {
    console.error("Failed to parse items metadata:", meta.items)
    return
  }

  // Generate order number
  const orderNumber = `BRV-${session.id.slice(-8).toUpperCase()}`

  // Get payment intent ID
  const paymentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id || null

  const shippingCost = Math.round(Number(meta.shippingCost || 0) * 100)
  const total = session.amount_total || 0
  const subtotal = total - shippingCost

  // Create order with items
  const order = await db.order.create({
    data: {
      orderNumber,
      customerId: customer.id,
      addressId: address.id,
      status: "PAID",
      subtotal,
      shippingCost,
      total,
      currency: session.currency || "usd",
      shippingMethod: meta.shippingMethod || "standard",
      stripePaymentId: paymentId,
      items: {
        create: await Promise.all(
          items.map(async (item) => {
            // Find the product and variant
            const product = await db.product.findUnique({
              where: { slug: item.slug },
              include: { variants: true },
            })

            if (!product) {
              throw new Error(`Product not found: ${item.slug}`)
            }

            const variant = product.variants.find(
              (v) => v.size === item.size
            )

            if (!variant) {
              throw new Error(
                `Variant not found: ${item.slug} size ${item.size}`
              )
            }

            // Decrease stock
            await db.productVariant.update({
              where: { id: variant.id },
              data: { stock: { decrement: item.qty } },
            })

            return {
              productId: product.id,
              variantId: variant.id,
              quantity: item.qty,
              unitPrice: product.price,
              total: product.price * item.qty,
            }
          })
        ),
      },
    },
  })

  console.log(
    `Order created: ${order.orderNumber} for ${email} — $${(total / 100).toFixed(2)}`
  )
}
