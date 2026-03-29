import styles from './PageHero.module.css'

interface Props {
  title: string
  subtitle?: string
  count?: number
  label?: string
}

export function PageHero({ title, subtitle, count, label }: Props) {
  return (
    <div className={styles.hero}>
      <div className={styles.inner}>
        {label && <p className={styles.label}>{label}</p>}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {count !== undefined && (
          <p className={styles.count}>{count} {count === 1 ? 'venue' : 'venues'}</p>
        )}
      </div>
    </div>
  )
}
