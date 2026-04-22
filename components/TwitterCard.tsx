import { SOCIAL_PROFILE_IMAGE_URL } from "@/lib/social"
import type { TwitterProfile } from "@/lib/twitter"
import { cacheLife, cacheTag } from "next/cache"
import { TwitterHover } from "./TwitterHover"

type FxTwitterResponse = {
  user?: {
    name: string
    screen_name: string
    description: string
    followers: number
    following: number
  }
}

async function getTwitterProfile(twitterUsername: string): Promise<TwitterProfile> {
  "use cache"
  cacheTag("twitter-profile", `twitter-profile:${twitterUsername}`)
  cacheLife("max")

  const res = await fetch(`https://api.fxtwitter.com/${twitterUsername}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch Twitter profile for ${twitterUsername} (${res.status})`)
  }

  const data = (await res.json()) as FxTwitterResponse
  const user = data.user
  if (!user) {
    throw new Error(`Twitter profile payload is missing user for ${twitterUsername}`)
  }

  return {
    name: user.name,
    username: user.screen_name,
    description: user.description,
    followers: user.followers,
    following: user.following,
    avatarUrl: SOCIAL_PROFILE_IMAGE_URL,
  }
}

export async function TwitterCard() {
  const profile = await getTwitterProfile("nocdns")
  return <TwitterHover profile={profile} />
}
