# Design System — CodeAlpha Store (Modern E-Commerce Redesign)

**Project:** CodeAlpha Internship — Simple E-commerce Store (`CodeAlpha Store`)  
**Branch Status:** Active Redesign on `feature/modern-frontend-redesign` (`main` retains previous v2 `White Canvas Commerce`)  
**Companion Architecture:** [frontend-component-architecture.md](./frontend-component-architecture.md) · [frontend-ux-blueprint.md](./frontend-ux-blueprint.md)

> [!NOTE]
> The `feature/modern-frontend-redesign` branch updates the visual system across all 11 App Router routes to a light editorial-modern storefront with a sticky top horizontal navigation bar, high-contrast `#7C3AED` Violet accents, `#F9FAFB` page surfaces, self-hosted `Inter` typography, and local WebP studio photography while preserving 100% of existing business logic and data contracts.

---

## 1. Visual Language & Core Principles

1. **Crisp Modern Light Surfaces:** `#F9FAFB` (`--color-page-bg`) frames `#FFFFFF` (`--color-surface`) elevated cards and `#F3F4F6` (`--color-surface-subtle`) image stages separated by crisp `1px solid #E5E7EB` borders.
2. **Disciplined Violet Accent System:** `#7C3AED` (`--color-brand-violet`) and `#5B21B6` (`--color-brand-dark`) are used purposefully for primary CTA buttons, brand mark, active route pills, interactive focus states, and free-shipping progress bars — paired with `#F5F3FF` (`violet-soft`) and `#DDD6FE` (`violet-border`) soft highlights.
3. **Structured 16px / 12px / 10px Geometry:** Cards share a uniform `16px` radius (`--radius-card`), product frames use `12px` (`--radius-image`), form inputs and action buttons use `10px` (`--radius-control`), and status tags use full pill radii (`9999px`).
4. **High-Legibility Neutrals:** Headings and prices use `#111827` (`--color-ink`), secondary UI copy uses `#374151`, and muted metadata uses `#6B7280`.

---

## 2. Color Palette & CSS Tokens (`frontend/src/app/globals.css` & `frontend/tailwind.config.ts`)

| Role | CSS Variable | Tailwind Token | Hex Value | Usage |
| --- | --- | --- | --- | --- |
| Primary Accent | `--color-brand-violet` | `brand-violet` | `#7C3AED` | Primary CTAs, brand mark, active states, focus outline |
| Accent Hover / Active | `--color-brand-dark` | `brand-dark` | `#5B21B6` | Primary button hover, category kicker text, badge text |
| Soft Violet Wash | `--color-violet-soft` | `violet-soft` | `#F5F3FF` | Active nav link fill, hero kicker badge, active filter tint |
| Soft Violet Border | `--color-violet-border` | `violet-border` | `#DDD6FE` | Pill border, active filter outline, focus ring |
| Page Background | `--color-page-bg` | `page-bg` | `#F9FAFB` | Viewport canvas background |
| Elevated Card Surface | `--color-surface` | `surface` | `#FFFFFF` | Sticky header, cards, sidebar, drawers, inputs |
| Subtle Media Stage | `--color-surface-subtle` | `surface-subtle` | `#F3F4F6` | Square/4:3 media stages and secondary containers |
| Primary Ink | `--color-ink` | `ink` | `#111827` | Headings, product titles, numeric totals |
| Secondary Ink | `--color-ink-secondary` | `ink-secondary` | `#374151` | Top-level navigation links, table labels, specs |
| Muted Text | `--color-muted` | `muted` | `#6B7280` | Descriptions, SKUs, breadcrumbs, placeholders |
| Hairline Border | `--color-border` | `border-default` | `#E5E7EB` | Card outlines, dividers, inputs, table rows |

---

## 3. Typography (`Inter` Self-Hosted WOFF2 Only)

Loaded locally in [layout.tsx](../frontend/src/app/layout.tsx) via `next/font/local` (`400`, `500`, `600`, `700`; variable `--font-inter`; `display: swap`):

| Role | Class | Weight | Fluid Scale & Line Height | Letter Spacing |
| --- | --- | --- | --- | --- |
| Hero Display | `.display-hero` | `600` | `clamp(2rem, 1.55rem + 1.35vw, 2.5rem)` / `1.12` | `-0.025em` |
| Section Display | `.display-section` | `600` | `clamp(1.5rem, 1.3rem + 0.65vw, 1.875rem)` / `1.2` | `-0.02em` |
| Subsection Heading | `.heading-sub` | `600` | `clamp(1.125rem, 1.05rem + 0.35vw, 1.375rem)` / `1.3` | `-0.015em` |
| UI Buttons & Nav | Base / Tailwind | `500`–`600` | `0.875rem` – `1rem` | `0` to `-0.01em` |
| Body & Captions | Base / Tailwind | `400` | `0.75rem` – `0.9375rem` / `1.55` | `0` |

- Numeric columns and prices consistently use `.tabular-nums` (`font-variant-numeric: tabular-nums`).

---

## 4. Layout Grid, Controls & Modern Web Standards

- **Container Max Width:** `1280px` (`max-w-store` / `.store-container` with `16px` mobile, `24px` `sm+`, and `32px` `lg+` inline padding).
- **Accessible Touch Targets:** `.btn-primary` and `.btn-secondary` enforce `min-block-size: 44px` (`10px` radius).
- **Layout Stability & Overflow Hygiene:** `html` applies `scrollbar-gutter: stable`; `body` applies `overflow-x: clip`; headings use `text-wrap: balance`; prose uses `text-wrap: pretty`.
- **Native Modal Light Dismiss:** `CartDrawer`, `MobileNavDrawer`, and `FilterDrawer` use native `<dialog closedby="any">` via `.showModal()` with a click-outside backdrop light-dismiss fallback.
- **Reduced Motion & High Contrast:** Hover transforms (`.card-hover-lift`), smooth scrolling, and drawer slide-in animations are scoped inside `@media (prefers-reduced-motion: no-preference)`; `@media (forced-colors: active)` enforces `ButtonText` borders and `Highlight` focus outlines.
