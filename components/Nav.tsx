'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Nav.module.css'

const links = [
  { href: '/stay', label: 'STAY' },
  { href: '/eat', label: 'EAT' },
  { href: '/drink', label: 'DRINK' },
  { href: '/party', label: 'PARTY' },
]

export function Nav() {
  const path = usePathname()
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/stay" className={styles.brand}>
          <span className={styles.brandName}>LATE CULTURE</span>
          <span className={styles.brandCity}>BANGKOK</span>
        </Link>
        <div className={styles.links}>
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`${styles.link} ${path.startsWith(l.href) ? styles.active : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <Link href="/explore" className={`${styles.cta} ${path.startsWith('/explore') ? styles.ctaActive : ''}`}>
          Explore Bangkok ↗
        </Link>
      </div>
    </nav>
  )
}
