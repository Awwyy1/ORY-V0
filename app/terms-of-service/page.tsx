"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Footer } from "@/components/footer"

export default function TermsOfServicePage() {
  return (
    <>
      <main className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-light text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft strokeWidth={1} className="w-4 h-4" />
            Back
          </Link>
          <Link href="/" className="flex-shrink-0">
            <span className="font-display text-xl md:text-2xl font-bold tracking-wide text-foreground">
              ORY
            </span>
          </Link>
          <div className="w-14" />
        </div>
      </div>

      <div className="max-w-[720px] mx-auto px-4 md:px-8 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-light tracking-wide text-foreground mb-2">
            Terms of Service
          </h1>
          <p className="text-xs font-light text-muted-foreground mb-12">
            Last updated: April 4, 2026
          </p>

          <div className="space-y-10 text-sm font-light text-muted-foreground leading-relaxed">
            {/* 1. Agreement */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                1. Agreement to Terms
              </h2>
              <p>
                By accessing or using the website{" "}
                <span className="text-foreground">www.orysilk.com</span> (the &ldquo;Site&rdquo;),
                operated by ORY (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), you
                agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not
                agree to these Terms, please do not use our Site.
              </p>
            </section>

            {/* 2. Eligibility */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                2. Eligibility
              </h2>
              <p>
                You must be at least 18 years old to use this Site or make a purchase. By using our
                Site, you represent and warrant that you are at least 18 years of age and have the
                legal capacity to enter into a binding agreement.
              </p>
            </section>

            {/* 3. Products & Pricing */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                3. Products &amp; Pricing
              </h2>
              <p className="mb-3">
                We make every effort to display product colors, materials, and descriptions as
                accurately as possible. However, we cannot guarantee that your device&apos;s display
                will accurately reflect the actual product. All product images are for illustration
                purposes.
              </p>
              <ul className="list-disc list-inside space-y-1.5 ml-1">
                <li>
                  Prices are displayed in your selected currency (USD, EUR, CHF, GBP, or BRL) and
                  are subject to change without notice.
                </li>
                <li>
                  Currency conversions are approximate and based on exchange rates at time of
                  display. You will be charged in USD at checkout.
                </li>
                <li>
                  We reserve the right to correct pricing errors. If an item is listed at an
                  incorrect price, we may cancel the order and issue a full refund.
                </li>
                <li>
                  Prices do not include applicable taxes or customs duties, which are the
                  buyer&apos;s responsibility for international orders.
                </li>
              </ul>
            </section>

            {/* 4. Orders & Payment */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                4. Orders &amp; Payment
              </h2>
              <ul className="list-disc list-inside space-y-1.5 ml-1">
                <li>
                  Placing an order constitutes an offer to purchase. We reserve the right to accept
                  or decline any order for any reason.
                </li>
                <li>
                  All payments are processed securely through Stripe. We accept major credit cards,
                  Apple Pay, and Google Pay.
                </li>
                <li>
                  Your order is confirmed only upon successful payment and receipt of an order
                  confirmation.
                </li>
                <li>
                  We reserve the right to limit order quantities or refuse orders that appear to be
                  placed for resale.
                </li>
              </ul>
            </section>

            {/* 5. Shipping & Delivery */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                5. Shipping &amp; Delivery
              </h2>
              <ul className="list-disc list-inside space-y-1.5 ml-1">
                <li>
                  We ship to select countries: United States, Canada, United Kingdom, Germany,
                  France, Switzerland, Austria, Netherlands, Belgium, Australia, Spain, Portugal, and
                  Brazil.
                </li>
                <li>
                  Shipping options include Standard (5–7 business days, free), Express (2–3 business
                  days, $12), and Overnight (1 business day, $25).
                </li>
                <li>
                  Delivery times are estimates and not guaranteed. We are not responsible for delays
                  caused by carriers, customs, or events beyond our control.
                </li>
                <li>
                  Risk of loss passes to you upon delivery to the carrier. Title passes upon
                  delivery to you.
                </li>
                <li>
                  International orders may be subject to customs duties and import taxes, which are
                  the buyer&apos;s responsibility.
                </li>
              </ul>
            </section>

            {/* 6. Returns & Refunds */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                6. Returns &amp; Refunds
              </h2>
              <ul className="list-disc list-inside space-y-1.5 ml-1">
                <li>
                  We accept returns within 30 days of delivery for unworn, unwashed items in their
                  original packaging.
                </li>
                <li>
                  Due to the intimate nature of our products, items that have been worn, washed, or
                  show signs of use cannot be returned for hygiene reasons.
                </li>
                <li>
                  To initiate a return, please contact us at{" "}
                  <a
                    href="mailto:support@orysilk.com"
                    className="text-foreground underline underline-offset-2 hover:text-foreground/80 transition-colors"
                  >
                    support@orysilk.com
                  </a>{" "}
                  with your order number.
                </li>
                <li>
                  Refunds will be processed to the original payment method within 10 business days of
                  receiving the returned item.
                </li>
                <li>
                  Return shipping costs are the buyer&apos;s responsibility unless the item is
                  defective or we made an error.
                </li>
              </ul>
            </section>

            {/* 7. Intellectual Property */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                7. Intellectual Property
              </h2>
              <p>
                All content on this Site — including text, images, graphics, logos, product designs,
                and software — is the property of ORY or its licensors and is protected by
                intellectual property laws. You may not reproduce, distribute, modify, or create
                derivative works from any content without our prior written consent.
              </p>
            </section>

            {/* 8. User Conduct */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                8. Prohibited Conduct
              </h2>
              <p className="mb-3">You agree not to:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-1">
                <li>Use the Site for any unlawful purpose or in violation of any applicable law.</li>
                <li>
                  Attempt to gain unauthorized access to any part of the Site, its servers, or
                  connected systems.
                </li>
                <li>
                  Interfere with or disrupt the Site&apos;s operation, including through automated
                  means (bots, scrapers).
                </li>
                <li>Provide false or misleading information during the checkout process.</li>
                <li>Purchase products for the purpose of unauthorized commercial resale.</li>
              </ul>
            </section>

            {/* 9. Disclaimer of Warranties */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                9. Disclaimer of Warranties
              </h2>
              <p>
                The Site and all products are provided &ldquo;as is&rdquo; and &ldquo;as
                available&rdquo; without warranties of any kind, either express or implied, including
                but not limited to implied warranties of merchantability, fitness for a particular
                purpose, and non-infringement. We do not warrant that the Site will be uninterrupted,
                error-free, or free of viruses or other harmful components.
              </p>
            </section>

            {/* 10. Limitation of Liability */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                10. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by law, ORY and its officers, directors, employees,
                and agents shall not be liable for any indirect, incidental, special, consequential,
                or punitive damages arising from or related to your use of the Site or purchase of
                our products. Our total liability for any claim shall not exceed the amount you paid
                for the specific product giving rise to the claim.
              </p>
            </section>

            {/* 11. Indemnification */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                11. Indemnification
              </h2>
              <p>
                You agree to indemnify and hold harmless ORY and its affiliates from any claims,
                damages, losses, or expenses (including reasonable legal fees) arising from your
                violation of these Terms or misuse of the Site.
              </p>
            </section>

            {/* 12. Governing Law */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                12. Governing Law &amp; Disputes
              </h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of the State of
                Delaware, United States, without regard to conflict of law principles. Any disputes
                arising under these Terms shall first be resolved through good-faith negotiation. If
                unresolved, disputes shall be submitted to binding arbitration in accordance with
                applicable rules, or you may bring a claim in the courts of Delaware.
              </p>
              <p className="mt-3">
                For EU residents: nothing in these Terms affects your statutory rights under
                applicable EU consumer protection laws. You may also have the right to bring
                proceedings in the courts of your country of residence.
              </p>
            </section>

            {/* 13. Third-Party Links */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                13. Third-Party Links
              </h2>
              <p>
                Our Site may contain links to third-party websites or services. We are not
                responsible for the content, privacy practices, or availability of those sites. Your
                use of third-party sites is at your own risk.
              </p>
            </section>

            {/* 14. Modifications */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                14. Modifications to These Terms
              </h2>
              <p>
                We reserve the right to update or modify these Terms at any time. Changes become
                effective when posted on this page. Your continued use of the Site after changes are
                posted constitutes acceptance of the updated Terms.
              </p>
            </section>

            {/* 15. Severability */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                15. Severability
              </h2>
              <p>
                If any provision of these Terms is found to be invalid or unenforceable, the
                remaining provisions shall continue in full force and effect.
              </p>
            </section>

            {/* 16. Contact */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                16. Contact Us
              </h2>
              <p>
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="mt-3 border border-border p-4">
                <p className="text-foreground font-normal">ORY</p>
                <p className="mt-1">
                  Email:{" "}
                  <a
                    href="mailto:support@orysilk.com"
                    className="text-foreground underline underline-offset-2 hover:text-foreground/80 transition-colors"
                  >
                    support@orysilk.com
                  </a>
                </p>
                <p className="mt-1">Website: www.orysilk.com</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
      <Footer />
    </>
  )
}
