import { defineField, defineType } from 'sanity'

export const restaurant = defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: r => r.required() }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: ['Grand Occasion', 'Romantic', 'Festive', 'Late Night', 'Quiet Escape', 'By the Water', 'The Counter', 'Sunday Ritual', 'Solo Dining', 'Local Legend', 'Street to Star', 'Recently Added'] }
    }),
    defineField({ name: 'neighborhood', title: 'Neighborhood', type: 'string' }),
    defineField({ name: 'cuisine', title: 'Cuisine', type: 'string' }),
    defineField({
      name: 'priceRange', title: 'Price Range', type: 'string',
      options: { list: ['$', '$$', '$$$', '$$$$'] }
    }),
    defineField({ name: 'excerpt', title: 'Short Description', type: 'text', rows: 3 }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
  ],
})
