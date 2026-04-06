import { createServerSupabase, createServiceRoleClient } from '@/lib/supabase/server'
import { client } from '@/sanity/lib/client'
import { NextResponse } from 'next/server'

export async function GET() {
  // 1. Fetch editorial posts from Sanity (visible to everyone)
  let editorialPosts: any[] = []
  try {
    editorialPosts = await client.fetch(`
      *[_type == "editorialPost"] | order(publishedAt desc)[0...10] {
        _id, caption, postType, "image": image.asset->url, videoUrl,
        publishedAt, author,
        "venues": linkedVenues[]->{ _id, _type, name, "slug": slug.current, neighborhood }
      }
    `)
  } catch (e) {
    console.error('Failed to fetch editorial posts:', e)
  }

  // Format editorial posts as feed items
  const editorialItems = (editorialPosts || []).map((post: any) => ({
    type: 'editorial',
    postType: post.postType,
    caption: post.caption,
    image: post.image,
    videoUrl: post.videoUrl,
    author: post.author || 'Late Culture',
    venues: post.venues || [],
    date: post.publishedAt,
  }))

  // 2. Fetch user activity (requires auth)
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    // Return editorial posts only for unauthenticated users
    return NextResponse.json({
      items: [],
      editorial: editorialItems,
      empty: true,
      message: 'Sign in to see friend activity.',
    })
  }

  const admin = createServiceRoleClient()

  // Get list of people I follow
  const { data: following } = await admin.from('follows')
    .select('following_id')
    .eq('follower_id', user.id)

  const followingIds = (following || []).map((f: any) => f.following_id)

  if (followingIds.length === 0) {
    return NextResponse.json({
      items: [],
      editorial: editorialItems,
      empty: true,
      message: 'Follow people to see their activity here.',
    })
  }

  // Get recent activity from people I follow: checkins + saves
  const [{ data: checkins }, { data: saves }] = await Promise.all([
    admin.from('checkins')
      .select('user_id, venue_name, venue_type, venue_slug, highlight, checked_in_at, profiles(username, display_name, avatar_url)')
      .in('user_id', followingIds)
      .order('checked_in_at', { ascending: false })
      .limit(30),
    admin.from('reactions')
      .select('user_id, venue_sanity_id, venue_type, venue_slug, venue_name, created_at, profiles(username, display_name, avatar_url)')
      .in('user_id', followingIds)
      .eq('reaction_type', 'save')
      .order('created_at', { ascending: false })
      .limit(20),
  ])

  // Merge and sort by date
  const items: any[] = []

  for (const c of checkins || []) {
    const p = (c as any).profiles
    items.push({
      type: 'visit',
      user: { username: p?.username, display_name: p?.display_name, avatar_url: p?.avatar_url },
      venue_name: c.venue_name,
      venue_type: c.venue_type,
      venue_slug: c.venue_slug,
      highlight: c.highlight,
      date: c.checked_in_at,
    })
  }

  for (const s of saves || []) {
    const p = (s as any).profiles
    items.push({
      type: 'save',
      user: { username: p?.username, display_name: p?.display_name, avatar_url: p?.avatar_url },
      venue_name: s.venue_name || s.venue_sanity_id,
      venue_type: s.venue_type,
      venue_slug: s.venue_slug,
      date: s.created_at,
    })
  }

  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return NextResponse.json({
    items: items.slice(0, 30),
    editorial: editorialItems,
    empty: false,
  })
}
