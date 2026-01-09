import { DesktopSection } from "@/components/desktop/Section"
import { TimeZoneName } from "@/components/desktop/TimeZoneName"

export function DesktopAboutSection() {
  return (
    <DesktopSection
      title="ABOUT"
      className="motion-blur-in-[2px] motion-opacity-in-0 motion-translate-y-in-[7%] group"
    >
      <div>
        Hey there, I'm <TimeZoneName />. I am a front-end developer based in the
        UK, studying computer science at the University of York. I'm currently
        exploring typography, web animations and crafting interactions.
      </div>
    </DesktopSection>
  )
}
