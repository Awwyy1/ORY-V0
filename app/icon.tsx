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
        {/* Shopping bag */}
        <svg
          width="24"
          height="26"
          viewBox="0 0 24 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Bag body */}
          <path
            d="M3 8H21V23C21 24.1 20.1 25 19 25H5C3.9 25 3 24.1 3 23V8Z"
            fill="white"
            stroke="#1a1a1a"
            stroke-width="1.8"
          />
          {/* Bag handle */}
          <path
            d="M8 8V6C8 3.8 9.8 2 12 2C14.2 2 16 3.8 16 6V8"
            fill="none"
            stroke="#1a1a1a"
            stroke-width="1.8"
            stroke-linecap="round"
          />
        </svg>
        {/* Badge with number 2 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
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
