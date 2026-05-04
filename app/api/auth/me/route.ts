import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createServerSupabase()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ authenticated: false })
    }

    // Build a friendly display name from the user metadata
    const meta = (user.user_metadata || {}) as Record<string, unknown>
    const displayName =
      (meta.full_name as string) ||
      (meta.name as string) ||
      (meta.user_name as string) ||
      (user.email ? user.email.split('@')[0] : 'User')

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        display_name: displayName,
        avatar_url: (meta.avatar_url as string) || (meta.picture as string) || null,
      },
    })
  } catch {
    return NextResponse.json({ authenticated: false })
  }
}

export async function DELETE() {
  try {
    const supabase = await createServerSupabase()
    await supabase.auth.signOut()
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
