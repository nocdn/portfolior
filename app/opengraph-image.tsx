import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const alt = "Bartosz Bak - Design Engineer"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image() {
  const overusedGroteskData = await readFile(
    join(process.cwd(), "app/fonts/OverusedGrotesk-SemiBold.otf")
  )
  const ioskeleyMonoBoldData = await readFile(
    join(process.cwd(), "app/fonts/IoskeleyMono-Bold.ttf")
  )

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
        padding: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#3257D1",
          padding: "16px 40px 32px 40px",
          boxShadow:
            "0px 0px 0px 1px rgba(0, 0, 0, 0.06), 0px 1px 2px -1px rgba(0, 0, 0, 0.06), 0px 2px 4px 0px rgba(0, 0, 0, 0.04)",
        }}
      >
        {/* BARTOSZ */}
        <div
          style={{
            display: "flex",
            fontFamily: "OverusedGrotesk",
            fontSize: 144,
            fontWeight: 600,
            letterSpacing: "0.03em",
            color: "#FEF5E2",
            lineHeight: 1,
          }}
        >
          BARTOSZ
        </div>

        {/* BAK */}
        <div
          style={{
            display: "flex",
            width: "100%",
            fontFamily: "OverusedGrotesk",
            fontSize: 144,
            fontWeight: 600,
            letterSpacing: "0.03em",
            color: "#FEF5E2",
            lineHeight: 1,
          }}
        >
          BAK
        </div>

        {/* DESIGN - right aligned */}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            fontFamily: "IoskeleyMono",
            fontSize: 144,
            fontWeight: 700,
            color: "#FEF5E2",
            lineHeight: 1,
          }}
        >
          DESIGN
        </div>

        {/* Bottom row: UOY STUDENT + ENGINEER */}
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          {/* UOY STUDENT */}
          <div
            style={{
              display: "flex",
              fontFamily: "IoskeleyMono",
              fontSize: 40,
              fontWeight: 700,
              color: "#FEF5E2",
              opacity: 0.7,
              marginBottom: 8,
              marginLeft: 8,
            }}
          >
            UOY STUDENT
          </div>

          {/* ENGINEER */}
          <div
            style={{
              display: "flex",
              fontFamily: "IoskeleyMono",
              fontSize: 144,
              fontWeight: 700,
              color: "#FEF5E2",
              lineHeight: 1,
            }}
          >
            ENGINEER
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "OverusedGrotesk",
          data: overusedGroteskData,
          style: "normal",
          weight: 600,
        },
        {
          name: "IoskeleyMono",
          data: ioskeleyMonoBoldData,
          style: "normal",
          weight: 700,
        },
      ],
    }
  )
}
