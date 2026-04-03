/* ============================================
   LATE CULTURE. App Controller
   ============================================ */

/* ── Venue Data — fetched from Sanity ── */
let HOTELS = [];
let RESTAURANTS = [];
let BARS = [];
let PARTIES = [];
let ALL_VENUES = [];

const SANITY_PROJECT = 'sa9u2hue';
const SANITY_DATASET = 'production';
const SANITY_API = `https://${SANITY_PROJECT}.api.sanity.io/v2024-01-01/data/query/${SANITY_DATASET}`;

function sanityImageUrl(ref) {
  if (!ref || !ref.asset || !ref.asset._ref) return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80';
  const parts = ref.asset._ref.replace('image-', '').replace(/-([a-z]+)$/, '.$1');
  return `https://cdn.sanity.io/images/${SANITY_PROJECT}/${SANITY_DATASET}/${parts}?w=600&q=80`;
}

function mapSanityVenue(doc, type) {
  return {
    id: doc.slug?.current || doc._id,
    name: doc.name || 'Unnamed',
    type: type,
    category: doc.category || '',
    neighborhood: doc.neighborhood || '',
    description: doc.excerpt || '',
    image: sanityImageUrl(doc.heroImage),
    tags: doc.categories && doc.categories.length > 0 ? doc.categories : (doc.category ? [doc.category] : []),
    link: `/${type === 'hotel' ? 'stay' : type === 'restaurant' ? 'eat' : type === 'party' ? 'party' : 'drink'}/${doc.slug?.current || ''}`,
    priceRange: doc.priceRange || '',
    cuisine: doc.cuisine || '',
    lat: doc.lat || null,
    lng: doc.lng || null,
  };
}

async function fetchSanityVenues() {
  try {
    const query = encodeURIComponent(`{
      "hotels": *[_type=="hotel"]{_id, name, slug, category, categories, neighborhood, excerpt, priceRange, heroImage, lat, lng},
      "restaurants": *[_type=="restaurant"]{_id, name, slug, category, categories, neighborhood, cuisine, excerpt, priceRange, heroImage, lat, lng},
      "bars": *[_type=="bar"]{_id, name, slug, category, categories, neighborhood, excerpt, heroImage, lat, lng},
      "parties": *[_type=="party"]{_id, name, slug, category, categories, neighborhood, excerpt, heroImage, lat, lng}
    }`);
    const res = await fetch(`${SANITY_API}?query=${query}`);
    const data = await res.json();
    if (!data.result) return;

    HOTELS = (data.result.hotels || []).map(d => mapSanityVenue(d, 'hotel'));
    RESTAURANTS = (data.result.restaurants || []).map(d => mapSanityVenue(d, 'restaurant'));
    BARS = (data.result.bars || []).map(d => mapSanityVenue(d, 'bar'));
    PARTIES = (data.result.parties || []).map(d => mapSanityVenue(d, 'party'));
    ALL_VENUES = [...HOTELS, ...RESTAURANTS, ...BARS, ...PARTIES];

    // Re-render all grids
    init();
    console.log('[Late Culture] Loaded', ALL_VENUES.length, 'venues from Sanity');
  } catch (err) {
    console.warn('[Late Culture] Sanity fetch failed:', err);
  }
}

// Fetch on page load
fetchSanityVenues();

/* ── Derive a simple time slot from venue data ── */
function getVenueTimeSlot(venue) {
  if (venue.type === 'hotel') return '5PM';
  if (venue.type === 'restaurant') {
    // Mix of 7PM and 9PM based on opening hours / vibe
    if (venue.vibe && venue.vibe.energy >= 4) return '9PM';
    return '7PM';
  }
  if (venue.type === 'bar') {
    if (venue.vibe && venue.vibe.energy >= 4) return '11PM';
    return '9PM';
  }
  if (venue.type === 'party') return '11PM';
  return null;
}

