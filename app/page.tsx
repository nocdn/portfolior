import { headers } from "next/headers"
import HomeClient from "@/components/HomeClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bartosz Bak",
  description: "Frontend Engineer",
  openGraph: {
    title: "Bartosz Bak",
    description: "Frontend Engineer",
    url: "https://bartoszbak.org",
    siteName: "Bartosz Bak",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://bartoszbak.org/og.png",
        width: 1200,
        height: 630,
        alt: "Bartosz Bak — Frontend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@nocdns",
    creator: "@nocdns",
    title: "Bartosz Bak",
    description: "Frontend Engineer",
    images: ["https://bartoszbak.org/og.png"],
  },
}

function isProbablyMobile(userAgent: string): boolean {
  if (!userAgent) return false
  return /Mobile|Android|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini|Silk|Kindle|webOS|Windows Phone|Tablet/i.test(
    userAgent
  )
}

export default async function Page() {
  const headersList = await headers()
  const userAgent = headersList.get("user-agent") || ""
  const initialIsMobile = isProbablyMobile(userAgent)
  return <HomeClient initialIsMobile={initialIsMobile} />
}
