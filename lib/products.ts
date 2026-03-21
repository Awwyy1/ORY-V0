export type Size = "S" | "M" | "L" | "XL" | "XXL"

export interface Product {
  id: string
  slug: string
  name: string
  material: string
  price: number
  currency: string
  image: string
  hoverImage: string
  images: string[]
  description: string
  details: string[]
  care: string[]
  stock: Record<Size, number>
}

export const sizes: Size[] = ["S", "M", "L", "XL", "XXL"]

export const sizeGuide = {
  columns: ["Size", "Waist (cm)", "Waist (in)", "Hip (cm)"],
  rows: [
    ["S", "72–80", "28–31", "88–96"],
    ["M", "80–88", "31–35", "96–104"],
    ["L", "88–96", "35–38", "104–112"],
    ["XL", "96–104", "38–41", "112–120"],
    ["XXL", "104–112", "41–44", "120–128"],
  ],
}

export function getStockLabel(count: number): string {
  if (count === 0) return "Out of Stock"
  if (count <= 3) return `Only ${count} left`
  return "In Stock"
}

export function getStockColor(count: number): string {
  if (count === 0) return "text-red-500"
  if (count <= 3) return "text-amber-600"
  return "text-emerald-600"
}