/* ── Card Renderer ── */
function renderCard(venue) {
  const typeLabel = venue.type === 'hotel' ? 'Hotel' : venue.type === 'restaurant' ? 'Restaurant' : venue.type === 'party' ? 'Party' : 'Bar';
  const href = venue.link || `${venue.type === 'hotel' ? 'stay' : venue.type === 'restaurant' ? 'eat' : venue.type === 'party' ? 'parties' : 'drink'}/${venue.id}.html`;
  const cats = venue.tags ? venue.tags.slice(0, 3) : [venue.category];
  const tags = cats.map(t => `<span class="venue-card__tag">${t}</span>`).join('');
  const dataCats = cats.join(',');
  const badge = cats[0] || venue.category;
  return `
    <a href="${href}" class="venue-card" data-categories="${dataCats}">
      <div class="venue-card__img">
        <span class="venue-card__badge">${badge}</span>
        <img src="${venue.image}" alt="${venue.name}" loading="lazy">
      </div>
      <div class="venue-card__body">
        <div class="venue-card__overline">${typeLabel.toUpperCase()} · ${venue.neighborhood.toUpperCase()}</div>
        <h3 class="venue-card__name">${venue.name}</h3>
        <p class="venue-card__desc">${venue.description}</p>
        <div class="venue-card__tags">${tags}</div>
      </div>
    </a>
  `;
}

function renderGrid(containerId, venues, limit) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const items = limit ? venues.slice(0, limit) : venues;
  container.innerHTML = items.map(renderCard).join('');
  document.dispatchEvent(new CustomEvent('cardsRendered'));
}

function filterAndRender(containerId, venues, category) {
  if (category === 'all') {
    renderGrid(containerId, venues);
  } else {
    const catLower = category.toLowerCase();
    const filtered = venues.filter(v => {
      if (v.category && v.category.toLowerCase() === catLower) return true;
      if (v.tags && v.tags.some(t => t.toLowerCase() === catLower)) return true;
      return false;
    });
    renderGrid(containerId, filtered);
  }
}

/* ── Glass Slider (animated highlight behind active category button) ── */
function initSlider(strip) {
  let slider = strip.querySelector('.category-strip__slider');
  if (!slider) {
    slider = document.createElement('div');
    slider.className = 'category-strip__slider';
    slider.style.cssText = 'position:absolute;top:0;left:0;height:100%;background:#fff;border-radius:999px;transition:all 0.4s cubic-bezier(0.25,0.46,0.45,0.94);pointer-events:none;z-index:0;';
    strip.style.position = 'relative';
    strip.prepend(slider);
  }
  const moveSlider = () => {
    const active = strip.querySelector('.category-strip__btn--active');
    if (!active) { slider.style.opacity = '0'; return; }
    slider.style.opacity = '1';
    slider.style.width = active.offsetWidth + 'px';
    slider.style.transform = 'translateX(' + active.offsetLeft + 'px)';
  };
  moveSlider();
  window.addEventListener('resize', moveSlider);
  return moveSlider;
}

/* ── Category Strip Handler ── */
function setupCategoryStrip(stripId, gridId, venues) {
  const strip = document.getElementById(stripId);
  if (!strip) return;

  // Check if this is a new-style strip (with __wrap and __item) or legacy (__btn)
  const wrap = strip.querySelector('.category-strip__wrap');
  if (wrap) {
    // New style — attach filtering to __item clicks
    wrap.addEventListener('click', (e) => {
      const btn = e.target.closest('.category-strip__item');
      if (!btn) return;
      filterAndRender(gridId, venues, btn.dataset.category);
      highlightTonightCards();
    });
    return;
  }

  // Legacy style — __btn based
  const moveSlider = initSlider(strip);
  strip.addEventListener('click', (e) => {
    const btn = e.target.closest('.category-strip__btn');
    if (!btn) return;
    strip.querySelectorAll('.category-strip__btn').forEach(b => b.classList.remove('category-strip__btn--active'));
    btn.classList.add('category-strip__btn--active');
    moveSlider();
    filterAndRender(gridId, venues, btn.dataset.category || btn.dataset.cat);
    highlightTonightCards();
  });
}

