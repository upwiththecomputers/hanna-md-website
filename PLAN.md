# Implementation Plan — Hanna Mikulska-Delgaldo Website

## Overview

A personal business website for Hanna Mikulska-Delgaldo, a professional buyer based in Poland. The site is statically generated (SSG), mobile-first, SEO-optimized, and designed for instant page loads. The visual identity uses a dark background with large serif typography and a sober, modern aesthetic.

---

## 1. Technology Stack

| Layer | Technology |
|-------|-----------|
| Runtime | **Bun** (package manager, bundler, test runner) |
| Language | **TypeScript** (strict mode) |
| Framework | **Hono** with `@hono/ssg` for static site generation |
| Styling | **CSS Modules** (`.module.css` files) with **CSS Container Queries** for responsive layouts |
| Output | Pre-rendered static HTML + minimal CSS, no client-side JS |

---

## 2. Project Structure

```
hanna-md-website/
├── README.md
├── PLAN.md
├── package.json
├── tsconfig.json
├── bunfig.toml
├── build.ts                  # SSG build script
├── src/
│   ├── index.tsx             # Hono app definition and routes
│   ├── layout.tsx            # Base HTML shell (head, meta, body wrapper)
│   ├── pages/
│   │   └── home.tsx          # Home page component
│   ├── components/
│   │   ├── hero.tsx          # Hero banner component
│   │   ├── hero.module.css
│   │   ├── header.tsx        # Site header / navigation
│   │   ├── header.module.css
│   │   ├── footer.tsx        # Site footer
│   │   └── footer.module.css
│   └── styles/
│       ├── global.css        # CSS reset, custom properties, font-face declarations
│       └── layout.module.css # Page-level layout styles
└── public/
    ├── fonts/                # Self-hosted serif font files (WOFF2)
    ├── images/
    │   └── profile-placeholder.webp
    ├── favicon.ico
    └── robots.txt
```

---

## 3. Design System

### 3.1 Color Palette

All colors are defined as CSS custom properties in `global.css`.

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#0A0A0A` | Page background — near-black to avoid pure-black harshness |
| `--color-surface` | `#141414` | Card/section background — subtle lift from the base |
| `--color-text-primary` | `#F0ECE4` | Body text — warm off-white for comfortable reading (contrast ratio ~15.8:1 on `--color-bg`) |
| `--color-text-secondary` | `#A8A29E` | Muted/secondary text (contrast ratio ~7.1:1 on `--color-bg`) |
| `--color-accent` | `#C8A96E` | Warm gold accent — links, highlights, hover states (contrast ratio ~7.5:1 on `--color-bg`) |
| `--color-accent-hover` | `#DFC08A` | Lighter accent for hover/focus |
| `--color-border` | `#2A2A2A` | Subtle borders and dividers |

All pairings exceed WCAG AA (4.5:1) for normal text and AAA (7:1) for large text.

### 3.2 Typography

- **Heading font**: A serif typeface — self-hosted **Playfair Display** (WOFF2), loaded via `@font-face` with `font-display: swap`
- **Body font**: System serif stack — `Georgia, "Times New Roman", serif` (zero network cost)
- **Scale** (fluid, using `clamp()`):
  - `--text-hero`: `clamp(2.5rem, 6vw, 5.5rem)` — name in the hero
  - `--text-h1`: `clamp(2rem, 4vw, 3.5rem)`
  - `--text-h2`: `clamp(1.5rem, 3vw, 2.25rem)`
  - `--text-body`: `clamp(1rem, 1.2vw, 1.125rem)`
  - `--text-small`: `0.875rem`
- **Line height**: 1.5 for body, 1.1 for headings
- **Letter spacing**: Slightly positive (`0.02em`) for headings, normal for body

### 3.3 Spacing & Layout

- 8px base spacing unit (`--space-unit: 0.5rem`)
- Content max-width: `72rem` (1152px), centered with auto margins
- Section padding uses the spacing scale: `--space-section: clamp(3rem, 8vw, 6rem)`

---

## 4. Responsive Strategy — Mobile-First with Container Queries

### 4.1 Approach

Standard media queries are used only at the page-layout level (e.g., switching from single-column to two-column). All component-level responsiveness uses **CSS Container Queries**, making components self-contained and reusable.

### 4.2 Container Setup

```css
/* layout.module.css */
.pageWrapper {
  container-type: inline-size;
  container-name: page;
}
```

```css
/* hero.module.css */
.hero {
  container-type: inline-size;
  container-name: hero;
  /* Mobile-first: single column, stacked */
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding: var(--space-section) var(--space-md);
}

@container hero (min-inline-size: 640px) {
  .hero {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
```

### 4.3 Breakpoints (container-based)

| Name | Width | Behavior |
|------|-------|----------|
| Base | < 640px | Single column, stacked layout |
| Medium | ≥ 640px | Two-column hero (text left, image right) |
| Large | ≥ 1024px | Increased spacing, larger typography |

---

## 5. Page Sections & Components

### 5.1 Layout Shell (`layout.tsx`)

The base HTML wrapper, rendered once. Contains:

- `<!DOCTYPE html>` and `<html lang="en">`
- `<head>` with all meta tags (see SEO section), font preloads, and inlined critical CSS
- `<body>` wrapping a `<div class="pageWrapper">` container query root
- Slot for page content

### 5.2 Header (`header.tsx`)

