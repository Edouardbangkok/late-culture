'use client'

import { useEffect } from 'react'
import Script from 'next/script'

interface VenueProps {
  venue: {
    name: string
    slug: string
    section: string
    sectionLabel: string
    type: string
    category: string
    categories: string[]
    neighborhood: string
    excerpt: string
    overview: string
    bodyHtml: string
    insiderTip: string
    heroUrl: string
    sidebarItems: { label: string; value: string }[]
    facts: { label: string; value: string }[]
    highlights: { title: string; description: string; image: string }[]
    amenityTitle: string
    amenityDescription: string
    amenityImage: string
    bookingUrl: string
    menuUrl: string
    lat: number | null
    lng: number | null
  }
}

export default function VenueDetailClient({ venue }: VenueProps) {
  const v = venue

  useEffect(() => {
    // Parallax effect
    const heroImg = document.querySelector('.vd-hero__img img') as HTMLImageElement
    if (heroImg) {
      const handleScroll = () => {
        const scrollY = window.scrollY
        if (scrollY < window.innerHeight) {
          heroImg.style.transform = `translateY(${scrollY * 0.3}px) scale(1.04)`
        }
      }
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [v])

  useEffect(() => {
    // Tab smooth scroll
    document.querySelectorAll('.vd-tabs__link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const href = (link as HTMLAnchorElement).getAttribute('href')
        if (href) {
          const target = document.querySelector(href)
          if (target) {
            const y = target.getBoundingClientRect().top + window.scrollY - 120
            window.scrollTo({ top: y, behavior: 'smooth' })
          }
        }
      })
    })
  }, [])

  // Generate unique paper texture seed from venue name
  const seed = v.name.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const freq1 = 0.6 + (seed % 10) * 0.05
  const freq2 = 0.015 + (seed % 7) * 0.003

  const paperStyle = {
    backgroundColor: '#f8f6f2',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${freq1}' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23g)' opacity='0.18'/%3E%3C/svg%3E")`,
    padding: '40px 48px',
    borderRadius: '2px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08), inset 0 0 100px rgba(90,65,20,0.08)',
    position: 'relative' as const,
    overflow: 'hidden' as const,
  }

  return (
    <>
      <link rel="stylesheet" href="/css/variables.css" />
      <link rel="stylesheet" href="/css/base.css" />
      <link rel="stylesheet" href="/css/glass.css" />
      <link rel="stylesheet" href="/css/nav.css" />
      <link rel="stylesheet" href="/css/venue-detail.css" />
      <link rel="stylesheet" href="/css/footer.css" />
      <link rel="stylesheet" href="/css/responsive.css" />
      <link rel="stylesheet" href="/css/photo-identity.css" />
      <link href="https://fonts.googleapis.com/css2?family=Anton&family=Fraunces:ital,wght@1,300;1,400&family=Indie+Flower&family=Inter:wght@300;400;500;600;700&family=Permanent+Marker&display=swap" rel="stylesheet" />
      <link href="https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css" rel="stylesheet" />

      {/* Glass Nav */}
      <nav className="glass-nav">
        <div className="glass-nav__inner">
          <div className="nav__wordmark-wrap" style={{ position: 'relative' }}>
            <a href="/" className="nav__wordmark" style={{ textDecoration: 'none', color: '#fff', fontFamily: "'Impact',sans-serif", textTransform: 'uppercase' as const, letterSpacing: '0.04em', fontSize: '15px' }}>
              LATE CULTURE&nbsp;<span style={{ color: '#d4788a' }}>BANGKOK</span>
            </a>
          </div>
          <div className="glass-nav__links" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <a href="/stay" className={`glass-nav__link ${v.section === 'stay' ? 'glass-nav__link--active' : ''}`}>Stay</a>
            <a href="/eat" className={`glass-nav__link ${v.section === 'eat' ? 'glass-nav__link--active' : ''}`}>Eat</a>
            <a href="/drink" className={`glass-nav__link ${v.section === 'drink' ? 'glass-nav__link--active' : ''}`}>Drink</a>
            <a href="/party" className={`glass-nav__link ${v.section === 'party' ? 'glass-nav__link--active' : ''}`}>Party</a>
          </div>
          <button className="glass-nav__hamburger" aria-label="Open menu" onClick={() => document.getElementById('mobile-menu')?.classList.toggle('open')}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="vd-hero">
        <div className="vd-hero__img">
          {v.heroUrl && <img src={v.heroUrl} alt={v.name} />}
        </div>
        <div className="vd-hero__overlay"></div>
        <div className="vd-hero__content">
          <div className="vd-hero__inner">
            <span className="vd-hero__badge">{v.category}</span>
            <h1 className="vd-hero__title">{v.name}</h1>
            <p className="vd-hero__subtitle">{v.excerpt}</p>
            <div className="vd-hero__meta">
              {v.neighborhood && <span className="vd-hero__meta-item">{v.neighborhood}</span>}
              {v.sidebarItems.find(i => i.label === 'Rooms') && <span className="vd-hero__meta-item">{v.sidebarItems.find(i => i.label === 'Rooms')!.value}</span>}
              {v.sidebarItems.find(i => i.label === 'Price Range') && <span className="vd-hero__meta-item">{v.sidebarItems.find(i => i.label === 'Price Range')!.value}</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="vd-tabs">
        <div className="vd-tabs__inner">
          <a href="#overview" className="vd-tabs__link active">Overview</a>
          <a href="#highlights" className="vd-tabs__link">Highlights</a>
          <a href="#amenities" className="vd-tabs__link">Amenities</a>
          <a href="#factsheet" className="vd-tabs__link">Fact Sheet</a>
          <a href="#location" className="vd-tabs__link">Location</a>
        </div>
      </div>

      <div className="vd-wrap">
        {/* Breadcrumb */}
        <nav className="vd-breadcrumb">
          <a href="/">Late Culture</a> <span className="sep">/</span>
          <a href={`/${v.section}`}>{v.sectionLabel}</a> <span className="sep">/</span>
          <span>{v.name}</span>
        </nav>

        {/* Overview */}
        <section className="vd-overview" id="overview">
          <div className="vd-overview__text" style={paperStyle}>
            {v.overview && <p className="vd-overview__editorial">{v.overview}</p>}
            {v.bodyHtml && <div className="vd-overview__body" dangerouslySetInnerHTML={{ __html: v.bodyHtml }} />}
          </div>
          <aside className="vd-overview__sidebar">
            <div className="vd-sidebar">
              <div className="vd-sidebar__title">Quick Facts</div>
              {v.sidebarItems.map((item, i) => (
                <div key={i} className="vd-sidebar__item">
                  <div className="vd-sidebar__label">{item.label}</div>
                  <div className="vd-sidebar__value">{item.value}</div>
                </div>
              ))}
            </div>
          </aside>
        </section>

        {/* Highlights */}
        {v.highlights.length > 0 && (
          <section className="vd-features" id="highlights">
            <div className="vd-label">HIGHLIGHTS</div>
            <div className="vd-features__grid">
              {v.highlights.map((h, i) => (
                <div key={i} className="vd-features__card">
                  <div className="vd-features__card-imgwrap">
                    {h.image && <img className="vd-features__card-img" src={h.image} alt={h.title} loading="lazy" />}
                  </div>
                  <div className="vd-features__card-body">
                    <h3 className="vd-features__card-title">{h.title}</h3>
                    <p className="vd-features__card-desc">{h.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Amenities */}
        {v.amenityTitle && (
          <section className="vd-highlight" id="amenities">
            {v.amenityImage && <img className="vd-highlight__img" src={v.amenityImage} alt={v.amenityTitle} />}
            <div>
              <div className="vd-highlight__label">AMENITIES</div>
              <h2 className="vd-highlight__title">{v.amenityTitle}</h2>
              <p className="vd-highlight__desc">{v.amenityDescription}</p>
            </div>
          </section>
        )}

        {/* Insider Tip */}
        {v.insiderTip && (
          <div className="vd-tip">
            <p className="vd-tip__label">Insider Tip</p>
            <p className="vd-tip__text">{v.insiderTip}</p>
          </div>
        )}

        {/* Fact Sheet */}
        {v.facts.length > 0 && (
          <section className="vd-factsheet" id="factsheet">
            <div className="vd-label">FACT SHEET</div>
            <div className="vd-factsheet__grid">
              {v.facts.map((f, i) => (
                <div key={i} className="vd-factsheet__item">
                  <div className="vd-factsheet__label">{f.label}</div>
                  <div className="vd-factsheet__value">{f.value}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        {(v.bookingUrl || v.menuUrl) && (
          <div className="vd-cta-wrap">
            {v.bookingUrl && (
              <a href={v.bookingUrl} className="vd-cta" target="_blank" rel="noopener">
                {v.type === 'hotel' ? 'Reserve a Room' : 'Make a Reservation'}
              </a>
            )}
            {v.menuUrl && (
              <a href={v.menuUrl} className="vd-cta vd-cta--outline" target="_blank" rel="noopener">
                See the Menu
              </a>
            )}
          </div>
        )}

        {/* Location */}
        {v.lat && v.lng && (
          <section className="vd-map-section" id="location">
            <div className="vd-label">LOCATION</div>
            <div id="venue-map" data-lat={v.lat} data-lng={v.lng} data-name={v.name}></div>
          </section>
        )}
      </div>

      {/* Get the App CTA */}
      <section style={{ background: '#1A1010', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontFamily: "'Impact',sans-serif", fontSize: '14px', letterSpacing: '0.1em', color: '#D4788A', textTransform: 'uppercase', marginBottom: '12px' }}>LC</div>
          <h3 style={{ fontFamily: "'Impact',sans-serif", fontSize: '28px', textTransform: 'uppercase', color: '#fff', lineHeight: 1, marginBottom: '8px' }}>Been here?</h3>
          <p style={{ fontFamily: "'Fraunces',serif", fontStyle: 'italic', fontSize: '16px', color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>Check in, earn badges, level up. Track your Bangkok map in the app.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#D4788A', borderRadius: '50px', color: '#fff', fontFamily: "'Inter',sans-serif", fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em', textDecoration: 'none' }}>App Store</a>
            <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50px', color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter',sans-serif", fontSize: '13px', fontWeight: 500, letterSpacing: '0.04em', textDecoration: 'none' }}>Google Play</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__brand">
            <h2 className="footer__wordmark">LATE CULTURE</h2>
            <p className="footer__tagline">The city has a thousand doors. We opened the right ones.</p>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '48px', paddingTop: '24px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>
            &copy; 2025 Late Culture. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Mobile Menu */}
      <div className="mobile-menu" id="mobile-menu">
        <div className="mobile-menu__inner">
          <button className="mobile-menu__close" onClick={() => document.getElementById('mobile-menu')?.classList.remove('open')}>&times;</button>
          <nav className="mobile-menu__nav">
            <a href="/stay" className="mobile-menu__link">Stay</a>
            <a href="/eat" className="mobile-menu__link">Eat</a>
            <a href="/drink" className="mobile-menu__link">Drink</a>
            <a href="/party" className="mobile-menu__link">Party</a>
          </nav>
        </div>
      </div>

      {/* Mapbox + Engagement + Auth Nav scripts */}
      <Script src="https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.js" strategy="afterInteractive" onLoad={() => {
        const mapDiv = document.getElementById('venue-map')
        if (!mapDiv || !(window as any).mapboxgl) return
        const lat = parseFloat(mapDiv.dataset.lat || '0')
        const lng = parseFloat(mapDiv.dataset.lng || '0')
        if (!lat || !lng) return
        fetch('/api/config').then(r => r.json()).then(cfg => {
          (window as any).mapboxgl.accessToken = cfg.mapbox || ''
          const map = new (window as any).mapboxgl.Map({
            container: 'venue-map', style: 'mapbox://styles/mapbox/light-v11',
            center: [lng, lat], zoom: 15, attributionControl: false,
          })
          map.addControl(new (window as any).mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right')
          new (window as any).mapboxgl.Marker({ color: '#d4788a' })
            .setLngLat([lng, lat])
            .setPopup(new (window as any).mapboxgl.Popup({ offset: 12 }).setText(mapDiv.dataset.name || ''))
            .addTo(map)
        }).catch(() => {})
      }} />
      <Script src="/js/auth-nav.js" strategy="afterInteractive" />
    </>
  )
}
