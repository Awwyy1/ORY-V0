import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"
export const runtime = "edge"

export default async function Icon() {
  let fonts: { name: string; data: ArrayBuffer; weight: 700; style: "normal" }[] = []

  try {
    const fontData = await fetch(
      "https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1O4a0Ew.woff"
    ).then((res) => res.arrayBuffer())
    fonts = [{ name: "Outfit", data: fontData, weight: 700, style: "normal" }]
  } catch {
    // Fallback to system font if fetch fails
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          borderRadius: 6,
          color: "#fafafa",
          fontSize: 15,
          fontWeight: 700,
          fontFamily: fonts.length ? "Outfit" : "Arial, Helvetica, sans-serif",
          letterSpacing: "0.5px",
        }}
      >
        ORY
      </div>
    ),
    { ...size, fonts }
  )
}
