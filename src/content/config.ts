import { defineCollection, z } from 'astro:content';

export const posts = defineCollection({
  type: 'content',
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.string(),
      tags: z.string(),
    }),
});

export const collections = {
  posts,
};
