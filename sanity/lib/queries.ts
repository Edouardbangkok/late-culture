import { groq } from 'next-sanity'

export const hotelsQuery = groq`
  *[_type == "hotel"] | order(_createdAt asc) {
    _id, name, slug, category, neighborhood, priceRange,
    excerpt, heroImage
  }
`

export const restaurantsQuery = groq`
  *[_type == "restaurant"] | order(_createdAt asc) {
    _id, name, slug, category, neighborhood, cuisine,
    priceRange, excerpt, heroImage
  }
`

export const barsQuery = groq`
  *[_type == "bar"] | order(_createdAt asc) {
    _id, name, slug, category, neighborhood,
    excerpt, heroImage
  }
`

export const partyQuery = groq`
  *[_type == "party"] | order(_createdAt asc) {
    _id, name, slug, category, neighborhood,
    excerpt, heroImage
  }
`

export const articlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id, title, slug, category, publishedAt,
    excerpt, heroImage
  }
`
