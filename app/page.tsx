import { headers } from "next/headers"
import HomeClient from "@/components/HomeClient"

function isProbablyMobile(userAgent: string): boolean {
  if (!userAgent) return false
  return /Mobile|Android|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini|Silk|Kindle|webOS|Windows Phone|Tablet/i.test(
    userAgent
  )
}

export default async function Page() {
  const headersList = await headers()
  const userAgent = headersList.get("user-agent") || ""
  const initialIsMobile = isProbablyMobile(userAgent)
  return <HomeClient initialIsMobile={initialIsMobile} />
}
