import { defineField, defineType } from 'sanity'
import { editorialFields, detailFields, mediaFields, locationFields, venueGroups } from './venueFields'

export const hotel = defineType({
  name: 'hotel',
  title: 'Hotel',
  type: 'document',
  groups: venueGroups,
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required(), group: 'basics',
      description: 'The hotel name — appears as the big title on the hero image.' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: r => r.required(), group: 'basics',
      description: 'URL-friendly name. Click "Generate" to auto-create from the name.' }),
    defineField({
      name: 'category', title: 'Category', type: 'string', group: 'basics',
      description: 'Appears as a badge on the hero image + used for filtering on the Stay page.',
      options: { list: ['Grand Occasion', 'Design Forward', 'River & Water', 'The Pool', 'Slow Stay', 'New Opening', 'Old Soul', 'Night City'] }
    }),
    defineField({ name: 'neighborhood', title: 'Neighborhood', type: 'string', group: 'basics',
      description: 'Appears in the hero meta info + card overline. Example: Chao Phraya Riverside' }),
    defineField({
      name: 'priceRange', title: 'Price Range', type: 'string', group: 'basics',
      description: 'Shown in the hero meta + sidebar. $ to $$$$.',
      options: { list: ['$', '$$', '$$$', '$$$$'] }
    }),
    defineField({ name: 'rooms', title: 'Rooms / Suites', type: 'string', group: 'basics',
      description: 'Appears in the hero meta + sidebar. Example: 101 Suites & Villas' }),
    defineField({ name: 'architect', title: 'Architect / Designer', type: 'string', group: 'basics',
      description: 'Appears in the sidebar Quick Facts.' }),
    defineField({ name: 'yearOpened', title: 'Year Opened', type: 'string', group: 'basics',
      description: 'Appears in the sidebar Quick Facts.' }),
    defineField({ name: 'excerpt', title: 'Short Description', type: 'text', rows: 3, group: 'basics',
      description: 'Appears on the venue card in the listing page + as hero subtitle. Keep it to 1-2 sentences.' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true }, group: 'basics',
      description: 'Full-width background image at the top of the page. Use a high-quality landscape photo (min 1600px wide).' }),
    ...editorialFields,
    defineField({ name: 'checkIn', title: 'Check-in Time', type: 'string', group: 'details',
      description: 'Appears in the sidebar. Example: 15:00' }),
    defineField({ name: 'checkOut', title: 'Check-out Time', type: 'string', group: 'details',
      description: 'Appears in the sidebar. Example: 12:00' }),
    ...detailFields,
    ...mediaFields,
    ...locationFields,
  ],
  preview: { select: { title: 'name', subtitle: 'neighborhood', media: 'heroImage' } },
})
