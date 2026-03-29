import { defineField, defineType } from 'sanity'

export const party = defineType({
  name: 'party',
  title: 'Party',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: r => r.required() }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: ['Underground', 'Live Sound', 'Pool Party', 'Rooftop Session', 'Local Scene'] }
    }),
    defineField({ name: 'neighborhood', title: 'Neighborhood', type: 'string' }),
    defineField({ name: 'excerpt', title: 'Short Description', type: 'text', rows: 3 }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
  ],
})
