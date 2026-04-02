import { createServerSupabase, createServiceRoleClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET: get user's top picks or rankings
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')
  const rankings = searchParams.get('rankings')
  const admin = createServiceRoleClient()

  // Get aggregate rankings ("Choice of the People")
  if (rankings === 'true') {
    const { data } = await admin.rpc('get_restaurant_rankings')
    return NextResponse.json({ rankings: data || [] })
  }

  // Get a specific user's top 3
  if (username) {
    const { data: profile } = await admin.from('profiles')
      .select('id, hide_top_picks')
      .eq('username', username)
      .single()

    if (!profile) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    if (profile.hide_top_picks) return NextResponse.json({ picks: [], hidden: true })

    const { data: picks } = await admin.from('top_picks')
      .select('rank, venue_sanity_id, venue_slug, venue_name')
      .eq('user_id', profile.id)
      .order('rank', { ascending: true })

    return NextResponse.json({ picks: picks || [], hidden: false })
  }

  // Get my own top 3
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const [{ data: picks }, { data: profile }] = await Promise.all([
    admin.from('top_picks')
      .select('rank, venue_sanity_id, venue_slug, venue_name')
      .eq('user_id', user.id)
      .order('rank', { ascending: true }),
    admin.from('profiles')
      .select('hide_top_picks')
      .eq('id', user.id)
      .single(),
  ])

  return NextResponse.json({ picks: picks || [], hide_top_picks: profile?.hide_top_picks || false })
}

// POST: save top 3 picks
export async function POST(request: Request) {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { picks, hide_top_picks } = await request.json()
  const admin = createServiceRoleClient()

  // Update privacy toggle
  if (hide_top_picks !== undefined) {
    await admin.from('profiles').update({ hide_top_picks }).eq('id', user.id)
  }

  // Update picks (delete all then re-insert)
  if (picks && Array.isArray(picks)) {
    await admin.from('top_picks').delete().eq('user_id', user.id)

    const inserts = picks
      .filter((p: any) => p.venue_sanity_id && p.rank >= 1 && p.rank <= 3)
      .map((p: any) => ({
        user_id: user.id,
        rank: p.rank,
        venue_sanity_id: p.venue_sanity_id,
        venue_type: 'restaurant',
        venue_slug: p.venue_slug,
        venue_name: p.venue_name,
      }))

    if (inserts.length > 0) {
      await admin.from('top_picks').insert(inserts)
    }
  }

  return NextResponse.json({ success: true })
}
