import { cacheLife } from "next/cache"
import type { TwitterProfile } from "@/lib/twitter"
import { TwitterHover } from "./TwitterHover"

async function getTwitterProfile(username: string): Promise<TwitterProfile> {
  "use cache"
  cacheLife("max")

  const res = await fetch(`https://api.fxtwitter.com/${username}`)
  const data = await res.json()
  const user = data.user

  return {
    name: user.name,
    username: user.screen_name,
    description: user.description,
    followers: user.followers,
    following: user.following,
    avatarUrl: "https://github.com/nocdn.png",
  }
}

export async function TwitterCard() {
  const profile = await getTwitterProfile("nocdns")
  return <TwitterHover profile={profile} />
}