- Minimal top bar with the name "Hanna Mikulska-Delgaldo" as a wordmark (styled text, not a logo image)
- Optional navigation links if the site grows (initially just a single-page site)
- Sticky on scroll is not needed for a single-page site

### 5.3 Hero Banner (`hero.tsx`)

The hero is the centrepiece of the home page:

- **Left column**: Name displayed in `--text-hero` size, serif font. Below the name, a single-line tagline: "Professional Buyer" in `--color-text-secondary`. Optional subtle CTA button or contact link in the accent color.
- **Right column**: A profile picture placeholder — a styled `<div>` with `aspect-ratio: 3/4`, background color `--color-surface`, a subtle border, and an accessible `aria-label`. When a real image is provided later, replace with an `<img>` tag with `loading="eager"`, explicit `width`/`height`, and `alt` text.
- On mobile (< 640px container width): image stacks above or below the text.

### 5.4 Footer (`footer.tsx`)

- Copyright line: "© 2025 Hanna Mikulska-Delgaldo"
- Optional row of links (LinkedIn, email) styled in `--color-text-secondary`

---

## 6. SSG Build Pipeline

### 6.1 Hono App (`src/index.tsx`)

```ts
import { Hono } from "hono";
import { ssgParams } from "hono/ssg";
// ... page imports

const app = new Hono();

app.get("/", (c) => {
  return c.html(renderHomePage());
});

export default app;
```

### 6.2 Build Script (`build.ts`)

```ts
import { toSSG } from "hono/ssg";
import { bunFileSystemModule } from "@hono/ssg/bun";
import app from "./src/index";

toSSG(app, bunFileSystemModule, { dir: "./dist" });
```

### 6.3 NPM Scripts (`package.json`)

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `bun run --hot src/index.tsx` | Local dev server with hot reload |
| `build` | `bun run build.ts` | Generate static files to `./dist` |
| `preview` | `bun run --port 3000 dist` | Serve the built output locally |

---

## 7. SEO Strategy

### 7.1 Meta Tags (in `layout.tsx`)

```html
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Hanna Mikulska-Delgaldo — Professional Buyer</title>
<meta name="description" content="Hanna Mikulska-Delgaldo is a professional buyer based in Poland, specializing in procurement and sourcing." />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://hannamd.com/" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:title" content="Hanna Mikulska-Delgaldo — Professional Buyer" />
<meta property="og:description" content="Professional buyer based in Poland." />
<meta property="og:url" content="https://hannamd.com/" />
<meta property="og:image" content="https://hannamd.com/images/og-image.jpg" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
```

### 7.2 Structured Data (JSON-LD)

Inline `<script type="application/ld+json">` in the layout with a `Person` schema:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Hanna Mikulska-Delgaldo",
  "jobTitle": "Professional Buyer",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "PL"
  }
}
```

### 7.3 Other SEO Assets

- `robots.txt` allowing all crawlers
- `sitemap.xml` generated at build time (single URL)
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`, proper heading hierarchy (`h1` only once)

---

## 8. Performance — Instant Page Load

| Technique | Detail |
|-----------|--------|
| **Zero client JS** | SSG output is pure HTML + CSS. No JavaScript shipped to the browser. |
| **Inlined critical CSS** | The CSS for above-the-fold content is inlined in `<style>` tags in the `<head>`. |
| **Self-hosted fonts** | WOFF2 only, loaded via `@font-face` with `font-display: swap`. Preloaded with `<link rel="preload">`. |
| **System font fallback** | Georgia/serif fallback so text is visible immediately. |
| **Minimal CSS** | CSS Modules produce scoped, tree-shaken output. No framework CSS overhead. |
| **Image optimization** | Profile image served as WebP with explicit dimensions to prevent layout shift. |
| **Static hosting** | Output is a flat `dist/` folder deployable to any CDN (Cloudflare Pages, Vercel, Netlify). |

Target Lighthouse scores: 100 across Performance, Accessibility, Best Practices, and SEO.

---

## 9. Accessibility

- Sufficient color contrast on all text (verified in §3.1)
- Semantic HTML landmarks (`<header>`, `<main>`, `<footer>`)
- Alt text on all images; `aria-label` on the placeholder
- Focus-visible styles on interactive elements using `--color-accent`
- `prefers-reduced-motion` respected (disable any transitions)
- `prefers-color-scheme` not needed (the site is dark by design, but this can be revisited)
- Language attribute on `<html lang="en">`

---

## 10. Implementation Steps (Ordered)

1. **Project initialization** — `bun init`, install `hono` and `@hono/ssg`, configure `tsconfig.json`
2. **Create `global.css`** — CSS reset, custom properties (colors, typography, spacing)
3. **Create `layout.tsx`** — HTML shell with all meta tags, JSON-LD, font preloads, and CSS injection
4. **Create `header.tsx` + `header.module.css`** — Wordmark header
5. **Create `hero.tsx` + `hero.module.css`** — Two-column hero with container queries, profile placeholder
6. **Create `footer.tsx` + `footer.module.css`** — Copyright and links
7. **Create `home.tsx`** — Compose header + hero + footer into the home page
8. **Create `src/index.tsx`** — Hono app with routes
9. **Create `build.ts`** — SSG build script
10. **Add static assets** — `robots.txt`, favicon, font files, placeholder image
11. **Test locally** — Run dev server, verify responsive behavior, audit with Lighthouse
12. **Polish** — Fine-tune spacing, verify contrast, validate HTML
