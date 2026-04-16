// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
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

	integrations: [react()]
});
