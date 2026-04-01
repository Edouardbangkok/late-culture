import { createServerSupabase, createServiceRoleClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { XP_VALUES } from '@/lib/gamification/xp'
import { evaluateBadges } from '@/lib/gamification/badges'

export async function POST(request: Request) {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { venue_id, venue_type, venue_slug, venue_name, venue_neighborhood, venue_category, venue_lat, venue_lng } = await request.json()
  if (!venue_id) return NextResponse.json({ error: 'Missing venue_id' }, { status: 400 })

  const admin = createServiceRoleClient()

  // Check if already visited TODAY (allow multiple visits on different days)
  const today = new Date().toISOString().split('T')[0]
  const { data: todayVisit } = await admin.from('checkins')
    .select('id')
    .eq('user_id', user.id)
    .eq('venue_sanity_id', venue_id)
    .gte('checked_in_at', today + 'T00:00:00Z')
    .lte('checked_in_at', today + 'T23:59:59Z')
    .limit(1)

  if (todayVisit && todayVisit.length > 0) {
    return NextResponse.json({ visited: true, xp_gained: 0, already_today: true })
  }

  // Check total visits for first-time XP vs return XP
  const { count: totalVisits } = await admin.from('checkins')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('venue_sanity_id', venue_id)

  const isFirstVisit = (totalVisits || 0) === 0

  // Create checkin
  await admin.from('checkins').insert({
    user_id: user.id,
    venue_sanity_id: venue_id,
    venue_type: venue_type || 'unknown',
    venue_slug: venue_slug || venue_id,
    venue_name: venue_name || '',
    venue_neighborhood: venue_neighborhood || '',
    venue_category: venue_category || '',
    venue_lat: venue_lat || null,
    venue_lng: venue_lng || null,
  })

  // Award XP — first visit: 15 XP, return visit: 5 XP
  const xpAmount = isFirstVisit ? XP_VALUES.VISIT : 5
  const actionType = isFirstVisit ? 'visit' : 'return_visit'
  const { data: xpResult } = await admin.rpc('award_xp', {
    p_user_id: user.id,
    p_action: actionType,
    p_xp_amount: xpAmount,
    p_source_id: venue_id + '_' + today,
    p_source_type: 'venue',
  })

  // Update counters
  await admin.rpc('update_venue_counters', { p_user_id: user.id })

  // Evaluate badges
  const newBadges = await evaluateBadges(admin, user.id)

  // Check collection progress
  const { data: collectionItems } = await admin.from('curated_collection_items')
    .select('collection_id')
    .eq('venue_sanity_id', venue_id)

  if (collectionItems && collectionItems.length > 0) {
    for (const item of collectionItems) {
      await admin.from('user_collection_progress').upsert({
        user_id: user.id,
        collection_id: item.collection_id,
        venue_sanity_id: venue_id,
      }, { onConflict: 'user_id,collection_id,venue_sanity_id' })
    }
  }

  return NextResponse.json({
    visited: true,
    xp_gained: xpResult?.xp_gained || 0,
    total_xp: xpResult?.total_xp || 0,
    level: xpResult?.level || 1,
    new_badges: newBadges,
  })
}
