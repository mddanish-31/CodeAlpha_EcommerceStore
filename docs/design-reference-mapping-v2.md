# Design Reference Mapping v2 — Floating Shopping Constellation (White Canvas Commerce)

> [!IMPORTANT]
> **Status:** Approved Design Reference Mapping (Implemented in Phase 4D)
> **Supersedes:** [design-reference-mapping.md](./design-reference-mapping.md) (Phase 4A *Editorial Craft Market* dark-first direction)
> **Style Authority:** Uploaded `DESIGN (10).md` (*Shop — Style Reference*), adapted to **Simple E-commerce Store (`simple.`)** for the CodeAlpha Internship project.
> **Related Docs:** [design-system-v2.md](./design-system-v2.md) · [frontend-ux-blueprint-v2.md](./frontend-ux-blueprint-v2.md) · [shop-constellation-preview.html](./preview/shop-constellation-preview.html)

---

## 1. Purpose of This Mapping

This document records exactly what architectural, chromatic, typographic, spatial, and interaction patterns are **Adopted Verbatim**, **Adapted for Accessibility / Brand Independence / Scope**, or **Excluded** when translating the uploaded `DESIGN (10).md` style reference into the CodeAlpha Simple E-commerce Store v2 visual system.

This keeps every downstream Phase 4C artifact and any future Phase 4D Next.js migration strictly faithful to the **Floating Shopping Constellation — White Canvas Commerce** direction without copying external brand identity or breaking existing storefront functionality.

---

## 2. Preserved Verbatim Patterns (Adopted from Reference)

| Domain | Reference Rule (`DESIGN (10).md`) | Storefront Implementation Target |
|---|---|---|
| **Surface Palette** | Cool Cloud Mist canvas `#F2F4F5`, Pure White cards/search `#FFFFFF`, Solid Black footer `#000000`, `1px solid #EBEBEB` hairlines | Global `--bg-canvas`, `--bg-surface`, `--bg-footer`, `--border-hairline` across all storefront pages and containers |
| **Brand Accent** | Electric Violet `#5433EB` for primary pills, active filters, circular search submit, focus rings, and interactive markers; Soft Violet `#C0B5F3` highlight tint | Primary CTAs, active category chips, add-to-cart / checkout buttons, focus outlines, and violet dot mark |
| **Typographic Rhythm** | Geometric sans (`Inter`), weight `400` primary, `500` medium, `600` semi-bold only; zero `700+` bold weights; tight negative tracking on display headings | Self-hosted `Inter` (`400/500/600`) across all UI copy; `-0.055em` wordmark tracking; tabular figures (`tabular-nums`) for prices |
| **Container Geometry** | Concentric rounded cards (`28px` outer card / `20px` inner `8px`-inset `1:1` product stage), pill-shaped search & controls (`9999px`) | All `ProductCard` frames, category pills, search bar, announcement pill bar, and checkout/auth panels |
| **Spatial Rhythm** | Centered `1200px` max-width workspace, `12px` uniform grid gutters, `64px–80px` vertical section spacing | Homepage hero constellation, spotlight grid, 12-item catalog grid, and PDP/Cart sections |
| **Desktop Shell** | `44px` top announcement strip + fixed `64px` desktop icon navigation rail (`>= 1024px`) with bottom account avatar slot + floating catalog hero constellation | Desktop (`1024px`, `1440px`) left utility rail (`Home`, `Search/Catalog`, `Orders/Account`, `Cart`, `About/Contact`) paired with full-width centered canvas |
| **Ambient Lighting** | Dual-layer soft elevation shadows instead of harsh borders or neon glows; clean flat-surface stacking | Hover elevation on white product cards, floating constellation tiles, and pill search bar |

---

## 3. Adapted Patterns (Modified for Brand Identity, WCAG AA, & Scope)

