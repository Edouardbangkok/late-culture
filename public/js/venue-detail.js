/* ============================================
   LATE CULTURE — Venue Detail Page
   Fetches data from Sanity and populates the template
   ============================================ */

const SANITY_PROJECT = 'sa9u2hue';
const SANITY_DATASET = 'production';
const SANITY_API = `https://${SANITY_PROJECT}.api.sanity.io/v2024-01-01/data/query/${SANITY_DATASET}`;

function sanityImg(ref, w = 800) {
  if (!ref || !ref.asset || !ref.asset._ref) return '';
  const parts = ref.asset._ref.replace('image-', '').replace(/-([a-z]+)$/, '.$1');
  return `https://cdn.sanity.io/images/${SANITY_PROJECT}/${SANITY_DATASET}/${parts}?w=${w}&q=80`;
}

// ── Parse URL to get venue type and slug ──
function parseUrl() {
  const path = window.location.pathname;
  const parts = path.split('/').filter(Boolean);
  if (parts.length < 2) return null;

  const section = parts[0]; // stay, eat, drink, party
  const slug = parts[1];

  const typeMap = { stay: 'hotel', eat: 'restaurant', drink: 'bar', party: 'party' };
  const sanityType = typeMap[section];
  if (!sanityType) return null;

  return { section, slug, sanityType };
}

// ── Portable Text to HTML ──
function blocksToHtml(blocks) {
  if (!blocks || !Array.isArray(blocks)) return '';
  return blocks.map(b => {
    if (b._type === 'block') {
      const text = (b.children || []).map(c => {
        let t = c.text || '';
        if (c.marks && c.marks.includes('strong')) t = `<strong>${t}</strong>`;
        if (c.marks && c.marks.includes('em')) t = `<em>${t}</em>`;
        return t;
      }).join('');
      if (b.style === 'h2') return `<h2>${text}</h2>`;
      if (b.style === 'h3') return `<h3>${text}</h3>`;
      return `<p>${text}</p>`;
    }
    return '';
  }).join('');
}

// ── Fetch and render ──
async function loadVenue() {
  const info = parseUrl();
  if (!info) { document.title = 'Not Found | Late Culture'; return; }

  const query = encodeURIComponent(
    `*[_type=="${info.sanityType}" && slug.current=="${info.slug}"][0]{
      name, slug, category, neighborhood, cuisine, priceRange, rooms, architect, yearOpened, chef, signature,
      excerpt, overview, body, insiderTip, heroImage,
      highlights[]{title, description, image},
      amenityTitle, amenityDescription, amenityImage,
      amenities, address, phone, website, bookingUrl,
      openingHours, dressCode, checkIn, checkOut,
      factSheet[]{label, value},
      bestTimeDay, bestTimeHours, bestTimeNote,
      lat, lng
    }`
  );

  try {
    const res = await fetch(`${SANITY_API}?query=${query}`);
    const data = await res.json();
    const v = data.result;
    if (!v) { document.title = 'Not Found | Late Culture'; return; }

    render(v, info);
  } catch (err) {
    console.error('[Late Culture] Failed to load venue:', err);
  }
}

