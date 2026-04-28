# Late Culture — Technical Handover

This document covers everything your technical partner needs to take over and operate the Late Culture platform.

---

## 1. Tech Stack Overview

Late Culture is split into three main systems:

```
┌─────────────────────────┐     ┌─────────────────────────┐
│  Website (lateculture.com)  │     │   Mobile App (iOS + Android)  │
│  Next.js 15 + Static HTML   │     │   React Native + Expo (planned)│
└──────────┬──────────────┘     └──────────┬──────────────┘
           │                                 │
           ▼                                 ▼
   ┌──────────────────────────────────────────────┐
   │           SHARED BACKEND                      │
   ├──────────────────────────────────────────────┤
   │  Sanity CMS (sa9u2hue) — venue content       │
   │  Supabase (gwwqzmepcppmqzlyywjq) — users     │
   │  Google Analytics (G-K0YNWJ9Q7G)             │
   │  Google Maps + OAuth                          │
   └──────────────────────────────────────────────┘
```

### Website
- **Framework**: Next.js 15 (App Router) + static HTML pages in `/public`
- **Hosting**: Vercel (auto-deploy from GitHub `main` branch)
- **Domain**: lateculture.com (DNS managed by Vercel)
- **Hybrid architecture**: Static HTML for landing/listing pages, SSR for venue detail pages (`/[section]/[slug]`)

### CMS
- **Sanity CMS** — `https://www.sanity.io/manage/personal/project/sa9u2hue`
- Hosts all venue content (restaurants, hotels, bars, parties, articles, subscribers)
- Sanity Studio embedded at `lateculture.com/studio`

### Database & Auth
- **Supabase** — `https://supabase.com/dashboard/project/gwwqzmepcppmqzlyywjq`
- PostgreSQL database for user accounts (mobile app gamification)
- Google OAuth provider configured
- Region: Singapore (Southeast Asia)

### Maps
- **Google Maps JavaScript API** — used on homepage, explore, and venue detail pages
- API Key: `AIzaSyAFGItApCRlk255y2iiemM7PnmnIjq7JJU`
- Custom LC pink teardrop pins matching brand identity

### Analytics
- **Google Analytics 4** — `G-K0YNWJ9Q7G`
- Installed on every page via `<script>` tag

---

## 2. Repository

GitHub: **`Edouardbangkok/late-culture`**

```
late-culture-next/
├── app/                      # Next.js App Router pages
│   ├── [section]/[slug]/    # SSR venue detail pages
│   ├── api/                  # API routes (config, subscribe)
│   ├── auth/callback/       # Supabase OAuth callback
│   ├── login/, signup/      # Auth pages
│   ├── studio/              # Embedded Sanity Studio
│   ├── layout.tsx           # Root layout (favicon, metadata)
│   ├── sitemap.ts           # Dynamic sitemap (queries Sanity)
│   └── globals.css
├── public/                   # Static HTML pages
│   ├── home.html            # Homepage
│   ├── eat-page.html        # Listing pages
│   ├── stay-page.html
│   ├── drink-page.html
│   ├── party-page.html
│   ├── about-page.html
│   ├── contact-page.html
│   ├── editorial-policy-page.html
│   ├── privacy-page.html
│   ├── terms-page.html
│   ├── coming-soon.html     # Pre-launch landing
│   ├── css/                 # Stylesheets (variables, glass, sections, etc.)
│   ├── js/                  # Client scripts (app.js, auth-nav.js)
│   └── assets/              # SVGs and brand assets
├── sanity/                   # Sanity CMS schemas
│   ├── schemaTypes/         # restaurant, bar, hotel, party, article, subscriber
│   └── lib/client.ts        # Sanity client config
├── supabase/migrations/     # PostgreSQL migrations
├── lib/                     # Shared utilities
│   ├── auth/AuthProvider.tsx
│   └── supabase/            # Browser + server clients
├── middleware.ts            # Homepage rewrite
├── next.config.ts           # URL rewrites for static pages
├── BRAND.md                 # Brand voice & colour system
└── HANDOVER.md              # This document
```