| Pattern | Original Reference Behavior | CodeAlpha Adaptation & Reason |
|---|---|---|
| **Brand Wordmark & Identity** | Shop purple wordmark & Shop trademark branding | Replaced with original wordmark **`simple.`** (`simple` in `#000000` `Inter 600 -0.055em` + `#5433EB` circular period accent) and *Simple E-commerce Store* metadata. Avoids trademark copying while preserving exact geometric visual punch. |
| **Muted Text Contrast on `#F2F4F5`** | `#787574` muted taupe used across light surfaces | Contrast audit measured `#787574` on `#FFFFFF` = **`4.57:1` (Pass AA)**, but `#787574` on `#F2F4F5` = **`4.14:1` (Fail AA small text)**. Adapted so `#787574` is used strictly on `#FFFFFF` surfaces; muted labels sitting directly on `#F2F4F5` use **`#595655` (`6.59:1`)** or **`#332F2D`**. |
| **Category Chip Icons** | Multi-colored category pill icons | User specification mandates **Violet `#5433EB` as the single saturated UI accent**. All category icons use monochrome `#000000` / `#332F2D` strokes (shifting to `#FFFFFF` inside active `#5433EB` pills) so violet stays singular. |
| **Display Font Stack** | Proprietary GT Standard geometric sans | Mapped to self-hosted open-source **`Inter` (`400`, `500`, `600`)** already bundled under [frontend/src/fonts/](../frontend/src/fonts/) — zero external CDN dependency, zero proprietary licensing issue, matching tight optical tracking. |
| **Product Photography Absence** | Editorial product photography cards in constellation and catalog | The repository contains zero raster product photos; `ProductIllustration.tsx` defines flat vector studio objects. Adapted into **clean flat-fill minimalist studio object silhouettes** (reusing all 12 catalog shapes in neutral studio tones `#332F2D`, `#665A54`, `#ACB0AA`, `#CCCCCC` on solid `#F2F4F5`/`#EBEBEB`/`#332F2D`/`#665A54` `1:1` stages) with zero gradients or decorative clutter. |
| **Mobile Navigation (`< 1024px`)** | Fixed `64px` desktop side rail | Per Ponytail mobile ergonomics and Section 4 responsive requirements, desktop rail hides below `1024px`. Mobile/tablet viewports (`320px`, `375px`, `768px`) render a sticky white top header bar (`simple.` mark, Search jump trigger, Menu button, Cart badge button) opening native **`<dialog closedby="any">`** drawers (`MobileNavDrawer`, `FilterDrawer`, `CartDrawer`). |
| **Interactive Product Badges** | Minimalist clean card overlay | Original catalog badges (`BESTSELLER`, `LIMITED DROP`, `NEW ARRIVAL`, `Sold Out`) are retained as high-contrast micro-pills (`#FFFFFF` on `#000000` or `#5433EB` on `#C0B5F3` wash, or muted `#332F2D` on `#EBEBEB` for sold-out) inside the `8px`-inset stage or metadata stack without text clutter. |
| **Secondary Storefront Flows** | Primarily discovery-oriented reference layout | Extended v2 tokens cleanly across all 11 existing routes (`/shop/[id]` PDP gallery & buy box, `/cart` summary, `/checkout` multi-column form + order confirmation, `/auth/login`, `/auth/register`, `/account`, `/about`, `/contact`, `not-found`) so no existing user flow breaks. |

---

## 4. Excluded Patterns (Intentionally Omitted)

1. **Multi-Merchant Marketplace Chrome:** Multi-store merchant switchers, Sign-in with Shop Pay modals, Shop Cash rewards pills, and Shop Mini-app frames are excluded (single-brand storefront scope).
2. **Additional Saturated Hue Accents:** Emerald greens, warm ambers, terracotta reds, or multi-hue category badges from `DESIGN (10).md` or Phase 4A (`#C94A29`, `#1E7E34`) are excluded; error/stock states use high-contrast ink + `#5433EB` violet or explicit icon + text labeling (`Sold Out`, validation copy — never color alone).
3. **Font Weights `700` (`Bold`), `800`, `900`:** Excluded everywhere to enforce the airy `400 / 500 / 600` weight discipline.
4. **Gradients, Glassmorphic Blurs Over Dense UI, & Decorative Shapes:** Zero `linear-gradient()`, zero `radial-gradient()`, zero SVG `<linearGradient>`, zero isometric/3D flourishes, and zero decorative background blobs.
5. **External Telemetry, Third-Party Fonts CDN, or New Libraries:** Zero Framer Motion, GSAP, Lottie, Iconify CDN, or external Google Fonts runtime calls.
6. **Global Motion Suppression Hack:** Excluded legacy `animation-duration: 0.01ms !important` global overrides; replaced with modern `@media (prefers-reduced-motion: no-preference)` scoping and native CSS/DOM light-dismiss behavior on `<dialog closedby="any">`.

---

## 5. Modern Accessibility & Platform Alignment Matrix

| Guideline Source | Adopted Pattern | Implementation Concrete Rule |
|---|---|---|
| **Modal & Drawers (`dialog`, `light-dismiss-a-dialog`)** | Native `<dialog closedby="any">` + `.showModal()` | Cart, Mobile Menu, and Filter drawers use native `<dialog>` top layer without locking `html`/`body` scroll (`overscroll-behavior: contain` on modal & backdrop; bounding-box click fallback only when `'closedBy'` unsupported). |
| **Motion (`motion`)** | `@media (prefers-reduced-motion: no-preference)` | Hover lifts, constellation float micro-motion (paused or subtle, single-axis only), and drawer slide transitions only execute when reduced motion is not preferred. Non-motion hover color/border feedback persists smoothly in all modes. |
| **Navigation & Hierarchy (`accessibility`)** | Distinguishable `<nav aria-label>`, single `<h1>`, skip link | Every page renders one `<h1>` and distinct `aria-label` values across the desktop rail (`Primary store rail`), top mobile bar (`Mobile navigation`), category strip (`Catalog departments`), and footer links (`Footer navigation`). |
| **Color & Typography (`color`, `typography`)** | Non-color state indicators & fluid text boxes | Active pills, error messages, and `Sold Out` states combine color with border/fill weight and explicit copy (`Sold Out`, check icons). No text container receives a fixed `height`/`block-size`, allowing `200%` text zoom without clipping. |

---

## 6. Cross-Reference Summary

- Preceding Superseded Mapping: [design-reference-mapping.md](./design-reference-mapping.md)
- Complete Design System v2 Specification: [design-system-v2.md](./design-system-v2.md)
- Full Route & Component UX Blueprint: [frontend-ux-blueprint-v2.md](./frontend-ux-blueprint-v2.md)
- Interactive Standalone Visual Preview: [shop-constellation-preview.html](./preview/shop-constellation-preview.html)

