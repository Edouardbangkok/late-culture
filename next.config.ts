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
      // Venue detail pages handled by app/[section]/[slug]/page.tsx (SSR)
      // Listing pages
      { source: '/stay', destination: '/stay-page.html' },
      { source: '/eat', destination: '/eat-page.html' },
      { source: '/drink', destination: '/drink-page.html' },
      { source: '/party', destination: '/party-page.html' },
      { source: '/explore', destination: '/explore-page.html' },
      { source: '/about', destination: '/about-page.html' },
      { source: '/contact', destination: '/contact-page.html' },
      { source: '/editorial-policy', destination: '/editorial-policy-page.html' },
      { source: '/privacy', destination: '/privacy-page.html' },
      { source: '/terms', destination: '/terms-page.html' },
    ]
  },
}

export default nextConfig
