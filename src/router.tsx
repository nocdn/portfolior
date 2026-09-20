import { Link, createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"

function NotFound() {
  return (
    <div className="font-inter mx-auto flex w-full max-w-180 flex-col gap-2 px-6 pt-16 pb-24 text-[16px] font-[450] antialiased md:pt-24">
      <p className="text-foreground font-medium">Not found</p>
      <p className="text-muted-foreground">
        This page doesn&apos;t exist.{" "}
        <Link to="/" className="hover:text-foreground underline underline-offset-4">
          Go home
        </Link>
      </p>
    </div>
  )
}

export function getRouter() {
  const router = createRouter({
    routeTree,
    defaultPreload: "intent",
    defaultNotFoundComponent: NotFound,
    scrollRestoration: true,
  })

  return router
}
