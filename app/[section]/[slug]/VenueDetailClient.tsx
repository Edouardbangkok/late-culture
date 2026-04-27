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

      {/* App Waitlist */}
      <section dangerouslySetInnerHTML={{ __html: `
        <section style="background:#1A1010;padding:64px 24px;text-align:center;">
          <div style="max-width:560px;margin:0 auto;">
            <div style="font-family:'Impact',sans-serif;font-size:13px;letter-spacing:0.2em;color:#D4788A;text-transform:uppercase;margin-bottom:14px;">The Late Culture App</div>
            <h3 style="font-family:'Impact',sans-serif;font-size:clamp(32px,5vw,44px);text-transform:uppercase;color:#fff;line-height:0.95;margin-bottom:14px;letter-spacing:-0.01em;">Coming Soon.</h3>
            <p style="font-family:'Fraunces',serif;font-style:italic;font-size:17px;color:rgba(255,255,255,0.45);line-height:1.5;margin-bottom:32px;">Check in, build your Bangkok map, and discover where to go next. Be first when it launches.</p>
            <form class="lc-waitlist" onsubmit="return lcWaitlist(event,this)" style="display:flex;gap:0;max-width:420px;margin:0 auto;">
              <input type="email" placeholder="Your email" required style="flex:1;padding:14px 18px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-right:none;border-radius:50px 0 0 50px;color:#fff;font-family:'Inter',sans-serif;font-size:14px;outline:none;">
              <button type="submit" style="padding:14px 24px;background:#D4788A;border:1px solid #D4788A;border-radius:0 50px 50px 0;color:#fff;font-family:'Inter',sans-serif;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;white-space:nowrap;">Notify Me</button>
            </form>
            <p class="lc-waitlist-toast" style="display:none;font-family:'Fraunces',serif;font-style:italic;font-size:14px;color:#D4788A;margin-top:20px;">You're on the list. We'll be in touch.</p>
          </div>
        </section>
        <script>if(!window.lcWaitlist){window.lcWaitlist=async function(e,f){e.preventDefault();var i=f.querySelector('input[type=email]');var em=i.value;if(!em)return false;try{await fetch('/api/subscribe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:em,source:'app-waitlist'})});}catch(err){}f.style.display='none';var t=f.parentElement.querySelector('.lc-waitlist-toast');if(t)t.style.display='block';return false;};}</script>
      ` }} />

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

      {/* Google Maps */}
      <Script src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAFGItApCRlk255y2iiemM7PnmnIjq7JJU`} strategy="afterInteractive" onLoad={() => {
        const mapDiv = document.getElementById('venue-map')
        if (!mapDiv || !(window as any).google) return
        const lat = parseFloat(mapDiv.dataset.lat || '0')
        const lng = parseFloat(mapDiv.dataset.lng || '0')
        if (!lat || !lng) return
        const g = (window as any).google.maps
        const map = new g.Map(mapDiv, {
          center: { lat, lng }, zoom: 16, disableDefaultUI: true, zoomControl: true,
          zoomControlOptions: { position: g.ControlPosition.RIGHT_BOTTOM },
          styles: [
            { featureType: 'poi', stylers: [{ visibility: 'off' }] },
            { featureType: 'transit', stylers: [{ visibility: 'off' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#6A3A44' }] },
            { featureType: 'water', elementType: 'geometry.fill', stylers: [{ color: '#e8e0d8' }] },
            { featureType: 'road', elementType: 'geometry.fill', stylers: [{ color: '#ffffff' }] },
            { featureType: 'landscape', elementType: 'geometry.fill', stylers: [{ color: '#F5F0EB' }] },
          ],
        })
        const size = 36; const fontSize = 9; const color = '#D4788A'
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${Math.round(size*1.35)}"><defs><filter id="s" x="-20%" y="-10%" width="140%" height="140%"><feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="#1A1010" flood-opacity="0.25"/></filter></defs><path d="M${size/2} ${Math.round(size*1.3)} C${size/2} ${Math.round(size*1.3)} ${size} ${size*0.55} ${size} ${size/2} C${size} ${size*0.22} ${size*0.78} 0 ${size/2} 0 C${size*0.22} 0 0 ${size*0.22} 0 ${size/2} C0 ${size*0.55} ${size/2} ${Math.round(size*1.3)} ${size/2} ${Math.round(size*1.3)}Z" fill="${color}" stroke="#fff" stroke-width="1.5" filter="url(#s)"/><text x="${size/2}" y="${size/2 + fontSize*0.35}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="${fontSize}" fill="#fff" letter-spacing="0.5">LC</text></svg>`
        const marker = new g.Marker({
          position: { lat, lng }, map,
          icon: { url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg), scaledSize: new g.Size(36, 49), anchor: new g.Point(18, 49) },
        })
        const info = new g.InfoWindow({ content: `<div style="font-family:Inter,sans-serif;padding:4px 0;"><strong>${mapDiv.dataset.name || ''}</strong></div>` })
        marker.addListener('click', () => info.open(map, marker))
      }} />
      <Script src="/js/auth-nav.js" strategy="afterInteractive" />
    </>
  )
}
