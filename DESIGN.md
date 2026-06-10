# Design System — Joey Wasin Portfolio

This document is the single source of truth for the visual design of this site.
It is written for a designer who will extend or redesign the portfolio. Every
token below is taken directly from the live codebase (`src/styles/global.css`)
and the components that consume it. If you change a value here, change it in
`src/styles/global.css` so the two stay in sync.

- **Stack:** Astro 5 + Tailwind CSS v4 — static site, deployed to Vercel.
  (React 19 is installed but **no React component is used**; the UI is 100%
  `.astro`.)
- **Token home:** `src/styles/global.css`, in the `@theme` block. There is no
  `tailwind.config.js`; Tailwind v4 reads tokens from CSS custom properties, so
  `--color-primary-500` becomes the `primary-500` utility automatically.
- **Last updated:** 2026-06-10 · verified against the rendered site (`/` and
  `/projects`, light + dark).

---

## 1. Brand at a glance

The brand is warm, editorial, and human. The signature color is a muted
tan/camel ("primary"), paired with cool neutral grays and large, confident
typography. Marketing voice, from the quote band:
*"AI moves at the speed of light, but great products move at the pace of the
human heart."*

| Property | Value |
| --- | --- |
| Primary brand color | `--color-primary-500` — `hsl(34,33%,55%)` ≈ `#b29166` (camel/tan) |
| Typeface | **Mulish** (Google Fonts), system-font fallback |
| Max content width | `1200px` (`Container` component) |
| Corner radius | base `--radius: 0.625rem` (10px); buttons `rounded-lg`, cards `rounded-xl` |
| Mode | **Light only** ships today (dark tokens exist but nothing toggles them) |

---

## 2. Color tokens

Brand colors are defined in HSL in the `@theme` block. Utility names derive from
the token name (`--color-primary-500` → `bg-primary-500`, `text-primary-500`).
Note: `bg-primary` / `text-primary` (no number) resolves to **primary-500** via
the shadcn-style alias `--primary`. The "Rendered" column is the concrete color
the browser computed, used to confirm each token is live.

### 2.1 Primary (brand camel/tan)

| Token | Utility | HSL → hex | Rendered | Usage |
| --- | --- | --- | --- | --- |
| `--color-primary-100` | `primary-100` | `hsl(37,33%,95%)` → `#f6f3ee` | `rgb(246,243,238)` | Section backgrounds (hero, contact band), button hover/focus fills, project-card (desktop) |
| `--color-primary-300` | `primary-300` | `hsl(39,34%,77%)` → `#d8c9a4` | `rgb(216,202,176)` | Quote accent text, hover wash (`primary-300/50`) |
| `--color-primary-500` | `primary-500` / `primary` | `hsl(34,33%,55%)` → `#b29166` | `rgb(178,145,102)` | **Primary brand color** — solid buttons, links, accents, company-logo hover |
| `--color-primary-700` | `primary-700` | `hsl(26,33%,40%)` → `#886345` | `rgb(136,98,68)` | Button hover/focus (contained), eyebrow labels |
| `--color-primary-900` | `primary-900` | `hsl(18,28%,29%)` → `#5f4235` | `rgb(95,66,53)` | Dark brand surfaces (footer, quote band), button active, contact heading |

The primary ramp deliberately **shifts hue as it darkens** (37° → 18°) so dark
shades read warmer/browner and light shades read creamier. Keep this hue-shift
if you extend the ramp.

### 2.2 Grayscale (cool neutrals)

