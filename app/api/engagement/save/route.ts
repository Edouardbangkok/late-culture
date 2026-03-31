import { createServerSupabase, createServiceRoleClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { XP_VALUES } from '@/lib/gamification/xp'

export async function POST(request: Request) {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { venue_id, venue_type, venue_slug } = await request.json()
  if (!venue_id) return NextResponse.json({ error: 'Missing venue_id' }, { status: 400 })

  const admin = createServiceRoleClient()

  // Check if already saved
  const { data: existing } = await admin.from('reactions')
    .select('id')
    .eq('user_id', user.id)
    .eq('venue_sanity_id', venue_id)
    .eq('reaction_type', 'save')
    .limit(1)

  if (existing && existing.length > 0) {
    // Unsave
    await admin.from('reactions').delete().eq('id', existing[0].id)
    await admin.rpc('update_venue_counters', { p_user_id: user.id })
    return NextResponse.json({ saved: false, xp_gained: 0 })
  }

  // Save
  await admin.from('reactions').insert({
    user_id: user.id,
    venue_sanity_id: venue_id,
    venue_type: venue_type || 'unknown',
    venue_slug: venue_slug || venue_id,
    reaction_type: 'save',
  })

  // Award XP
  const { data: xpResult } = await admin.rpc('award_xp', {
    p_user_id: user.id,
    p_action: 'save',
    p_xp_amount: XP_VALUES.SAVE,
    p_source_id: venue_id,
    p_source_type: 'venue',
  })

  // Update counters
  await admin.rpc('update_venue_counters', { p_user_id: user.id })

  return NextResponse.json({
    saved: true,
    xp_gained: xpResult?.xp_gained || 0,
    total_xp: xpResult?.total_xp || 0,
    level: xpResult?.level || 1,
  })
}
