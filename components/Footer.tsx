import styles from './Footer.module.css'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.brand}>LATE CULTURE</p>
        <p className={styles.city}>BANGKOK</p>
        <nav className={styles.nav}>
          <Link href="/stay">Stay</Link>
          <Link href="/eat">Eat</Link>
          <Link href="/drink">Drink</Link>
          <Link href="/party">Party</Link>
          <Link href="/explore">Explore</Link>
        </nav>
        <p className={styles.copy}>© 2025 Late Culture. All rights reserved.</p>
      </div>
    </footer>
  )
}
