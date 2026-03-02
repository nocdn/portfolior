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

type GitHubUserResponse = {
  avatar_url?: string
}

async function getGithubAvatarUrl(username: string): Promise<string> {
  "use cache"
  cacheTag("github-avatar", `github-avatar:${username}`)
  cacheLife("days")

  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Accept: "application/vnd.github+json",
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch GitHub avatar for ${username} (${res.status})`)
  }

  const data = (await res.json()) as GitHubUserResponse
  if (!data.avatar_url) {
    throw new Error(`GitHub avatar URL missing for ${username}`)
  }

  return data.avatar_url
}

async function getTwitterProfile(
  twitterUsername: string,
  githubUsername: string
): Promise<TwitterProfile> {
  "use cache"
  cacheTag("twitter-profile", `twitter-profile:${twitterUsername}`)
  cacheLife("max")

  const [res, avatarUrl] = await Promise.all([
    fetch(`https://api.fxtwitter.com/${twitterUsername}`),
    getGithubAvatarUrl(githubUsername).catch(() => `https://github.com/${githubUsername}.png`),
  ])

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
    avatarUrl,
  }
}

export async function TwitterCard() {
  const profile = await getTwitterProfile("nocdns", "nocdn")
  return <TwitterHover profile={profile} />
}
