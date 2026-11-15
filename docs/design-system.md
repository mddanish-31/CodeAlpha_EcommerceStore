# Design System — Floating Shopping Constellation (White Canvas Commerce)

**Project:** CodeAlpha Internship — Simple E-commerce Store (`simple.`)  
**Status:** Active Production Design System (Phase 4D Implementation)  
**Primary Authoritative Companion:** [design-system-v2.md](./design-system-v2.md)  
**Interactive Visual Preview:** [shop-constellation-preview.html](./preview/shop-constellation-preview.html)

> [!NOTE]
> The earlier **Editorial Craft Market** dark espresso/Ember Rust/Antonio v1 visual system from Phase 4A/4B has been superseded by **Floating Shopping Constellation — White Canvas Commerce** (Phase 4C/4D). See [design-system-v2.md](./design-system-v2.md) and [design-reference-mapping-v2.md](./design-reference-mapping-v2.md) for the complete transition rationale.

---

## 1. Visual Language & Core Principles

1. **White Canvas Minimalist Commerce:** Primary viewport canvas `#F2F4F5` (Canvas Mist), framing pure white (`#FFFFFF`) elevated cards and floating search/navigation surfaces.
2. **Concentric Nesting Geometry:** Outer product cards use `28px` border radius with subtle elevation and `1px solid #EAEBED`; inner `1:1` product illustration stages use `20px` border radius (`8px` inset frame).
3. **Disciplined Accent Restraint (`#5433EB`):** Shop Violet (`#5433EB`) is strictly reserved for the `simple.` brand wordmark period, circular hero search submit button, `:focus-visible` focus rings (`2px` outline + `#EFECFC` tint), and active desktop rail icon fill. Zero gradients are permitted anywhere.
4. **High-Contrast Neutrals:** Primary conversion actions use crisp Ink Black (`#000000`) pills with Pure White (`#FFFFFF`) text or inverted white pills inside dark Slate Ink (`#332F2D`) spotlight panels.

---

## 2. Color Palette & CSS Tokens (`frontend/src/app/globals.css`)

| Role | Token | Hex Value | Usage |
| --- | --- | --- | --- |
| Primary Canvas | `--color-canvas-mist` | `#F2F4F5` | Page viewport background |
| Elevated Card Surface | `--color-pure-white` | `#FFFFFF` | Product cards, search bar, desktop rail, drawers, forms |
| Primary Ink & CTAs | `--color-ink-black` | `#000000` | Headings, active category pills, primary dark pill buttons |
| Hairline Border | `--color-faint-border` | `#EAEBED` | Card borders, dotted dividers, table separators |
| Muted Body & Labels | `--color-muted-gray` | `#757576` | Secondary copy, breadcrumbs, SKU labels |
| Secondary Card Surface | `--color-canvas-secondary` | `#F7F7F7` | Neutral input backgrounds and secondary panels |
| Cool Studio Stage | `--color-cool-stone` | `#F3F3F3` | `1:1` inner product stage variant |
| Warm Studio Stage | `--color-warm-fog` | `#F0EEED` | Warm stone inner product stage variant |
| Dark Ink Spotlight | `--color-slate-ink` | `#332F2D` | High-contrast dark feature cards and product stages |
| Ash Neutral Accent | `--color-ash-veil` | `#97928E` | Subtle warm-gray product stage contrast |
| Restrained Brand Violet | `--color-shop-violet` | `#5433EB` | Brand dot, circular search CTA, active states, focus rings |
| Violet Tint Surface | `--color-violet-wash` | `#EFECFC` | Active nav icon wash and active pill highlight |

---

## 3. Typography (`Inter` Self-Hosted WOFF2 Only)

| Role | Class | Weight | Fluid Scale & Line Height | Tracking |
| --- | --- | --- | --- | --- |
| Hero Display | `.display-hero` | `600` | `clamp(1.75rem, 1.35rem + 1.5vw, 2.5rem)` / `1.1` | `-0.055em` |
| Section Display | `.display-section` | `600` | `clamp(1.25rem, 1.125rem + 0.65vw, 1.625rem)` / `1.16` | `-0.05em` |
| Card / Row Heading | `.heading-row` | `600` | `1.25rem` / `1.2` | `-0.05em` |
| UI Controls & Pills | Base / Tailwind | `500` | `0.875rem` – `1rem` | `0` to `-0.02em` |
| Body & Captions | Base / Tailwind | `400` | `0.75rem` – `0.9375rem` | `0` |

- Loaded locally in [layout.tsx](../frontend/src/app/layout.tsx) via `next/font/local` (`400`, `500`, `600`). Font weights `700+` and display serif/condensed fonts are prohibited.

---

## 4. Spacing, Radii, Elevation & Accessibility

- **Radii:** `--radius-card: 28px`, `--radius-stage: 20px`, `--radius-input: 12px`, `--radius-pill: 9999px`.
- **Container Max Width:** `1200px` centered inside the workspace alongside a `64px` fixed white left navigation rail at `>= 1024px`.
- **Accessibility & Modern Web Standards:**
  - Native `<dialog closedby="any">` modals for `MobileNavDrawer`, `FilterDrawer`, and `CartDrawer` with click-outside backdrop fallback.
  - Semantic `<search>` landmark wrapping storefront catalog search controls.
  - Animations scoped inside `@media (prefers-reduced-motion: no-preference)`.
  - High-contrast Windows Forced Colors fallbacks defined inside `@media (forced-colors: active)`.
