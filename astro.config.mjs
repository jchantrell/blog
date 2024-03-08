import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import rehypeExternalLinks from 'rehype-external-links';
import tailwind from '@astrojs/tailwind';
import solidJs from '@astrojs/solid-js';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://astro-blog-template.netlify.app',
  integrations: [mdx(), tailwind(), solidJs()],
  markdown: {
    shikiConfig: {
      theme: 'nord',
    },
    remarkPlugins: [remarkGfm, remarkSmartypants],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
        },
      ],
    ],
  },
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
});
