import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Homepage rewrite
  if (path === '/') {
    return NextResponse.rewrite(new URL('/home.html', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/'],
}
