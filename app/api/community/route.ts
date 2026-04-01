import { createServiceRoleClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') || ''
  const admin = createServiceRoleClient()

  if (q.length >= 2) {
    // Search by name or username
    const { data: users } = await admin.from('profiles')
      .select('username, display_name, avatar_url, level, xp_total, taste_label, venues_visited, is_og')
      .or(`display_name.ilike.%${q}%,username.ilike.%${q}%`)
      .order('xp_total', { ascending: false })
      .limit(20)

    return NextResponse.json({ users: users || [], type: 'search' })
  }

  // Default: top users by XP (leaderboard)
  const { data: users } = await admin.from('profiles')
    .select('username, display_name, avatar_url, level, xp_total, taste_label, venues_visited, is_og')
    .order('xp_total', { ascending: false })
    .limit(20)

  return NextResponse.json({ users: users || [], type: 'leaderboard' })
}
