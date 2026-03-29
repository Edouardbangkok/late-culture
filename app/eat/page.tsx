import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { restaurantsQuery } from '@/sanity/lib/queries'
import { VenueCard } from '@/components/VenueCard'
import { PageHero } from '@/components/PageHero'
import styles from '../listing.module.css'

export const metadata: Metadata = { title: 'Eat' }
export const revalidate = 60

export default async function EatPage() {
  const restaurants = await client.fetch(restaurantsQuery)

  return (
    <main>
      <PageHero
        title="EAT."
        label="Bangkok · Restaurants"
        subtitle="From street carts to Michelin stars — Bangkok feeds you well."
        count={restaurants.length}
      />
      <section className={styles.grid}>
        {restaurants.length === 0 ? (
          <p className={styles.empty}>Coming soon — venues being added to Sanity.</p>
        ) : (
          restaurants.map((r: any) => (
            <VenueCard
              key={r._id}
              name={r.name}
              slug={r.slug?.current}
              category={r.category}
              neighborhood={r.neighborhood}
              cuisine={r.cuisine}
              priceRange={r.priceRange}
              excerpt={r.excerpt}
              heroImage={r.heroImage}
              href={`/eat/${r.slug?.current}`}
            />
          ))
        )}
      </section>
    </main>
  )
}
