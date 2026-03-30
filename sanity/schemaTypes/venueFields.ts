import { defineField } from 'sanity'

/** Shared fields for all venue types (hotel, restaurant, bar, party) */
export const editorialFields = [
  defineField({ name: 'overview', title: 'Overview (intro paragraph)', type: 'text', rows: 5, group: 'editorial' }),
  defineField({
    name: 'body', title: 'Full Description', type: 'array', group: 'editorial',
    of: [{ type: 'block' }],
  }),
  defineField({ name: 'insiderTip', title: 'Insider Tip', type: 'text', rows: 4, group: 'editorial' }),
]

export const detailFields = [
  defineField({ name: 'address', title: 'Address', type: 'string', group: 'details' }),
  defineField({ name: 'phone', title: 'Phone', type: 'string', group: 'details' }),
  defineField({ name: 'website', title: 'Website URL', type: 'url', group: 'details' }),
  defineField({ name: 'bookingUrl', title: 'Booking / Reserve URL', type: 'url', group: 'details' }),
  defineField({ name: 'bestTimeDay', title: 'Best Time — Day', type: 'string', group: 'details' }),
  defineField({ name: 'bestTimeHours', title: 'Best Time — Hours', type: 'string', group: 'details' }),
  defineField({ name: 'bestTimeNote', title: 'Best Time — Note', type: 'string', group: 'details' }),
  defineField({
    name: 'amenities', title: 'Amenities / Tags', type: 'array', group: 'details',
    of: [{ type: 'string' }], options: { layout: 'tags' },
  }),
  defineField({
    name: 'factSheet', title: 'Fact Sheet', type: 'array', group: 'details',
    of: [{
      type: 'object', name: 'factItem', title: 'Fact',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'value', title: 'Value', type: 'string' }),
      ],
      preview: { select: { title: 'label', subtitle: 'value' } },
    }],
  }),
]

export const mediaFields = [
  defineField({
    name: 'highlights', title: 'Highlights (3 cards)', type: 'array', group: 'media',
    of: [{
      type: 'object', name: 'highlight', title: 'Highlight',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
      ],
      preview: { select: { title: 'title', media: 'image' } },
    }],
    validation: r => r.max(3),
  }),
  defineField({ name: 'amenityTitle', title: 'Featured Amenity — Title', type: 'string', group: 'media' }),
  defineField({ name: 'amenityDescription', title: 'Featured Amenity — Description', type: 'text', rows: 4, group: 'media' }),
  defineField({ name: 'amenityImage', title: 'Featured Amenity — Image', type: 'image', options: { hotspot: true }, group: 'media' }),
]

export const locationFields = [
  defineField({ name: 'lat', title: 'Latitude', type: 'number', group: 'location' }),
  defineField({ name: 'lng', title: 'Longitude', type: 'number', group: 'location' }),
]

export const venueGroups = [
  { name: 'basics', title: 'Basics', default: true },
  { name: 'editorial', title: 'Editorial' },
  { name: 'details', title: 'Details' },
  { name: 'media', title: 'Media' },
  { name: 'location', title: 'Location' },
]
