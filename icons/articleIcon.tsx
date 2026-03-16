"use client"

const lineProfiles = [
  { minSegments: 2, maxSegments: 4, blankChance: 0.05 },
  { minSegments: 2, maxSegments: 4, blankChance: 0.08 },
  { minSegments: 3, maxSegments: 5, blankChance: 0.04 },
  { minSegments: 3, maxSegments: 5, blankChance: 0.04 },
  { minSegments: 2, maxSegments: 4, blankChance: 0.1 },
  { minSegments: 0, maxSegments: 1, blankChance: 0.55 },
  { minSegments: 1, maxSegments: 3, blankChance: 0.18 },
  { minSegments: 0, maxSegments: 1, blankChance: 0.6 },
  { minSegments: 3, maxSegments: 5, blankChance: 0 },
] as const

const segmentWidthClasses = ["w-0.5", "w-1", "w-1.5", "w-2", "w-2.5", "w-3"] as const
const segmentColorClasses = ["bg-[#BBB]", "bg-[#ACD8FD]", "bg-[#FFC200]", "bg-[#0090FF]"] as const
const weightedWidthSlots = [1, 2, 2, 3, 3, 4, 4, 5, 6] as const

const totalLines = 9
const maxSegmentBudget = 14

type ArticleIconProps = {
  seed: number | string
}

type Segment = {
  colorClass: string
  widthClass: (typeof segmentWidthClasses)[number]
}

function hashSeed(seed: number | string) {
  const seedValue = String(seed)
  let hash = 2166136261

  for (let index = 0; index < seedValue.length; index++) {
    hash ^= seedValue.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }

  return hash >>> 0
}

function createRandom(seed: number | string) {
  let state = hashSeed(seed) || 1

  return () => {
    state += 0x6d2b79f5

    let next = state
    next = Math.imul(next ^ (next >>> 15), next | 1)
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61)

    return ((next ^ (next >>> 14)) >>> 0) / 4294967296
  }
}

function randomInt(random: () => number, min: number, max: number) {
  return Math.floor(random() * (max - min + 1)) + min
}

function pickOne<T>(random: () => number, values: readonly T[]) {
  return values[Math.floor(random() * values.length)]
}

function pickWidthSlots(random: () => number, maxWidthSlots: number) {
  const availableWidths = weightedWidthSlots.filter((widthSlots) => widthSlots <= maxWidthSlots)
  return pickOne(random, availableWidths)
}

function createLine(random: () => number, lineIndex: number): Segment[] {
  const profile = lineProfiles[lineIndex]

  if (random() < profile.blankChance) {
    return []
  }

  const segmentCount = randomInt(random, profile.minSegments, profile.maxSegments)
  const segments: Segment[] = []
  let remainingBudget = maxSegmentBudget
  let visibleSegments = 0

  for (let segmentIndex = 0; segmentIndex < segmentCount; segmentIndex++) {
    const remainingSegments = segmentCount - segmentIndex
    const maxWidthSlots = Math.min(6, remainingBudget - 1 - (remainingSegments - 1) * 2)

    if (maxWidthSlots < 1) {
      break
    }

    const widthSlots = pickWidthSlots(random, maxWidthSlots)
    const isTransparent = random() < (segmentIndex === 0 ? 0.35 : 0.28)

    remainingBudget -= widthSlots + 1

    segments.push({
      widthClass: segmentWidthClasses[widthSlots - 1],
      colorClass: isTransparent ? "bg-transparent" : pickOne(random, segmentColorClasses),
    })

    if (!isTransparent) {
      visibleSegments += 1
    }
  }

  if (segments.length > 0 && visibleSegments === 0) {
    segments[segments.length - 1] = {
      ...segments[segments.length - 1],
      colorClass: pickOne(random, segmentColorClasses),
    }
  }

  return segments
}

function createLines(seed: number | string) {
  const random = createRandom(seed)

  return Array.from({ length: totalLines }, (_, lineIndex) => createLine(random, lineIndex))
}

export function ArticleIcon({ seed }: ArticleIconProps) {
  const lines = createLines(seed)

  return (
    <div
      aria-hidden="true"
      className="border-shadow flex h-fit w-fit flex-col gap-0.5 rounded-[3px] px-1 py-1.25"
    >
      {lines.map((segments, lineIndex) => (
        <div key={lineIndex} className="flex w-7.5 items-center gap-0.5">
          <div className="size-0.5 shrink-0 rounded-full bg-[#D9D9D9]"></div>
          {segments.map((segment, segmentIndex) => (
            <div
              key={`${lineIndex}-${segmentIndex}`}
              className={`h-0.5 shrink-0 rounded-full ${segment.widthClass} ${segment.colorClass}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  )
}
