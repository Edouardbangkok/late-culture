import { defineField, defineType } from 'sanity'
import { editorialFields, detailFields, mediaFields, locationFields, venueGroups } from './venueFields'

export const hotel = defineType({
  name: 'hotel',
  title: 'Hotel',
  type: 'document',
  groups: venueGroups,
  fields: [
    // ── Basics ──
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required(), group: 'basics' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: r => r.required(), group: 'basics' }),
    defineField({
      name: 'category', title: 'Category', type: 'string', group: 'basics',
      options: { list: ['Grand Occasion', 'Design Forward', 'River & Water', 'The Pool', 'Slow Stay', 'New Opening', 'Old Soul', 'Night City'] }
    }),
    defineField({ name: 'neighborhood', title: 'Neighborhood', type: 'string', group: 'basics' }),
    defineField({
      name: 'priceRange', title: 'Price Range', type: 'string', group: 'basics',
      options: { list: ['$', '$$', '$$$', '$$$$'] }
    }),
    defineField({ name: 'rooms', title: 'Rooms / Suites', type: 'string', group: 'basics' }),
    defineField({ name: 'architect', title: 'Architect / Designer', type: 'string', group: 'basics' }),
    defineField({ name: 'yearOpened', title: 'Year Opened', type: 'string', group: 'basics' }),
    defineField({ name: 'excerpt', title: 'Short Description (card)', type: 'text', rows: 3, group: 'basics' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true }, group: 'basics' }),
    // ── Editorial ──
    ...editorialFields,
    // ── Details ──
    defineField({ name: 'checkIn', title: 'Check-in Time', type: 'string', group: 'details' }),
    defineField({ name: 'checkOut', title: 'Check-out Time', type: 'string', group: 'details' }),
    ...detailFields,
    // ── Media ──
    ...mediaFields,
    // ── Location ──
    ...locationFields,
  ],
  preview: { select: { title: 'name', subtitle: 'neighborhood', media: 'heroImage' } },
})
