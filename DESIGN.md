# Design System

> Single source of truth for the **joey-portfolio-v2** visual language.
> Last updated: 2026-06-10 · Stack: **Astro 5 + Tailwind CSS v4**
> Derived from the token source in [`src/styles/global.css`](src/styles/global.css) and
> verified against the rendered site (`/` and `/projects`, light + dark).

## Overview

Styling is **Tailwind v4**, configured entirely in `src/styles/global.css` (no
`tailwind.config.*`). There is no React UI — every component is an `.astro` file.

Tokens live in **two layers**, and it's important to know which is which:

1. **Brand scales** (`@theme` block) — the portfolio's own palette and type
   system: `primary-*` (warm tan), `grayscale-*`, `typography-*`, `common-*`,
   the Mulish font, the `--font-size-*` / `--font-weight-*` / `--line-height-*`
   scales, shadows, and aspect ratios. These are what most of the UI uses.
2. **Semantic shadcn layer** (`:root` / `.dark`) — `--background`, `--foreground`,
   `--primary`, `--card`, `--border`, `--ring`, `--chart-*`, `--sidebar-*`, etc.,
   mostly neutral `oklch` values. This layer is what flips in dark mode.

For **text styling, use the `joey_*` utility classes** (e.g. `joey_heading1`,
`joey_body1`) rather than raw Tailwind font utilities — they bundle the correct
size/weight/line-height triplet.

## Colors

Values are paired with their token name and the concrete color the browser
renders. Ordered by real usage in the rendered pages.

### Brand — Primary (warm tan)
The signature accent. `--primary` (semantic) aliases `--color-primary-500` in light mode.

| Token | Value (HSL → hex) | Rendered | Usage |
|-------|-------------------|----------|-------|
| `primary-100` | `hsl(37,33%,95%)` → `#f6f3ee` | `rgb(246,243,238)` | Section/card backgrounds (most-used bg), subtle hover fills |
| `primary-300` | `hsl(39,34%,77%)` → `#d8c9a4` | `rgb(216,202,176)` | Active states (`active:bg-primary-300/50`) |
| `primary-500` | `hsl(34,33%,55%)` → `#b29166` | `rgb(178,145,102)` | **Primary brand color** — buttons, links, accents |
| `primary-700` | `hsl(26,33%,40%)` → `#886345` | `rgb(136,98,68)` | Button hover/focus (`hover:bg-primary-700`) |
| `primary-900` | `hsl(18,28%,29%)` → `#5f4235` | `rgb(95,66,53)` | Button active (`active:bg-primary-900`), deep accents |

### Neutrals — Grayscale
| Token | Value (HSL → hex) | Usage |
|-------|-------------------|-------|
| `grayscale-50` | `hsl(210,12%,97%)` → `#f6f7f8` | Lightest surfaces |
| `grayscale-100` | `hsl(216,14%,93%)` → `#ebedf0` | Logo tiles / muted backgrounds (rendered) |
| `grayscale-200` | `hsl(214,11%,87%)` → `#d9dde2` | Borders, dividers |
| `grayscale-300` | `hsl(214,15%,85%)` → `#d2d8df` | Disabled outlines (`disabled:border-grayscale-300`) |
| `grayscale-400` | `hsl(205,11%,78%)` → `#c0c7cd` | — |
| `grayscale-500` | `hsl(210,11%,71%)` → `#aeb6bd` | Disabled text (`disabled:text-grayscale-500`) |
| `grayscale-600` | `hsl(214,10%,60%)` → `#8d96a1` | — |
| `grayscale-700` | `hsl(218,9%,53%)` → `#7b828f` | — |
| `grayscale-800` | `hsl(218,9%,53%)` → `#7b828f` | ⚠️ identical to `grayscale-700` (see Known inconsistencies) |
| `grayscale-900` | `hsl(222,8%,40%)` → `#5e636d` | Muted text / dark surfaces (rendered as `rgb(94,99,110)`) |

### Typography & common
| Token | Value (HSL → hex) | Rendered | Usage |
|-------|-------------------|----------|-------|
| `typography-primary` | `hsl(240,0%,19%)` → `#303030` | `rgb(48,48,48)` | **Default body text** (by far the most-used color, ~80 elements/page) |
| `typography-secondary` | `hsl(240,4%,46%)` → `#717179` | — | Secondary/muted text |
| `common-white` | `hsl(0,0%,100%)` → `#ffffff` | `rgb(255,255,255)` | Text on filled buttons, white surfaces |
| `common-black` | `hsl(240,10%,14%)` → `#202027` | — | — |

