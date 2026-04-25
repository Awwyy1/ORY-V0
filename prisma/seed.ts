import "dotenv/config"
import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "../lib/generated/prisma/client"

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
const db = new PrismaClient({ adapter })

const products = [
  {
    slug: "stealth",
    name: "BROOV STEALTH",
    material: "BLACK OBSIDIAN SILK",
    price: 11000,
    image: "/images/products/stealth.png",
    hoverImage: "/images/products/stealth-hover.png",
    images: ["/images/products/stealth.png", "/images/products/stealth-hover.png", "/images/products/stealth-1.png", "/images/products/stealth-2.png", "/images/products/stealth-3.png", "/images/products/stealth-4.png"],
    description:
      "Pure black obsidian silk boxer. Invisible under any clothing, engineered for zero friction and absolute comfort. The darkest expression of quiet luxury.",
    details: [
      "100% Grade 6A Mulberry Silk",
      "Invisible flat-lock stitching",
      "Zero-pressure waistband",
      "Anatomical 3D pouch construction",
      "Anti-roll leg openings",
      "Weight: 42g",
    ],
    care: [
      "Hand wash cold or machine wash on delicate cycle",
      "Use silk-specific or pH-neutral detergent",
      "Do not bleach or tumble dry",
      "Lay flat to dry away from direct sunlight",
      "Iron on low heat if needed (silk setting)",
    ],
    variants: [
      { size: "S" as const, stock: 8 },
      { size: "M" as const, stock: 12 },
      { size: "L" as const, stock: 6 },
      { size: "XL" as const, stock: 3 },
      { size: "XXL" as const, stock: 2 },
    ],
  },
  {
    slug: "carbon",
    name: "BROOV CARBON",
    material: "MATTE GREY FUSION",
    price: 11000,
    image: "/images/products/carbon.png",
    hoverImage: "/images/products/carbon-hover.png",
    images: ["/images/products/carbon.png", "/images/products/carbon-hover.png", "/images/products/carbon-1.png", "/images/products/carbon-2.png", "/images/products/carbon-3.png"],
    description:
      "Matte grey fusion silk boxer with carbon-tone finish. A refined neutral that pairs with everything. Engineered for those who demand both form and function.",
    details: [
      "100% Grade 6A Mulberry Silk",
      "Invisible flat-lock stitching",
      "Zero-pressure waistband",
      "Anatomical 3D pouch construction",
      "Anti-roll leg openings",
      "Weight: 42g",
    ],
    care: [
      "Hand wash cold or machine wash on delicate cycle",
      "Use silk-specific or pH-neutral detergent",
      "Do not bleach or tumble dry",
      "Lay flat to dry away from direct sunlight",
      "Iron on low heat if needed (silk setting)",
    ],
    variants: [
      { size: "S" as const, stock: 5 },
      { size: "M" as const, stock: 10 },
      { size: "L" as const, stock: 7 },
      { size: "XL" as const, stock: 4 },
      { size: "XXL" as const, stock: 1 },
    ],
  },
  {
    slug: "ice",
    name: "BROOV ICE",
    material: "COLD SILVER WEAVE",
    price: 11000,
    image: "/images/products/ice.png",
    hoverImage: "/images/products/ice-hover.png",
    images: ["/images/products/ice.png", "/images/products/ice-hover.png"],
    description:
      "Cold silver weave silk boxer with a subtle metallic sheen. Thermoregulating properties keep you cool when it matters. The lightest touch against your skin.",
    details: [
      "100% Grade 6A Mulberry Silk",
      "Invisible flat-lock stitching",
      "Zero-pressure waistband",
      "Anatomical 3D pouch construction",
      "Anti-roll leg openings",
      "Weight: 42g",
    ],
    care: [
      "Hand wash cold or machine wash on delicate cycle",
      "Use silk-specific or pH-neutral detergent",
      "Do not bleach or tumble dry",
      "Lay flat to dry away from direct sunlight",
      "Iron on low heat if needed (silk setting)",
    ],
    variants: [
      { size: "S" as const, stock: 3 },
      { size: "M" as const, stock: 9 },
      { size: "L" as const, stock: 11 },
      { size: "XL" as const, stock: 6 },
      { size: "XXL" as const, stock: 0 },
    ],
  },
  {
    slug: "midnight",
    name: "BROOV MIDNIGHT",
    material: "ROYAL DEEP BLUE",
    price: 11000,
    image: "/images/products/midnight.png",
    hoverImage: "/images/products/midnight-hover.png",
    images: ["/images/products/midnight.png", "/images/products/midnight-hover.png"],
    description:
      "Royal deep blue silk boxer — our flagship piece. The deepest indigo meets the finest 6A Mulberry silk. For moments that demand your absolute best.",
    details: [
      "100% Grade 6A Mulberry Silk",
      "Invisible flat-lock stitching",
      "Zero-pressure waistband",
      "Anatomical 3D pouch construction",
      "Anti-roll leg openings",
      "Weight: 42g",
      "Premium indigo dye — colorfast guaranteed",
    ],
    care: [
      "Hand wash cold or machine wash on delicate cycle",
      "Use silk-specific or pH-neutral detergent",
      "Do not bleach or tumble dry",
      "Lay flat to dry away from direct sunlight",
      "Iron on low heat if needed (silk setting)",
      "Wash separately for first 2–3 washes",
    ],
    variants: [
      { size: "S" as const, stock: 2 },
      { size: "M" as const, stock: 7 },
      { size: "L" as const, stock: 5 },
      { size: "XL" as const, stock: 3 },
      { size: "XXL" as const, stock: 1 },
    ],
  },
]

async function main() {
  console.log("Seeding database...")

  for (const product of products) {
    const { variants, ...productData } = product

    const created = await db.product.upsert({
      where: { slug: product.slug },
      update: productData,
      create: productData,
    })

    for (const variant of variants) {
      await db.productVariant.upsert({
        where: {
          productId_size: {
            productId: created.id,
            size: variant.size,
          },
        },
        update: { stock: variant.stock },
        create: {
          productId: created.id,
          size: variant.size,
          stock: variant.stock,
        },
      })
    }

    console.log(`  ✓ ${created.name} (${variants.length} variants)`)
  }

  console.log("\nDone! Seeded", products.length, "products.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
