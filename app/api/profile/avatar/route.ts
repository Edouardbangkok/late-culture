import { createServerSupabase, createServiceRoleClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { avatar_url } = await request.json()
  if (!avatar_url) return NextResponse.json({ error: 'Missing avatar_url' }, { status: 400 })

  const admin = createServiceRoleClient()
  const { error } = await admin.from('profiles').update({ avatar_url }).eq('id', user.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, avatar_url })
}
