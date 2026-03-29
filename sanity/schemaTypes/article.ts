import { defineField, defineType } from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Article (Explore)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: ['Neighbourhood', 'Culture', 'Transport', 'Money & Tips', 'Weather', 'Going Out', 'Day Trips'] }
    }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
    defineField({ name: 'excerpt', title: 'Short Description', type: 'text', rows: 3 }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'body', title: 'Body', type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }]
    }),
  ],
})