/* ── Navigation (kept for home page SPA sections) ── */
function nav(route) {
  // For multi-page navigation
  const routes = {
    'hotels': 'stay.html',
    'restaurants': 'eat.html',
    'bars': 'drink.html',
    'city': 'bangkok.html',
  };
  if (routes[route]) {
    window.location.href = routes[route];
    return;
  }
  // Fallback for SPA pages still on index
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('pg-' + route);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

/* ── Scroll Animations (legacy fade-in class support) ── */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const children = entry.target.querySelectorAll('.venue-card, .card, .tonight__card');
      children.forEach((child, i) => {
        child.style.transitionDelay = `${i * 80}ms`;
        child.classList.add('visible');
      });
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

/* ── Hero Carousel (single card, auto-rotate every 3s) ── */
const HERO_SLIDES = [];

let heroSlideIndex = 0;

function renderHeroSlide() {
  const carousel = document.getElementById('hero-carousel');
  if (!carousel) return;
  const s = HERO_SLIDES[heroSlideIndex];
  const tags = s.tags.map(t => `<span class="hero__carousel-card__tag">${t}</span>`).join('');
  carousel.innerHTML = `
    <a href="${s.href}" class="hero__carousel-card">
      <div class="hero__carousel-card__img">
        <img src="${s.image}" alt="${s.name}">
        <div class="hero__carousel-card__badge">${s.badge}</div>
      </div>
      <div class="hero__carousel-card__body">
        <div class="hero__carousel-card__overline">${s.type} · ${s.neighborhood}</div>
        <div class="hero__carousel-card__name">${s.name.toUpperCase()}</div>
        <div class="hero__carousel-card__location">${s.neighborhood}</div>
        <p class="hero__carousel-card__desc">${s.desc}</p>
        <div class="hero__carousel-card__tags">${tags}</div>
      </div>
    </a>
  `;
}

function startHeroCarousel() {
  renderHeroSlide();
  setInterval(() => {
    heroSlideIndex = (heroSlideIndex + 1) % HERO_SLIDES.length;
    renderHeroSlide();
  }, 4500);
}

startHeroCarousel();

/* ── Featured Restaurants section removed ── */

/* ── Spotlight: highlight Tonight card matching current Bangkok time ── */
function highlightTonightCards() {
  const now = new Date();
  const bangkokHour = (now.getUTCHours() + 7) % 24;

  let currentSlot;
  if (bangkokHour >= 17 && bangkokHour < 19) currentSlot = '5PM';
  else if (bangkokHour >= 19 && bangkokHour < 21) currentSlot = '7PM';
  else if (bangkokHour >= 21 && bangkokHour < 23) currentSlot = '9PM';
  else if (bangkokHour >= 23 || bangkokHour < 5) currentSlot = '11PM';

  const tonightCards = document.querySelectorAll('.tonight__card');
  if (!tonightCards.length) return;

  tonightCards.forEach(card => {
    const time = card.getAttribute('data-time');
    if (currentSlot && time === currentSlot) {
      card.classList.add('tonight__card--active');
      card.classList.remove('tonight__card--inactive');
    } else if (currentSlot) {
      card.classList.add('tonight__card--inactive');
      card.classList.remove('tonight__card--active');
    }
  });
}

/* ── Init ── */
function init() {
  // Tonight section — disabled for now
  // renderTonight();

  // Home page grids
  renderGrid('hotels-grid', HOTELS);
  renderGrid('restaurants-grid', RESTAURANTS);
  renderGrid('bars-grid', BARS);
  renderGrid('party-grid', PARTIES);

  // Editors' Picks
  const editorsPicks = [HOTELS[0], RESTAURANTS[0], BARS[0], RESTAURANTS[1], HOTELS[5], BARS[1]];
  renderGrid('editors-grid', editorsPicks);
  renderGrid('editors-page-grid', editorsPicks);

  // Full page grids
  renderGrid('hotels-page-grid', HOTELS);
  renderGrid('restaurants-page-grid', RESTAURANTS);
  renderGrid('bars-page-grid', BARS);
  renderGrid('party-page-grid', PARTIES);

  // City hub grids
  renderGrid('city-hotels-grid', HOTELS.filter(h => h.featured), 3);
  renderGrid('city-restaurants-grid', RESTAURANTS.filter(r => r.featured), 3);

  // Build ALL category strips for home page (containers are empty in HTML)
  buildCategoryStrip('restaurants-categories', ['all','Grand Occasion','Romantic','Festive','Late Night','Quiet Escape','By the Water','The Counter','Sunday Ritual','Solo Dining','Local Legend','Street to Star']);
  buildCategoryStrip('hotels-categories', ['all','Grand Occasion','Design Forward','River & Water','The Pool','Slow Stay','New Opening','Old Soul','Night City']);
  buildCategoryStrip('bars-categories', ['all','The Ritual','Above the City','Behind the Door','The Lobby','The Glass']);
  buildCategoryStrip('party-categories', ['all','Underground','Live Sound','Pool Party','Rooftop Session','Local Scene']);

  // Category strip filters (home page)
  setupCategoryStrip('hotels-categories', 'hotels-grid', HOTELS);
  setupCategoryStrip('restaurants-categories', 'restaurants-grid', RESTAURANTS);
  setupCategoryStrip('bars-categories', 'bars-grid', BARS);
  setupCategoryStrip('party-categories', 'party-grid', PARTIES);

  // Build category strips for sub-pages FIRST (replaces innerHTML)
  buildCategoryStrip('hotels-page-categories', ['all','Grand Occasion','Design Forward','River & Water','The Pool','Slow Stay','New Opening','Old Soul','Night City']);
  buildCategoryStrip('restaurants-page-categories', ['all','Grand Occasion','Romantic','Festive','Late Night','Quiet Escape','By the Water','The Counter','Sunday Ritual','Solo Dining','Local Legend','Street to Star']);
  buildCategoryStrip('bars-page-categories', ['all','The Ritual','Above the City','Behind the Door','The Lobby','The Glass']);
  buildCategoryStrip('party-page-categories', ['all','Underground','Live Sound','Pool Party','Rooftop Session','Local Scene']);

  // THEN attach event listeners for sub-page strips
  setupCategoryStrip('hotels-page-categories', 'hotels-page-grid', HOTELS);
  setupCategoryStrip('restaurants-page-categories', 'restaurants-page-grid', RESTAURANTS);
  setupCategoryStrip('bars-page-categories', 'bars-page-grid', BARS);
  setupCategoryStrip('party-page-categories', 'party-page-grid', PARTIES);

  // Wire up hamburger menu for all pages
  document.querySelectorAll('.page-nav__hamburger, .glass-nav__hamburger').forEach(btn => {
    btn.addEventListener('click', toggleMobileMenu);
  });
  document.querySelectorAll('.mobile-menu__close').forEach(btn => {
    btn.addEventListener('click', toggleMobileMenu);
  });

  // Highlight cards matching current Bangkok time
  highlightTonightCards();
}

/* ── Category Icons Map ── */
const CATEGORY_ICONS = {
  'all': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  'Design Hotels': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
  'New Hotels': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  'Romantic': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  'Historic': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01M9 13h.01M15 13h.01"/></svg>',
  'Best Pool': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><circle cx="12" cy="8" r="3"/></svg>',
  'Adults Only': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  'Business': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M12 12v.01"/></svg>',
  'Beach': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="5" r="3"/><path d="M2 20h20M5 20c0-5 3-9 7-9s7 4 7 9"/></svg>',
  'Grand Occasion': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  'Late Culture Best': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>',
  'Local Cuisine': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>',
  'Seafood': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M12 3C8 3 4 6 4 12h16c0-6-4-9-8-9z"/></svg>',
  'French': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 2h8l-2 5h4l-7 8 2-5H9l3-8"/></svg>',
  'Japanese': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a7 7 0 0 0 0 20M12 2a7 7 0 0 1 0 20"/></svg>',
  'Italian': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>',
  'Festive': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v6M12 18v4M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M16 12h6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24"/></svg>',
  'Recently Added': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  'Cocktail Bars': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 22h8M12 15v7M4 2h16l-6 9v4h-4V11L4 2z"/></svg>',
  'Rooftop Bars': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21h18M9 21V9l3-3 3 3v12M5 21V12l-2 2M19 21V12l2 2"/></svg>',
  'Hotel Bars': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M6 12V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8M2 16h20"/></svg>',
  'Speakeasy': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg>',
  'The Glass': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 22h8M12 15v7M6 2h12l-1 7a5 5 0 0 1-10 0L6 2z"/></svg>',
  'Design Forward': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
  'River & Water': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/></svg>',
  'The Pool': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><circle cx="12" cy="8" r="3"/></svg>',
  'Slow Stay': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  'New Opening': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  'Old Soul': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg>',
  'Night City': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  'Late Night': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  'Quiet Escape': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>',
  'By the Water': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/></svg>',
  'The Counter': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="12" width="20" height="4" rx="1"/><path d="M6 12V8M10 12V8M14 12V8M18 12V8"/></svg>',
  'Sunday Ritual': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>',
  'Solo Dining': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>',
  'Local Legend': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>',
  'Street to Star': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  'The Ritual': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>',
  'Above the City': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21h18M9 21V9l3-3 3 3v12M5 21V12l-2 2M19 21V12l2 2"/></svg>',
  'Behind the Door': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg>',
  'The Lobby': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M6 12V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8M2 16h20"/></svg>',
  'Underground': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  'Live Sound': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/></svg>',
  'Pool Party': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><circle cx="12" cy="8" r="3"/></svg>',
  'Rooftop Session': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21h18M9 21V9l3-3 3 3v12M5 21V12l-2 2M19 21V12l2 2"/></svg>',
  'Local Scene': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>',
};

function buildCategoryStrip(containerId, categories) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const buttons = categories.map((cat, i) => {
    const label = cat === 'all' ? 'All' : cat;
    return '<button class="category-strip__item' + (i === 0 ? ' active' : '') + '" data-category="' + cat + '">' + label + '</button>';
  }).join('');
  container.innerHTML = '<div class="category-strip__wrap"><div class="category-strip__slider"></div>' + buttons + '</div>';
  initSliderWrap(container.querySelector('.category-strip__wrap'));
}