function render(v, info) {
  // Expose venue data for engagement.js
  window.__lcVenue = {
    slug: info.slug,
    type: info.sanityType,
    name: v.name,
    neighborhood: v.neighborhood || '',
    category: v.category || '',
  };

  const sectionLabel = info.section.charAt(0).toUpperCase() + info.section.slice(1);
  const typeLabel = { hotel: 'Hotel', restaurant: 'Restaurant', bar: 'Bar', party: 'Party' }[info.sanityType];

  // ── Title ──
  document.title = `${v.name} | Late Culture`;

  // ── Nav active link ──
  document.querySelectorAll('.glass-nav__link').forEach(link => {
    if (link.textContent.trim().toLowerCase() === sectionLabel.toLowerCase()) {
      link.classList.add('glass-nav__link--active');
    }
  });

  // ── Hero ──
  const heroUrl = sanityImg(v.heroImage, 1600);
  if (heroUrl) document.getElementById('hero-img').src = heroUrl;
  document.getElementById('hero-img').alt = v.name;
  document.getElementById('hero-badge').textContent = v.category || typeLabel;
  document.getElementById('hero-title').textContent = v.name;
  document.getElementById('hero-subtitle').textContent = v.excerpt || '';

  const metaItems = [v.neighborhood, v.rooms, v.priceRange].filter(Boolean);
  document.getElementById('hero-meta').innerHTML = metaItems.map(m =>
    `<span class="vd-hero__meta-item">${m}</span>`
  ).join('');

  // ── Breadcrumb ──
  document.getElementById('breadcrumb').innerHTML = `
    <a href="/">Late Culture</a> <span class="sep">/</span>
    <a href="/${info.section}">${sectionLabel}</a> <span class="sep">/</span>
    <span>${v.name}</span>
  `;

  // ── Overview ──
  document.getElementById('overview-editorial').textContent = v.overview || v.excerpt || '';
  if (v.body) {
    document.getElementById('overview-body').innerHTML = blocksToHtml(v.body);
  }

  // ── Sidebar ──
  const sidebarItems = [];
  if (v.yearOpened) sidebarItems.push({ label: 'Year Opened', value: v.yearOpened });
  if (v.architect) sidebarItems.push({ label: 'Architect', value: v.architect });
  if (v.chef) sidebarItems.push({ label: 'Chef', value: v.chef });
  if (v.cuisine) sidebarItems.push({ label: 'Cuisine', value: v.cuisine });
  if (v.rooms) sidebarItems.push({ label: 'Rooms', value: v.rooms });
  if (v.signature) sidebarItems.push({ label: 'Signature', value: v.signature });
  if (v.priceRange) sidebarItems.push({ label: 'Price Range', value: v.priceRange });
  if (v.dressCode) sidebarItems.push({ label: 'Dress Code', value: v.dressCode });
  if (v.openingHours) sidebarItems.push({ label: 'Hours', value: v.openingHours });
  if (v.checkIn) sidebarItems.push({ label: 'Check-in', value: v.checkIn });
  if (v.checkOut) sidebarItems.push({ label: 'Check-out', value: v.checkOut });

  document.getElementById('sidebar').innerHTML = `
    <div class="vd-sidebar__title">Quick Facts</div>
    ${sidebarItems.map(i => `
      <div class="vd-sidebar__item">
        <div class="vd-sidebar__label">${i.label}</div>
        <div class="vd-sidebar__value">${i.value}</div>
      </div>
    `).join('')}
  `;

  // ── Best Time ──
  if (v.bestTimeDay || v.bestTimeHours) {
    const bt = [v.bestTimeDay, v.bestTimeHours, v.bestTimeNote].filter(Boolean).join('. ');
    document.getElementById('besttime').style.display = '';
    document.getElementById('besttime-value').textContent = bt;
  }

  // ── Highlights ──
  if (v.highlights && v.highlights.length > 0) {
    document.getElementById('highlights').style.display = '';
    document.getElementById('highlights-grid').innerHTML = v.highlights.map(h => `
      <div class="vd-features__card">
        <div class="vd-features__card-imgwrap">
          <img class="vd-features__card-img" src="${sanityImg(h.image, 600)}" alt="${h.title}" loading="lazy">
        </div>
        <div class="vd-features__card-body">
          <h3 class="vd-features__card-title">${h.title}</h3>
          <p class="vd-features__card-desc">${h.description || ''}</p>
        </div>
      </div>
    `).join('');
  }

  // ── Amenities ──
  if (v.amenityTitle) {
    document.getElementById('amenities').style.display = '';
    document.getElementById('amenity-title').textContent = v.amenityTitle;
    document.getElementById('amenity-desc').textContent = v.amenityDescription || '';
    const aImg = sanityImg(v.amenityImage, 800);
    if (aImg) document.getElementById('amenity-img').src = aImg;
  }

  // ── Insider Tip ──
  if (v.insiderTip) {
    document.getElementById('tip-section').style.display = '';
    document.getElementById('tip-text').textContent = v.insiderTip;
  }

  // ── Fact Sheet ──
  const facts = [];
  if (v.address) facts.push({ label: 'Address', value: v.address });
  if (v.phone) facts.push({ label: 'Phone', value: v.phone });
  if (v.factSheet) facts.push(...v.factSheet);

  if (facts.length > 0) {
    document.getElementById('factsheet').style.display = '';
    document.getElementById('factsheet-grid').innerHTML = facts.map(f => `
      <div class="vd-factsheet__item">
        <div class="vd-factsheet__label">${f.label}</div>
        <div class="vd-factsheet__value">${f.value}</div>
      </div>
    `).join('');
  }

  // ── CTA ──
  if (v.bookingUrl || v.website) {
    document.getElementById('cta-wrap').style.display = '';
    const ctaBtn = document.getElementById('cta-btn');
    ctaBtn.href = v.bookingUrl || v.website;
    ctaBtn.textContent = info.sanityType === 'hotel' ? 'Reserve a Room' : 'Make a Reservation';
  }

  // ── Mobile CTA ──
  if (v.bookingUrl || v.phone) {
    document.getElementById('mobile-cta').style.display = '';
    if (v.bookingUrl) document.getElementById('mobile-reserve').href = v.bookingUrl;
    if (v.phone) document.getElementById('mobile-call').href = `tel:${v.phone}`;
  }

  // ── Map ──
  if (v.lat && v.lng && window.mapboxgl) {
    document.getElementById('location').style.display = '';
    const mapDiv = document.getElementById('venue-map');
    mapDiv.setAttribute('data-lat', v.lat);
    mapDiv.setAttribute('data-lng', v.lng);
    mapDiv.setAttribute('data-name', v.name);

    setTimeout(() => {
      mapboxgl.accessToken = 'MAPBOX_TOKEN_PLACEHOLDER';
      const map = new mapboxgl.Map({
        container: 'venue-map',
        style: 'mapbox://styles/mapbox/light-v11',
        center: [v.lng, v.lat],
        zoom: 15,
        attributionControl: false,
      });
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');
      new mapboxgl.Marker({ color: '#d4788a' })
        .setLngLat([v.lng, v.lat])
        .setPopup(new mapboxgl.Popup({ offset: 12 }).setText(v.name))
        .addTo(map);
    }, 500);
  }

  // ── Parallax hero ──
  const heroImg = document.querySelector('.vd-hero__img img');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroImg.style.transform = `translateY(${scrollY * 0.3}px) scale(1.04)`;
      }
    }, { passive: true });
  }

  // ── Tab smooth scroll ──
  document.querySelectorAll('.vd-tabs__link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        const offset = 120;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
}

// ── Run ──
loadVenue();
