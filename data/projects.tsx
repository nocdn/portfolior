import { InlineIconText } from "@/components/InlineIconText"
import { Docker, Redis } from "@/icons/projectsIcons"
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
        (~200 unique users), containerised with{" "}
        <InlineIconText icon={Docker} title="Docker" className="text-blue-500" />, caching with{" "}
        <InlineIconText icon={Redis} title="Redis" className="text-red-500" />. There is a demo{" "}
        <a href="https://mcqs.bartoszbak.org/" target="_blank" rel="noopener noreferrer">
          here
        </a>
        .
      </p>
    ),
  },
  {
    title: "Segments",
    description: "Intelligent ad segment remover powered by LLMs",
    sourceURL: "https://github.com/nocdn/ad-segment-trimmer",
    year: 2024,
  },
  {
    title: "Films",
    description: "Choose your favourite films in an elo based system",
    sourceURL: "https://github.com/nocdn/ad-segment-trimmer",
    year: 2024,
  },
  {
    title: "Shifts",
    description: "Full stack, authed rota and shift management system",
    sourceURL: "https://github.com/nocdn/shiftsauth",
    year: 2025,
  },
  {
    title: "Vanish",
    description: "Temp email service through Cloudflare, with frontend and API",
    sourceURL: "https://github.com/nocdn/vanish-web",
    year: 2025,
  },
  {
    title: "Books",
    mobileTitle: "Books (r)",
    description: "Recreation of (Basic) Bookmarks in Next.js with extra features",
    sourceURL: "https://github.com/nocdn/volumes-alt",
    year: 2025,
  },
  {
    title: "Votes",
    description: "Voting platform for university society elections, in SvelteKit",
    sourceURL: "https://github.com/nocdn/votes",
    year: 2025,
  },
]
