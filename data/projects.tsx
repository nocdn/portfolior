import { InlineIconText } from "@/components/InlineIconText"
import { LinkText } from "@/components/LinkText"
import {
  AmazonWebServices,
  BetterAuth,
  Bun,
  Cloudflare,
  Convex,
  Docker,
  Drizzle,
  Flask,
  Hono,
  Letterboxd,
  Motion,
  Nextjs,
  OpenAI,
  PostgreSQL,
  Python,
  RDS,
  Redis,
  Resend,
  Svelte,
  TailwindCSS,
  TypeScript,
  Vite,
} from "@/icons/projectsIcons"
import { ArrowRight } from "lucide-react"
import type { ReactNode } from "react"

export type Project = {
  title: string
  mobileTitle?: string
  description: string
  sourceURL?: string
  demoURL?: string
  year?: number
  extendedDescription?: ReactNode
}

export const projects: Project[] = [
  {
    title: "MCQs",
    description: "Psychology practice platform, containerised and cached",
    demoURL: "https://mcqs.bartoszbak.org/",
    sourceURL: "https://github.com/nocdn/mcqs-upgrade",
    year: 2026,
    extendedDescription: (
      <p>
        A multiple-choice question practice platform, used by most of the UoY psychology cohort
        (~200 unique users), auto-scaling and containerised with{" "}
        <InlineIconText icon={Docker} className="text-blue-500">
          Docker (Compose)
        </InlineIconText>
        , using AWS <span className="text-blue-700">RDS</span>, data caching with{" "}
        <InlineIconText icon={Redis} className="text-red-600">
          Redis
        </InlineIconText>
        , powered by{" "}
        <InlineIconText icon={Hono} className="text-amber-600">
          Hono
        </InlineIconText>{" "}
        and{" "}
        <InlineIconText icon={Bun} className="text-[#5b5955]">
          Bun.
        </InlineIconText>{" "}
        Frontend built with{" "}
        <InlineIconText icon={Vite} className="text-purple-600">
          Vite
        </InlineIconText>{" "}
        and{" "}
        <InlineIconText icon={Motion} className="text-black">
          Motion.
        </InlineIconText>{" "}
        There is a demo{" "}
        <LinkText url="https://mcqs.bartoszbak.org/" className="text-black">
          here
        </LinkText>
        , or the source code is available{" "}
        <LinkText url="https://github.com/nocdn/mcqs-upgrade" className="text-black">
          here
        </LinkText>
        .
      </p>
    ),
  },
  {
    title: "Segments",
    description: "Intelligent ad segment remover powered by LLMs",
    sourceURL: "https://github.com/nocdn/ad-segment-trimmer",
    year: 2024,
    extendedDescription: (
      <p>
        Self-hostable{" "}
        <InlineIconText icon={Hono} className="text-amber-600">
          Hono
        </InlineIconText>{" "}
        +{" "}
        <InlineIconText icon={TypeScript} className="text-blue-700">
          TypeScript
        </InlineIconText>{" "}
        API, with API keys support, where a user can upload an audio or video file, and using{" "}
        <InlineIconText icon={OpenAI} className="text-black">
          OpenAI's
        </InlineIconText>{" "}
        models , it identifies the ad or sponsor segments, and efficiently trims them out. Also
        containerised with{" "}
        <InlineIconText icon={Docker} className="text-blue-500">
          Docker (Compose)
        </InlineIconText>
        , supporting caching for similar audios. There is no public demo yet, but the source is
        available{" "}
        <LinkText url="https://github.com/nocdn/ad-segment-trimmer" className="text-black">
          here
        </LinkText>
        .
      </p>
    ),
  },
  {
    title: "Films",
    description: "Choose your favourite films in an elo based system",
    sourceURL: "https://github.com/nocdn/ad-segment-trimmer",
    year: 2024,
    extendedDescription: (
      <p>
        A simple, but useful{" "}
        <InlineIconText icon={Nextjs} className="text-black">
          Next.js
        </InlineIconText>{" "}
        app, to either add a list of films, or import from{" "}
        <InlineIconText
          icon={Letterboxd}
          textClassName="bg-[linear-gradient(to_right,#FF8001_0%,#FF8001_33.333%,#00E054_33.333%,#00E054_66.666%,#41BDF4_66.666%,#41BDF4_100%)] bg-clip-text text-transparent"
        >
          Letterboxd
        </InlineIconText>
        , then vote between pairs, and rank them using an elo-like system. See the source{" "}
        <LinkText url="https://github.com/nocdn/films-elo" className="text-black">
          here
        </LinkText>{" "}
        or try it out for yourself{" "}
        <LinkText url="https://films.bartoszbak.org" className="text-black">
          here
        </LinkText>
      </p>
    ),
  },
  {
    title: "Shifts",
    description: "Full stack, authed rota and shift management system",
    sourceURL: "https://github.com/nocdn/shiftsauth",
    year: 2025,
    extendedDescription: (
      <p>
        Shift scheduling app in{" "}
        <InlineIconText icon={Nextjs} className="text-black">
          Next.js (App Router, w/ server actions)
        </InlineIconText>
        , powered by{" "}
        <InlineIconText icon={Bun} className="text-[#5b5955]">
          Bun
        </InlineIconText>
        , built for my old work.{" "}
        <InlineIconText icon={PostgreSQL} className="text-[#0064a5]" iconClassName="translate-y-px">
          Postgres
        </InlineIconText>{" "}
        + <InlineIconText icon={Drizzle}>Drizzle</InlineIconText> for the database, with{" "}
        <InlineIconText icon={OpenAI} className="text-black">
          OpenAI's
        </InlineIconText>{" "}
        models for visual shift extraction. Manager uploads shifts{" "}
        <ArrowRight size={14} className="inline" strokeWidth={2.25} /> parsed by model{" "}
        <ArrowRight size={14} className="inline" strokeWidth={2.25} /> distributed to users.{" "}
        <InlineIconText icon={TailwindCSS} className="text-blue-400">
          Tailwind
        </InlineIconText>{" "}
        and{" "}
        <InlineIconText icon={Motion} className="text-black">
          Motion
        </InlineIconText>{" "}
        used to make it beautiful and user-friendly. Authenticaton with{" "}
        <InlineIconText
          icon={BetterAuth}
          className="text-black"
          iconSize={13}
          iconClassName="-translate-y-px"
        >
          BetterAuth
        </InlineIconText>
        , in the same DB. See the source{" "}
        <LinkText url="https://github.com/nocdn/shifts-auth" className="text-black">
          here
        </LinkText>
      </p>
    ),
  },
  {
    title: "Vanish",
    description: "Temp email service through Cloudflare, with frontend and API",
    sourceURL: "https://github.com/nocdn/vanish-web",
    year: 2025,
    extendedDescription: (
      <p>
        A{" "}
        <InlineIconText icon={Nextjs} className="text-black">
          Next.js (App Router)
        </InlineIconText>{" "}
        frontend, with Server Actions backend and API routes,{" "}
        <InlineIconText
          icon={Cloudflare}
          className="text-amber-700"
          iconSize={16}
          iconClassName="translate-y-px ml-[2px]"
        >
          Cloudflare
        </InlineIconText>{" "}
        for email routing, with{" "}
        <InlineIconText icon={Convex} className="text-[#511E46]">
          Convex
        </InlineIconText>{" "}
        for realtime db. All self-hostable, and with optional comments and expiries.{" "}
        <LinkText url="https://github.com/nocdn/vanish-web" className="text-black">
          Source code
        </LinkText>
      </p>
    ),
  },
  {
    title: "Books",
    mobileTitle: "Books (r)",
    description: "Recreation of (Basic) Bookmarks in Next.js with extra features",
    sourceURL: "https://github.com/nocdn/volumes-alt",
    year: 2025,
    extendedDescription: (
      <p>
        A recreation of (Basic) Bookmarks by Rauno Freiberg in{" "}
        <InlineIconText icon={Nextjs} className="text-black">
          Next.js
        </InlineIconText>
        . A full-stack app with Real time syncing with{" "}
        <InlineIconText icon={Convex} className="text-[#511E46]">
          Convex
        </InlineIconText>
        , async automatic favicon, title extraction in Server Actions. Tagging (through @-mentions)
        system instead of folders. With API routes and cache components for bookmarks and tags. See
        the code{" "}
        <LinkText url="https://github.com/nocdn/volumes-alt" className="text-black">
          here
        </LinkText>
      </p>
    ),
  },
  {
    title: "Votes",
    description: "Voting platform for university society elections, in SvelteKit",
    demoURL: "https://voting.bartoszbak.org",
    sourceURL: "https://github.com/nocdn/voting",
    year: 2025,
    extendedDescription: (
      <p>
        A voting platform built for university society elections, with a password-protected admin
        panel, generating unique voting codes, and emailing them to voters through a{" "}
        <InlineIconText icon={Flask} className="text-black">
          Flask
        </InlineIconText>{" "}
        backend using{" "}
        <InlineIconText icon={Resend} className="text-black">
          {" "}
          Resend
        </InlineIconText>
        , and store voter records in{" "}
        <InlineIconText icon={PostgreSQL} className="text-[#0064a5]" iconClassName="translate-y-px">
          Postgres.
        </InlineIconText>{" "}
        Frontend written with{" "}
        <InlineIconText icon={Svelte} className="text-red-600">
          SvelteKit
        </InlineIconText>{" "}
        and{" "}
        <InlineIconText icon={Vite} className="text-purple-600">
          Vite
        </InlineIconText>
        , including one-time code verification, a voting flow, and an admin results view. There is
        minimal a demo{" "}
        <LinkText url="https://voting.bartoszbak.org" className="text-black">
          here
        </LinkText>
        , and the source is available{" "}
        <LinkText url="https://github.com/nocdn/voting" className="text-black">
          here
        </LinkText>
      </p>
    ),
  },
]
