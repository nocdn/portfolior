import { cacheLife } from "next/cache"
import { HomeDesktop, HomeMobile } from "@/components/Home"

export default async function Home() {
  "use cache"
  cacheLife("max")

  return (
    <>
      <div className="hidden md:block">
        <HomeDesktop />
      </div>
      <div className="md:hidden">
        <HomeMobile />
      </div>
    </>
  )
}
