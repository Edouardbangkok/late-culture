import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'

const sanityClient = createClient({
  projectId: 'sa9u2hue',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // Check if already subscribed
    const existing = await sanityClient.fetch(
      `*[_type == "subscriber" && email == $email][0]`,
      { email }
    )
    if (existing) {
      return NextResponse.json({ message: 'Already subscribed' }, { status: 200 })
    }

    // Create subscriber
    await sanityClient.create({
      _type: 'subscriber',
      email,
      subscribedAt: new Date().toISOString(),
      source: source || 'homepage',
    })

    return NextResponse.json({ message: 'Subscribed!' }, { status: 201 })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
