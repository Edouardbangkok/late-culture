import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Coming soon mode — bypass with ?preview=true or cookie
  const isPreview = request.nextUrl.searchParams.get('preview') === 'true'
  const hasCookie = request.cookies.get('lc_preview')?.value === 'true'

  if (isPreview) {
    const response = NextResponse.redirect(new URL(path === '/' ? '/' : path, request.url))
    response.cookies.set('lc_preview', 'true', { maxAge: 60 * 60 * 24 * 7 })
    // After setting cookie, rewrite to real page
    return NextResponse.rewrite(new URL(path === '/' ? '/home.html' : path, request.url), {
      headers: { 'Set-Cookie': 'lc_preview=true; Path=/; Max-Age=604800' },
    })
  }

  if (hasCookie) {
    if (path === '/') {
      return NextResponse.rewrite(new URL('/home.html', request.url))
    }
    return NextResponse.next()
  }

  // Public visitors see coming soon on ALL pages
  return NextResponse.rewrite(new URL('/coming-soon.html', request.url))
}

export const config = {
  matcher: ['/', '/stay', '/eat', '/drink', '/party', '/explore', '/about', '/contact', '/editorial-policy'],
}
