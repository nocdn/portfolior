import { headers } from "next/headers"
import type { Metadata } from "next"
import HomeDesktop from "@/components/home/HomeDesktop"
import HomeMobile from "@/components/home/HomeMobile"

export async function generateMetadata(): Promise<Metadata> {
  return {
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
  const isMobile = isProbablyMobile(userAgent)

  // Server-side routing: only ship JS for the relevant layout
  return isMobile ? <HomeMobile /> : <HomeDesktop />
}
