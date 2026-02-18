export type ArticleData = {
  title: string
  date: string
  href: string
  disabled?: boolean
}

export const articles: ArticleData[] = [
  {
    title: "My take on the Family Drawer",
    date: "August 2025",
    href: "/writing/family-drawer",
  },
  {
    title: "Coming soon.....",
    date: "February 2026",
    disabled: true,
    href: "/writing/",
  },
]
