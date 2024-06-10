import readingTime from 'reading-time';
import type { MarkdownInstance } from 'astro';

export interface MarkdownPost extends MarkdownInstance<Record<string, any>> {
  readingTime?: string;
  slug: string;
}

export default function getPostData(post: MarkdownInstance<Record<string, any>>) {
  const filePath = post.file.split('/');
  return {
    slug: filePath[filePath.length - 2],
    readingTime: readingTime(post.rawContent()).text,
  };
}