| Token | Utility | HSL → hex | Usage |
| --- | --- | --- | --- |
| `--color-grayscale-50` | `grayscale-50` | `hsl(210,12%,97%)` → `#f6f7f8` | "Mastery Results" section background |
| `--color-grayscale-100` | `grayscale-100` | `hsl(216,14%,93%)` → `#ebedf0` | Achievement cards, contact card surface, disabled button bg |
| `--color-grayscale-200` | `grayscale-200` | `hsl(214,11%,87%)` → `#d9dde2` | — |
| `--color-grayscale-300` | `grayscale-300` | `hsl(214,15%,85%)` → `#d2d8df` | Disabled outlined-button border |
| `--color-grayscale-400` | `grayscale-400` | `hsl(205,11%,78%)` → `#c0c7cd` | — |
| `--color-grayscale-500` | `grayscale-500` | `hsl(210,11%,71%)` → `#aeb6bd` | Disabled button text |
| `--color-grayscale-600` | `grayscale-600` | `hsl(214,10%,60%)` → `#8d96a1` | — |
| `--color-grayscale-700` | `grayscale-700` | `hsl(218,9%,53%)` → `#7b828f` | — |
| `--color-grayscale-800` | `grayscale-800` | `hsl(218,9%,53%)` → `#7b828f` | — (⚠️ duplicate of 700, see §9) |
| `--color-grayscale-900` | `grayscale-900` | `hsl(222,8%,40%)` → `#5e636d` | Achievement icon chip background |

### 2.3 Typography colors

| Token | Utility | HSL → hex | Usage |
| --- | --- | --- | --- |
| `--color-typography-primary` | `text-typography-primary` | `hsl(240,0%,19%)` → `#303030` | **Default body/foreground text** (backs `--foreground`; by far the most-used color, ~80 elements/page) |
| `--color-typography-secondary` | `text-typography-secondary` | `hsl(240,4%,46%)` → `#717179` | Muted/secondary text (e.g. project section subtitle) |

### 2.4 Common

| Token | Utility | HSL → hex | Usage |
| --- | --- | --- | --- |
| `--color-common-white` | `common-white` | `hsl(0,0%,100%)` → `#ffffff` | Text on dark/brand surfaces, card fills |
| `--color-common-black` | `common-black` | `hsl(240,10%,14%)` → `#202027` | — (defined, not used in UI) |

### 2.5 Semantic / shadcn aliases

A separate shadcn-style layer (`:root` and `.dark` blocks) maps semantic roles to
neutral OKLCH values. Most of the visible site uses the brand tokens above; these
aliases back the `bg-background`, `text-foreground`, `border-border`, `ring`,
etc. utilities (the `body` is `bg-background text-foreground`).

| Alias | Light | Dark | Notes |
| --- | --- | --- | --- |
| `--background` | `#ffffff` | `oklch(0.145 0 0)` | Page background |
| `--foreground` | `--color-typography-primary` (`#303030`) | `oklch(0.985 0 0)` | Default text |
| `--primary` | `--color-primary-500` (tan) | `oklch(0.922 0 0)` | Powers `bg-primary`/`text-primary`; **note it becomes near-white in dark, not tan** |
| `--card` / `--popover` | `oklch(1 0 0)` | `oklch(0.205 0 0)` | Surfaces |
| `--border` / `--input` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 10–15%)` | Hairlines |
| `--ring` | `oklch(0.708 0 0)` | `oklch(0.556 0 0)` | Focus ring |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | Error/red (defined, not yet used) |
| `--chart-1…5`, `--sidebar-*` | see `global.css` | distinct dark set | Unused by the portfolio UI |

> **Dark mode:** a full `.dark` token set exists (via the `.dark` class /
> `@custom-variant dark`), but the site **ships light-mode only** — there is no
> toggle component (`Toolbar.astro` is just a layout spacer). The dark palette is
> generic neutral OKLCH (shadcn defaults), **not** brand-tuned. See §9.

---

## 3. Typography

### 3.1 Typeface

- **Family:** `Mulish`, falling back to the system UI stack (`-apple-system`,
  `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, …). Token `--font-display`, applied
  globally to `body` via `font-display`. Confirmed in the render: Mulish on ~100
  elements/page.
- **Loaded weights:** the Google Fonts `<link>` in `BaseLayout.astro` requests
  **300, 400, 500, 600** only. ⚠️ Bold (700) is used but not loaded — see §9.

### 3.2 Type scale (font sizes)

