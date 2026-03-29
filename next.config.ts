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
      { source: '/', destination: '/home.html' },
      { source: '/stay', destination: '/stay-page.html' },
      { source: '/eat', destination: '/eat-page.html' },
      { source: '/drink', destination: '/drink-page.html' },
      { source: '/party', destination: '/party-page.html' },
      { source: '/explore', destination: '/explore-page.html' },
    ]
  },
}

export default nextConfig
