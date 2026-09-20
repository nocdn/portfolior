import { createCsrfMiddleware, createMiddleware, createStart } from "@tanstack/react-start"
import { getMarkdown } from "./markdown"

const contentNegotiation = createMiddleware().server(async ({ next, request }) => {
  const url = new URL(request.url)
  const accept = request.headers.get("accept") ?? ""
  const wantsMarkdown = accept.includes("text/markdown")

  // Markdown content negotiation (matcher used to be / and /writing/*).
  // Markdown is generated in microseconds, so it is never cached.
  if (wantsMarkdown && (url.pathname === "/" || url.pathname.startsWith("/writing/"))) {
    const markdown = getMarkdown(url.pathname)
    if (markdown) {
      return new Response(markdown, {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          Vary: "Accept",
        },
      })
    }
  }

  // Edge-cache HTML only: the markdown variant above never reaches the cache,
  // so the two variants cannot poison each other. Fresh deploys start with an
  // empty cache, so content can never go stale across releases (max 5 min anyway).
  const cache =
    request.method === "GET" && !wantsMarkdown && typeof caches !== "undefined"
      ? ((caches as unknown as { default?: Cache }).default ?? null)
      : null
  if (cache) {
    const hit = await cache.match(request)
    if (hit) return hit
  }

  const result = await next()

  // handler responses (e.g. redirects) can carry immutable headers,
  // so rebuild the response to set ours
  const headers = new Headers(result.response.headers)
  headers.set("Vary", "Accept")

  // Link headers on homepage
  if (url.pathname === "/") {
    headers.append("Link", '</.well-known/agent-skills/index.json>; rel="describedby"')
  }

  const upstreamBody = result.response.body
  const isHtml = (result.response.headers.get("content-type") ?? "").includes("text/html")

  if (!cache || result.response.status !== 200 || !upstreamBody || !isHtml) {
    return new Response(result.response.body, {
      status: result.response.status,
      statusText: result.response.statusText,
      headers,
    })
  }

  headers.set("Cache-Control", "public, max-age=300")
  const [cacheBody, clientBody] = upstreamBody.tee()
  await cache.put(
    request,
    new Response(cacheBody, {
      status: result.response.status,
      statusText: result.response.statusText,
      headers,
    })
  )
  return new Response(clientBody, {
    status: result.response.status,
    statusText: result.response.statusText,
    headers: new Headers(headers),
  })
})

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [
      createCsrfMiddleware({ filter: (ctx) => ctx.handlerType === "serverFn" }),
      contentNegotiation,
    ],
  }
})
