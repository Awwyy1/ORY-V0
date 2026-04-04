"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
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
            Privacy Policy
          </h1>
          <p className="text-xs font-light text-muted-foreground mb-12">
            Last updated: April 4, 2026
          </p>

          <div className="space-y-10 text-sm font-light text-muted-foreground leading-relaxed">
            {/* 1. Introduction */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                1. Introduction
              </h2>
              <p>
                ORY (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the website{" "}
                <span className="text-foreground">www.orysilk.com</span> (the
                &ldquo;Site&rdquo;). This Privacy Policy explains how we collect, use, disclose,
                and safeguard your personal information when you visit our Site or make a purchase.
                By using our Site, you consent to the practices described in this policy.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                2. Information We Collect
              </h2>

              <h3 className="text-xs font-normal text-foreground mt-4 mb-2">
                2.1 Information You Provide
              </h3>
              <ul className="list-disc list-inside space-y-1.5 ml-1">
                <li>
                  <span className="text-foreground">Contact &amp; shipping information:</span> name,
                  email address, phone number (optional), and shipping address when you place an
                  order.
                </li>
                <li>
                  <span className="text-foreground">Payment information:</span> credit/debit card
                  details are collected and processed exclusively by our payment processor, Stripe.
                  We do not store your full card number on our servers.
                </li>
                <li>
                  <span className="text-foreground">Newsletter subscription:</span> email address
                  when you subscribe to our mailing list.
                </li>
                <li>
                  <span className="text-foreground">Communications:</span> any information you
                  provide when contacting us via email at support@orysilk.com.
                </li>
              </ul>

              <h3 className="text-xs font-normal text-foreground mt-4 mb-2">
                2.2 Information Collected Automatically
              </h3>
              <ul className="list-disc list-inside space-y-1.5 ml-1">
                <li>
                  <span className="text-foreground">Device &amp; usage data:</span> IP address,
                  browser type, operating system, referring URLs, pages viewed, and time spent on
                  pages — collected via Google Analytics 4 and Vercel Analytics.
                </li>
                <li>
                  <span className="text-foreground">Behavioral data:</span> session recordings,
                  heatmaps, and click patterns — collected via Microsoft Clarity.
                </li>
                <li>
                  <span className="text-foreground">Local storage data:</span> shopping cart
                  contents, language/currency preferences, and cookie consent status — stored locally
                  on your device and not transmitted to our servers.
                </li>
              </ul>
            </section>

            {/* 3. How We Use Your Information */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                3. How We Use Your Information
              </h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-1">
                <li>Process and fulfill your orders, including shipping and delivery.</li>
                <li>Send order confirmations and shipping updates.</li>
                <li>Respond to your inquiries and provide customer support.</li>
                <li>Send marketing communications if you have opted in (you may unsubscribe at any time).</li>
                <li>Analyze Site usage to improve our products, content, and user experience.</li>
                <li>Detect and prevent fraud or unauthorized transactions.</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </section>

            {/* 4. Third-Party Services */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                4. Third-Party Service Providers
              </h2>
              <p className="mb-3">
                We share your information only with trusted third parties who assist us in operating
                our business:
              </p>
              <ul className="list-disc list-inside space-y-1.5 ml-1">
                <li>
                  <span className="text-foreground">Stripe</span> — payment processing. Stripe
                  processes your payment data under its own privacy policy and is PCI DSS compliant.
                </li>
                <li>
                  <span className="text-foreground">Google Analytics 4</span> — website analytics
                  and e-commerce event tracking (page views, purchases, cart activity).
                </li>
                <li>
                  <span className="text-foreground">Microsoft Clarity</span> — session recording and
                  heatmap analytics for UX improvement.
                </li>
                <li>
                  <span className="text-foreground">Vercel</span> — website hosting and performance
                  analytics.
                </li>
                <li>
                  <span className="text-foreground">Neon</span> — secure cloud database hosting for
                  order and customer records.
                </li>
              </ul>
              <p className="mt-3">
                We do not sell, rent, or trade your personal information to third parties for their
                marketing purposes.
              </p>
            </section>

            {/* 5. Cookies & Tracking */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                5. Cookies &amp; Tracking Technologies
              </h2>
              <p>
                We use cookies and similar technologies to analyze traffic, personalize content, and
                improve your experience. You can manage your cookie preferences at any time via
                our{" "}
                <Link
                  href="/cookie-settings"
                  className="text-foreground underline underline-offset-2 hover:text-foreground/80 transition-colors"
                >
                  Cookie Settings
                </Link>{" "}
                page. For full details on the cookies we use, please see that page.
              </p>
            </section>

            {/* 6. Data Retention */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                6. Data Retention
              </h2>
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes
                described in this policy, including to satisfy legal, accounting, or reporting
                obligations. Order records are retained for a minimum of 5 years for tax and
                compliance purposes. You may request deletion of your personal data at any time by
                contacting us (see Section 10).
              </p>
            </section>

            {/* 7. Data Security */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                7. Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures to protect your
                personal information, including SSL/TLS encryption for all data in transit, secure
                cloud infrastructure, and restricted access controls. Payment card data is handled
                entirely by Stripe and never touches our servers. However, no method of transmission
                over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* 8. International Transfers */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                8. International Data Transfers
              </h2>
              <p>
                We operate globally and ship to multiple countries. Your personal data may be
                transferred to and processed in countries outside of your own, including the United
                States, where our service providers are located. We ensure that such transfers are
                carried out in compliance with applicable data protection laws using appropriate
                safeguards such as Standard Contractual Clauses (SCCs) where required.
              </p>
            </section>

            {/* 9. Your Rights */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                9. Your Rights
              </h2>
              <p className="mb-3">
                Depending on your location, you may have the following rights regarding your personal
                data:
              </p>

              <h3 className="text-xs font-normal text-foreground mt-4 mb-2">
                European Economic Area, UK &amp; Switzerland (GDPR / UK GDPR)
              </h3>
              <ul className="list-disc list-inside space-y-1.5 ml-1">
                <li>Right to access, rectify, or erase your personal data.</li>
                <li>Right to restrict or object to processing.</li>
                <li>Right to data portability.</li>
                <li>Right to withdraw consent at any time.</li>
                <li>Right to lodge a complaint with your local data protection authority.</li>
              </ul>

              <h3 className="text-xs font-normal text-foreground mt-4 mb-2">
                California (CCPA / CPRA)
              </h3>
              <ul className="list-disc list-inside space-y-1.5 ml-1">
                <li>Right to know what personal information we collect and how it is used.</li>
                <li>Right to request deletion of your personal information.</li>
                <li>Right to opt out of the sale or sharing of personal information (we do not sell your data).</li>
                <li>Right to non-discrimination for exercising your privacy rights.</li>
              </ul>

              <h3 className="text-xs font-normal text-foreground mt-4 mb-2">
                Brazil (LGPD)
              </h3>
              <ul className="list-disc list-inside space-y-1.5 ml-1">
                <li>Right to confirmation and access to your personal data.</li>
                <li>Right to correction, anonymization, blocking, or deletion of unnecessary data.</li>
                <li>Right to data portability.</li>
                <li>Right to revoke consent.</li>
              </ul>

              <h3 className="text-xs font-normal text-foreground mt-4 mb-2">
                Australia (Privacy Act)
              </h3>
              <ul className="list-disc list-inside space-y-1.5 ml-1">
                <li>Right to access and correct your personal information.</li>
                <li>Right to complain about a breach of the Australian Privacy Principles.</li>
              </ul>

              <h3 className="text-xs font-normal text-foreground mt-4 mb-2">
                Canada (PIPEDA)
              </h3>
              <ul className="list-disc list-inside space-y-1.5 ml-1">
                <li>Right to access and challenge the accuracy of your personal information.</li>
                <li>Right to withdraw consent, subject to legal or contractual restrictions.</li>
              </ul>

              <p className="mt-4">
                To exercise any of these rights, please contact us at{" "}
                <a
                  href="mailto:support@orysilk.com"
                  className="text-foreground underline underline-offset-2 hover:text-foreground/80 transition-colors"
                >
                  support@orysilk.com
                </a>
                . We will respond within 30 days (or sooner where required by law).
              </p>
            </section>

            {/* 10. Children's Privacy */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                10. Children&apos;s Privacy
              </h2>
              <p>
                Our Site is not intended for individuals under the age of 18. We do not knowingly
                collect personal information from children. If you believe a child has provided us
                with personal data, please contact us and we will promptly delete it.
              </p>
            </section>

            {/* 11. Changes */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                11. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on
                this page with an updated &ldquo;Last updated&rdquo; date. We encourage you to
                review this policy periodically.
              </p>
            </section>

            {/* 12. Contact */}
            <section>
              <h2 className="text-sm font-normal text-foreground tracking-wide uppercase mb-3">
                12. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy or wish to exercise your data
                rights, please contact us:
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
  )
}
