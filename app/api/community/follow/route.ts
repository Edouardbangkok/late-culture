import { createServerSupabase, createServiceRoleClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { username } = await request.json()
  if (!username) return NextResponse.json({ error: 'Missing username' }, { status: 400 })

  const admin = createServiceRoleClient()

  // Get target user id
  const { data: target } = await admin.from('profiles').select('id').eq('username', username).single()
  if (!target) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  if (target.id === user.id) return NextResponse.json({ error: 'Cannot follow yourself' }, { status: 400 })

  // Check if already following
  const { data: existing } = await admin.from('follows')
    .select('id')
    .eq('follower_id', user.id)
    .eq('following_id', target.id)
    .limit(1)

  if (existing && existing.length > 0) {
    // Unfollow
    await admin.from('follows').delete().eq('id', existing[0].id)
    return NextResponse.json({ following: false })
  }

  // Follow
  await admin.from('follows').insert({ follower_id: user.id, following_id: target.id })
  return NextResponse.json({ following: true })
}

// GET: check follow status + counts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')
  if (!username) return NextResponse.json({ error: 'Missing username' }, { status: 400 })

  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  const admin = createServiceRoleClient()

  const { data: target } = await admin.from('profiles').select('id').eq('username', username).single()
  if (!target) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const [{ count: followers }, { count: following }] = await Promise.all([
    admin.from('follows').select('id', { count: 'exact', head: true }).eq('following_id', target.id),
    admin.from('follows').select('id', { count: 'exact', head: true }).eq('follower_id', target.id),
  ])

  let isFollowing = false
  if (user) {
    const { data: f } = await admin.from('follows').select('id').eq('follower_id', user.id).eq('following_id', target.id).limit(1)
    isFollowing = (f || []).length > 0
  }

  return NextResponse.json({ followers: followers || 0, following: following || 0, isFollowing })
}
