import { createServiceRoleClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { calculateLevel } from '@/lib/gamification/xp'

export async function GET(request: Request, { params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const admin = createServiceRoleClient()

  const { data: profile } = await admin.from('profiles')
    .select('*')
    .eq('username', username)
    .single()

  if (!profile) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const [{ data: badges }, { data: checkins }] = await Promise.all([
    admin.from('user_badges')
      .select('badge_id, earned_at, badges(name, description, icon, category)')
      .eq('user_id', profile.id),
    admin.from('checkins')
      .select('venue_name, venue_type, checked_in_at')
      .eq('user_id', profile.id)
      .order('checked_in_at', { ascending: false })
      .limit(10),
  ])

  const levelInfo = calculateLevel(profile.xp_total || 0)

  return NextResponse.json({
    profile: {
      username: profile.username,
      display_name: profile.display_name,
      avatar_url: profile.avatar_url,
      taste_label: profile.taste_label,
      venues_saved: profile.venues_saved,
      venues_visited: profile.venues_visited,
      is_og: profile.is_og,
      created_at: profile.created_at,
      ...levelInfo,
    },
    badges: (badges || []).map((b: any) => ({
      id: b.badge_id,
      earned_at: b.earned_at,
      ...(b.badges || {}),
    })),
    recentVisits: checkins || [],
  })
}
