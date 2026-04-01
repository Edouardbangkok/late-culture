import { createServerSupabase, createServiceRoleClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const contentType = request.headers.get('content-type') || ''
  const admin = createServiceRoleClient()

  // Handle file upload (multipart form data)
  if (contentType.includes('multipart/form-data')) {
    const formData = await request.formData()
    const file = formData.get('file') as File
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    // Upload to Supabase Storage
    const ext = file.name.split('.').pop() || 'jpg'
    const fileName = `${user.id}.${ext}`

    const { error: uploadError } = await admin.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true, contentType: file.type })

    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })

    const { data: urlData } = admin.storage.from('avatars').getPublicUrl(fileName)
    const avatar_url = urlData.publicUrl + '?t=' + Date.now()

    await admin.from('profiles').update({ avatar_url }).eq('id', user.id)
    return NextResponse.json({ success: true, avatar_url })
  }

  // Handle JSON (preset avatar URL)
  const { avatar_url } = await request.json()
  if (!avatar_url) return NextResponse.json({ error: 'Missing avatar_url' }, { status: 400 })

  const { error } = await admin.from('profiles').update({ avatar_url }).eq('id', user.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, avatar_url })
}
