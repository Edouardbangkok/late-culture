import { defineField, defineType } from 'sanity'
import { editorialFields, detailFields, mediaFields, locationFields, venueGroups } from './venueFields'

export const bar = defineType({
  name: 'bar',
  title: 'Bar',
  type: 'document',
  groups: venueGroups,
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required(), group: 'basics' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: r => r.required(), group: 'basics' }),
    defineField({
      name: 'category', title: 'Primary Category', type: 'string', group: 'basics',
      description: 'Main badge on the hero.',
      options: { list: ['The Ritual', 'Above the City', 'Behind the Door', 'The Lobby', 'The Glass'] }
    }),
    defineField({
      name: 'categories', title: 'All Categories', type: 'array', group: 'basics',
      description: 'Select 1-3 categories.',
      of: [{ type: 'string' }],
      options: { list: [
        { title: 'The Ritual', value: 'The Ritual' },
        { title: 'Above the City', value: 'Above the City' },
        { title: 'Behind the Door', value: 'Behind the Door' },
        { title: 'The Lobby', value: 'The Lobby' },
        { title: 'The Glass', value: 'The Glass' },
      ]},
      validation: r => r.max(3),
    }),
    defineField({ name: 'neighborhood', title: 'Neighborhood', type: 'string', group: 'basics' }),
    defineField({ name: 'signature', title: 'Signature Drink', type: 'string', group: 'basics' }),
    defineField({ name: 'excerpt', title: 'Short Description (card)', type: 'text', rows: 3, group: 'basics' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true }, group: 'basics' }),
    ...editorialFields,
    defineField({ name: 'openingHours', title: 'Opening Hours', type: 'string', group: 'details' }),
    defineField({ name: 'dressCode', title: 'Dress Code', type: 'string', group: 'details' }),
    ...detailFields,
    ...mediaFields,
    ...locationFields,
  ],
  preview: { select: { title: 'name', subtitle: 'neighborhood', media: 'heroImage' } },
})
