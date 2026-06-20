// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.wasin.dev',
	vite: {
		plugins: [tailwindcss()],
		server: {
			fs: {
				allow: [
					// Worktree root
					path.resolve('.'),
					// Parent project node_modules (shared via symlink in worktree)
					path.resolve('../../..')
				]
			}
		}
	},

	integrations: [
		react(),
		sitemap({
			filter: (page) => !page.includes('/component-library')
		})
	]
});
