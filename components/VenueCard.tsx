import Image from 'next/image'
import Link from 'next/link'
import styles from './VenueCard.module.css'
import { urlFor } from '@/sanity/lib/image'

interface Props {
  name: string
  slug: string
  category?: string
  neighborhood?: string
  priceRange?: string
  cuisine?: string
  excerpt?: string
  heroImage?: any
  href: string
}

export function VenueCard({ name, slug, category, neighborhood, priceRange, cuisine, excerpt, heroImage, href }: Props) {
  const imgUrl = heroImage
    ? urlFor(heroImage).width(600).height(400).auto('format').url()
    : null

  return (
    <Link href={href} className={styles.card}>
      <div className={styles.imgWrap}>
        {imgUrl ? (
          <Image src={imgUrl} alt={name} fill className={styles.img} sizes="(max-width: 768px) 100vw, 33vw" />
        ) : (
          <div className={styles.placeholder} />
        )}
        {category && <span className={styles.tag}>{category}</span>}
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.meta}>
          {neighborhood && <span>{neighborhood}</span>}
          {cuisine && <span>{cuisine}</span>}
          {priceRange && <span>{priceRange}</span>}
        </div>
        {excerpt && <p className={styles.excerpt}>{excerpt}</p>}
      </div>
    </Link>
  )
}
