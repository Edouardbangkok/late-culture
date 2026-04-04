import { defineField } from 'sanity'

/** Shared fields for all venue types (hotel, restaurant, bar, party) */
export const editorialFields = [
  defineField({
    name: 'overview', title: 'Overview', type: 'text', rows: 5, group: 'editorial',
    description: 'The first paragraph on the page — appears in the paper-textured box, handwritten style. This is the editorial intro your readers see first.',
  }),
  defineField({
    name: 'body', title: 'Full Description', type: 'array', group: 'editorial',
    of: [{ type: 'block' }],
    description: 'The main body text — appears below the overview intro, also in the paper-textured box. Write 2-4 paragraphs describing the experience.',
  }),
  defineField({
    name: 'insiderTip', title: 'Insider Tip', type: 'text', rows: 4, group: 'editorial',
    description: 'Appears in a special paper box with a rose left border. A personal recommendation or secret tip for visitors.',
  }),
]

export const detailFields = [
  defineField({
    name: 'address', title: 'Address', type: 'string', group: 'details',
    description: 'Appears in the Fact Sheet section at the bottom of the page.',
  }),
  defineField({
    name: 'phone', title: 'Phone', type: 'string', group: 'details',
    description: 'Appears in the Fact Sheet + used for the mobile "Call" button.',
  }),
  defineField({
    name: 'website', title: 'Website URL', type: 'url', group: 'details',
    description: 'Link to the venue official website.',
  }),
  defineField({
    name: 'bookingUrl', title: 'Booking / Reserve URL', type: 'url', group: 'details',
    description: 'Used for the big "Reserve" button on the page.',
  }),
  defineField({
    name: 'menuUrl', title: 'Menu URL', type: 'url', group: 'details',
    description: 'Link to the restaurant menu (Google Business Profile, own website, or PDF). Shows a "See the Menu" button on the page.',
  }),
  defineField({
    name: 'amenities', title: 'Amenities / Tags', type: 'array', group: 'details',
    of: [{ type: 'string' }], options: { layout: 'tags' },
    description: 'Tags like "Pool", "Spa", "WiFi" — shown as pills on the page.',
  }),
  defineField({
    name: 'factSheet', title: 'Fact Sheet', type: 'array', group: 'details',
    description: 'Custom facts displayed in a 3-column grid. Add any label/value pairs (Dining, Wellness, Transport, etc.).',
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
    description: 'The 3 highlight cards with image + title + description. Appears in the HIGHLIGHTS section. Maximum 3.',
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
  defineField({
    name: 'amenityTitle', title: 'Featured Amenity — Title', type: 'string', group: 'media',
    description: 'The big amenity section (image left, text right). Example: "Auriga Spa"',
  }),
  defineField({
    name: 'amenityDescription', title: 'Featured Amenity — Description', type: 'text', rows: 4, group: 'media',
    description: 'Long description of the featured amenity.',
  }),
  defineField({
    name: 'amenityImage', title: 'Featured Amenity — Image', type: 'image', options: { hotspot: true }, group: 'media',
    description: 'Large image shown next to the amenity description.',
  }),
]

export const locationFields = [
  defineField({
    name: 'lat', title: 'Latitude', type: 'number', group: 'location',
    description: 'Used for the map at the bottom of the page. Find it on Google Maps.',
  }),
  defineField({
    name: 'lng', title: 'Longitude', type: 'number', group: 'location',
    description: 'Used for the map at the bottom of the page. Find it on Google Maps.',
  }),
]

export const venueGroups = [
  { name: 'basics', title: '1. Basics', default: true },
  { name: 'editorial', title: '2. Editorial' },
  { name: 'details', title: '3. Details' },
  { name: 'media', title: '4. Media' },
  { name: 'location', title: '5. Location' },
]
