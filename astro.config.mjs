import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import rehypeExternalLinks from "rehype-external-links";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
	site: "https://jchantrell.dev",
	integrations: [mdx(), tailwind(), solidJs()],
	prefetch: true,
	markdown: {
		shikiConfig: {
			wrap: true,
			theme: "css-variables",
		},
		remarkPlugins: [remarkGfm, remarkSmartypants],
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{
					target: "_blank",
				},
			],
		],
	},
	output: "server",
	adapter: vercel(),
});
