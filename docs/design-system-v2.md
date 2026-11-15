# Design System v2 — Floating Shopping Constellation (White Canvas Commerce)

**Project:** Simple E-commerce Store (`CodeAlpha_EcommerceStore`)  
**Phase:** Phase 4C — New Design System & Visual Preview *(Design Preparation Only)*  
**Style Authority:** Adapted from `DESIGN (10).md` (*Shop — Style Reference*) for **Simple E-commerce Store**  
**Status:** **Approved Authoritative Design System (Implemented in Phase 4D)**  

> [!IMPORTANT]
> **Supersedes Prior Design Direction:** Upon approval of Phase 4C, this **Floating Shopping Constellation — White Canvas Commerce** specification (`docs/design-system-v2.md`) supersedes the previous warm dark *Editorial Craft Market* design system documented in [design-system.md](./design-system.md). Prior Phase 4A documents and Phase 4B production source code under [frontend/](../frontend) remain untouched during Phase 4C evaluation.

---

## 1. Visual Philosophy

The **Simple E-commerce Store** v2 design system shifts from a dark poster aesthetic to **White Canvas Commerce**—an airy, image-first storefront built on soft white surfaces, tactile concentric geometry, quiet typography, and a single saturated violet accent:

1. **Product-First White Canvas:** Products sit in generous `28px`-radius `#FFFFFF` cards lifted cleanly off a `#F2F4F5` Canvas Mist backdrop via dual-layer soft shadows—replacing heavy box borders and dark recessed wells.
2. **Concentric Pillow-Soft Geometry:** Every product card pairs a `28px` outer radius with a `20px` inner image stage inset by `8px` (`28px − 8px = 20px`), creating a clean white gallery frame around every product visual. Interactive controls (`search`, `buttons`, `chips`, `inputs`) use full `9999px` pill geometry.
3. **Typography Shaped by Tracking, Not Bold Weight:** Uses existing self-hosted **Inter** rendered primarily at weight `400`, with restrained `500` and `600` weight shifts for display headings, wordmarks, and price figures—never `700+` heavy bold blocks. Hierarchy is sculpted via tight negative letter spacing (`-0.05em` on headings, `-0.031em` on `16px` body copy).
4. **Singular Violet Accent Discipline:** `#5433EB` (with translucent `#C0B5F3` wash/glow) is the sole saturated UI accent in the entire interface—anchoring brand identity (`simple.`), the circular search submit trigger, primary pill CTAs, active cart badges, and keyboard focus rings. Product studio tones stay warm-neutral (`#332F2D`, `#665A54`, `#ACB0AA`, `#CCCCCC`), and zero gradients, zero decorative background flourishes, and zero 3D effects are used.

---

## 2. Exact Color Tokens

### 2.1 Reference Palette (`DESIGN (10).md`) & Verified Contrast

| Token Name | CSS Variable | Hex / Value | Verified Contrast Notes (WCAG 2.1) | Storefront Role |
| :--- | :--- | :--- | :--- | :--- |
| **Canvas Mist** | `--color-canvas-mist` | `#F2F4F5` | `19.03 : 1` vs `#000000` (AAA) | Level 0 primary page background across all storefront routes |
| **Pure White** | `--color-pure-white` | `#FFFFFF` | `21.00 : 1` vs `#000000` (AAA) | Level 1–2 card surfaces, `64px` desktop rail, inputs, search pill, category chips |
| **Ink Black** | `--color-ink-black` | `#000000` | `21.00 : 1` vs `#FFFFFF` (AAA) | Primary text, headings, mono line icons, active labels, dark footer canvas |
| **Muted Gray** | `--color-muted-gray` | `#787574` | `4.57 : 1` vs `#FFFFFF` (AA) / `4.14 : 1` vs `#F2F4F5` | Secondary text, ratings, placeholders, and idle icons **inside `#FFFFFF` surfaces** |
| **Slate Ink** | `--color-slate-ink` | `#332F2D` | `13.25 : 1` vs `#FFFFFF` (AAA) / `13.25 : 1` vs `#FFFFFF` on dark | Dark spotlight card surface, overlay hero text, high-contrast secondary copy on `#F2F4F5` |
| **Faint Border** | `--color-faint-border` | `#EBEBEB` | Hairline divider (`< 3:1`) | Subtle card hairlines, table separators, pill borders (paired with `--shadow-sm`), rail avatar ring |
| **Violet Accent** | `--color-violet-accent` | `#5433EB` | `6.88 : 1` vs `#FFFFFF` (AA/AAA) / `6.24 : 1` vs `#F2F4F5` (AA) | **Single saturated accent:** wordmark dot, circular search submit, primary CTA fill, focus ring |
| **Violet Wash** | `--color-violet-wash` | `#C0B5F3` | `11.15 : 1` vs `#000000` (AAA) | Soft focus/hover halo, active selection tint, dark-surface violet label text |
| **Cool Stone** | `--color-cool-stone` | `#CCCCCC` | `1.61 : 1` vs `#FFFFFF` | Placeholder image stages, disabled button fills (paired with accessible text), inactive tracks |
| **Warm Fog** | `--color-warm-fog` | `#ACB0AA` | Surface wash | Muted neutral studio backdrop for secondary product imagery |
| **Ash Veil** | `--color-ash-veil` | `#665A54` | `6.66 : 1` vs `#FFFFFF` (AAA) | Warm desaturated dark backdrop for lifestyle/studio product cards holding white text |

