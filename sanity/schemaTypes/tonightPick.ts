import { defineField, defineType } from 'sanity'

export const tonightPick = defineType({
  name: 'tonightPick',
  title: 'Tonight Pick',
  type: 'document',
  fields: [
    defineField({
      name: 'timeSlot', title: 'Time Slot', type: 'string',
      options: { list: ['5PM', '7PM', '9PM', '11PM', '1AM'] },
      validation: r => r.required()
    }),
    defineField({
      name: 'venueType', title: 'Venue Type', type: 'string',
      options: { list: ['Restaurant', 'Bar', 'Party', 'Hotel'] },
      validation: r => r.required()
    }),
    defineField({ name: 'name', title: 'Venue Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'description', title: 'Short Description', type: 'text', rows: 2 }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
    defineField({ name: 'active', title: 'Active', type: 'boolean', initialValue: true }),
  ],
  orderings: [{ title: 'Time', name: 'timeAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'timeSlot', media: 'image' },
  },
})
