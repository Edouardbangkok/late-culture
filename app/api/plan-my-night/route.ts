import { NextResponse } from 'next/server'
import { pickVenue } from '@/lib/gamification/plan-night'

const SANITY_PROJECT = 'sa9u2hue'
const SANITY_DATASET = 'production'
const SANITY_API = `https://${SANITY_PROJECT}.api.sanity.io/v2024-01-01/data/query/${SANITY_DATASET}`

export async function POST(request: Request) {
  const { vibe, budget, area } = await request.json()
  const actualVibe = vibe === 'surprise' ? ['date', 'chill', 'party', 'solo'][Math.floor(Math.random() * 4)] : vibe

  // Fetch all venues from Sanity
  const query = encodeURIComponent(`{
    "restaurants": *[_type=="restaurant"]{_id, name, slug, category, neighborhood, priceRange, excerpt, heroImage},
    "bars": *[_type=="bar"]{_id, name, slug, category, neighborhood, priceRange, excerpt, heroImage},
    "parties": *[_type=="party"]{_id, name, slug, category, neighborhood, excerpt, heroImage}
  }`)

  const res = await fetch(`${SANITY_API}?query=${query}`)
  const data = await res.json()
  if (!data.result) return NextResponse.json({ error: 'No venues found' }, { status: 404 })

  const { restaurants, bars, parties } = data.result
  const alreadyPicked: string[] = []

  // Pick restaurant
  const restaurant = pickVenue(restaurants, actualVibe, budget, area, alreadyPicked)
  if (restaurant) alreadyPicked.push(restaurant.neighborhood)

  // Pick bar
  const bar = pickVenue(bars, actualVibe, budget, area, alreadyPicked)
  if (bar) alreadyPicked.push(bar.neighborhood)

  // Pick after spot (only for party vibe)
  let after = null
  if (actualVibe === 'party' && parties.length > 0) {
    after = pickVenue(parties, actualVibe, budget, area, alreadyPicked)
  }

  return NextResponse.json({
    vibe: actualVibe,
    budget,
    area: area || null,
    restaurant: restaurant ? formatVenue(restaurant, 'eat') : null,
    bar: bar ? formatVenue(bar, 'drink') : null,
    after: after ? formatVenue(after, 'party') : null,
  })
}

function formatVenue(v: any, section: string) {
  const imgRef = v.heroImage?.asset?._ref
  let imageUrl = ''
  if (imgRef) {
    const parts = imgRef.replace('image-', '').replace(/-([a-z]+)$/, '.$1')
    imageUrl = `https://cdn.sanity.io/images/sa9u2hue/production/${parts}?w=600&q=80`
  }
  return {
    name: v.name,
    slug: v.slug?.current,
    category: v.category,
    neighborhood: v.neighborhood,
    excerpt: v.excerpt,
    image: imageUrl,
    href: `/${section}/${v.slug?.current}`,
  }
}