| Token | rem | px | Utility |
| --- | --- | --- | --- |
| `--font-size-caption` | 0.75 | 12 | `text-caption` |
| `--font-size-body2` | 0.875 | 14 | `text-body2` |
| `--font-size-body1` | 1 | 16 | `text-body1` |
| `--font-size-subtitle2` | 1.25 | 20 | `text-subtitle2` |
| `--font-size-subtitle1` | 1.5 | 24 | `text-subtitle1` |
| `--font-size-heading3` | 1.75 | 28 | `text-heading3` |
| `--font-size-heading2` | 2 | 32 | `text-heading2` |
| `--font-size-heading1` | 2.25 | 36 | `text-heading1` |
| `--font-size-quote` | 3 | 48 | `text-quote` |

### 3.3 Weights & line heights

Weights: `light 300 · regular 400 · medium 500 · semibold 600 · bold 700`. In
the render only **400** and **700** actually appear.
Line heights: headings/quote **125%** · subtitles **145%** · body/caption **150%**.

### 3.4 Semantic text styles (use these)

Style text with these composite utility classes (defined in `global.css`
`@layer base`), **not** raw font utilities — each bundles size + weight +
line-height.

| Class | Size | Weight | Line-height | Typical use |
| --- | --- | --- | --- | --- |
| `.joey_quote` | 48px | Bold | 125% | Large quote / hero statement (contact heading, quote band) |
| `.joey_heading1` | 36px | Bold | 125% | Page-level H1 / hero headline |
| `.joey_heading2` | 32px | Bold | 125% | Section titles ("Mastery Results") |
| `.joey_heading3` | 28px | Bold | 125% | Sub-section titles ("Excellence Projects", "My Projects") |
| `.joey_subtitle1` | 24px | Regular | 145% | Hero greeting line |
| `.joey_subtitle2_bold` | 20px | Bold | 145% | Card titles (achievement, project) |
| `.joey_subtitle2` | 20px | Regular | 145% | — |
| `.joey_body1_bold` | 16px | Bold | 150% | Emphasized links (contact channels) |
| `.joey_body1` | 16px | Regular | 150% | Default body copy, links |
| `.joey_body2_bold` | 14px | Bold | 150% | Eyebrow labels (uppercase + tracking) |
| `.joey_body2` | 14px | Regular | 150% | Small body copy |
| `.joey_caption_bold` | 12px | Bold | 150% | — |
| `.joey_caption` | 12px | Regular | 150% | Footer copyright, fine print |
| `.joey_button` | 16px | Regular | 150% | Button label (used internally by `Button`) |

**Patterns seen in code:**
- **Responsive type swap:** `joey_heading1 md:joey_quote` (quote scales up on
  desktop), `joey_caption md:joey_body1` (footer).
- **Eyebrow label:** small bold uppercase, wide tracking —
  `joey_body2_bold uppercase tracking-[50%] text-primary-700`.

---

## 4. Spacing, layout & sizing

### 4.1 Layout container

Use the `Container` component (`src/components/Container.astro`):
`max-w-[1200px] mx-auto px-4`. This is the standard content width and gutter for
every section. Full-bleed colored bands (hero, mastery, quote, contact) set their
own background, then place a `Container` inside for content.

### 4.2 Custom spacing tokens

| Token | Value | Usage |
| --- | --- | --- |
| `--appbar-height` | `4.25rem` (68px) | Fixed top app-bar height; the `Toolbar` spacer matches it |

Everything else uses Tailwind's default spacing scale (`gap-4`, `py-12`, `mt-8`,
…). Observed rendered values: 4/8/12/16/32/64/120px.

### 4.3 Responsive breakpoints (Tailwind defaults)

| Prefix | Min width |
| --- | --- |
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

**Primary layout breakpoint is `md` (768px)** — the site flips between mobile and
desktop here (nav collapses to a hamburger, hero stacks, project cards swap
layout entirely).

### 4.4 Vertical rhythm (observed)

