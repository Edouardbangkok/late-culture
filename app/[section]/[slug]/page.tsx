import { client } from '@/sanity/lib/client'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import VenueDetailClient from './VenueDetailClient'

const TYPE_MAP: Record<string, string> = {
  stay: 'hotel',
  eat: 'restaurant',
  drink: 'bar',
  party: 'party',
}

const SECTION_LABELS: Record<string, string> = {
  stay: 'Stay',
  eat: 'Eat',
  drink: 'Drink',
  party: 'Party',
}

const VENUE_QUERY = `*[_type==$type && slug.current==$slug][0]{
  _id, name, slug, category, categories, neighborhood, cuisine, priceRange, rooms, architect, yearOpened, chef, signature,
  excerpt, overview, body, insiderTip, heroImage,
  highlights[]{title, description, image},
  amenityTitle, amenityDescription, amenityImage,
  amenities, address, phone, website, bookingUrl, menuUrl,
  openingHours, dressCode, checkIn, checkOut,
  factSheet[]{label, value},
  lat, lng
}`

function sanityImageUrl(ref: any, w = 800) {
  if (!ref?.asset?._ref) return ''
  const parts = ref.asset._ref.replace('image-', '').replace(/-([a-z]+)$/, '.$1')
  return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${parts}?w=${w}&q=80`
}

function blocksToHtml(blocks: any[]) {
  if (!blocks || !Array.isArray(blocks)) return ''
  return blocks.map(b => {
    if (b._type === 'block') {
      const text = (b.children || []).map((c: any) => {
        let t = c.text || ''
        if (c.marks?.includes('strong')) t = `<strong>${t}</strong>`
        if (c.marks?.includes('em')) t = `<em>${t}</em>`
        return t
      }).join('')
      return `<p>${text}</p>`
    }
    return ''
  }).join('')
}

export async function generateMetadata({ params }: { params: Promise<{ section: string; slug: string }> }): Promise<Metadata> {
  const { section, slug } = await params
  const type = TYPE_MAP[section]
  if (!type) return { title: 'Not Found' }

  const venue = await client.fetch(VENUE_QUERY, { type, slug })
  if (!venue) return { title: 'Not Found' }

  return {
    title: `${venue.name} | Late Culture Bangkok`,
    description: venue.excerpt || `${venue.name} on Late Culture Bangkok`,
    openGraph: {
      title: `${venue.name} | Late Culture Bangkok`,
      description: venue.excerpt || '',
      url: `https://lateculture.com/${section}/${slug}`,
      siteName: 'Late Culture',
      images: venue.heroImage ? [{ url: sanityImageUrl(venue.heroImage, 1200) }] : [],
    },
  }
}

export const revalidate = 60

