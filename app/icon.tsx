import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"
export const runtime = "edge"

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
          position: "relative",
        }}
      >
        {/* Lucide ShoppingBag icon - exact same as on site */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1a1a1a"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M16 10a4 4 0 0 1-8 0" />
          <path d="M3.103 6.034h17.794" />
          <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
        </svg>
        {/* Badge with number 2 */}
        <div
          style={{
            position: "absolute",
            top: "-1px",
            right: "-1px",
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            backgroundColor: "#1a1a1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "9px",
            fontWeight: 700,
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          2
        </div>
      </div>
    ),
    { ...size }
  )
}
