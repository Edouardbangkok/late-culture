import { createServerSupabase, createServiceRoleClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const venueId = searchParams.get('venue_id')
  if (!venueId) return NextResponse.json({ saved: false, visited: false })

  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ saved: false, visited: false, authenticated: false })

  const admin = createServiceRoleClient()

  // Check today's visit
  const today = new Date().toISOString().split('T')[0]

  const [{ data: saves }, { count: visitCount }, { data: todayVisit }, { data: profile }, { count: saveCount }] = await Promise.all([
    admin.from('reactions').select('id').eq('user_id', user.id).eq('venue_sanity_id', venueId).limit(1),
    admin.from('checkins').select('id', { count: 'exact', head: true }).eq('user_id', user.id).eq('venue_sanity_id', venueId),
    admin.from('checkins').select('id').eq('user_id', user.id).eq('venue_sanity_id', venueId).gte('checked_in_at', today + 'T00:00:00Z').lte('checked_in_at', today + 'T23:59:59Z').limit(1),
    admin.from('profiles').select('xp_total, level, venues_saved, venues_visited').eq('id', user.id).single(),
    admin.from('reactions').select('id', { count: 'exact', head: true }).eq('venue_sanity_id', venueId),
  ])

  // Get ambassador
  let ambassador = null
  try {
    const { data: ambData } = await admin.rpc('get_venue_ambassador', { p_venue_id: venueId })
    if (ambData && ambData.length > 0) ambassador = ambData[0]
  } catch {}

  return NextResponse.json({
    authenticated: true,
    saved: (saves || []).length > 0,
    visitCount: visitCount || 0,
    visitedToday: (todayVisit || []).length > 0,
    saveCount: saveCount || 0,
    ambassador,
    profile: profile || { xp_total: 0, level: 1, venues_saved: 0, venues_visited: 0 },
  })
}
