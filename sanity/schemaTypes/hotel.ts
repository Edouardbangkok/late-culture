import { defineField, defineType } from 'sanity'

export const hotel = defineType({
  name: 'hotel',
  title: 'Hotel',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: r => r.required() }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: ['Grand Occasion', 'Design Forward', 'River & Water', 'The Pool', 'Slow Stay', 'New Opening', 'Old Soul', 'Night City'] }
    }),
    defineField({ name: 'neighborhood', title: 'Neighborhood', type: 'string' }),
    defineField({
      name: 'priceRange', title: 'Price Range', type: 'string',
      options: { list: ['$', '$$', '$$$', '$$$$'] }
    }),
    defineField({ name: 'rooms', title: 'Rooms / Suites', type: 'string' }),
    defineField({ name: 'excerpt', title: 'Short Description', type: 'text', rows: 3 }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
  ],
})