Sections separate with vertical padding, commonly `py-12` mobile → `py-20`/`py-24`
desktop, and top margins `mt-12 md:mt-16` between content groups. Eyebrow → title
gap is `mt-1`; title → content grid is `mt-8`.

### 4.5 Aspect ratios

| Token | Value | Usage |
| --- | --- | --- |
| `--aspect-ratio-1-1` | `1 / 1` | Square profile image (desktop `md`) |
| `--aspect-ratio-16-9` | `16 / 9` | Hero image, project thumbnails |

Apply via `aspect-(--aspect-ratio-16-9)`.

---

## 5. Radius & elevation

### 5.1 Corner radius

Base `--radius: 0.625rem` (10px); the scale derives from it.

| Token | Value | Utility | Usage |
| --- | --- | --- | --- |
| `--radius-sm` | 6px | `rounded-sm` | Project image (desktop) |
| `--radius-md` | 8px | `rounded-md` | Project card (mobile) |
| `--radius-lg` | 10px | `rounded-lg` | **Buttons** |
| `--radius-xl` | 14px | `rounded-xl` | **Cards** (achievement, company box), icon buttons |
| — | 16px | `rounded-2xl` | Contact card surface |
| — | pill | `rounded-full` | Quote underline bar, avatars/badges |

Convention: **buttons = `rounded-lg`, cards = `rounded-xl`, large feature
surfaces = `rounded-2xl`.**

### 5.2 Shadows

| Token | Value | Utility | Usage |
| --- | --- | --- | --- |
| `--shadow-image` | `0 4px 5px rgba(0,0,0,0.25)` | `shadow-image` | Project screenshot images (most common in render) |
| `--shadow-card` | `0 4px 10px rgba(0,0,0,0.12)` | `shadow-card` | Project card (mobile) — defined but barely observed; verify before relying on it (§9) |
| Tailwind `shadow-xs` | `0 1px 2px rgba(0,0,0,0.05)` | `shadow-xs` | Buttons, small surfaces |

---

## 6. Components

All components live in `src/components/`; section compositions live in
`src/containers/<page>/`. Buttons/links use `class-variance-authority` (CVA).

### 6.1 Button (`Button.astro`)

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `contained`, `outlined`, `text` | `contained` |
| `color` | `primary` | `primary` |
| `size` | `medium` | `medium` |

- Base: `joey_button rounded-lg px-3 py-2 gap-1`, `inline-flex` centered, 300ms transitions.
- **Contained primary:** `bg-primary text-common-white` → hover/focus `primary-700` → active `primary-900`.
- **Outlined primary:** `border-primary text-primary` → hover/focus `primary-100` → active `primary-300/50`.
- **Text primary:** `text-primary` → hover/focus `primary-100` → active `primary-300/50`.
- **Disabled:** contained → `grayscale-100` bg + `grayscale-500` text; outlined → `grayscale-300` border + `grayscale-500` text.
- Slots: `start-icon` / `end-icon` (rendered in a 24×24 box).

> Only `medium` size and `primary` color exist today. Add `small`/`large` or a
> secondary color via the CVA `variants`/`compoundVariants` if the design needs them.

### 6.2 IconButton (`IconButton.astro`)

Same color/variant system as `Button` but square, holding a single 24×24 icon.
Sizes: `extraSmall` (`p-2 rounded-[10px]`), `small` (`p-2.5 rounded-xl`),
`medium`/`large` (`p-3 rounded-xl`). Always `shadow-xs`.

### 6.3 Link (`Link.astro`)

`joey_body1`, `hover:underline`, 300ms transition. Colors: `primary` (default,
`text-primary`), `white` (`text-common-white`, for dark surfaces like the
footer), `inherit` (`text-typography-primary`, for nav).

### 6.4 Achievement card (`Achievement.astro`)

`bg-grayscale-100 rounded-xl p-4 gap-4`. Props `title`, `description`. Icon sits
in a `grayscale-900` chip (`p-1.5`, white icon, via the `icon` slot). Title =
`joey_subtitle2_bold`, description = `joey_body1`. Used in the "Mastery Results"
1 / 2 / 4-column responsive grid.

