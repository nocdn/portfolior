import { createFileRoute } from "@tanstack/react-router"

const urls = [
  { loc: "https://bartoszbak.org", changefreq: "monthly", priority: "1.0" },
  { loc: "https://bartoszbak.org/writing/family-drawer", changefreq: "monthly", priority: "0.8" },
  { loc: "https://bartoszbak.org/writing/otp-api", changefreq: "monthly", priority: "0.8" },
]

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const xml =
          `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          urls
            .map(
              (u) =>
                `  <url><loc>${u.loc}</loc><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`
            )
            .join("\n") +
          `\n</urlset>`
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        })
      },
    },
  },
})
