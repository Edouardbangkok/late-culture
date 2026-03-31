'use client'

import { useState } from 'react'
import styles from './plan.module.css'

type Vibe = 'date' | 'chill' | 'party' | 'solo' | 'surprise'
type Budget = 'low' | 'medium' | 'high'
type Step = 'vibe' | 'budget' | 'result'

const VIBES = [
  { id: 'date' as Vibe, label: 'Date', icon: '💕', desc: 'Impress someone' },
  { id: 'chill' as Vibe, label: 'Chill', icon: '🌙', desc: 'Low-key evening' },
  { id: 'party' as Vibe, label: 'Party', icon: '⚡', desc: 'Full send' },
  { id: 'solo' as Vibe, label: 'Solo', icon: '🎧', desc: 'Just me' },
]

const AREAS = ['All Areas', 'Silom', 'Sukhumvit', 'Sathorn', 'Riverside', 'Chinatown', 'Ari', 'Thonglor', 'Talat Noi']

export default function PlanMyNightPage() {
  const [step, setStep] = useState<Step>('vibe')
  const [vibe, setVibe] = useState<Vibe | null>(null)
  const [budget, setBudget] = useState<Budget>('medium')
  const [area, setArea] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const selectVibe = (v: Vibe) => {
    setVibe(v)
    if (v === 'surprise') {
      generatePlan(v, budget, area)
    } else {
      setStep('budget')
    }
  }

  const generatePlan = async (v: Vibe | null, b: Budget, a: string) => {
    setLoading(true)
    setStep('result')
    const res = await fetch('/api/plan-my-night', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vibe: v || 'surprise', budget: b, area: a === 'All Areas' ? '' : a }),
    })
    const data = await res.json()
    setResult(data)
    setLoading(false)
  }

  const shuffle = () => generatePlan(vibe, budget, area)
  const restart = () => { setStep('vibe'); setVibe(null); setResult(null) }

  return (
    <div className={styles.page}>
      <a href="/" className={styles.backLink}>← Late Culture</a>

      {step === 'vibe' && (
        <div className={styles.step}>
          <p className={styles.overline}>Plan My Night</p>
          <h1 className={styles.title}>WHAT'S THE VIBE?</h1>
          <div className={styles.vibeGrid}>
            {VIBES.map(v => (
              <button key={v.id} className={styles.vibeCard} onClick={() => selectVibe(v.id)}>
                <span className={styles.vibeIcon}>{v.icon}</span>
                <span className={styles.vibeLabel}>{v.label}</span>
                <span className={styles.vibeDesc}>{v.desc}</span>
              </button>
            ))}
          </div>
          <button className={styles.surpriseBtn} onClick={() => selectVibe('surprise')}>
            Surprise Me
          </button>
        </div>
      )}

      {step === 'budget' && (
        <div className={styles.step}>
          <p className={styles.overline}>Plan My Night</p>
          <h1 className={styles.title}>BUDGET & AREA</h1>

          <div className={styles.budgetRow}>
            {(['low', 'medium', 'high'] as Budget[]).map(b => (
              <button
                key={b}
                className={`${styles.budgetPill} ${budget === b ? styles.budgetActive : ''}`}
                onClick={() => setBudget(b)}
              >
                {b === 'low' ? '$' : b === 'medium' ? '$$' : '$$$'}
              </button>
            ))}
          </div>

          <select className={styles.areaSelect} value={area} onChange={e => setArea(e.target.value)}>
            {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
          </select>

          <button className={styles.goBtn} onClick={() => generatePlan(vibe, budget, area)}>
            Show My Night
          </button>
        </div>
      )}

      {step === 'result' && (
        <div className={styles.step}>
          <p className={styles.overline}>Your Night</p>
          <h1 className={styles.title}>{loading ? 'BUILDING...' : 'YOUR NIGHT.'}</h1>

          {!loading && result && (
            <>
              <div className={styles.timeline}>
                {result.restaurant && (
                  <div className={styles.slot}>
                    <div className={styles.slotTime}>7PM</div>
                    <div className={styles.slotLine} />
                    <a href={result.restaurant.href} className={styles.slotCard}>
                      {result.restaurant.image && <img src={result.restaurant.image} alt="" className={styles.slotImg} />}
                      <div className={styles.slotInfo}>
                        <span className={styles.slotType}>DINNER</span>
                        <span className={styles.slotName}>{result.restaurant.name}</span>
                        <span className={styles.slotMeta}>{result.restaurant.category} · {result.restaurant.neighborhood}</span>
                      </div>
                    </a>
                  </div>
                )}

                {result.bar && (
                  <div className={styles.slot}>
                    <div className={styles.slotTime}>9PM</div>
                    <div className={styles.slotLine} />
                    <a href={result.bar.href} className={styles.slotCard}>
                      {result.bar.image && <img src={result.bar.image} alt="" className={styles.slotImg} />}
                      <div className={styles.slotInfo}>
                        <span className={styles.slotType}>DRINKS</span>
                        <span className={styles.slotName}>{result.bar.name}</span>
                        <span className={styles.slotMeta}>{result.bar.category} · {result.bar.neighborhood}</span>
                      </div>
                    </a>
                  </div>
                )}

                {result.after && (
                  <div className={styles.slot}>
                    <div className={styles.slotTime}>11PM</div>
                    <div className={styles.slotLine} />
                    <a href={result.after.href} className={styles.slotCard}>
                      {result.after.image && <img src={result.after.image} alt="" className={styles.slotImg} />}
                      <div className={styles.slotInfo}>
                        <span className={styles.slotType}>AFTER</span>
                        <span className={styles.slotName}>{result.after.name}</span>
                        <span className={styles.slotMeta}>{result.after.category} · {result.after.neighborhood}</span>
                      </div>
                    </a>
                  </div>
                )}

                {!result.restaurant && !result.bar && (
                  <p className={styles.empty}>Not enough venues yet. Add more places in Sanity Studio.</p>
                )}
              </div>

              <div className={styles.actions}>
                <button className={styles.shuffleBtn} onClick={shuffle}>Shuffle</button>
                <button className={styles.restartBtn} onClick={restart}>Start Over</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
