import { createServerSupabase, createServiceRoleClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()

  const admin = createServiceRoleClient()

  // Get all active curated collections
  const { data: collections } = await admin.from('curated_collections')
    .select('*, curated_collection_items(venue_sanity_id, venue_type, venue_slug, venue_name)')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (!collections) return NextResponse.json({ collections: [] })

  // If user is logged in, get their progress
  let progressMap: Record<string, Set<string>> = {}
  if (user) {
    const { data: progress } = await admin.from('user_collection_progress')
      .select('collection_id, venue_sanity_id')
      .eq('user_id', user.id)

    if (progress) {
      for (const p of progress) {
        if (!progressMap[p.collection_id]) progressMap[p.collection_id] = new Set()
        progressMap[p.collection_id].add(p.venue_sanity_id)
      }
    }
  }

  const result = collections.map(c => {
    const items = c.curated_collection_items || []
    const visited = progressMap[c.id] ? progressMap[c.id].size : 0
    return {
      id: c.id,
      slug: c.slug,
      title: c.title,
      description: c.description,
      icon: c.icon,
      category: c.category,
      venue_count: items.length,
      visited_count: visited,
      progress: items.length > 0 ? visited / items.length : 0,
      reward_xp: c.reward_xp,
      completed: items.length > 0 && visited >= items.length,
    }
  })

  return NextResponse.json({ collections: result, authenticated: !!user })
}
