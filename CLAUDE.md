# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Astro)
npm run build     # Production build
npm run preview   # Preview production build
```

There is no test suite. Formatting is handled by Prettier:

```bash
npx prettier --write .
```

## Architecture

This is a personal portfolio site built with **Astro 5** + **React 19** + **Tailwind CSS v4**. It is a static site deployed to Vercel.

### Directory structure

- `src/pages/` — Astro file-based routing. Currently two pages: `index.astro` (homepage) and `projects.astro`.
- `src/layouts/` — `BaseLayout.astro` wraps every page (Appbar, Footer, analytics). `Appbar.astro`, `Footer.astro`, and `HamburgerMenu.astro` are layout-level shell components.
- `src/containers/` — Section-level components that compose page sections. Organized by page (e.g., `homepage/`, `projects/`). These are the main content units used in pages.
- `src/components/` — Reusable UI primitives (`Button`, `Container`, `Link`, `ProjectItem`, `Achievement`, `CompanyBox`, `Carousel/`, and icon components). The `Button` component uses `class-variance-authority` for variant/size/color composition.
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge).
- `src/styles/global.css` — Global Tailwind config, custom CSS variables, and `joey_*` typography utility classes.
- `public/assets/` — Static images (profile photos, company logos, project screenshots).

### Styling conventions

Tailwind v4 is configured via `@tailwindcss/vite` plugin (no `tailwind.config.*` file). The design tokens — colors (`primary-*`, `grayscale-*`, `typography-*`), font sizes, font weights, line heights, and spacing — are defined as CSS custom properties in `src/styles/global.css` under `@theme`.

Typography uses a set of semantic utility classes defined in `global.css` (`joey_heading1` through `joey_caption`, `joey_button`). Use these classes for text styling instead of raw Tailwind font utilities.

Dark mode is implemented with a `.dark` class variant (`@custom-variant dark (&:is(.dark *))`). The `Toolbar.astro` component handles the dark/light toggle.

### Path aliases

`@/*` maps to `src/*` (configured in `tsconfig.json`). Always use this alias for imports.

### React integration

React is used selectively — the Astro `@astrojs/react` integration is included but most components are `.astro` files. Prefer Astro components unless client-side interactivity is required.

### Prettier config

Uses tabs, single quotes, no trailing commas, 100-char print width. Plugins: `prettier-plugin-astro` and `prettier-plugin-tailwindcss`.
