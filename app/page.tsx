import { client } from '@/sanity/lib/client'
import { hotelsQuery, restaurantsQuery, barsQuery, partyQuery } from '@/sanity/lib/queries'
import { VenueCard } from '@/components/VenueCard'
import styles from './home.module.css'

export const revalidate = 60

const tonight = [
  { time: '5PM', type: 'RESTAURANT', name: 'Le Du', desc: 'Seasonal Thai tasting menus through French technique.', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop&q=80' },
  { time: '7PM', type: 'BAR', name: 'Bamboo Bar', desc: 'Jazz-age cocktails in the Mandarin Oriental since 1953.', img: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&auto=format&fit=crop&q=80' },
  { time: '9PM', type: 'BAR', name: 'Vesper', desc: 'Award-winning cocktails in a moody Convent Road hideaway.', img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80' },
  { time: '11PM', type: 'PARTY', name: 'TBA', desc: "The night is still deciding. Check back soon.", img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80' },
]

export default async function HomePage() {
  const [hotels, restaurants, bars, parties] = await Promise.all([
    client.fetch(hotelsQuery),
    client.fetch(restaurantsQuery),
    client.fetch(barsQuery),
    client.fetch(partyQuery),
  ])

  return (
    <main>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            LATE CULTURE<br />
            <span className={styles.heroTitleAccent}>BANGKOK.</span>
          </h1>
          <p className={styles.heroSubtitle}>We went everywhere. So you don't have to.</p>
        </div>
        <div className={styles.heroScroll}>Scroll</div>
      </section>

      {/* ── TONIGHT ── */}
      <section className={styles.tonight}>
        <div className={styles.tonightContainer}>
          <h2 className={styles.tonightTitle}>TONIGHT</h2>
          <p className={styles.tonightSub}>The city never asks permission.</p>
          <div className={styles.tonightGrid}>
            {tonight.map(t => (
              <div key={t.time} className={styles.tonightCard}>
                <img src={t.img} alt={t.name} className={styles.tonightCardImg} loading="lazy" />
                <span className={styles.tonightCardTime}>{t.time}</span>
                <div className={styles.tonightCardInfo}>
                  <span className={styles.tonightCardType}>{t.type}</span>
                  <h3 className={styles.tonightCardName}>{t.name}</h3>
                  <p className={styles.tonightCardDesc}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.separator} />

      {/* ── EAT ── */}
      <section className={styles.section}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionBar} />
          <h2 className={styles.sectionTitle}>EAT.</h2>
          <p className={styles.sectionSub}>Where the city sits down and means it.</p>
          <div className={styles.cardGrid}>
            {restaurants.length === 0 ? (
              <p className={styles.empty}>Venues coming soon.</p>
            ) : (
              restaurants.slice(0, 6).map((r: any) => (
                <VenueCard key={r._id} name={r.name} slug={r.slug?.current} category={r.category} neighborhood={r.neighborhood} cuisine={r.cuisine} priceRange={r.priceRange} excerpt={r.excerpt} heroImage={r.heroImage} href={`/eat/${r.slug?.current}`} />
              ))
            )}
          </div>
        </div>
      </section>

      <div className={styles.separator} />

      {/* ── STAY ── */}
      <section className={styles.section}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionBar} />
          <h2 className={styles.sectionTitle}>STAY.</h2>
          <p className={styles.sectionSub}>Sleep well. Wake up somewhere extraordinary.</p>
          <div className={styles.cardGrid}>
            {hotels.length === 0 ? (
              <p className={styles.empty}>Venues coming soon.</p>
            ) : (
              hotels.slice(0, 6).map((h: any) => (
                <VenueCard key={h._id} name={h.name} slug={h.slug?.current} category={h.category} neighborhood={h.neighborhood} priceRange={h.priceRange} excerpt={h.excerpt} heroImage={h.heroImage} href={`/stay/${h.slug?.current}`} />
              ))
            )}
          </div>
        </div>
      </section>

      <div className={styles.separator} />

      {/* ── DRINK ── */}
      <section className={styles.section}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionBar} />
          <h2 className={styles.sectionTitle}>DRINK.</h2>
          <p className={styles.sectionSub}>Ice, spirit, someone else's playlist.</p>
          <div className={styles.cardGrid}>
            {bars.length === 0 ? (
              <p className={styles.empty}>Venues coming soon.</p>
            ) : (
              bars.slice(0, 6).map((b: any) => (
                <VenueCard key={b._id} name={b.name} slug={b.slug?.current} category={b.category} neighborhood={b.neighborhood} excerpt={b.excerpt} heroImage={b.heroImage} href={`/drink/${b.slug?.current}`} />
              ))
            )}
          </div>
        </div>
      </section>

      <div className={styles.separator} />

      {/* ── PARTY ── */}
      <section className={styles.section}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionBar} />
          <h2 className={styles.sectionTitle}>PARTY.</h2>
          <p className={styles.sectionSub}>Bangkok after dark. The clubs, the rooftops, the rooms that don't need a name.</p>
          <div className={styles.cardGrid}>
            {parties.length === 0 ? (
              <p className={styles.empty}>Venues coming soon.</p>
            ) : (
              parties.slice(0, 6).map((v: any) => (
                <VenueCard key={v._id} name={v.name} slug={v.slug?.current} category={v.category} neighborhood={v.neighborhood} excerpt={v.excerpt} heroImage={v.heroImage} href={`/party/${v.slug?.current}`} />
              ))
            )}
          </div>
        </div>
      </section>

      <div className={styles.separator} />

      {/* ── MANIFESTO ── */}
      <section className={styles.manifesto}>
        <blockquote className={styles.manifestoQuote}>
          THE CITY HAS A THOUSAND DOORS. WE OPENED THE RIGHT ONES.
        </blockquote>
        <div className={styles.manifestoDot} />
      </section>
    </main>
  )
}
