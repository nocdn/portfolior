import { getGithubContributionsGrid } from "@/lib/github"
import { GithubHover } from "./GithubHover"

export async function GithubCard() {
  const contributions = await getGithubContributionsGrid("nocdn")
  return <GithubHover contributions={contributions} />
}
