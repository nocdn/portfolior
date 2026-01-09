import { DesktopSection } from "@/components/desktop/Section"
import { articles } from "@/lib/data"
import { Article } from "@/components/Article"

export function DesktopWritingSection() {
  return (
    <DesktopSection
      title="WRITING"
      className="motion-blur-in-[2px] motion-opacity-in-0 motion-translate-y-in-[3.75%] motion-delay-300"
    >
      <div className="grid grid-cols-2 gap-2 mr-2">
        {articles.map((article, index) => (
          <Article key={index} {...article} />
        ))}
      </div>
    </DesktopSection>
  )
}
