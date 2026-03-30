import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Homepage — serve home.html without redirect
  if (path === '/') {
    return NextResponse.rewrite(new URL('/home.html', request.url))
  }
}

export const config = {
  matcher: ['/'],
}
