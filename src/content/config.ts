import { defineCollection, z } from 'astro:content';

export const posts = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.string(),
      image: image(),
      tags: z.string(),
    }),
});

export const collections = {
  posts,
};