> [!NOTE]
> **Contrast Safety Rule for `#787574` vs `#F2F4F5`:** `#787574` passes WCAG AA (`4.57 : 1`) on `#FFFFFF`, but measures `4.14 : 1` on `#F2F4F5` Canvas Mist. Therefore:
> - Keep `#787574` inside `#FFFFFF` cards, inputs, and chips (`4.57 : 1` AA).
> - Use `#332F2D` Slate Ink (or a neutral ink intermediate `#595655` at `6.59 : 1`) whenever secondary text or breadcrumbs sit directly on the `#F2F4F5` Canvas Mist background.
> - Input borders use `rgba(0, 0, 0, 0.24)` or `#787574` on focus so non-text UI component boundaries maintain clear legibility (`WCAG 1.4.11`), avoiding low-contrast invisible boxes.
> - Because violet is the **only** saturated UI accent, validation error banners and `SOLD OUT` / `LOW STOCK` badges distinguish state through explicit iconography, shape, crisp `1.5px` Ink Black borders, or Ink Black fills (`#000000` with `#FFFFFF` text) plus semantic copy (`Error:`, `role="alert"`)—never relying on color alone (`WCAG 1.4.1`) and never adding red/orange accent colors.

---

## 3. Typography Rules (`Inter` Self-Hosted Substitute)

- **Font Licensing & Delivery:** Uses the repository's existing self-hosted `Inter` WOFF2 font files (`frontend/src/fonts/inter-latin-400-normal.woff2`, `500`, `600`) loaded via `next/font/local` (and local `@font-face` in standalone preview) as the zero-cost, open-source substitute for `GT Standard` & `Shopify Sans`. **No `700` bold weights are used** in the v2 system.
- **Weight Discipline:** `400` is the primary body, link, input, and button weight; `500` handles compact UI chips/labels/prices; `600` is reserved strictly for wordmarks, major section headings, spotlight card titles, and primary order totals.

| Role | Token | Font Size (`rem` / px eq.) | Line Height | Letter Spacing | Weight | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero / Spotlight Display** | `--text-display` | `clamp(1.625rem, 1.35rem + 1.25vw, 2.25rem)` (`26px -> 36px`) | `1.12` | `-0.055em` | `600` | Wordmark (`simple.`), PDP title, 404 numeral, Checkout confirmation headline |
| **Section Heading (`h2`)** | `--text-heading` | `1.25rem` (`20px`) | `1.20` | `-0.05em` (`-1px`) | `600` | Category section crowns + chevron, Cart / Account section headings |
| **Body LG / Input / Chip** | `--text-body-lg` | `1rem` (`16px`) | `1.33` | `-0.031em` (`-0.5px`) | `400` | Primary body copy, search placeholder, category chips, standard mobile input (`>= 16px` prevents iOS zoom) |
| **Body Default / Card Title** | `--text-body` | `0.875rem` (`14px`) | `1.33` | `-0.014em` | `400` / `500` | Product card titles (`500`), nav labels, descriptions, PDP price summaries |
| **Body SM / Meta / Button** | `--text-body-sm` | `0.75rem` (`12px`) | `1.33` | `-0.017em` | `400` / `500` | Secondary labels, filter metadata, footer columns, pill buttons, inline helper notes (`12px` floor for UI copy) |
| **Micro Rating / Stock** | `--text-caption` | `0.6875rem` (`11px`) | `1.30` | `-0.01em` | `400` / `500` | Strictly compact star rating & stock count rows inside dense product cards |

