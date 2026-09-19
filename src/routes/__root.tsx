import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router"
import type { ReactNode } from "react"
import { ThemeScript } from "@/components/ThemeScript"
import "@fontsource-variable/inter/wght.css"
import "../styles.css"

const siteUrl = "https://bartoszbak.org"
const description = "Aspiring design engineer based in the UK"
const ogImage = "https://ssr.bartoszbak.org/opengraph-image"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      import.meta.env.DEV ? { title: "Bartosz Bak (dev)" } : { title: "Bartosz Bak" },
      { name: "description", content: description },
      { property: "og:title", content: "Bartosz Bak" },
      { property: "og:description", content: description },
      { property: "og:url", content: siteUrl },
      { property: "og:site_name", content: "Bartosz Bak" },
      { property: "og:locale", content: "en_US" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Bartosz Bak - Aspiring design engineer based in the UK",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@nocdns" },
      { name: "twitter:creator", content: "@nocdns" },
      { name: "twitter:title", content: "Bartosz Bak" },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico" },
      { rel: "canonical", href: siteUrl },
    ],
  }),
  component: RootComponent,
})

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Bartosz Bak",
  url: siteUrl,
  description,
  image: ogImage,
}

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <ThemeScript />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  )
}
