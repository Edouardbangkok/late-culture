import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { partyQuery } from '@/sanity/lib/queries'
import { VenueCard } from '@/components/VenueCard'
import { PageHero } from '@/components/PageHero'
import styles from '../listing.module.css'

export const metadata: Metadata = { title: 'Party' }
export const revalidate = 60

export default async function PartyPage() {
  const venues = await client.fetch(partyQuery)

  return (
    <main>
      <PageHero
        title="PARTY."
        label="Bangkok · Nightlife"
        subtitle="Underground, live, loud — Bangkok's night is long."
        count={venues.length}
      />
      <section className={styles.grid}>
        {venues.length === 0 ? (
          <p className={styles.empty}>Coming soon — venues being added to Sanity.</p>
        ) : (
          venues.map((v: any) => (
            <VenueCard
              key={v._id}
              name={v.name}
              slug={v.slug?.current}
              category={v.category}
              neighborhood={v.neighborhood}
              excerpt={v.excerpt}
              heroImage={v.heroImage}
              href={`/party/${v.slug?.current}`}
            />
          ))
        )}
      </section>
    </main>
  )
}
