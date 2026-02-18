import type { Metadata } from "next"

const BASE_URL = "https://ssr.bartoszbak.org"

export function articleMetadata(title: string, href: string): Metadata {
  const ogImageUrl = `${BASE_URL}/api/og?title=${encodeURIComponent(title)}`

  return {
    title: `${title} - Bartosz Bak`,
    description: `${title} — by Bartosz Bak`,
    openGraph: {
      title,
      description: `${title} — by Bartosz Bak`,
      url: `${BASE_URL}${href}`,
      siteName: "Bartosz Bak",
      locale: "en_US",
      type: "article",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - Bartosz Bak`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@nocdns",
      creator: "@nocdns",
      title,
      description: `${title} — by Bartosz Bak`,
      images: [ogImageUrl],
    },
  }
}
