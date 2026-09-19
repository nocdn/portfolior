import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/cv")({
  server: {
    handlers: {
      GET: ({ request }) => {
        return Response.redirect(
          new URL("/001_Bartosz_Bak_CV.pdf", request.url),
          307
        )
      },
    },
  },
})