### 6.5 Project item (`ProjectItem.astro`)

Props `name`, `imageUrl`, plus a `project-description` slot. Two distinct layouts
swapped at `md`:
- **Mobile (`md:hidden`):** white card, `shadow-card rounded-md`, 16:9 image on top, text below.
- **Desktop (`hidden md:flex`):** `bg-primary-100` (hover `primary-300/50`), centered title on top, image anchored at the bottom with `shadow-image rounded-sm`, capped `max-h-[360px]`.

### 6.6 Company box (`CompanyBox.astro`)

White card, `rounded-xl p-4`, logo `h-16`. Hover fills with `primary-500`. Props
`company: { logoUrl, name }`. (Note: the live `CompanyList` currently renders
bare logos in a flex-wrap grid — 2/row mobile, more at `sm`/`md` — rather than
the `CompanyBox` card; both exist in the codebase.)

### 6.7 Container (`Container.astro`)

Page-width wrapper: `max-w-[1200px] mx-auto px-4`. Props `className`, `fluid`.

### 6.8 Shell components (`src/layouts/`, `Toolbar`)

- **Appbar (`Appbar.astro`):** fixed, full width, `h-(--appbar-height)`, white
  with `backdrop-blur-[10px]`, `z-50`. Logo left; right (desktop) = Projects
  link, Medium link, outlined "Get my CV" button. Collapses to **HamburgerMenu**
  below `md`.
- **Footer (`Footer.astro`):** `bg-primary-900` band, white text; copyright left,
  social icon links (Medium / LinkedIn / GitHub) right.
- **Toolbar (`Toolbar.astro`):** a spacer equal to the app-bar height so the
  fixed Appbar doesn't overlap content. (It is **not** a theme toggle.)

---

## 7. Iconography

SVG icon components in `src/components/icons/`. They inherit color via
`currentColor` and are sized with utility classes (`size-9`, `h-6 w-6`).
Inventory:

- **Brand / skill:** `SoftwareDevelopmentIcon`, `HeartIcon`, `FolderFilledIcon`, `FacilitateIcon`
- **Social:** `GitHubIcon`, `LinkedInIcon`, `MediumIcon`
- **UI:** `DownloadOutlinedIcon`, `HamburgerMenuIcon`, `CloseIcon`

`lucide-react` is also installed (e.g. `ChevronsRight` in the "More Projects"
button) and available for additional icons.

---

## 8. Motion

- Standard transition: **300ms** `transition-all` on interactive elements (buttons, links).
- Subtle background-color change on hover for cards (project items, company boxes).
- `canvas-confetti` is installed for celebratory moments; `tw-animate-css`
  provides animation utilities.

---

## 9. Known inconsistencies (drift)

Surfaced by reconciling the source tokens against the rendered DOM — worth a look:

1. **`grayscale-700` and `grayscale-800` are identical** (`hsl(218,9%,53%)`).
   Looks like a copy-paste slip; `grayscale-800` should likely be darker.
2. **Bold (700) renders but isn't loaded.** Headings/quotes use
   `--font-weight-bold: 700`, but the Mulish `<link>` only requests 300–600, so
   the browser synthesizes faux-bold. Add `700` to the font URL for true bold.
3. **`--shadow-card` is barely/never observed** in the render — `--shadow-image`
   and Tailwind `shadow-xs` dominate. Confirm whether the mobile project-card
   shadow is still wanted.
4. **Dark mode is unshipped & partial.** Dark tokens exist but no toggle renders
   them, and even if toggled, brand-colored sections (`bg-primary-*`,
   `bg-grayscale-*`) don't adapt — only the semantic layer does. If dark mode
   becomes real, the dark palette needs brand-tuning.
5. **Two overlapping color systems** — brand `@theme` scales vs. the shadcn
   semantic layer. Intentional, but reach for the **brand scales** for portfolio
   UI; the semantic layer mainly powers `bg-background`/`text-foreground`.