/* ── Slider for new __wrap structure ── */
function initSliderWrap(wrap) {
  if (!wrap) return;
  const slider = wrap.querySelector('.category-strip__slider');
  if (!slider) return;
  const moveSlider = () => {
    const active = wrap.querySelector('.category-strip__item.active');
    if (!active) { slider.style.opacity = '0'; return; }
    slider.style.opacity = '1';
    slider.style.width = active.offsetWidth + 'px';
    slider.style.transform = 'translateX(' + (active.offsetLeft - 4) + 'px)';
  };
  moveSlider();
  window.addEventListener('resize', moveSlider);

  wrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.category-strip__item');
    if (!btn) return;
    wrap.querySelectorAll('.category-strip__item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    moveSlider();
  });
  return moveSlider;
}


/* ── Mapbox Map ── */
let map = null;
let mapMarkers = [];

function initMap() {
  if (!window.mapboxgl) return;
  const mapEl = document.getElementById('map');
  if (!mapEl) return;

  mapboxgl.accessToken = window.__LC_MAPBOX_TOKEN || window.__lcMapboxToken || '';

  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [100.5018, 13.7363],
    zoom: 12,
    pitch: 0,
    attributionControl: false,
  });

  map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');
  map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-left');

  map.on('load', () => {
    addMapMarkers('all');
  });

  document.querySelectorAll('.map-filter__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.map-filter__btn').forEach(b => b.classList.remove('map-filter__btn--active'));
      btn.classList.add('map-filter__btn--active');
      addMapMarkers(btn.dataset.filter);
    });
  });
}