> **WCAG Text Scaling Rule:** Avoid fixed pixel heights (`height` / `block-size`) on any pill, chip, button, or card holding text. Always use `min-block-size` (`44px` on touch targets) paired with fluid padding so text scales to 200% (`WCAG 1.4.4` / `1.4.12`) without clipping. All prices, subtotals, and stock quantities retain `font-variant-numeric: tabular-nums`.

---

## 4. Shapes, Radius & Shadow Hierarchy

### 4.1 Border Radius System

| Component Group | Token | Value | Design Rule |
| :--- | :--- | :--- | :--- |
| **Product Cards, Spotlight Tiles, Checkout/Auth Containers, Hero Showcase** | `--radius-card` | `28px` | Generous outer silhouette; separated by shadow, no thick borders |
| **Inner Product Image Stages (Gallery & Card Crops)** | `--radius-image-inner` | `20px` | Concentric inside `28px` cards padded by `8px` (`28px - 8px = 20px`), producing a clean `8px` white breathing frame |
| **Rail Active Pill, Multi-line Textareas** | `--radius-tile-sm` | `20px` | Active state container in `64px` sidebar rail; multi-line notes textarea (`16px–20px`) |
| **Mini Thumbnails & Overlaid Label Tags** | `--radius-chip-sm` | `12px` | `48px` mini swatch strip thumbnails and frosted label chips on hero product tiles |
| **Search Pill, Buttons, Category Chips, Inputs, Badges** | `--radius-pill` | `9999px` | Every interactive pill, category filter, form input, and CTA button |

### 4.2 Layered Soft Elevation Tokens (Replaces Hard Borders)

| Elevation Token | Exact Value | Usage |
| :--- | :--- | :--- |
| `--shadow-sm` | `0 2px 8px 0 rgba(0, 0, 0, 0.06)` | Category pills, compact chips, resting cookie/action pills |
| `--shadow-sm-2` | `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)` | **Hero floating product cards & catalog discovery cards** (dual-layer soft lift off `#F2F4F5`) |
| `--shadow-lg` | `0 4px 24px 0 rgba(0, 0, 0, 0.12)` | Carousel circular navigation arrows, floating hero emphasis, modal sheets |
| `--shadow-lg-2` | `0 4px 24px 0 rgba(69, 36, 219, 0.34)` | **Strictly reserved for the circular `#5433EB` search submit button** |

---

## 5. Spacing & Layout Grid Architecture

- **Centered Max Content Width:** `1200px` (`--page-max-width: 1200px`), centered within the remaining canvas space beside the `64px` desktop rail.
- **Spacing Rhythm:**
  - **Compact Component & Grid Gap:** `12px` (`--element-gap: 12px`) between chips, grid tiles, and mini swatch thumbnails (`4px`–`8px` micro-gaps inside cards).
  - **Major Section Vertical Rhythm:** `64px` (`--section-gap: 64px`) default, expanding to `80px` on desktop (`>= 1024px`) between the Hero Constellation, Discovery Sections, and Footer.
- **Card Padding Rule:** Product cards either keep `8px` outer breathing frame around the `20px`-radius studio image + `12px` text block below, or `0px` top image-to-edge on full-bleed dark editorial hero cards (`Product Type Hero Image`).

---

## 6. Navigation Architecture (Desktop vs Mobile)

