import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async rewrites() {
    return [
      // Venue detail pages (must come BEFORE listing pages)
      { source: '/stay/:slug', destination: '/venue-detail.html' },
      { source: '/eat/:slug', destination: '/venue-detail.html' },
      { source: '/drink/:slug', destination: '/venue-detail.html' },
      { source: '/party/:slug', destination: '/venue-detail.html' },
    ]
  },
}

export default nextConfig
