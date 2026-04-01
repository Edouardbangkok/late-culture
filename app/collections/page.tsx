'use client'

import { useEffect, useState } from 'react'
import styles from './collections.module.css'

export default function CollectionsPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/collections/curated', { credentials: 'same-origin' })
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className={styles.page}><div className={styles.loading}>Loading...</div></div>

  const collections = data?.collections || []

  return (
    <div className={styles.page}>
      <a href="/" className={styles.backLink}>← Late Culture</a>
      <p className={styles.overline}>Collections</p>
      <h1 className={styles.title}>EXPLORE BY COLLECTION.</h1>
      <p className={styles.sub}>Curated lists. Track your progress. Complete the set.</p>

      {collections.length === 0 ? (
        <div className={styles.empty}>
          <p>Collections coming soon.</p>
          <p className={styles.emptySub}>Curated lists of the best venues in Bangkok.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {collections.map((c: any) => (
            <a key={c.id} href={`/collections/${c.slug}`} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>{c.icon || '📋'}</span>
                <span className={styles.cardCategory}>{c.category}</span>
              </div>
              <h2 className={styles.cardTitle}>{c.title}</h2>
              <p className={styles.cardDesc}>{c.description}</p>
              <div className={styles.cardProgress}>
                <div className={styles.cardBar}>
                  <div className={styles.cardBarFill} style={{ width: `${(c.progress || 0) * 100}%` }} />
                </div>
                <span className={styles.cardCount}>{c.visited_count}/{c.venue_count}</span>
              </div>
              {c.completed && <span className={styles.cardCompleted}>Completed</span>}
              {!c.completed && c.reward_xp > 0 && (
                <span className={styles.cardReward}>+{c.reward_xp} XP on completion</span>
              )}
            </a>
          ))}
        </div>
      )}

      {!data?.authenticated && (
        <div className={styles.signin}>
          <a href="/login">Sign in</a> to track your collection progress.
        </div>
      )}
    </div>
  )
}
