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

This is a personal portfolio site built with **Astro 5** + **Tailwind CSS v4**. It is a static site deployed to Vercel.

**This is a pure Astro application.** Every component is an `.astro` file — there are currently no `.tsx`/`.jsx`/React component files. Author all new UI as `.astro` components. See "React integration" below before reaching for a framework component.

### Directory structure

The codebase is organized into six layers, from page down to primitive. The composition flow is: `pages` → `layouts` + `containers` → `components`, with `lib` and `styles` as cross-cutting support.

- `src/pages/` — Astro file-based routing. Currently two pages: `index.astro` (homepage) and `projects.astro`. Pages assemble `containers` inside `BaseLayout`.
- `src/layouts/` — App shell that wraps every page. `BaseLayout.astro` renders `<html>`, head/meta/fonts/favicons, and slots page content between `Appbar`, `Toolbar`, and `Footer`; it also imports `global.css` and mounts Vercel `Analytics`. `Appbar.astro`, `Footer.astro`, and `HamburgerMenu.astro` are the shell components.
- `src/containers/` — Section-level components that compose a page section out of `components`. Organized by page: `homepage/` (`HeroBanner`, `CompanyList`, `Achievements` = Mastery Results section, `HighlightProjects` = Excellence Projects section, `QuoteSection`, `ContactMe`) and `projects/` (`projectList.astro`).
- `src/components/` — Reusable UI primitives. Buttons/links (`Button`, `IconButton`, `Link`), content blocks (`Container`, `ProjectItem`, `Achievement`, `CompanyBox`), the dark-mode `Toolbar`, a Swiper-based `Carousel/`, and `icons/` (one `.astro` per icon, e.g. `SoftwareDevelopmentIcon`, `HeartIcon`, `FolderFilledIcon`, `FacilitateIcon`, `GitHubIcon`, `LinkedInIcon`, `DownloadOutlinedIcon`, `MediumIcon`, `HamburgerMenuIcon`, `CloseIcon`). `Button` uses `class-variance-authority` (`cva`) for variant/size/color composition and exposes `start-icon`/`end-icon` named slots.
- `src/lib/` — Framework-agnostic helpers. `utils.ts` exports `cn()` (clsx + tailwind-merge).
- `src/styles/` — `global.css` only: the entire Tailwind v4 `@theme` config, custom CSS variables, and `joey_*` typography utility classes. Imported once by `BaseLayout`.
- `public/assets/` — Static images (profile photos, company logos, project screenshots).

### Styling conventions

Tailwind v4 is configured via `@tailwindcss/vite` plugin (no `tailwind.config.*` file). The design tokens — colors (`primary-*`, `grayscale-*`, `typography-*`), font sizes, font weights, line heights, and spacing — are defined as CSS custom properties in `src/styles/global.css` under `@theme`.

Typography uses a set of semantic utility classes defined in `global.css` (`joey_heading1` through `joey_caption`, `joey_button`, `joey_caption_bold`, `joey_quote`). Use these classes for text styling instead of raw Tailwind font utilities. `--font-size-quote: 3rem` is available for 48px quote text.

Dark mode is implemented with a `.dark` class variant (`@custom-variant dark (&:is(.dark *))`). The `Toolbar.astro` component handles the dark/light toggle. Swiper is used via the `swiper-container` web component inside `Carousel/Carousel.astro` (configured in a client `<script>`), while `CompanyList` uses a plain flex-wrap grid (no carousel) — 2 per row on mobile, 3 on sm, 6 on lg.

### Path aliases

`@/*` maps to `src/*` (configured in `tsconfig.json`). Always use this alias for imports.

### React integration

The `@astrojs/react` integration and React 19 are installed (and some libraries like `lucide-react` pull React in transitively), but **no React component is currently used** — the app is 100% `.astro`. Keep it that way: build new UI as `.astro` components and use a client `<script>` block (as `Carousel` does) for interactivity. Do not introduce `.tsx` components unless explicitly asked.

### Prettier config

Uses tabs, single quotes, no trailing commas, 100-char print width. Plugins: `prettier-plugin-astro` and `prettier-plugin-tailwindcss`.
