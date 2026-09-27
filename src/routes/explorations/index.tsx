import Link from "@/components/link"
import { createFileRoute } from "@tanstack/react-router"

const explorations = [
  {
    href: "/explorations/chatgpt-effort-picker",
    title: "ChatGPT effort picker",
    description:
      "Prove that you are worthy to wield higher intelligence, by solving some math problems",
  },
]

export const Route = createFileRoute("/explorations/")({
  head: () => ({
    meta: [{ title: "Explorations - Bartosz Bak" }],
    links: [{ rel: "canonical", href: "https://bartoszbak.org/explorations" }],
  }),
  component: ExplorationsPage,
})

function ExplorationsPage() {
  return (
    <div className="font-inter bg-background text-foreground selection-warm relative text-[17px] font-[450] antialiased md:text-[16px]">
      <main className="mx-auto flex w-full max-w-180 flex-col gap-6 px-6 pt-16 pb-24 md:pt-24">
        <div>
          <h1 className="text-[17px] font-medium tracking-tight md:text-[16px]">Explorations</h1>
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            Back to home
          </Link>
        </div>
        <div className="flex flex-col">
          {explorations.map((exploration) => (
            <Link
              key={exploration.href}
              href={exploration.href}
              className="hover:bg-muted -mx-4 flex flex-col rounded-md px-4 py-3"
            >
              <span className="font-medium">{exploration.title}</span>
              <span className="text-muted-foreground">{exploration.description}</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
