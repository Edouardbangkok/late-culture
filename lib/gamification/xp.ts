/* ── Late Culture XP & Level System ── */

export const XP_VALUES = {
  SAVE: 5,
  VISIT: 15,
  COLLECTION_COMPLETE: 50,
  INSIDER_NOTE: 10,
  WEEKLY_VOTE: 10,
  PLAN_MY_NIGHT: 5,
} as const

export const LEVEL_LABELS: Record<number, string> = {
  1: 'New Explorer',
  2: 'Curious',
  3: 'Regular',
  4: 'Connected',
  5: 'Rising Star',
  6: 'Adventurer',
  7: 'Night Owl',
  8: 'Connoisseur',
  9: 'City Guide',
  10: 'City Insider',
  12: 'Local Expert',
  15: 'Bangkok Expert',
  20: 'Bangkok Authority',
}

/** Calculate level from total XP. Level N requires sum(50*i for i=1..N-1) XP */
export function calculateLevel(xpTotal: number): {
  level: number
  label: string
  xpForNext: number
  xpInLevel: number
  progress: number
  totalForCurrentLevel: number
  totalForNextLevel: number
} {
  let level = 1
  let threshold = 0

  while (true) {
    const nextThreshold = threshold + 50 * level
    if (nextThreshold > xpTotal) {
      const xpInLevel = xpTotal - threshold
      const xpForNext = nextThreshold - xpTotal
      const levelSize = 50 * level
      return {
        level,
        label: getLabel(level),
        xpForNext,
        xpInLevel,
        progress: levelSize > 0 ? xpInLevel / levelSize : 0,
        totalForCurrentLevel: threshold,
        totalForNextLevel: nextThreshold,
      }
    }
    threshold = nextThreshold
    level++
  }
}

function getLabel(level: number): string {
  // Find the closest label at or below this level
  const keys = Object.keys(LEVEL_LABELS).map(Number).sort((a, b) => b - a)
  for (const key of keys) {
    if (level >= key) return LEVEL_LABELS[key]
  }
  return 'New Explorer'
}