### Semantic (shadcn) layer
Neutral `oklch` tokens defined under `:root` and overridden under `.dark`. The
body uses `bg-background` / `text-foreground`. In **light**, `--primary` resolves
to the warm tan; in **dark**, `--primary` becomes near-white (`oklch(0.922 0 0)`),
so "primary" in the semantic sense diverges from the brand tan in dark mode.

| Token | Light | Dark |
|-------|-------|------|
| `--background` | `#ffffff` | `oklch(0.145 0 0)` (near-black) |
| `--foreground` | `#303030` (typography-primary) | `oklch(0.985 0 0)` (near-white) |
| `--card` / `--popover` | `oklch(1 0 0)` | `oklch(0.205 0 0)` |
| `--primary` | warm tan (`primary-500`) | `oklch(0.922 0 0)` |
| `--muted-foreground` | `oklch(0.556 0 0)` | `oklch(0.708 0 0)` |
| `--border` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 10%)` |
| `--ring` | `oklch(0.708 0 0)` | `oklch(0.556 0 0)` |
| `--chart-1…5`, `--sidebar-*` | see `global.css` | distinct dark variants |

## Typography

- **Font family:** **Mulish** (`--font-display`), loaded from Google Fonts, with a
  system-sans fallback stack. Applied globally via `body { font-family: font-display }`.
  Confirmed in the render: Mulish on ~100 elements/page.
- **Loaded weights:** 300, 400, 500, 600 (see the `<link>` in `BaseLayout.astro`).
- **Type scale** — prefer the `joey_*` classes (size + weight + line-height bundled):

| Class | Size token | Size | Weight | Line height | Usage |
|-------|-----------|------|--------|-------------|-------|
| `joey_quote` | `--font-size-quote` | 3rem / 48px | 700 | 125% | Pull quotes |
| `joey_heading1` | `--font-size-heading1` | 2.25rem / 36px | 700 | 125% | Section/hero headings (rendered) |
| `joey_heading2` | `--font-size-heading2` | 2rem / 32px | 700 | 125% | Headings (rendered) |
| `joey_heading3` | `--font-size-heading3` | 1.75rem / 28px | 700 | 125% | Sub-headings (rendered) |
| `joey_subtitle1` | `--font-size-subtitle1` | 1.5rem / 24px | 400 | 145% | Lead text |
| `joey_subtitle2` / `_bold` | `--font-size-subtitle2` | 1.25rem / 20px | 400 / 700 | 145% | Subtitles (rendered, common) |
| `joey_body1` / `_bold` | `--font-size-body1` | 1rem / 16px | 400 / 700 | 150% | **Default body** (most-used size) |
| `joey_body2` / `_bold` | `--font-size-body2` | 0.875rem / 14px | 400 / 700 | 150% | Small text |
| `joey_caption` / `_bold` | `--font-size-caption` | 0.75rem / 12px | 400 / 700 | 150% | Captions, labels |
| `joey_button` | `--font-size-body1` | 1rem / 16px | 400 | 150% | Button label (used by `Button`) |

**Weight tokens:** `light 300 · regular 400 · medium 500 · semibold 600 · bold 700`.
In practice the render shows only **400** and **700** in use.

## Spacing & layout

Spacing uses the default Tailwind scale (rendered values: 4/8/12/16/32/64/120px →
`1/2/3/4/8/16/30`). Plus project constants:

| Token | Value | Usage |
|-------|-------|-------|
| `--appbar-height` | `4.25rem` / 68px | Fixed app bar height |
| Container | `max-w-[1200px] mx-auto px-4` | Page width constraint (`Container.astro`) |
| `--aspect-ratio-1-1` | `1 / 1` | Square media |
| `--aspect-ratio-16-9` | `16 / 9` | Widescreen media |

**Breakpoints:** Tailwind defaults — `sm 640px · md 768px · lg 1024px · xl 1280px`.
`CompanyList` is the main responsive grid: 2 per row mobile → 3 at `sm` → 6 at `lg`.

## Border radius

Base `--radius: 0.625rem` (10px); the scale is derived from it.

| Token | Value | Notes |
|-------|-------|-------|
| `--radius-sm` | 6px | `radius − 4px` (rendered) |
| `--radius-md` | 8px | `radius − 2px` (not seen in render) |
| `--radius-lg` | 10px | `= radius`; `rounded-lg` on buttons (rendered) |
| `--radius-xl` | 14px | `radius + 4px` (rendered, most-used radius) |
| `rounded-2xl` | 16px | Tailwind default (rendered) |
| `rounded-full` | pill | Avatars/badges (rendered as a very large px value) |

## Shadows / elevation

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-image` | `0 4px 5px rgba(0,0,0,0.25)` | Images / project cards (rendered, common on `/projects`) |
| `--shadow-card` | `0 4px 10px rgba(0,0,0,0.12)` | ⚠️ Defined but **not observed** in the render — likely unused (verify before relying on it) |
| Tailwind `shadow-xs` | `0 1px 2px rgba(0,0,0,0.05)` | Buttons (`shadow-xs` in `Button`), small surfaces (rendered) |

