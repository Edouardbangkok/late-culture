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
    { data: badges },
    { data: recentXp },
  ] = await Promise.all([
    admin.from('profiles').select('*').eq('id', user.id).single(),
    admin.from('user_badges').select('badge_id, earned_at, badges(name, description, icon, category, is_secret)').eq('user_id', user.id),
    admin.from('xp_logs').select('action, xp_amount, source_id, created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10),
  ])

  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 })

  const levelInfo = calculateLevel(profile.xp_total || 0)

  // Progression hints
  const progression: any[] = []
  const visited = profile.venues_visited || 0
  const saved = profile.venues_saved || 0

  if (visited < 1) progression.push({ text: 'Visit your first venue to earn the First Door badge', badge: 'first_door' })
  else if (visited < 10) progression.push({ text: `${10 - visited} more visits to earn Night Walker`, badge: 'night_walker' })
  if (saved < 5) progression.push({ text: `${5 - saved} more saves to go`, badge: null })

  return NextResponse.json({
    profile: {
      ...profile,
      ...levelInfo,
      email: user.email,
      avatar_url: profile.avatar_url || user.user_metadata?.avatar_url || null,
    },
    badges: (badges || []).map((b: any) => ({
      id: b.badge_id,
      earned_at: b.earned_at,
      ...(b.badges || {}),
    })),
    recentXp: recentXp || [],
    progression,
  })
}