function addMapMarkers(filter) {
  mapMarkers.forEach(m => m.remove());
  mapMarkers = [];

  const venues = filter === 'all' ? ALL_VENUES : ALL_VENUES.filter(v => v.type === filter);

  venues.forEach(venue => {
    const coords = getVenueCoords(venue);
    if (!coords) return;

    const el = document.createElement('div');
    el.className = `map-marker map-marker--${venue.type}`;

    const typeLabel = venue.type === 'hotel' ? 'Hotel' : venue.type === 'restaurant' ? 'Restaurant' : venue.type === 'party' ? 'Party' : 'Bar';
    const href = venue.link || `${venue.type === 'hotel' ? 'stay' : venue.type === 'restaurant' ? 'eat' : venue.type === 'party' ? 'parties' : 'drink'}/${venue.id}.html`;
    const popup = new mapboxgl.Popup({ offset: 12, closeButton: true, maxWidth: '300px' })
      .setHTML(`
        <div class="map-popup">
          <div class="map-popup__img">
            <img src="${venue.image}" alt="${venue.name}" loading="lazy">
          </div>
          <div class="map-popup__body">
            <div class="map-popup__overline">${typeLabel} · ${venue.category}</div>
            <div class="map-popup__name"><a href="${href}">${venue.name}</a></div>
            <div class="map-popup__desc">${venue.description}</div>
          </div>
        </div>
      `);

    const marker = new mapboxgl.Marker(el)
      .setLngLat(coords)
      .setPopup(popup)
      .addTo(map);

    mapMarkers.push(marker);
  });
}

