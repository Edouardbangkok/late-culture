import { createServiceRoleClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const venueId = searchParams.get('venue_id')
  if (!venueId) return NextResponse.json({ ambassador: null })

  const admin = createServiceRoleClient()

  // Get the user with the most check-ins at this venue (minimum 3)
  const { data } = await admin.rpc('get_venue_ambassador', { p_venue_id: venueId })

  if (!data || data.length === 0) {
    return NextResponse.json({ ambassador: null })
  }

  return NextResponse.json({ ambassador: data[0] })
}
