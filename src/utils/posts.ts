import readingTime from 'reading-time';
import type { MarkdownInstance } from 'astro';

export interface MarkdownPost extends MarkdownInstance<Record<string, any>> {
  readingTime?: string;
}

export default function getPostData(post: MarkdownInstance<Record<string, any>>) {
  return {
    slug: post.file?.split('/')?.pop()?.split('.').shift(),
    readingTime: readingTime(post.rawContent()).text,
  };
}
