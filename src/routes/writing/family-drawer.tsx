import { familyDrawerArticle, familyDrawerHref } from "@/articles/family-drawer/article"
import { FamilyDrawerBody } from "@/articles/family-drawer/Body"
import { articleMeta } from "@/lib/article-meta"
import { createFileRoute } from "@tanstack/react-router"
import ioskeleyMonoUrl from "../../fonts/IoskeleyMono-Regular.woff2?url"

const meta = articleMeta(familyDrawerArticle.title, familyDrawerHref)

export const Route = createFileRoute("/writing/family-drawer")({
  head: () => ({
    meta: [
      { title: meta.title },
      { name: "description", content: meta.description },
      { property: "og:title", content: meta.ogTitle },
      { property: "og:description", content: meta.ogDescription },
      { property: "og:url", content: meta.ogUrl },
      { property: "og:type", content: "article" },
      { property: "og:image", content: meta.ogImageUrl },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: meta.ogTitle },
      { name: "twitter:description", content: meta.ogDescription },
      { name: "twitter:image", content: meta.ogImageUrl },
    ],
    links: [
      // code blocks are the only Ioskeley Mono consumer: preload it here,
      // not on pages (like home) that never use it
      {
        rel: "preload",
        href: ioskeleyMonoUrl,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      { rel: "canonical", href: `https://bartoszbak.org${familyDrawerHref}` },
    ],
  }),
  component: FamilyDrawerPage,
})

function FamilyDrawerPage() {
  return <FamilyDrawerBody />
}
