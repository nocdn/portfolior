import { articles } from "@/data/articles"
import { Article } from "./Article"
import { SectionDesktop, SectionMobile } from "./Section"

export function WritingDesktop() {
  return (
    <SectionDesktop
      title="WRITING"
      className="motion-blur-in-[2px] motion-opacity-in-0 motion-translate-y-in-[3.75%] motion-delay-300"
    >
      <div className="mr-2 grid grid-cols-2 gap-2">
        {articles.map((article, index) => (
          <Article key={index} {...article} />
        ))}
      </div>
    </SectionDesktop>
  )
}

export function WritingMobile() {
  return (
    <SectionMobile id="writing" title="WRITING">
      <div className="flex flex-col gap-2">
        {articles.map((article, index) => (
          <Article key={index} {...article} />
        ))}
      </div>
    </SectionMobile>
  )
}
