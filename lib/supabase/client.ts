import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    // During build/SSG prerendering, env vars may not be available
    // Return a mock that won't crash
    console.warn('[Supabase] Missing env vars — client not initialized')
    return null as any
  }

  return createBrowserClient(url, key)
}