| Viewport | Navigation Surface | Layout & Accessibility Rules |
| :--- | :--- | :--- |
| **Desktop (`>= 1024px`)** | **Persistent `64px` Left Sidebar Nav Rail** | Fixed left column (`width: 64px`, `background: #FFFFFF`, `border-right: 1px solid #EBEBEB`). Houses `48px × 48px` tappable icon links/buttons centered in the rail (`Home`, `Shop`, `Search` focus jump, `Account`, `Cart` with live `#5433EB` badge, `About`, `Contact`), plus a bottom `32px` circular profile avatar (`1px solid #EBEBEB`). Active item fills `20px`-radius `#F2F4F5`. Every icon-only control carries an explicit `aria-label`, visible `#5433EB` `:focus-visible` outline, and an optional hover/focus tooltip label so destination meaning is unambiguous. |
| **Tablet / Mobile (`< 1024px`, `320px–1023px`)** | **Compact Sticky White Header + Native `<dialog>` Drawer** | The `64px` sidebar rail hides completely below `1024px` (never squeezed onto narrow viewports). Replaces with a sleek `#FFFFFF` top bar (`min-height: 56px`, `1px solid #EBEBEB` bottom border) showing compact `simple.` wordmark on left, plus `44px × 44px` Search trigger, Cart trigger (`bag` icon + `#5433EB` count badge), and Hamburger Menu button (`☰`) opening the existing `<dialog id="mobile-nav-dialog" closedby="any">` slide-over drawer. |

---

## 7. Component-Level Design Rules

1. **Brand Wordmark (`simple.`):** Set in `Inter` weight `600`, tight `-0.055em` tracking, `#000000` ink text, anchored by a crisp `#5433EB` solid violet circle accent—distinct from third-party Shop/Shopify trademarks.
2. **Hero Search Pill:** `max-width: 620px`, `9999px` radius, `#FFFFFF` fill, `1px solid rgba(0, 0, 0, 0.14)` border (shifts to `#5433EB` on `:focus-within`), `padding: 4px 4px 4px 20px`. Houses native `<search>` input + `48px × 48px` circular `#5433EB` submit button (`--shadow-lg-2`, white right arrow). Clicking focuses cleanly and routes/filters catalog results.
3. **Category Pill Chips:** `9999px` radius, `#FFFFFF` fill, `1px solid #EBEBEB`, `--shadow-sm`. `16px` mono line/filled category icon on the left (`#000000` or active `#5433EB`) + `16px` Inter `400` label on right (`padding: 6px 16px 6px 10px`). Active filter fills `#5433EB` with `#FFFFFF` text (`6.88 : 1`) or `#F2F4F5` with `#5433EB` `1.5px` ring.
4. **White Product Card:** `28px` radius, `#FFFFFF`, `--shadow-sm-2`, `8px` frame around `1:1` `20px`-radius studio object container. Content below in `12px` stack: Title (`14px`, `500`, `#000000`), Category & availability/rating (`11px`–`12px`, `#787574`), Price (`14px`–`16px`, `500`, `tabular-nums`), and `Add` pill CTA (`9999px`, hover `#5433EB` / `#FFFFFF`).
5. **Dark Hero / Spotlight Tile (`Product Type Hero Image`):** `28px` radius, solid `#332F2D` Slate Ink or `#665A54` Ash Veil backdrop (zero gradients), large `#FFFFFF` title & metadata top-left, subtle overlaid `12px`-radius semi-opaque white tag (`#FFFFFF` at `92%` alpha, `#000000` text) bottom-left.
6. **Carousel Section Arrow:** Circular `32px` (or `44px` touch-friendly) `#FFFFFF` button with `--shadow-lg` (`0 4px 24px rgba(0,0,0,0.12)`) and `#000000` chevron, floating on the right edge of horizontal discovery rows.
7. **Mini Swatch Strip:** 3–4 compact `48px × 48px` square product tiles (`12px` radius, `2px–4px` gap) inside spotlight cards for instant angle/variant switching.
8. **Clean Dark Footer:** Full-width `#000000` Ink Black band at bottom edge, `64px` top spacing, `#FFFFFF` primary links/headings, `#CCCCCC` secondary links (`>= 12:1` on `#000000`), `#C0B5F3` violet wash accent tags (`>= 11:1` on `#000000`), hairline `1px solid #332F2D` divider.

---

## 8. Accessibility & Quality Guardrails (WCAG 2.1 AA)

