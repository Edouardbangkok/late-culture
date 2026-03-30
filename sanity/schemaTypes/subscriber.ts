import { defineField, defineType } from 'sanity'

export const subscriber = defineType({
  name: 'subscriber',
  title: 'Newsletter Subscriber',
  type: 'document',
  fields: [
    defineField({ name: 'email', title: 'Email', type: 'string', validation: r => r.required() }),
    defineField({ name: 'subscribedAt', title: 'Subscribed At', type: 'datetime' }),
    defineField({ name: 'source', title: 'Source Page', type: 'string' }),
  ],
  preview: { select: { title: 'email', subtitle: 'subscribedAt' } },
})
