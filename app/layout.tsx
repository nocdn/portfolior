import { ThemeScript } from "@/components/ThemeScript"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter, JetBrains_Mono } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
})

const ioskeleyMono = localFont({
  src: "./fonts/IoskeleyMono-Regular.woff2",
  variable: "--font-ioskeley-mono",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
})

const switzer = localFont({
  src: "./fonts/Switzer-Medium.woff2",
  variable: "--font-switzer",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
})

const ppNeueMontreal = localFont({
  src: "./fonts/PPNeueMontreal-Medium.woff2",
  variable: "--font-pp-neue-montreal",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
})

const isDevelopment = process.env.NODE_ENV === "development"
const DEFAULT_SITE_URL = "https://bartoszbak.org"
const LOCALHOST_URL = "http://localhost:3000"

function getMetadataBase(): URL {
  const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (envSiteUrl) {
    try {
      return new URL(envSiteUrl)
    } catch {
      // Ignore invalid env values and use a safe fallback.
    }
  }

  return new URL(isDevelopment ? LOCALHOST_URL : DEFAULT_SITE_URL)
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: isDevelopment ? "Bartosz Bak (dev)" : "Bartosz Bak",
  description: "Aspiring design engineer based in the UK",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Bartosz Bak",
    description: "Aspiring design engineer based in the UK",
    url: "https://bartoszbak.org",
    siteName: "Bartosz Bak",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://ssr.bartoszbak.org/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Bartosz Bak - Aspiring design engineer based in the UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@nocdns",
    creator: "@nocdns",
    title: "Bartosz Bak",
    description: "Aspiring design engineer based in the UK",
    images: ["https://ssr.bartoszbak.org/opengraph-image"],
  },
  alternates: {
    canonical: "https://bartoszbak.org",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Bartosz Bak",
    url: "https://bartoszbak.org",
    description: "Aspiring design engineer based in the UK",
    image: "https://ssr.bartoszbak.org/opengraph-image",
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${jetBrainsMono.variable} ${ioskeleyMono.variable} ${switzer.variable} ${ppNeueMontreal.variable} bg-background`}
      >
        {children}
      </body>
    </html>
  )
}
