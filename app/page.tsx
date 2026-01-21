import type { Metadata } from "next"
import HomeDesktop from "@/components/home/HomeDesktop"
import HomeMobile from "@/components/home/HomeMobile"

// Force static generation - no SSR, instant loads, no cold starts
export const dynamic = "force-static"

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

// CSS-based responsive: both components render, CSS shows/hides
// This allows full static generation with no cold starts
export default function Page() {
  return (
    <>
      <div className="hidden md:block">
        <HomeDesktop />
      </div>
      <div className="md:hidden">
        <HomeMobile />
      </div>
    </>
  )
}