## Dark mode

Toggled by adding the `.dark` class to a root element; implemented via Tailwind's
`@custom-variant dark (&:is(.dark *))`. The `Toolbar.astro` component drives the toggle.

**Important nuance:** dark mode flips the **semantic shadcn layer** only
(`--background`, `--foreground`, `--card`, etc.). Sections styled with explicit
brand utilities (e.g. `bg-primary-100`, `bg-grayscale-100`) **do not change** in
dark mode — in the render, those backgrounds stay light while body text inverts to
near-white. Treat dark mode as partial; brand-colored blocks are not dark-aware.

## Components

Reusable `.astro` building blocks under `src/components/`.

| Component | Purpose | Variants / props |
|-----------|---------|------------------|
| `Button` | Primary action button | `variant`: contained / outlined / text · `color`: primary · `size`: medium · `start-icon`/`end-icon` slots. Built with `class-variance-authority`. Defaults: contained/primary/medium |
| `IconButton` | Icon-only button | Same variant/color/size API as `Button` |
| `Link` | Styled anchor | `color`: primary / white / inherit · hover underline |
| `Container` | Page width wrapper | `className`, `fluid` · `max-w-[1200px] mx-auto px-4` |
| `Achievement` | "Mastery Results" stat block | `title`, `description` |
| `ProjectItem` | Project card | `name`, `imageUrl` |
| `CompanyBox` | Company logo tile | `company: { logoUrl, name }` |
| `Carousel` | Swiper-based carousel | Wraps the `swiper-container` web component (configured in a client `<script>`) |
| `Toolbar` | Dark/light mode toggle | — |
| Icons (`icons/`) | SVG icon set | `SoftwareDevelopmentIcon`, `HeartIcon`, `FolderFilledIcon`, `FacilitateIcon`, `GitHubIcon`, `LinkedInIcon`, `DownloadOutlinedIcon`, `MediumIcon`, `HamburgerMenuIcon`, `CloseIcon` |

## Known inconsistencies (drift)

Surfaced by reconciling the source tokens against the rendered DOM — worth a look:

1. **`grayscale-700` and `grayscale-800` are identical** (`hsl(218,9%,53%)`). Looks
   like a copy-paste error; `grayscale-800` should likely be darker.
2. **Bold (700) renders but isn't loaded.** Headings/quotes use `--font-weight-bold: 700`,
   but the Mulish `<link>` only requests weights 300–600, so the browser
   synthesizes faux-bold. Add `700` to the font URL for true bold.
3. **`--shadow-card` appears unused** in the rendered pages — only `--shadow-image`
   and Tailwind's `shadow-xs` show up. Confirm whether it's still needed.
4. **Dark mode is partial** — brand-colored sections (`bg-primary-*`, `bg-grayscale-*`)
   don't adapt. If full dark theming is intended, those need dark variants.
5. **Two overlapping color systems** (brand `@theme` scales vs. shadcn semantic
   layer). Fine intentionally, but document which to reach for to avoid drift:
   use the **brand scales** for portfolio UI; the semantic layer mainly powers
   `bg-background`/`text-foreground` and dark mode.

## Screenshots

Rendered reference (captured 2026-06-10 at 1440×900):

| Home — light | Home — dark | Projects — light |
|:---:|:---:|:---:|
| ![Home light](docs/design-assets/homepage-light.png) | ![Home dark](docs/design-assets/homepage-dark.png) | ![Projects](docs/design-assets/projects-light.png) |
