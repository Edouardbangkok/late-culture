import { defineField, defineType } from 'sanity'

export const editorialPost = defineType({
  name: 'editorialPost',
  title: 'Feed',
  type: 'document',
  icon: () => '📣',
  fields: [
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 4,
      description: 'The post text — keep it short and punchy',
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional — add a photo to the post',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Optional — paste a video link (YouTube, Vimeo, Instagram Reel)',
    }),
    defineField({
      name: 'postType',
      title: 'Post Type',
      type: 'string',
      options: {
        list: [
          { title: '📍 New Venue', value: 'new_venue' },
          { title: '🌙 Tonight Pick', value: 'tonight_pick' },
          { title: '📝 Update', value: 'guide_update' },
          { title: '🎬 Behind the Scenes', value: 'behind_the_scenes' },
          { title: '💬 Announcement', value: 'announcement' },
        ],
        layout: 'radio',
      },
      initialValue: 'guide_update',
    }),
    defineField({
      name: 'linkedVenues',
      title: 'Tag Venues',
      type: 'array',
      of: [
        { type: 'reference', to: [{ type: 'restaurant' }, { type: 'bar' }, { type: 'hotel' }, { type: 'party' }] },
      ],
      description: 'Optional — tag venues mentioned in this post',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Posted By',
      type: 'string',
      description: 'Your name',
      initialValue: 'Late Culture',
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      subtitle: 'author',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title ? (title.length > 60 ? title.substring(0, 60) + '...' : title) : 'Untitled post',
        subtitle: subtitle || 'Late Culture',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
