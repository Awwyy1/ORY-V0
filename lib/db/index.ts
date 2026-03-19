// Prisma client singleton for Next.js
// Run `pnpm prisma generate` after setting DATABASE_URL in .env
// to generate the Prisma client before using this module.

// eslint-disable-next-line @typescript-eslint/no-require-imports
let PrismaClient: any

try {
  PrismaClient = require("@/lib/generated/prisma").PrismaClient
} catch {
  // Prisma client not generated yet — run `pnpm prisma generate`
}

const globalForPrisma = globalThis as unknown as {
  prisma: any | undefined
}

export const db = PrismaClient
  ? (globalForPrisma.prisma ?? new PrismaClient())
  : null

if (process.env.NODE_ENV !== "production" && db) {
  globalForPrisma.prisma = db
}
