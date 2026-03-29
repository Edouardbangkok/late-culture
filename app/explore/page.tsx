import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { articlesQuery } from '@/sanity/lib/queries'
import { VenueCard } from '@/components/VenueCard'
import { PageHero } from '@/components/PageHero'
import styles from '../listing.module.css'

export const metadata: Metadata = { title: 'Explore Bangkok' }
export const revalidate = 60

export default async function ExplorePage() {
  const articles = await client.fetch(articlesQuery)

  return (
    <main>
      <PageHero
        title="EXPLORE."
        label="Bangkok · City Guide"
        subtitle="Everything you need to know before you arrive — and after."
        count={articles.length}
      />
      <section className={styles.grid}>
        {articles.length === 0 ? (
          <p className={styles.empty}>City guides coming soon.</p>
        ) : (
          articles.map((a: any) => (
            <VenueCard
              key={a._id}
              name={a.title}
              slug={a.slug?.current}
              category={a.category}
              excerpt={a.excerpt}
              heroImage={a.heroImage}
              href={`/explore/${a.slug?.current}`}
            />
          ))
        )}
      </section>
    </main>
  )
}
