/* ── Late Culture Badge Evaluation ── */

import { SupabaseClient } from '@supabase/supabase-js'

interface BadgeCheck {
  id: string
  condition: (ctx: BadgeContext) => boolean
}

interface BadgeContext {
  totalCheckins: number
  totalSaves: number
  checkinsByType: Record<string, number>
  checkinsByNeighborhood: Record<string, number>
  checkinsByCategory: Record<string, number>
  checkinsByVenue: Record<string, number>
  level: number
  hasNote: boolean
  hasCollection: boolean
  consecutiveVoteWeeks: number
  bangkokHours: number[]
}

const BADGE_CHECKS: BadgeCheck[] = [
  { id: 'first_door', condition: ctx => ctx.totalCheckins >= 1 },
  { id: 'night_walker', condition: ctx => ctx.totalCheckins >= 10 },
  { id: 'neighbourhood', condition: ctx => Object.values(ctx.checkinsByNeighborhood).some(c => c >= 5) },
  { id: 'the_palate', condition: ctx => (ctx.checkinsByType['restaurant'] || 0) >= 5 },
  { id: 'the_pour', condition: ctx => (ctx.checkinsByType['bar'] || 0) >= 5 },
  { id: 'the_suite', condition: ctx => (ctx.checkinsByType['hotel'] || 0) >= 3 },
  { id: 'after_dark', condition: ctx => (ctx.checkinsByType['party'] || 0) >= 3 },
  { id: 'the_full_set', condition: ctx =>
    (ctx.checkinsByType['hotel'] || 0) >= 1 &&
    (ctx.checkinsByType['restaurant'] || 0) >= 1 &&
    (ctx.checkinsByType['bar'] || 0) >= 1 &&
    (ctx.checkinsByType['party'] || 0) >= 1
  },
  { id: 'golden_hour', condition: ctx => ctx.bangkokHours.some(h => h >= 17 && h <= 18) },
  { id: 'midnight', condition: ctx => ctx.bangkokHours.some(h => h >= 0 && h <= 3) },
  { id: 'regular', condition: ctx => Object.values(ctx.checkinsByVenue).some(c => c >= 3) },
  { id: 'first_note', condition: ctx => ctx.hasNote },
  { id: 'curator', condition: ctx => ctx.hasCollection },
  { id: 'the_voice', condition: ctx => ctx.consecutiveVoteWeeks >= 4 },
  { id: 'level_5', condition: ctx => ctx.level >= 5 },
  { id: 'level_10', condition: ctx => ctx.level >= 10 },
  { id: 'level_20', condition: ctx => ctx.level >= 20 },
  // Secret badges
  { id: 'speakeasy', condition: ctx => (ctx.checkinsByCategory['Behind the Door'] || 0) >= 3 },
  { id: 'river_rat', condition: ctx => (ctx.checkinsByCategory['River & Water'] || 0) >= 3 },
]

export async function evaluateBadges(supabase: SupabaseClient, userId: string): Promise<string[]> {
  // Fetch user data
  const [
    { data: checkins },
    { data: saves },
    { data: existingBadges },
    { data: profile },
    { data: notes },
    { data: collections },
  ] = await Promise.all([
    supabase.from('checkins').select('venue_sanity_id, venue_type, venue_neighborhood, venue_category, bangkok_hour').eq('user_id', userId),
    supabase.from('reactions').select('venue_sanity_id').eq('user_id', userId),
    supabase.from('user_badges').select('badge_id').eq('user_id', userId),
    supabase.from('profiles').select('level').eq('id', userId).single(),
    supabase.from('insider_notes').select('id').eq('user_id', userId).limit(1),
    supabase.from('collections').select('id').eq('user_id', userId).limit(1),
  ])

  const alreadyEarned = new Set((existingBadges || []).map(b => b.badge_id))

  // Build context
  const checkinsByType: Record<string, number> = {}
  const checkinsByNeighborhood: Record<string, number> = {}
  const checkinsByCategory: Record<string, number> = {}
  const checkinsByVenue: Record<string, number> = {}
  const bangkokHours: number[] = []

  for (const c of checkins || []) {
    checkinsByType[c.venue_type] = (checkinsByType[c.venue_type] || 0) + 1
    if (c.venue_neighborhood) checkinsByNeighborhood[c.venue_neighborhood] = (checkinsByNeighborhood[c.venue_neighborhood] || 0) + 1
    if (c.venue_category) checkinsByCategory[c.venue_category] = (checkinsByCategory[c.venue_category] || 0) + 1
    checkinsByVenue[c.venue_sanity_id] = (checkinsByVenue[c.venue_sanity_id] || 0) + 1
    if (c.bangkok_hour != null) bangkokHours.push(c.bangkok_hour)
  }

  const ctx: BadgeContext = {
    totalCheckins: (checkins || []).length,
    totalSaves: (saves || []).length,
    checkinsByType,
    checkinsByNeighborhood,
    checkinsByCategory,
    checkinsByVenue,
    level: profile?.level || 1,
    hasNote: (notes || []).length > 0,
    hasCollection: (collections || []).length > 0,
    consecutiveVoteWeeks: 0, // TODO: implement vote streak counting
    bangkokHours,
  }

  // Check each badge
  const newBadges: string[] = []
  for (const check of BADGE_CHECKS) {
    if (!alreadyEarned.has(check.id) && check.condition(ctx)) {
      const { error } = await supabase.from('user_badges').insert({ user_id: userId, badge_id: check.id })
      if (!error) newBadges.push(check.id)
    }
  }

  return newBadges
}
