import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { hotelsQuery } from '@/sanity/lib/queries'
import { VenueCard } from '@/components/VenueCard'
import { PageHero } from '@/components/PageHero'
import styles from '../listing.module.css'

export const metadata: Metadata = { title: 'Stay' }
export const revalidate = 60

export default async function StayPage() {
  const hotels = await client.fetch(hotelsQuery)

  return (
    <main>
      <PageHero
        title="STAY."
        label="Bangkok · Hotels"
        subtitle="Where you stay shapes how you see the city."
        count={hotels.length}
      />
      <section className={styles.grid}>
        {hotels.length === 0 ? (
          <p className={styles.empty}>Coming soon — venues being added to Sanity.</p>
        ) : (
          hotels.map((h: any) => (
            <VenueCard
              key={h._id}
              name={h.name}
              slug={h.slug?.current}
              category={h.category}
              neighborhood={h.neighborhood}
              priceRange={h.priceRange}
              excerpt={h.excerpt}
              heroImage={h.heroImage}
              href={`/stay/${h.slug?.current}`}
            />
          ))
        )}
      </section>
    </main>
  )
}
