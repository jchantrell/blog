import mdx from '@astrojs/mdx';
import solidJs from '@astrojs/solid-js';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';

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

  output: 'static',
  adapter: vercel(),
  

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['three']
    }
  },
});
