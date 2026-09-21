import { ThemeScript } from "@/components/ThemeScript"
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router"
import type { ReactNode } from "react"
import interLatinExtUrl from "../fonts/inter/inter-latin-ext-wght-normal.woff2?url"
import interLatinUrl from "../fonts/inter/inter-latin-wght-normal.woff2?url"
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
      // start the critical fonts with the HTML: text swaps in sooner.
      // must live in route head (not plain JSX): the shell strips raw links.
      // Ioskeley Mono is article-only, so it preloads on those routes instead.
      {
        rel: "preload",
        href: interLatinUrl,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: interLatinExtUrl,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
    styles: [
      {
        // @fontsource CSS would emit all 7 subsets; the fonts above cover
        // latin + latin-ext (every page), the rest lazy-load
        children: `@font-face{font-family:'Inter Variable';font-style:normal;font-display:swap;font-weight:100 900;src:url('${interLatinUrl}') format('woff2-variations');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:'Inter Variable';font-style:normal;font-display:swap;font-weight:100 900;src:url('${interLatinExtUrl}') format('woff2-variations');unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}`,
      },
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
