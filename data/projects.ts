export type Project = {
  title: string
  mobileTitle?: string
  description: string
  sourceURL?: string
  demoURL?: string
  chips?: string[]
  year?: number
}

export const projects: Project[] = [
  {
    title: "MCQs",
    description: "Interactive psychology practice questions built for my friends",
    demoURL: "https://mcqs.bartoszbak.org/",
    sourceURL: "https://github.com/nocdn/mcqs-upgrade",
    chips: ["nextjs", "hono", "postgres", "RDS", "bun", "redis"],
    year: 2026,
  },
  {
    title: "Shifts",
    description: "Full stack rota and shift management system with auth",
    sourceURL: "https://github.com/nocdn/shiftsauth",
    chips: ["react", "postgres", "nextjs", "betterAuth"],
    year: 2025,
  },
  {
    title: "Vanish",
    description: "Temporary emails through Cloudflare, with frontend and API",
    sourceURL: "https://github.com/nocdn/vanish",
    chips: ["react", "flask"],
    year: 2025,
  },
  {
    title: "Books",
    mobileTitle: "Books (r)",
    description: "Recreation of (Basic) Bookmarks in Next.js with extra features",
    sourceURL: "https://github.com/nocdn/volumes-alt",
    chips: ["react", "postgres", "nextjs"],
    year: 2025,
  },
  {
    title: "Quiet Watch",
    description: "Intelligent ad segment remover powered by LLMs",
    sourceURL: "https://github.com/nocdn/ad-segment-trimmer",
    chips: ["python"],
    year: 2024,
  },
  {
    title: "Echoes",
    description: "Full stack, self-hostable video/audio transcription app",
    demoURL: "https://whisper.bartoszbak.org/",
    chips: ["python"],
    year: 2023,
  },
  {
    title: "Votes",
    description: "Voting platform for university society elections, in SvelteKit",
    sourceURL: "https://github.com/nocdn/votes",
    chips: ["sveltekit", "tailwindcss", "supabase"],
    year: 2025,
  },
]

type ChipDetails = {
  bgColor: string
  textColor: string
  label: string
  url: string
}

export const chipDetails: Record<string, ChipDetails> = {
  svelte: {
    bgColor: "#FEEEEE",
    textColor: "#EC6A5B",
    label: "Svelte",
    url: "https://svelte.dev/",
  },
  sveltekit: {
    bgColor: "#FEEEEE",
    textColor: "#EC6A5B",
    label: "SvelteKit",
    url: "https://kit.svelte.dev/",
  },
  tailwindcss: {
    bgColor: "#F8F8F8",
    textColor: "#008DFF",
    label: "Tailwind",
    url: "https://tailwindcss.com/",
  },
  react: {
    bgColor: "#E5F3FE",
    textColor: "#008DFF",
    label: "React",
    url: "https://react.dev/",
  },
  flask: {
    bgColor: "#F1F1F1",
    textColor: "#787878",
    label: "Flask",
    url: "https://flask.palletsprojects.com/",
  },
  nextjs: {
    bgColor: "#F5F5F5",
    textColor: "#222222",
    label: "Next.js",
    url: "https://nextjs.org/",
  },
  supabase: {
    bgColor: "#E1FAE8",
    textColor: "#38C25D",
    label: "Supabase",
    url: "https://supabase.com/",
  },
  postgres: {
    bgColor: "#E5F3FE",
    textColor: "#008DFF",
    label: "PostgreSQL",
    url: "https://www.postgresql.org/",
  },
  lambda: {
    bgColor: "#FFF4EE",
    textColor: "#E68F37",
    label: "Lambda",
    url: "https://aws.amazon.com/lambda/",
  },
  python: {
    bgColor: "#FDF4DC",
    textColor: "#E6961F",
    label: "Python",
    url: "https://www.python.org/",
  },
  betterAuth: {
    bgColor: "#E0E0E0",
    textColor: "black",
    label: "Better-Auth",
    url: "https://better-auth.com/",
  },
  hono: {
    bgColor: "#FFF4EE",
    textColor: "#E68F37",
    label: "Hono",
    url: "https://hono.dev/",
  },
  RDS: {
    bgColor: "#FEEEEE",
    textColor: "#EC6A5B",
    label: "RDS",
    url: "https://aws.amazon.com/rds/",
  },
  bun: {
    bgColor: "#fbf0df",
    textColor: "#0b0a08",
    label: "Bun",
    url: "https://bun.sh/",
  },
  redis: {
    bgColor: "#F5F5F5",
    textColor: "#d82c20",
    label: "Redis",
    url: "https://redis.io/",
  },
}
