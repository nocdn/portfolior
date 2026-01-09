// Server Component - no "use client" directive
// Only the interactive parts are client components

import { DesktopAboutSection } from "./DesktopAboutSection"
import { DesktopProjectsSection } from "./DesktopProjectsSection"
import { DesktopComponentsSection } from "./DesktopComponentsSection"
import { DesktopWritingSection } from "./DesktopWritingSection"
import { DesktopContactSection } from "./DesktopContactSection"
import { DesktopExtraSection } from "./DesktopExtraSection"

export default function HomeDesktop() {
  return (
    <div>
      <main className="w-[565px] mb-24 mx-auto pt-26 flex flex-col gap-12">
        <DesktopAboutSection />
        <DesktopProjectsSection />
        <DesktopComponentsSection />
        <DesktopWritingSection />
        <DesktopContactSection />
        <DesktopExtraSection />
      </main>
      <div
        className="bottom-scroll-mask pointer-events-none"
        aria-hidden="true"
      />
      <div className="top-scroll-mask pointer-events-none" aria-hidden="true" />
    </div>
  )
}
