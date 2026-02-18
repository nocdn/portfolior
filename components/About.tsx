import { Suspense } from "react"
import { EmailCopy } from "./EmailCopy"
import { SectionDesktop, SectionMobile } from "./Section"
import { TimeZoneName } from "./TimeZoneName"
import { TwitterCard } from "./TwitterCard"

export const AboutDesktop = () => {
  return (
    <SectionDesktop
      title="ABOUT"
      className="motion-blur-in-[2px] motion-opacity-in-0 motion-translate-y-in-[7%] group antialiased"
    >
      <div>
        Hey there, I'm{" "}
        <Suspense fallback={<span className="text-blue-600 dark:text-blue-400">Bartek</span>}>
          <TimeZoneName />
        </Suspense>
        . I am a software engineer based in the UK, studying computer science at the University of
        York. I'm currently exploring typography, web animations and crafting interactions.
      </div>
      <div className="mt-4">
        You can see some more of my work on{" "}
        <Suspense
          fallback={
            <a
              href="https://x.com/nocdns"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[18.5px] text-blue-600 dark:text-blue-400"
            >
              Twitter
            </a>
          }
        >
          <TwitterCard />
        </Suspense>
        , reach me via <br />
        <Suspense
          fallback={
            <span className="text-blue-600 dark:text-blue-400">email</span>
          }
        >
          <EmailCopy />
        </Suspense>{" "}
        or see my other code on{" "}
        <a
          href="https://github.com/nocdn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg text-blue-600 dark:text-blue-400"
        >
          GitHub
        </a>
        .
      </div>
    </SectionDesktop>
  )
}

export const AboutMobile = () => {
  return (
    <SectionMobile id="about" title="ABOUT">
      <div className="leading-[1.6]">
        Hello, I'm <span className="text-blue-600 dark:text-blue-400">Bartek</span>, a software
        engineer based in the UK, studying{" "}
        <span className="text-blue-600 dark:text-blue-400">computer science</span> at the University
        of York. I'm currently exploring typography, web animations and crafting interactions.
      </div>
    </SectionMobile>
  )
}
