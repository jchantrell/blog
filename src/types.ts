import { getCollection } from 'astro:content';

export type Post = Awaited<ReturnType<typeof getCollection>>[0] & { readingTime: string };
