import { defineField, defineType } from 'sanity'
import { editorialFields, detailFields, mediaFields, locationFields, venueGroups } from './venueFields'

export const restaurant = defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  groups: venueGroups,
  fields: [
    // ── Basics ──
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required(), group: 'basics' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: r => r.required(), group: 'basics' }),
    defineField({
      name: 'category', title: 'Category', type: 'string', group: 'basics',
      options: { list: ['Grand Occasion', 'Romantic', 'Festive', 'Late Night', 'Quiet Escape', 'By the Water', 'The Counter', 'Sunday Ritual', 'Solo Dining', 'Local Legend', 'Street to Star'] }
    }),
    defineField({ name: 'neighborhood', title: 'Neighborhood', type: 'string', group: 'basics' }),
    defineField({ name: 'cuisine', title: 'Cuisine', type: 'string', group: 'basics' }),
    defineField({
      name: 'priceRange', title: 'Price Range', type: 'string', group: 'basics',
      options: { list: ['$', '$$', '$$$', '$$$$'] }
    }),
    defineField({ name: 'chef', title: 'Chef', type: 'string', group: 'basics' }),
    defineField({ name: 'excerpt', title: 'Short Description (card)', type: 'text', rows: 3, group: 'basics' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true }, group: 'basics' }),
    // ── Editorial ──
    ...editorialFields,
    // ── Details ──
    defineField({ name: 'openingHours', title: 'Opening Hours', type: 'string', group: 'details' }),
    defineField({ name: 'dressCode', title: 'Dress Code', type: 'string', group: 'details' }),
    ...detailFields,
    // ── Media ──
    ...mediaFields,
    // ── Location ──
    ...locationFields,
  ],
  preview: { select: { title: 'name', subtitle: 'neighborhood', media: 'heroImage' } },
})
