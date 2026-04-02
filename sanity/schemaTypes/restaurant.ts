import { defineField, defineType } from 'sanity'
import { editorialFields, detailFields, mediaFields, locationFields, venueGroups } from './venueFields'

export const restaurant = defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  groups: venueGroups,
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required(), group: 'basics',
      description: 'The restaurant name — appears as the big title on the hero image.' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: r => r.required(), group: 'basics',
      description: 'URL-friendly name. Click "Generate" to auto-create.' }),
    defineField({
      name: 'category', title: 'Primary Category', type: 'string', group: 'basics',
      description: 'Main badge on the hero + primary filter.',
      options: { list: ['Grand Occasion', 'Romantic', 'Festive', 'Late Night', 'Quiet Escape', 'By the Water', 'The Counter', 'Sunday Ritual', 'Solo Dining', 'Local Legend', 'Street to Star'] }
    }),
    defineField({
      name: 'categories', title: 'All Categories', type: 'array', group: 'basics',
      description: 'Select 1-3 categories. The venue appears in all selected filters.',
      of: [{ type: 'string' }],
      options: { list: [
        { title: 'Grand Occasion', value: 'Grand Occasion' },
        { title: 'Romantic', value: 'Romantic' },
        { title: 'Festive', value: 'Festive' },
        { title: 'Late Night', value: 'Late Night' },
        { title: 'Quiet Escape', value: 'Quiet Escape' },
        { title: 'By the Water', value: 'By the Water' },
        { title: 'The Counter', value: 'The Counter' },
        { title: 'Sunday Ritual', value: 'Sunday Ritual' },
        { title: 'Solo Dining', value: 'Solo Dining' },
        { title: 'Local Legend', value: 'Local Legend' },
        { title: 'Street to Star', value: 'Street to Star' },
      ]},
      validation: r => r.max(3),
    }),
    defineField({ name: 'neighborhood', title: 'Neighborhood', type: 'string', group: 'basics',
      description: 'Hero meta + card overline. Example: Silom' }),
    defineField({ name: 'cuisine', title: 'Cuisine', type: 'string', group: 'basics',
      description: 'Sidebar Quick Facts. Example: Thai Contemporary' }),
    defineField({
      name: 'priceRange', title: 'Price Range', type: 'string', group: 'basics',
      description: 'Hero meta + sidebar.',
      options: { list: ['Under 500 THB', '500-1500 THB', '1500-3000 THB', '3000+ THB'] }
    }),
    defineField({ name: 'chef', title: 'Chef', type: 'string', group: 'basics',
      description: 'Sidebar Quick Facts. Example: Chef Bee Satongun' }),
    defineField({ name: 'excerpt', title: 'Short Description', type: 'text', rows: 3, group: 'basics',
      description: 'Card text on listing page + hero subtitle. 1-2 sentences.' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true }, group: 'basics',
      description: 'Full-width hero background. High-quality landscape (min 1600px).' }),
    ...editorialFields,
    defineField({ name: 'openingHours', title: 'Opening Hours', type: 'string', group: 'details',
      description: 'Sidebar Quick Facts. Example: Tue-Sun 18:00-23:00' }),
    defineField({ name: 'dressCode', title: 'Dress Code', type: 'string', group: 'details',
      description: 'Sidebar Quick Facts. Example: Smart Casual' }),
    ...detailFields,
    ...mediaFields,
    ...locationFields,
  ],
  preview: { select: { title: 'name', subtitle: 'neighborhood', media: 'heroImage' } },
})
