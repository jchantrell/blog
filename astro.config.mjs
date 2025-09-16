import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import rehypeExternalLinks from 'rehype-external-links';
import solidJs from '@astrojs/solid-js';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://jchantrell.dev',
  integrations: [mdx(), solidJs()],
  prefetch: true,

  markdown: {
    shikiConfig: {
      wrap: true,
      theme: 'css-variables',
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
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()],
  },
});
