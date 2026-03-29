import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { barsQuery } from '@/sanity/lib/queries'
import { VenueCard } from '@/components/VenueCard'
import { PageHero } from '@/components/PageHero'
import styles from '../listing.module.css'

export const metadata: Metadata = { title: 'Drink' }
export const revalidate = 60

export default async function DrinkPage() {
  const bars = await client.fetch(barsQuery)

  return (
    <main>
      <PageHero
        title="DRINK."
        label="Bangkok · Bars"
        subtitle="The city's best glass — rooftops, speakeasies, wine bars."
        count={bars.length}
      />
      <section className={styles.grid}>
        {bars.length === 0 ? (
          <p className={styles.empty}>Coming soon — venues being added to Sanity.</p>
        ) : (
          bars.map((b: any) => (
            <VenueCard
              key={b._id}
              name={b.name}
              slug={b.slug?.current}
              category={b.category}
              neighborhood={b.neighborhood}
              excerpt={b.excerpt}
              heroImage={b.heroImage}
              href={`/drink/${b.slug?.current}`}
            />
          ))
        )}
      </section>
    </main>
  )
}
