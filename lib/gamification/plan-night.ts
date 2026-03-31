/* ── Late Culture — Plan My Night Recommendation Engine ── */

const VIBE_CATEGORIES = {
  date: {
    restaurant: ['Romantic', 'Grand Occasion', 'By the Water', 'Quiet Escape'],
    bar: ['Above the City', 'The Lobby', 'The Glass'],
    party: [],
  },
  chill: {
    restaurant: ['Quiet Escape', 'Sunday Ritual', 'By the Water', 'Solo Dining'],
    bar: ['The Ritual', 'The Lobby', 'The Glass'],
    party: [],
  },
  party: {
    restaurant: ['Late Night', 'Festive', 'Street to Star'],
    bar: ['Behind the Door', 'The Ritual'],
    party: ['Underground', 'Live Sound', 'Pool Party', 'Rooftop Session', 'Local Scene'],
  },
  solo: {
    restaurant: ['Solo Dining', 'The Counter', 'Local Legend', 'Street to Star'],
    bar: ['The Ritual', 'Behind the Door'],
    party: [],
  },
}

const BUDGET_MAP: Record<string, string[]> = {
  low: ['$', '$$'],
  medium: ['$$', '$$$'],
  high: ['$$$', '$$$$'],
}

export interface NightPlanInput {
  vibe: 'date' | 'chill' | 'party' | 'solo' | 'surprise'
  budget: 'low' | 'medium' | 'high'
  area?: string
}

export interface VenueData {
  _id: string
  name: string
  slug: { current: string }
  category: string
  neighborhood: string
  priceRange: string
  excerpt: string
  heroImage: any
}

export function scoreVenue(venue: VenueData, vibe: string, budget: string, area: string | undefined, alreadyPicked: string[]): number {
  let score = 0

  // Category match
  const vibeConfig = VIBE_CATEGORIES[vibe as keyof typeof VIBE_CATEGORIES]
  if (vibeConfig) {
    const allCategories = [...(vibeConfig.restaurant || []), ...(vibeConfig.bar || []), ...(vibeConfig.party || [])]
    if (allCategories.includes(venue.category)) score += 10
  }

  // Budget match
  const budgetPrices = BUDGET_MAP[budget] || ['$$', '$$$']
  if (budgetPrices.includes(venue.priceRange)) score += 5

  // Area match
  if (area && venue.neighborhood?.toLowerCase().includes(area.toLowerCase())) score += 5

  // Variety bonus — different neighborhood from already picked
  if (alreadyPicked.length > 0 && !alreadyPicked.includes(venue.neighborhood)) score += 3

  // Random factor to avoid repetition
  score += Math.random() * 5

  return score
}

export function pickVenue(venues: VenueData[], vibe: string, budget: string, area: string | undefined, alreadyPicked: string[]): VenueData | null {
  if (!venues || venues.length === 0) return null

  const scored = venues.map(v => ({ venue: v, score: scoreVenue(v, vibe, budget, area, alreadyPicked) }))
  scored.sort((a, b) => b.score - a.score)

  // Pick from top 3 randomly
  const top = scored.slice(0, Math.min(3, scored.length))
  return top[Math.floor(Math.random() * top.length)].venue
}
