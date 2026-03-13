"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 md:py-20 px-8 lg:px-12 bg-[#FAFAFA] border-t border-[#E5E5E5]"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-display text-xl font-bold tracking-wide text-[#1A1A1A]">
              ORY
            </span>
            <p className="mt-4 text-xs font-light text-[#666] leading-relaxed max-w-xs">
              Premium 100% pure silk underwear, crafted exclusively for men who appreciate the finest things in life.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-normal text-[#1A1A1A] tracking-widest uppercase mb-6">
              Shop
            </h4>
            <ul className="space-y-3">
              {["New Arrivals", "Boxer Briefs", "Trunks", "Lounge Shorts"].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-xs font-light text-[#666] hover:text-[#1A1A1A] transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-xs font-normal text-[#1A1A1A] tracking-widest uppercase mb-6">
              About
            </h4>
            <ul className="space-y-3">
              {["Our Story", "The Heritage", "Sustainability", "Press"].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-xs font-light text-[#666] hover:text-[#1A1A1A] transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-normal text-[#1A1A1A] tracking-widest uppercase mb-6">
              Support
            </h4>
            <ul className="space-y-3">
              {["Contact", "Shipping & Returns", "Size Guide", "Care Instructions"].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-xs font-light text-[#666] hover:text-[#1A1A1A] transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#E5E5E5] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-light text-[#666]">
            © 2026 ORY. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((item) => (
              <a 
                key={item}
                href="#" 
                className="text-xs font-light text-[#666] hover:text-[#1A1A1A] transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
