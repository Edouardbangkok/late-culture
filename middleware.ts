import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Coming soon mode — bypass with ?preview=true (sets a 7-day cookie)
  const isPreview = request.nextUrl.searchParams.get('preview') === 'true'
  const hasCookie = request.cookies.get('lc_preview')?.value === 'true'

  // First-time preview: set cookie + show real page
  if (isPreview) {
    const targetUrl = path === '/' ? '/home.html' : path
    const response = NextResponse.rewrite(new URL(targetUrl, request.url))
    response.cookies.set('lc_preview', 'true', {
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
    })
    return response
  }

  // Returning preview user with valid cookie: show real site
  if (hasCookie) {
    if (path === '/') {
      return NextResponse.rewrite(new URL('/home.html', request.url))
    }
    return NextResponse.next()
  }

  // Public visitors: show coming soon on all gated pages
  return NextResponse.rewrite(new URL('/coming-soon.html', request.url))
}

export const config = {
  matcher: [
    '/',
    '/stay',
    '/eat',
    '/drink',
    '/party',
    '/explore',
    '/about',
    '/contact',
    '/editorial-policy',
    '/privacy',
    '/terms',
  ],
}