function getVenueCoords(venue) {
  // Use Sanity lat/lng if available
  if (venue.lat && venue.lng) return [venue.lng, venue.lat];

  // Fallback to hardcoded coords
  const coordMap = {
    'capella-bangkok': [100.5133, 13.7080],
    'the-siam': [100.5100, 13.7825],
    'the-mustang-nero': [100.5234, 13.7273],
    'rosewood-bangkok': [100.5460, 13.7445],
    'oriental-residence': [100.5470, 13.7410],
    'mandarin-oriental': [100.5162, 13.7235],
    'le-du': [100.5250, 13.7270],
    'suhring': [100.5390, 13.7020],
    'nusara': [100.5340, 13.7190],
    'jay-fai': [100.5010, 13.7560],
    'paste-bangkok': [100.5405, 13.7465],
    'sorn': [100.5650, 13.7230],
    'baan-tepa': [100.5290, 13.7210],
    'bamboo-bar': [100.5162, 13.7235],
    'vesper': [100.5290, 13.7250],
    'sky-bar': [100.5160, 13.7220],
    'find-the-locker-room': [100.5790, 13.7320],
    'teens-of-thailand': [100.5090, 13.7400],
    'gaggan-anand': [100.5405, 13.7445],
    'potong': [100.5095, 13.7370],
    'mezzaluna': [100.5160, 13.7220],
    'samrub-samrub-thai': [100.5250, 13.7260],
    'eighty-twenty': [100.5140, 13.7260],
    'bisou': [100.5410, 13.7420],
    'clara': [100.5300, 13.7200],
    'park-hyatt-bangkok': [100.5470, 13.7440],
    'kimpton-maa-lai': [100.5400, 13.7430],
    'the-standard-bangkok': [100.5220, 13.7210],
    'sindhorn-kempinski': [100.5400, 13.7420],
    'beam-club': [100.5790, 13.7340],
    'sugar-club': [100.5530, 13.7430],
    'sing-sing-theater': [100.5720, 13.7310],
    'route-66': [100.5720, 13.7555],
    'onyx-club': [100.5720, 13.7560],
    'ce-la-vi-bangkok': [100.5280, 13.7220],
    'levels-club': [100.5535, 13.7435],
    'demo-club': [100.5785, 13.7325],
    'mod-kaew-wine-bar': [100.5340, 13.7200],
    'piche-wine-bar': [100.5620, 13.7350],
    'no-bar-wine-bar': [100.5390, 13.7720],
    'swirl-wine-bar': [100.5790, 13.7330],
    'cloud-wine': [100.5260, 13.7260],
  };
  return coordMap[venue.id] || null;
}

