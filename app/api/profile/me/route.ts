import { createServerSupabase, createServiceRoleClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { calculateLevel } from '@/lib/gamification/xp'

export async function GET() {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const admin = createServiceRoleClient()

  const [
    { data: profile },
    { data: earnedBadges },
    { data: allBadges },
    { data: recentXp },
    { data: venueVisits },
  ] = await Promise.all([
    admin.from('profiles').select('*').eq('id', user.id).single(),
    admin.from('user_badges').select('badge_id, earned_at').eq('user_id', user.id),
    admin.from('badges').select('id, name, description, icon, category, is_secret, sort_order').order('sort_order', { ascending: true }),
    admin.from('xp_logs').select('action, xp_amount, source_id, created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10),
    admin.rpc('get_user_venue_visits', { p_user_id: user.id }).then((r: any) => r).catch(() => ({ data: [] })),
  ])

  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 })

  const levelInfo = calculateLevel(profile.xp_total || 0)
  const earnedIds = new Set((earnedBadges || []).map((b: any) => b.badge_id))
  const earnedMap: Record<string, string> = {}
  for (const b of earnedBadges || []) earnedMap[b.badge_id] = b.earned_at

  // Build full badge list: earned + locked (hide secret badges that are not earned)
  const badges = (allBadges || [])
    .filter((b: any) => !b.is_secret || earnedIds.has(b.id))
    .map((b: any) => ({
      id: b.id,
      name: b.name,
      description: b.description,
      icon: b.icon,
      category: b.category,
      earned: earnedIds.has(b.id),
      earned_at: earnedMap[b.id] || null,
    }))

  // Progression hints
  const progression: any[] = []
  const visited = profile.venues_visited || 0
  const saved = profile.venues_saved || 0

  if (visited < 1) progression.push({ text: 'Visit your first venue to earn the First Door badge', badge: 'first_door' })
  else if (visited < 10) progression.push({ text: (10 - visited) + ' more visits to earn Night Walker', badge: 'night_walker' })
  if (saved < 5) progression.push({ text: (5 - saved) + ' more saves to go' })

  return NextResponse.json({
    profile: {
      ...profile,
      ...levelInfo,
      email: user.email,
      avatar_url: profile.avatar_url || user.user_metadata?.avatar_url || null,
    },
    badges,
    recentXp: recentXp || [],
    venueVisits: venueVisits || [],
    progression,
  })
}