1. **Keyboard Focus (`WCAG 2.4.7`):** `:focus-visible { outline: 2px solid #5433EB; outline-offset: 3px; }`. Never suppress outline without replacement. Also define `@media (forced-colors: active)` fallbacks so `box-shadow` cards fall back cleanly to `1px solid CanvasText` borders in Windows High Contrast Mode.
2. **Touch Targets (`WCAG 2.5.8`):** All icon buttons, category pills, carousel arrows, and quantity steppers maintain `min-block-size: 44px; min-inline-size: 44px` on coarse pointers (or clear padding spacing).
3. **Reduced Motion (`WCAG 2.2.2` / `motion` guide):** Gate hover lift and smooth scrolling inside `@media (prefers-reduced-motion: no-preference)`. Never inject `animation-duration: 0.01ms !important` global overrides. Static states are default; no auto-advancing carousels.
4. **Native Interactive Primitives:** Keep semantic `<search>`, native `<dialog closedby="any">` (opened via `.showModal()` with explicit light-dismiss fallback), native `<details name="...">`, explicit `<label for>`, `autocomplete` tokens, and single `<h1>` per route.
5. **Strict Prohibitions:** Zero CSS/SVG gradients, zero decorative geometric background watermarks, zero 3D transforms/filters, zero second saturated hue (only `#5433EB` violet accent), zero heavy `700+` bold fonts.

---

## 9. Comparison: Superseded v1 vs New v2 System

| Dimension | v1 (*Editorial Craft Market* — Superseded) | v2 (*Floating Shopping Constellation*) |
| :--- | :--- | :--- |
| **Page Canvas** | `#823513` Ember Rust dark warm earth | `#F2F4F5` Canvas Mist cool white-marble |
| **Card Surfaces** | `#402011` Dark Spice + `#281006` recessed wells | `#FFFFFF` Pure White elevated cards + `#332F2D` dark spotlights |
| **Single Accent** | `#FAAE33` Tiger Gold (+ `#D1255C` Chili Red alerts) | `#5433EB` Violet Accent (+ `#C0B5F3` Violet Wash — strictly singular) |
| **Typography** | `Antonio` (`700` condensed uppercase) + `Inter` (`400–700`) | Self-hosted `Inter` only (`400` primary, restrained `500`/`600`, tight negative tracking, no `700`) |
| **Corners** | `6px` cards, `9999px` pills | `28px` outer cards, `20px` inner image stages (`8px` white frame), `9999px` pills |
| **Elevation** | Strictly flat `0px` box-shadow + `1px` borders | Dual-layer soft shadows (`--shadow-sm`, `--shadow-sm-2`, `--shadow-lg`, `--shadow-lg-2`) |
| **Section Dividers** | `1px dotted #FAAE33` full-bleed rules | `64px–80px` open vertical whitespace + subtle `1px #EBEBEB` hairlines only inside footer/forms |
| **Desktop Navigation** | Sticky horizontal `#402011` top header bar (`1440px`) | Persistent `64px` icon-only `#FFFFFF` left navigation rail (`1200px` centered main canvas) |
| **Product Visuals** | Dark brown/gold line art in `#281006` wells | Image-first warm-neutral studio photography/compositions with `20px` inner radii & zero gradients |

---

## 10. Reference CSS Custom Properties & Tailwind Tokens

```css
:root {
  /* Core Palette (DESIGN (10).md) */
  --color-canvas-mist: #f2f4f5;
  --color-pure-white: #ffffff;
  --color-ink-black: #000000;
  --color-muted-gray: #787574;
  --color-canvas-secondary-text: #595655; /* >= 6.5:1 on #F2F4F5 */
  --color-slate-ink: #332f2d;
  --color-ash-veil: #665a54;
  --color-faint-border: #ebebeb;
  --color-cool-stone: #cccccc;
  --color-warm-fog: #acb0aa;
  --color-violet-accent: #5433eb;
  --color-violet-wash: #c0b5f3;

  /* Typography */
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  /* Spacing & Layout */
  --page-max-width: 1200px;
  --rail-width: 64px;
  --section-gap: 64px;
  --element-gap: 12px;

  /* Radii */
  --radius-card: 28px;
  --radius-image-inner: 20px;
  --radius-tile-sm: 12px;
  --radius-pill: 9999px;

  /* Shadows */
  --shadow-sm: 0 2px 8px 0 rgba(0, 0, 0, 0.06);
  --shadow-sm-2: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 4px 24px 0 rgba(0, 0, 0, 0.12);
  --shadow-lg-2: 0 4px 24px 0 rgba(69, 36, 219, 0.34);
}
```

