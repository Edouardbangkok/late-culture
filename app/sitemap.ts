import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

const TYPE_TO_SECTION: Record<string, string> = {
  hotel: 'stay',
  restaurant: 'eat',
  bar: 'drink',
  party: 'party',
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://lateculture.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: 'daily', priority: 1.0 },
    { url: `${base}/stay`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/eat`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/drink`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/party`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/explore`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/editorial-policy`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/login`, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/signup`, changeFrequency: 'monthly', priority: 0.3 },
  ]

  // Dynamic venue pages from Sanity
  let venuePages: MetadataRoute.Sitemap = []
  try {
    const venues = await client.fetch<Array<{ _type: string; slug: { current: string }; _updatedAt: string }>>(
      `*[_type in ["hotel","restaurant","bar","party"] && defined(slug.current)]{ _type, slug, _updatedAt }`
    )
    venuePages = venues.map(v => ({
      url: `${base}/${TYPE_TO_SECTION[v._type] || v._type}/${v.slug.current}`,
      lastModified: v._updatedAt ? new Date(v._updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch {
    // Fallback: skip venue pages if Sanity is unreachable
  }

  return [...staticPages, ...venuePages]
}
