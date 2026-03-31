'use client'

import { useEffect, useState } from 'react'
import styles from './profile.module.css'

export default function ProfilePage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/profile/me', { credentials: 'same-origin' })
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className={styles.page}><div className={styles.loading}>Loading...</div></div>
  if (!data || data.error) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <h1 className={styles.title}>Sign In Required</h1>
          <p className={styles.sub}>You need to be signed in to view your profile.</p>
          <a href="/login" className={styles.cta}>Sign In</a>
        </div>
      </div>
    )
  }

  const { profile, badges, progression } = data
  const allBadgeSlots = ['first_door', 'night_walker', 'the_palate', 'the_pour', 'the_suite', 'after_dark', 'the_full_set', 'golden_hour', 'midnight', 'regular', 'og', 'level_5', 'level_10']
  const earnedIds = new Set(badges.map((b: any) => b.id))

  return (
    <div className={styles.page}>
      <a href="/" className={styles.backLink}>← Back to Late Culture</a>

      <div className={styles.header}>
        <div className={styles.avatar}>
          {profile.avatar_url
            ? <img src={profile.avatar_url} alt="" className={styles.avatarImg} />
            : <div className={styles.avatarPlaceholder}>{(profile.display_name || 'U')[0].toUpperCase()}</div>
          }
        </div>
        <div className={styles.headerInfo}>
          <h1 className={styles.name}>{profile.display_name || 'Late Culture User'}</h1>
          <p className={styles.taste}>{profile.taste_label || 'New Explorer'}</p>
        </div>
      </div>

      {/* Level & XP */}
      <div className={styles.levelCard}>
        <div className={styles.levelHeader}>
          <span className={styles.levelLabel}>Level {profile.level}</span>
          <span className={styles.levelName}>{profile.label}</span>
        </div>
        <div className={styles.xpBar}>
          <div className={styles.xpFill} style={{ width: `${(profile.progress || 0) * 100}%` }} />
        </div>
        <div className={styles.xpInfo}>
          <span>{profile.xp_total || 0} XP total</span>
          <span>{profile.xpForNext || 0} XP to next level</span>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statNum}>{profile.venues_saved || 0}</span>
          <span className={styles.statLabel}>Saved</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>{profile.venues_visited || 0}</span>
          <span className={styles.statLabel}>Visited</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>{badges.length}</span>
          <span className={styles.statLabel}>Badges</span>
        </div>
      </div>

      {/* Badges */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Badges</h2>
        <div className={styles.badgeGrid}>
          {badges.length === 0 ? (
            <p className={styles.empty}>Visit venues and save places to earn badges.</p>
          ) : (
            badges.map((b: any) => (
              <div key={b.id} className={styles.badge}>
                <span className={styles.badgeIcon}>{b.icon || '🏆'}</span>
                <span className={styles.badgeName}>{b.name}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Progression */}
      {progression && progression.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Next Up</h2>
          {progression.map((p: any, i: number) => (
            <div key={i} className={styles.progressItem}>{p.text}</div>
          ))}
        </div>
      )}

      {/* Recent Activity */}
      {data.recentXp && data.recentXp.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Recent Activity</h2>
          {data.recentXp.slice(0, 5).map((xp: any, i: number) => (
            <div key={i} className={styles.activityItem}>
              <span className={styles.activityAction}>{xp.action}</span>
              <span className={styles.activityXp}>+{xp.xp_amount} XP</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