---

## 3. Environment Variables

The website needs these env vars set in **Vercel → Settings → Environment Variables**:

| Variable | Value | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `sa9u2hue` | Sanity project |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Sanity dataset |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-01-01` | Sanity API version |
| `SANITY_WRITE_TOKEN` | (from Sanity → API → Tokens) | Newsletter subscriber writes |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://gwwqzmepcppmqzlyywjq.supabase.co` | Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (from Supabase → Settings → API) | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | (from Supabase → Settings → API) | Server-side admin key |

For local development, copy `.env.local` from Edouard.

---

## 4. Access Handover Checklist

Give your partner access to each service:

### GitHub
- Go to `github.com/Edouardbangkok/late-culture` → Settings → Collaborators → **Add people** → invite by email/username
- Grant **Admin** or **Maintain** role

### Vercel
- Go to `vercel.com/edouardbangkok/late-culture-2q89` → Settings → **Members** → **Invite Member**
- Grant **Owner** or **Member** role
- Note: Vercel pulls from GitHub, so deployments happen automatically

### Sanity
- Go to `sanity.io/manage/personal/project/sa9u2hue` → Members → **Invite members**
- Grant **Administrator** role
- They will be able to edit venues, articles, and subscribers via Sanity Studio

### Supabase
- Go to `supabase.com/dashboard/project/gwwqzmepcppmqzlyywjq` → Settings → Team → **Invite Member**
- Grant **Owner** or **Developer** role

### Google Cloud Console (OAuth + Maps API)
- Go to `console.cloud.google.com` → Late Culture project → IAM & Admin → **Grant access**
- Add their Google email
- Grant **Owner** or **Editor** role
- This includes:
  - OAuth Client (for Google Sign-In)
  - Maps JavaScript API key
  - Search Console verification

### Google Analytics 4
- Go to `analytics.google.com` → Admin (gear icon) → Account Access Management
- **Add user** → grant **Administrator** role on the property `G-K0YNWJ9Q7G`

### Google Search Console
- Go to `search.google.com/search-console` → Settings → Users and permissions → **Add user**
- Add their email, grant **Owner** role for `lateculture.com`

### Domain (Vercel DNS)
- Already managed via Vercel — once they have Vercel access, they have DNS access

### Mobile App (when started)
- Apple Developer account: `developer.apple.com` → Users and Access → invite
- Google Play Console: `play.google.com/console` → Settings → Users and permissions → invite

---

## 5. How to Operate the Site

### Adding a venue
**Recommended method**: use the Claude Code `/add-venue` skill in `~/.claude/skills/add-venue/SKILL.md`.

**Manual method**: open `lateculture.com/studio` → click the section (Restaurants, Hotels, Bars, Parties) → **Create new** → fill all fields → click **Publish**.

Required fields per venue:
- `name`, `slug` (auto-generated from name)
- `category` + optional `categories[]` (multi-tag)
- `neighborhood`
- `excerpt` (1-2 sentences for the card)
- `overview` (3-5 sentences for the detail page)
- `insiderTip` (specific actionable advice)
- `address`, `phone`, `website`, `bookingUrl`
- `lat`, `lng` (for the map)
- `heroImage` (high-res photo, ideally 1600px+ wide)
- Type-specific: `cuisine`, `priceRange`, `chef` (restaurants), `architect`, `rooms` (hotels), `signature`, `dressCode` (bars/parties)

The site auto-revalidates every 60 seconds, so changes appear within a minute.

### Editing brand voice
Read `BRAND.md` in the repo root. It documents:
- The 6 principles (Calm, Precise, Observational, Confident, Institutional, Analytical)
- Banned words (hidden gem, instagrammable, vibes, etc.)
- Colour palette (locked)
- Tagline

### Deployment
**Automatic**: every `git push` to the `main` branch triggers a Vercel deploy in 2-3 minutes.

**Local development**:
```bash
git clone https://github.com/Edouardbangkok/late-culture
cd late-culture
npm install
# Copy .env.local from Edouard
npm run dev
# Open http://localhost:3000
```

