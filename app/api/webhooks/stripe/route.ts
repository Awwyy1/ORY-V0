import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"

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
      console.log("Payment successful:", session.id)
      console.log("Customer:", session.customer_email)
      console.log("Amount:", session.amount_total)
      console.log("Metadata:", session.metadata)
      // TODO: Save order to database, send confirmation email
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
