import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    mapbox: process.env.MAPBOX_TOKEN || '',
  })
}