/* ── Tonight Section ── */
function pickRandom(arr) {
  if (!arr || arr.length === 0) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

function getVenueHref(venue) {
  const typeMap = { hotel: 'stay', restaurant: 'eat', bar: 'drink', party: 'parties' };
  return `${typeMap[venue.type] || venue.type}/${venue.id}.html`;
}

function getBangkokTime() {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
}

function formatBangkokTime(date) {
  let h = date.getHours();
  const m = date.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m} ${ampm} BKK`;
}

function getTonightPicks(hour) {
  // Always return 4 picks mapped to the 5PM / 7PM / 9PM / 11PM time slots
  return [
    { time: '5PM', label: 'Golden Hour', venue: pickRandom(BARS.filter(b => b.category === 'Above the City')) || pickRandom(BARS) },
    { time: '7PM', label: 'Dinner', venue: pickRandom(RESTAURANTS.filter(r => r.featured || r.category === 'Grand Occasion')) || pickRandom(RESTAURANTS) },
    { time: '9PM', label: 'Post-Dinner', venue: pickRandom(BARS.filter(b => b.category === 'Behind the Door' || b.category === 'The Ritual')) || pickRandom(BARS) },
    { time: '11PM', label: 'Late Night', venue: (PARTIES.length > 0) ? pickRandom(PARTIES) : pickRandom(BARS) },
  ];
}

function renderTonightCard(pick) {
  const venue = pick.venue;
  const href = getVenueHref(venue);
  return `<a href="${href}" class="tonight__card" data-time="${pick.time}">
    <div class="tonight__card-time">${pick.time}</div>
    <div class="tonight__card-img">
      <img src="${venue.image}" alt="${venue.name}" loading="lazy">
    </div>
    <div class="tonight__card-overlay">
      <span class="tonight__card-label">${pick.label}</span>
      <div class="tonight__card-name">${venue.name}</div>
      <div class="tonight__card-meta">${venue.neighborhood}</div>
    </div>
  </a>`;
}

function updateTonightClock() {
  const timeEl = document.getElementById('tonight-time');
  if (timeEl) {
    timeEl.textContent = formatBangkokTime(getBangkokTime());
  }
}

function renderTonight() {
  const grid = document.getElementById('tonight-grid');
  if (!grid) return;

  const bkk = getBangkokTime();
  const hour = bkk.getHours();
  const picks = getTonightPicks(hour);

  grid.innerHTML = picks
    .filter(p => p.venue)
    .map(p => renderTonightCard(p))
    .join('');

  updateTonightClock();
  setInterval(updateTonightClock, 60000);
}

// Run
init();

// Load Mapbox token from API then init map
fetch('/api/config').then(r => r.json()).then(cfg => {
  window.__lcMapboxToken = cfg.mapbox || '';
  initMap();
}).catch(() => {});

document.querySelectorAll('.category-strip').forEach(strip => {
  initSlider(strip);
});

// ── Scroll Reveal ──
(function() {
  const revealEls = document.querySelectorAll('.section-title, .section-subtitle, .section-overline, .venue-card, .tonight__card, .separator, .manifesto__text');

  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${(i % 6) * 0.1}s, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${(i % 6) * 0.1}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));
})();

// ── Card scroll reveal ──
(function() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function() {
          entry.target.classList.add('is-visible');
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  function observeCards() {
    document.querySelectorAll('.venue-card').forEach(function(card) {
      observer.observe(card);
    });
  }

  // Observe on load and after filter
  observeCards();
  document.addEventListener('cardsRendered', observeCards);
})();

// ── Text Trail Cursor removed ──
