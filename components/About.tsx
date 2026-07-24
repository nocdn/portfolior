import { Suspense } from "react"
import { AboutShimmerText } from "./AboutShimmerText"
import { EmailCopy } from "./EmailCopy"
import { GithubCard } from "./GithubCard"
import { SectionDesktop, SectionMobile } from "./Section"
import { TimeZoneName } from "./TimeZoneName"
import { TwitterCard } from "./TwitterCard"

export const AboutDesktop = () => {
  return (
    <SectionDesktop title="ABOUT" className="group antialiased">
      <div>
        Hey there, I'm{" "}
        <Suspense fallback={<span className="about-underline text-blue-600 dark:text-blue-400">Bartek</span>}>
          <TimeZoneName />
        </Suspense>
        , I am a UI Platform intern at{" "}
        <Suspense fallback={<span className="about-underline text-blue-600 dark:text-blue-400">Cloudflare</span>}>
          <AboutShimmerText delay={1.5}>Cloudflare</AboutShimmerText>
        </Suspense>
        <br />
        in London, studying computer science at the University of York. <br /> I'm currently exploring
        typography, web animations and crafting interactions in my free time.
      </div>
      <div className="mt-4">
        You can see some more of my work on{" "}
        <Suspense
          fallback={
            <a
              href="https://x.com/nocdns"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[18.5px] text-blue-600 about-underline dark:text-blue-400"
            >
              Twitter
            </a>
          }
        >
          <TwitterCard />
        </Suspense>
        , reach me via <br />
        <Suspense fallback={<span className="text-blue-600 about-underline dark:text-blue-400">email</span>}>
          <EmailCopy />
        </Suspense>{" "}
        or see my other code on{" "}
        <Suspense
          fallback={
            <a
              href="https://github.com/nocdn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-blue-600 about-underline dark:text-blue-400"
            >
              GitHub
            </a>
          }
        >
          <GithubCard />
        </Suspense>
        .
      </div>
    </SectionDesktop>
  )
}

export const AboutMobile = () => {
  return (
    <SectionMobile id="about" title="ABOUT">
      <div className="leading-[1.6]">
        Hello, I'm <span className="text-blue-600 dark:text-blue-400">Bartek</span>, I am a UI
        Platform intern at{" "}
        <Suspense fallback={<span className="about-underline text-blue-600 dark:text-blue-400">Cloudflare</span>}>
          <AboutShimmerText delay={1.5}>Cloudflare</AboutShimmerText>
        </Suspense>{" "}
        in London, studying{" "}
        <span className="text-blue-600 dark:text-blue-400">computer science</span> at the University
        of York. I'm currently exploring typography, web animations and crafting interactions.
      </div>
    </SectionMobile>
  )
}
