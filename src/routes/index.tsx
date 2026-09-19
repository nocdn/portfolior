import { createFileRoute } from "@tanstack/react-router"
import { Explorations } from "@/components/Explorations"
import { HoverLink } from "@/components/HoverLink"
import { LinkText } from "@/components/LinkText"
import { articles } from "@/data/articles"

const explorations = [
  {
    src: "/videos/emdashloader.mp4",
    reverseSrc: "/videos/emdashloader-reverse.mp4",
    placeholderSrc: "/videos/emdashloader-placeholder.jpg",
    width: 688,
    height: 640,
    title: "EmDash loading stepper",
    description: (
      <>
        An upgrade I made to the playground loading screen, try it live{" "}
        <LinkText url="https://try.emdashcms.com/" className="text-foreground">
          here
        </LinkText>
      </>
    ),
  },
  {
    src: "/videos/dashboardillustration.mp4",
    reverseSrc: "/videos/dashboardillustration-reverse.mp4",
    placeholderSrc: "/videos/dashboardillustration-placeholder.jpg",
    width: 948,
    height: 640,
    title: "Dashboard illustration",
    description: (
      <>
        Added interactivity with the signature glow colour to dashboard&apos;s 404 pages, to make it
        a little less annoying to hit one. Original cloud SVG by{" "}
        <LinkText url="https://x.com/BalintFerenczy" className="text-foreground">
          Bálint Ferenczy
        </LinkText>
      </>
    ),
  },
]

export const Route = createFileRoute("/")({
  component: Home,
})

function Home() {
  return (
    <div className="font-inter bg-background text-foreground selection-warm text-[17px] font-[450] antialiased md:text-[16px]">
      <main className="mx-auto flex w-full max-w-180 flex-col gap-16 px-6 pt-16 pb-24 md:pt-24">
        <div>
          <h1 className="text-[17px] font-medium tracking-tight md:text-[16px]">Bartek Bak</h1>
          <p className="text-muted-foreground">Intern at Cloudflare</p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="text-paragraph leading-[1.7]">
            I am currently on the UI platform team at{" "}
            <HoverLink text="Cloudflare" href="https://www.cloudflare.com" hoverColor="#FF5F07" />,
            where I work on the Dashboard, and the ways that people interact with the products.
            Along with the team, I aim to make it a delightful and thoughtful experience.
          </div>
          <div className="text-paragraph leading-[1.7]">
            I study computer science at the University of York, and I was previously a software
            development intern at{" "}
            <HoverLink text="Objective" href="https://objectiveit.com/" hoverColor="#E42655" />.
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-[17px] font-medium tracking-tight md:text-[16px]">Writing</h2>
          <div className="flex flex-col">
            {articles.map((article) => (
              <a
                key={article.href}
                href={article.href}
                className="hover:bg-muted -mx-4 flex flex-col gap-1 rounded-md px-4 py-3"
              >
                <span className="text-foreground">
                  {article.href.includes("otp-api")
                    ? "Turning an old phone into an OTP server"
                    : article.title}
                </span>
                <span className="text-muted-foreground">{article.date}</span>
              </a>
            ))}
            <div className="-mx-4 flex flex-col gap-1 px-4 py-3">
              <span className="text-foreground">Fixing the infamous Cloudflare error pages</span>
              <span className="text-muted-foreground">September 2026</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-[17px] font-medium tracking-tight md:text-[16px]">Explorations</h2>
            <p className="text-muted-foreground hidden md:block">Hover to play</p>
            <p className="text-muted-foreground md:hidden">Click for context</p>
          </div>
          <div className="flex flex-col items-start gap-6">
            <Explorations items={explorations} />
          </div>
        </div>
      </main>
    </div>
  )
}
