import { ImageResponse } from "next/og"

async function loadGoogleFont(
  font: string,
  text: string,
  weight: number = 400
) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(
    text
  )}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (resource) {
    const response = await fetch(resource[1])
    if (response.status == 200) {
      return await response.arrayBuffer()
    }
  }

  throw new Error("failed to load font data")
}

export async function GET() {
  const text = "Bartosz Bak"

  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontFamily: "Geist",
            fontWeight: 600,
            color: "black",
          }}
        >
          {text}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Geist",
          data: await loadGoogleFont("Geist", text, 600),
          style: "normal",
          weight: 600,
        },
      ],
    }
  )
}
