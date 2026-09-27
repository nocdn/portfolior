import effortPickerCssUrl from "@/explorations/chatgpt-effort-picker/effort-picker.css?url"
import { EffortPickerPage } from "@/explorations/chatgpt-effort-picker/EffortPickerPage"
import { articleMeta } from "@/lib/article-meta"
import { createFileRoute } from "@tanstack/react-router"
import katexCssUrl from "katex/dist/katex.min.css?url"

const href = "/explorations/chatgpt-effort-picker"
const meta = articleMeta("ChatGPT effort picker", href)

export const Route = createFileRoute("/explorations/chatgpt-effort-picker")({
  head: () => ({
    meta: [
      { title: meta.title },
      { name: "description", content: meta.description },
      { property: "og:title", content: meta.ogTitle },
      { property: "og:description", content: meta.ogDescription },
      { property: "og:url", content: meta.ogUrl },
      { property: "og:image", content: meta.ogImageUrl },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: meta.ogTitle },
      { name: "twitter:description", content: meta.ogDescription },
      { name: "twitter:image", content: meta.ogImageUrl },
    ],
    // route-scoped: the homepage and articles never download these
    links: [
      { rel: "stylesheet", href: katexCssUrl },
      { rel: "stylesheet", href: effortPickerCssUrl },
      { rel: "canonical", href: `https://bartoszbak.org${href}` },
    ],
  }),
  component: EffortPickerPage,
})
