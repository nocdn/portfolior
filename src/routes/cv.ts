import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/cv")({
  server: {
    handlers: {
      GET: ({ request }) => {
        return new Response(null, {
          status: 308,
          headers: {
            Location: new URL("/001_Bartosz_Bak_CV.pdf", request.url).toString(),
            "Cache-Control": "public, max-age=86400",
          },
        })
      },
    },
  },
})
