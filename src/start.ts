import { createCsrfMiddleware, createMiddleware, createStart } from "@tanstack/react-start"
import { getMarkdown } from "./markdown"

const contentNegotiation = createMiddleware().server(async ({ next, request }) => {
  const url = new URL(request.url)
  const accept = request.headers.get("accept") ?? ""

  // Markdown content negotiation (matcher used to be / and /writing/*)
  if (
    accept.includes("text/markdown") &&
    (url.pathname === "/" || url.pathname.startsWith("/writing/"))
  ) {
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

  const result = await next()

  // handler responses (e.g. redirects) can carry immutable headers,
  // so rebuild the response to set ours
  const headers = new Headers(result.response.headers)
  headers.set("Vary", "Accept")

  // Link headers on homepage
  if (url.pathname === "/") {
    headers.append("Link", '</.well-known/agent-skills/index.json>; rel="describedby"')
  }

  return new Response(result.response.body, {
    status: result.response.status,
    statusText: result.response.statusText,
    headers,
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
