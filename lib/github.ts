import { cacheLife, cacheTag } from "next/cache"

export type ContributionLevel = 0 | 1 | 2 | 3 | 4

export type ContributionDay = {
  date: string
  count: number
  level: ContributionLevel
}

export type GithubContributionsGrid = {
  weeks: (ContributionDay | null)[][]
}

type JogruberResponse = {
  total: Record<string, number>
  contributions: ContributionDay[]
}

// Number of week columns to show in the popover. Tuned to fit the w-72 / 288px
// popover minus px-4 padding (256px content) — 17 cells × 11px + 16 gaps × 3px
// = 235px.
const WEEKS_TO_SHOW = 17

function toUtcDateOnly(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date)
  next.setUTCDate(date.getUTCDate() + days)
  return next
}

function toDateString(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function buildWeeks(contributions: ContributionDay[], today: Date): (ContributionDay | null)[][] {
  const map = new Map(contributions.map((c) => [c.date, c]))
  const todayUtc = toUtcDateOnly(today)
  // Sunday of the week containing today — this becomes the last column.
  const currentSunday = addDays(todayUtc, -todayUtc.getUTCDay())
  const firstSunday = addDays(currentSunday, -(WEEKS_TO_SHOW - 1) * 7)

  const weeks: (ContributionDay | null)[][] = []
  for (let w = 0; w < WEEKS_TO_SHOW; w++) {
    const weekStart = addDays(firstSunday, w * 7)
    const week: (ContributionDay | null)[] = []
    for (let d = 0; d < 7; d++) {
      const day = addDays(weekStart, d)
      if (day > todayUtc) {
        // Future days in the current week render as invisible padding.
        week.push(null)
      } else {
        const dateStr = toDateString(day)
        week.push(map.get(dateStr) ?? { date: dateStr, count: 0, level: 0 })
      }
    }
    weeks.push(week)
  }
  return weeks
}

export async function getGithubContributionsGrid(
  username: string
): Promise<GithubContributionsGrid> {
  "use cache"
  cacheTag("github-contributions", `github-contributions:${username}`)
  cacheLife("hours")

  // `y=last` returns ~365 days ending today, which always covers our rolling
  // window no matter how the year boundary falls.
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch GitHub contributions for ${username} (${res.status})`)
  }

  const data = (await res.json()) as JogruberResponse
  const weeks = buildWeeks(data.contributions, new Date())

  return { weeks }
}