### Newsletter subscribers
Every email submitted on the site goes to **Sanity → Subscribers** with a `source` field:
- `homepage` — main footer signup
- `app-waitlist` — Get the App CTA on venue pages
- `coming-soon` — pre-launch landing page

Export them via Sanity Studio or by querying:
```bash
curl "https://sa9u2hue.api.sanity.io/v2024-01-01/data/query/production?query=*[_type=='subscriber']"
```

---

## 6. SEO Configuration

| Item | Status |
|------|--------|
| GA4 (G-K0YNWJ9Q7G) | ✅ Installed on all pages |
| Google Search Console | ✅ Verified for lateculture.com |
| Sitemap | ✅ Dynamic — `/sitemap.xml` (queries Sanity) |
| robots.txt | ✅ at `/public/robots.txt` |
| Schema.org structured data | ✅ Restaurant/Hotel/Bar/NightClub on venue pages |
| Privacy Policy | ✅ `/privacy` |
| Terms of Service | ✅ `/terms` |
| Open Graph tags | ✅ Per page (unique title + description) |
| Canonical URLs | ✅ Per page |
| Favicon (LC pink) | ✅ SVG + ICO + PNGs |

---

## 7. Known Gaps & Roadmap

### Pending
- **Photos on venues** — currently no hero images (waiting for venue photos to be sourced/requested)
- **Best of articles** — SEO content (Best rooftop bars Bangkok, etc.) not yet written
- **Neighborhood pages** — `/silom`, `/thonglor` etc. not built
- **Affiliate booking** — Agoda/Booking.com integrations on hotel pages
- **Mobile app** — not yet built (prompt prepared in `LATE-CULTURE-APP-PROMPT.md` on Edouard's desktop)
- **Performance optimizations** — CSS/JS not minified, images not converted to WebP

### Site is in "live" mode
The middleware (`middleware.ts`) currently routes `/` to `home.html`. There is no coming-soon gate — public visitors see the full site.

To re-enable coming-soon mode, restore the gate logic in `middleware.ts` (see git history for the previous version).

---

## 8. Important Contacts & URLs

| Service | URL | Identifier |
|---------|-----|-----------|
| Production site | https://lateculture.com | — |
| Vercel project | vercel.com/edouardbangkok/late-culture-2q89 | `prj_uVWY5u7UTa4liBrHPfzSQkPT5gor` |
| GitHub repo | github.com/Edouardbangkok/late-culture | — |
| Sanity Studio | https://lateculture.com/studio | Project `sa9u2hue` |
| Supabase | supabase.com/dashboard/project/gwwqzmepcppmqzlyywjq | Region: Singapore |
| Google Analytics | analytics.google.com | Property `G-K0YNWJ9Q7G` |
| Search Console | search.google.com/search-console | `lateculture.com` |
| Email | hi@lateculture.com | Phone: +66 83 906 0774 |

---

## 9. Quick Commands Reference

```bash
# Local dev
npm run dev

# Build production
npm run build

# Run production build locally
npm start

# Add a venue draft via Sanity API (from CLI)
curl -X POST "https://sa9u2hue.api.sanity.io/v2024-01-01/data/mutate/production" \
  -H "Authorization: Bearer $SANITY_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mutations":[{"create":{"_type":"restaurant","name":"...",...}}]}'

# Trigger a redeploy without code changes
git commit --allow-empty -m "trigger redeploy" && git push
```

---

## 10. What to Tell Your Partner

Send them this exact message:

> Hi, I'm handing off the technical operations of Late Culture Bangkok to you. The full handover doc is in the repo at `HANDOVER.md`. Read sections 1-5 first to understand the stack, then follow section 4 to get access to all the services. The site is live at lateculture.com. Content is added via Sanity Studio at lateculture.com/studio. Deployments happen automatically on git push to main. Brand voice is locked in BRAND.md — no exceptions. Let me know once you have access to GitHub, Vercel, Sanity, Supabase, Google Cloud, and Analytics.

---

*Last updated: April 2026*
