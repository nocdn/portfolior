import type { Metadata } from "next"
import {
  Geist,
  Geist_Mono,
  Inter,
  IBM_Plex_Mono,
  JetBrains_Mono,
} from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"

const openRunde = localFont({
  src: [
    {
      path: "../public/fonts/OpenRunde-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/OpenRunde-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/OpenRunde-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-open-runde",
  display: "swap",
})

const switzer = localFont({
  src: "../public/fonts/Switzer-Medium.woff2",
  variable: "--font-switzer",
  display: "swap",
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Bartosz Bak",
  description: "Frontend Engineer",
  icons: {
    icon: "/favicon.ico",
  },
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
  alternates: {
    canonical: "https://bartoszbak.org",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Bartosz Bak",
              alternateName: ["Bartek Bak", "nocdn"],
              url: "https://bartoszbak.org",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Bartosz Bak",
              alternateName: "Bartek",
              url: "https://bartoszbak.org",
              jobTitle: "Frontend Engineer",
              sameAs: [
                "https://twitter.com/nocdns",
                "https://github.com/nocdn",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${ibmPlexMono.variable} ${openRunde.variable} ${jetBrainsMono.variable} ${switzer.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
