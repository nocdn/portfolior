import type { Metadata } from "next"
import HomeDesktop from "@/components/home/HomeDesktop"
import HomeMobile from "@/components/home/HomeMobile"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Bartosz Bak",
  description: "Aspiring design engineer based in the UK",
  openGraph: {
    title: "Bartosz Bak",
    description: "Aspiring design engineer based in the UK",
    url: "https://bartoszbak.org",
    siteName: "Bartosz Bak",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://bartoszbak.org/og.png",
        width: 1200,
        height: 630,
        alt: "Bartosz Bak - Design Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@nocdns",
    creator: "@nocdns",
    title: "Bartosz Bak",
    description: "Aspiring design engineer based in the UK",
    images: ["https://bartoszbak.org/og.png"],
  },
}

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
