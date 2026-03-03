import { articles } from "@/data/articles"
import { Article } from "./Article"
import { SectionDesktop, SectionMobile } from "./Section"

export function WritingDesktop() {
  return (
    <SectionDesktop title="WRITING" className="">
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