export default async function VenueDetailPage({ params }: { params: Promise<{ section: string; slug: string }> }) {
  const { section, slug } = await params
  const type = TYPE_MAP[section]
  if (!type) notFound()

  const venue = await client.fetch(VENUE_QUERY, { type, slug })
  if (!venue) notFound()

  const sectionLabel = SECTION_LABELS[section] || section
  const heroUrl = sanityImageUrl(venue.heroImage, 1600)
  const bodyHtml = blocksToHtml(venue.body)

  // Build sidebar items
  const sidebarItems: { label: string; value: string }[] = []
  if (venue.yearOpened) sidebarItems.push({ label: 'Year Opened', value: venue.yearOpened })
  if (venue.architect) sidebarItems.push({ label: 'Architect', value: venue.architect })
  if (venue.chef) sidebarItems.push({ label: 'Chef', value: venue.chef })
  if (venue.cuisine) sidebarItems.push({ label: 'Cuisine', value: venue.cuisine })
  if (venue.rooms) sidebarItems.push({ label: 'Rooms', value: venue.rooms })
  if (venue.signature) sidebarItems.push({ label: 'Signature', value: venue.signature })
  if (venue.priceRange) sidebarItems.push({ label: 'Price Range', value: venue.priceRange })
  if (venue.dressCode) sidebarItems.push({ label: 'Dress Code', value: venue.dressCode })
  if (venue.openingHours) sidebarItems.push({ label: 'Hours', value: venue.openingHours })
  if (venue.checkIn) sidebarItems.push({ label: 'Check-in', value: venue.checkIn })
  if (venue.checkOut) sidebarItems.push({ label: 'Check-out', value: venue.checkOut })

  // Build fact sheet
  const facts: { label: string; value: string }[] = []
  if (venue.address) facts.push({ label: 'Address', value: venue.address })
  if (venue.phone) facts.push({ label: 'Phone', value: venue.phone })
  if (venue.factSheet) facts.push(...venue.factSheet)

  // Highlights
  const highlights = (venue.highlights || []).map((h: any) => ({
    title: h.title,
    description: h.description,
    image: sanityImageUrl(h.image, 600),
  }))

  // Schema.org structured data — for SEO + AI citations
  const SCHEMA_TYPE_MAP: Record<string, string> = {
    hotel: 'Hotel',
    restaurant: 'Restaurant',
    bar: 'BarOrPub',
    party: 'NightClub',
  }
  const schemaType = SCHEMA_TYPE_MAP[type] || 'LocalBusiness'

  const PRICE_RANGE_MAP: Record<string, string> = {
    'Under 500 THB': '$',
    '500-1500 THB': '$$',
    '1500-3000 THB': '$$$',
    '3000+ THB': '$$$$',
  }

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: venue.name,
    description: venue.excerpt || venue.overview || '',
    url: `https://lateculture.com/${section}/${slug}`,
    address: venue.address ? {
      '@type': 'PostalAddress',
      streetAddress: venue.address,
      addressLocality: venue.neighborhood || 'Bangkok',
      addressRegion: 'Bangkok',
      addressCountry: 'TH',
    } : undefined,
    geo: (venue.lat && venue.lng) ? {
      '@type': 'GeoCoordinates',
      latitude: venue.lat,
      longitude: venue.lng,
    } : undefined,
    telephone: venue.phone || undefined,
    image: heroUrl || undefined,
    priceRange: PRICE_RANGE_MAP[venue.priceRange] || venue.priceRange || undefined,
    openingHours: venue.openingHours || undefined,
  }

  // Restaurant-specific
  if (type === 'restaurant') {
    if (venue.cuisine) jsonLd.servesCuisine = venue.cuisine
    if (venue.bookingUrl) jsonLd.acceptsReservations = venue.bookingUrl
  }

  // Hotel-specific
  if (type === 'hotel') {
    if (venue.checkIn) jsonLd.checkinTime = venue.checkIn
    if (venue.checkOut) jsonLd.checkoutTime = venue.checkOut
  }

  // Strip undefined keys
  Object.keys(jsonLd).forEach(k => jsonLd[k] === undefined && delete jsonLd[k])

  // Breadcrumb schema
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Late Culture', item: 'https://lateculture.com' },
      { '@type': 'ListItem', position: 2, name: sectionLabel, item: `https://lateculture.com/${section}` },
      { '@type': 'ListItem', position: 3, name: venue.name, item: `https://lateculture.com/${section}/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <VenueDetailClient
        venue={{
          name: venue.name,
          slug: slug,
          section: section,
          sectionLabel: sectionLabel,
          type: type,
          category: venue.category || '',
          categories: venue.categories || [],
          neighborhood: venue.neighborhood || '',
          excerpt: venue.excerpt || '',
          overview: venue.overview || '',
          bodyHtml: bodyHtml,
          insiderTip: venue.insiderTip || '',
          heroUrl: heroUrl,
          sidebarItems: sidebarItems,
          facts: facts,
          highlights: highlights,
          amenityTitle: venue.amenityTitle || '',
          amenityDescription: venue.amenityDescription || '',
          amenityImage: sanityImageUrl(venue.amenityImage, 800),
          bookingUrl: venue.bookingUrl || venue.website || '',
          menuUrl: venue.menuUrl || '',
          lat: venue.lat,
          lng: venue.lng,
        }}
      />
    </>
  )
}
