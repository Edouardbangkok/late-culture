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
      name: 'category', title: 'Category', type: 'string', group: 'basics',
      options: { list: ['The Ritual', 'Above the City', 'Behind the Door', 'The Lobby', 'The Glass'] }
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
