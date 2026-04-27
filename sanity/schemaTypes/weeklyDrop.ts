import { defineField, defineType } from 'sanity'

export const weeklyDrop = defineType({
  name: 'weeklyDrop',
  title: 'Weekly Drop',
  type: 'document',
  icon: () => '📬',
  fields: [
    defineField({
      name: 'issueNumber',
      title: 'Issue Number',
      type: 'number',
      description: 'Sequential issue number (e.g. 1, 2, 3...)',
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Where Bangkok Drinks This Week"',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Excerpt',
      type: 'text',
      rows: 2,
      description: '1-2 sentences that hook the reader',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'The main cover image of this drop',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'Drops should publish on Sundays at 6pm Bangkok time',
      initialValue: () => {
        const now = new Date()
        const daysUntilSunday = (7 - now.getDay()) % 7
        const sunday = new Date(now)
        sunday.setDate(now.getDate() + daysUntilSunday)
        sunday.setHours(18, 0, 0, 0)
        return sunday.toISOString()
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featureStory',
      title: 'Feature Story',
      type: 'array',
      description: 'Long-form editorial content for this issue',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'highlightedVenues',
      title: 'New on Our Radar (3-5 venues)',
      type: 'array',
      description: 'Curated venues spotlighted this week',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'restaurant' },
            { type: 'bar' },
            { type: 'hotel' },
            { type: 'party' },
          ],
        },
      ],
      validation: (rule) => rule.max(5),
    }),
    defineField({
      name: 'tonightsPick',
      title: "Tonight's Pick",
      type: 'reference',
      description: 'The single venue spotlighted for "Tonight"',
      to: [
        { type: 'restaurant' },
        { type: 'bar' },
        { type: 'hotel' },
        { type: 'party' },
      ],
    }),
    defineField({
      name: 'insiderTip',
      title: 'Insider Tip',
      type: 'text',
      rows: 3,
      description: 'The one thing only insiders know this week',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      issue: 'issueNumber',
      media: 'heroImage',
      publishedAt: 'publishedAt',
    },
    prepare({ title, issue, media, publishedAt }) {
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''
      return {
        title: `Issue #${issue} — ${title}`,
        subtitle: date,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Latest first',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Issue Number',
      name: 'issueAsc',
      by: [{ field: 'issueNumber', direction: 'desc' }],
    },
  ],
})
