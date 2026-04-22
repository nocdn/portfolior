import { NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accept = request.headers.get("accept") ?? ""

  // Markdown content negotiation
  if (accept.includes("text/markdown")) {
    const markdown = getMarkdown(pathname)
    if (markdown) {
      return new NextResponse(markdown, {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          Vary: "Accept",
        },
      })
    }
  }

  const response = NextResponse.next()
  response.headers.set("Vary", "Accept")

  // Link headers on homepage
  if (pathname === "/") {
    response.headers.append(
      "Link",
      '</.well-known/agent-skills/index.json>; rel="describedby"',
    )
  }

  return response
}

function getMarkdown(pathname: string): string | null {
  switch (pathname) {
    case "/":
      return `# Bartosz Bak

Software engineer based in the UK, studying computer science at the University of York. Currently exploring typography, web animations and crafting interactions.

## Projects

#### MCQs (2026)

A multiple-choice question practice platform, used by most of the UoY psychology cohort (~200 unique users), auto-scaling and containerised with Docker (Compose), using AWS RDS, data caching with Redis, powered by Hono and Bun. Frontend built with Vite and Motion. [Demo](https://mcqs.bartoszbak.org/) · [Source](https://github.com/nocdn/mcqs-upgrade)

#### Segments (2024)

Self-hostable Hono + TypeScript API, with API keys support, where a user can upload an audio or video file, and using OpenAI's models, it identifies the ad or sponsor segments, and efficiently trims them out. Also containerised with Docker (Compose), supporting caching for similar audios. [Source](https://github.com/nocdn/ad-segment-trimmer)

#### Films (2024)

A simple, but useful Next.js app, to either add a list of films, or import from Letterboxd, then vote between pairs, and rank them using an elo-like system. [Demo](https://films.bartoszbak.org) · [Source](https://github.com/nocdn/films-elo)

#### Shifts (2025)

Shift scheduling app in Next.js (App Router, w/ server actions), powered by Bun, built for my old work. Postgres + Drizzle for the database, with OpenAI's models for visual shift extraction. Manager uploads shifts → parsed by model → distributed to users. Tailwind and Motion used to make it beautiful and user-friendly. Authentication with BetterAuth, in the same DB. [Source](https://github.com/nocdn/shifts-auth)

#### Vanish (2025)

A Next.js (App Router) frontend, with Server Actions backend and API routes, Cloudflare for email routing, with Convex for realtime db. All self-hostable, and with optional comments and expiries. [Source](https://github.com/nocdn/vanish-web)

#### Books (2025)

A recreation of (Basic) Bookmarks by Rauno Freiberg in Next.js. A full-stack app with real time syncing with Convex, async automatic favicon, title extraction in Server Actions. Tagging (through @-mentions) system instead of folders. With API routes and cache components for bookmarks and tags. [Source](https://github.com/nocdn/volumes-alt)

#### Votes (2025)

A voting platform built for university society elections, with a password-protected admin panel, generating unique voting codes, and emailing them to voters through a Flask backend using Resend, and store voter records in Postgres. Frontend written with SvelteKit and Vite, including one-time code verification, a voting flow, and an admin results view. [Demo](https://voting.bartoszbak.org) · [Source](https://github.com/nocdn/voting)

## Components

Available on the [Shadcn Registry](https://ui.bartoszbak.org/).

- Corner bordered buttons - Inspired by @aliszu and Tailwind CSS docs page. [View](https://ui.bartoszbak.org/components/cornered-button)
- Animated ticker - Ticker component which smoothly animates when its text content changes. [View](https://ui.bartoszbak.org/components/ticker)
- Animated copy button - A button that very smoothly transitions between its two children. [View](https://ui.bartoszbak.org/components/animated-button)

## Writing

- [My take on the Family Drawer](/writing/family-drawer) - August 2025
- [Turning my old phone into an OTP server](/writing/otp-api) - March 2026

## Contact

- Email: contact@bartoszbak.org
- [Twitter](https://x.com/nocdns)
- [GitHub](https://github.com/nocdn)
- [CV](/cv)
`
    case "/writing/family-drawer":
      return `# My take on the Family Drawer

A deep dive into recreating the Family App's wallet options drawer animation using React and Motion.

[Back to home](/)
`
    case "/writing/otp-api":
      return `# Turning my old phone into an OTP server

Using an 11 year-old phone with 1GB of RAM as an OTP server, powered by a TypeScript API and an Android app.

[Back to home](/)
`
    default:
      return null
  }
}

export const config = {
  matcher: ["/", "/writing/:path*"],
}
