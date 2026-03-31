import { createServerSupabase } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const venueId = searchParams.get('venue_id')
  if (!venueId) return NextResponse.json({ saved: false, visited: false })

  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ saved: false, visited: false, authenticated: false })

  const [{ data: saves }, { data: visits }, { data: profile }] = await Promise.all([
    supabase.from('reactions').select('id').eq('user_id', user.id).eq('venue_sanity_id', venueId).limit(1),
    supabase.from('checkins').select('id').eq('user_id', user.id).eq('venue_sanity_id', venueId).limit(1),
    supabase.from('profiles').select('xp_total, level, venues_saved, venues_visited').eq('id', user.id).single(),
  ])

  // Get total save count for this venue (all users)
  const { count: saveCount } = await supabase.from('reactions').select('id', { count: 'exact', head: true }).eq('venue_sanity_id', venueId)

  return NextResponse.json({
    authenticated: true,
    saved: (saves || []).length > 0,
    visited: (visits || []).length > 0,
    saveCount: saveCount || 0,
    profile: profile || { xp_total: 0, level: 1, venues_saved: 0, venues_visited: 0 },
  })
}
