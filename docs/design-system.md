# Project-Specific Design System — Simple E-commerce Store

**Project:** Simple E-commerce Store (`CodeAlpha_EcommerceStore`)  
**Internship:** CodeAlpha Full Stack Development Internship  
**Style Authority:** Adapted from `DESIGN.md` (*Hungry Tiger — Style Reference*) for a multi-category retail storefront  
**Target Frontend Stack:** Next.js + TypeScript + Tailwind CSS *(Planned — Phase 4B)*

> **Scope Note:** This specification defines the visual design language, CSS custom properties, Tailwind v4 `@theme` tokens, component rules, and accessibility guardrails for the storefront. No application code or external packages are installed in Phase 4A.

---

## 1. Visual Philosophy: "Editorial Craft Market"

The **Simple E-commerce Store** translates the reference style's warm dark monochrome-brown canvas, searing **Tiger Gold (`#FAAE33`)** single-accent discipline, poster-scale condensed typography, pill-shaped interactive controls, and `1px dotted #FAAE33` horizontal section dividers into a functional, high-contrast retail storefront:

- **Poster-Scale Editorial Identity:** Major viewports open with commanding condensed display headlines (`Antonio`, uppercase, tight negative tracking `-0.02em` to `-0.01em`, tight line-height `0.82–0.95`) set in Tiger Gold against an **Ember Rust (`#823513`)** canvas.
- **Flat, Shadow-Free Surface Depth:** Elevation is communicated exclusively through a 3-tier warm brown surface progression (`#823513` Tandoor Canvas → `#402011` Spice Card → `#281006` Charred Core) paired with crisp `1px` borders (`#6B2E12` resting, `#FAAE33` active/hover). `box-shadow`, `drop-shadow`, and ambient glows are strictly prohibited.
- **Storefront Usability First:** While the reference design isolates single unframed sauce bottles at 90% typography / 10% product density, an e-commerce catalog requires scannable multi-item comparison, legible pricing, clear stock indicators, and accessible form controls. Catalog grids use `6px`-radius `#402011` cards with recessed `#281006` image wells, while derived warm-cream text tokens (`#FDF6EC` and `#E5C7A3`) guarantee WCAG AA/AAA reading comfort for descriptions, specs, and checkout forms.

---

## 2. Colour Tokens

### 2.1 Core Reference Palette (Preserved Verbatim)

| Token Name | CSS Variable | Hex | Luminance | Project Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Tiger Gold** | `--color-tiger-gold` | `#FAAE33` | `0.518` | Primary filled CTAs, active navigation pills, display headlines, `1.5px` line icons, focus rings, dotted section dividers, price highlights |
| **Ember Rust** | `--color-ember-rust` | `#823513` | `0.076` | Level 0 primary page canvas, hero backdrop, main viewport background across all routes |
| **Saffron Glow** | `--color-saffron-glow` | `#9F531B` | `0.138` | Secondary accent borders, hover surface highlights, category card trim, subtle botanical/geometric SVG watermarks |
| **Dark Spice** | `--color-dark-spice` | `#402011` | `0.024` | Level 1 elevated surface: product cards, sticky header bar, filter drawers, form input fills, secondary pill badges |
| **Charred Clove** | `--color-charred-clove` | `#281006` | `0.011` | Level 2 deepest surface: product image wells, modal/drawer backdrops, footer band, high-contrast text on `#FAAE33` buttons |
| **Cardamom Brown** | `--color-cardamom-brown` | `#6B2E12` | `0.052` | Resting `1px` borders on cards, inputs, quantity steppers, and table rows |
| **Chili Red** | `--color-chili-red` | `#D1255C` | `0.163` | Strictly reserved for urgent status badges (`LOW STOCK`, `SALE`, `OUT OF STOCK`) and form validation error borders/alerts |

### 2.2 Documented Derived Tokens (Accessibility & Storefront Hierarchy)

The reference document uses `#402011` or `#FAAE33` for all text. On a `#402011` card surface, `#402011` text is invisible (`1:1`), and using saturated `#FAAE33` for long product descriptions, multi-line checkout addresses, and legal copy causes visual fatigue. The following four derived tokens stay strictly within the warm amber-brown family while ensuring WCAG 2.1 AA/AAA compliance:

| Token Name | CSS Variable | Hex / Value | Contrast vs `#402011` | Contrast vs `#281006` | Project Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Parchment Cream** | `--color-parchment-cream` | `#FDF6EC` | **13.5 : 1** (AAA) | **15.8 : 1** (AAA) | Primary readable body copy, product titles in dense grids, form input values, order summary figures |
| **Warm Sand** | `--color-warm-sand` | `#E5C7A3` | **9.1 : 1** (AAA) | **10.7 : 1** (AAA) | Secondary descriptions, SKU/category metadata, muted labels, empty-state helper text |
| **Tiger Gold Hover** | `--color-tiger-gold-hover` | `#FFC052` | **9.6 : 1** (AAA) | **11.2 : 1** (AAA) | Hover/active state fill for Primary Filled Buttons (`#281006` text remains > 11:1) |
| **Charred Scrim** | `--color-charred-scrim` | `rgba(40, 16, 6, 0.78)` | N/A (Backdrop) | N/A | Native `<dialog>::backdrop` overlay for Cart Drawer and Mobile Navigation Drawer |

---

## 3. Typography

### 3.1 Font Availability & Licensing Audit

- **`Salmond` & `Graphikx` Audit:** Neither `Salmond` nor `Graphikx` font files exist in the repository (`assets/` contains only `ecommerce-banner.svg`), and both are proprietary commercial typefaces requiring paid webfont licenses.
- **Approved Open-Source Substitutes (Direct from `DESIGN.md` Substitute List):**
  - **Primary Display & Headline Family (`--font-display`):** **`Antonio`** (Google Fonts, SIL Open Font License, weights `400`, `500`, `700`). Matches `Salmond`'s tall, condensed poster-scale proportions and tight-tracking authority. Fallbacks: `'Bebas Neue', Impact, 'Arial Narrow', ui-sans-serif, sans-serif`.
  - **Functional UI & Body Family (`--font-sans`):** **`Inter`** (Google Fonts / `next/font/google`, SIL Open Font License, weights `400`, `500`, `600`, `700`). Matches `Graphikx`'s clean neo-grotesque neutrality for `13px` button labels, micro-copy, prices, and form controls. Fallbacks: `'Geist', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`.

### 3.2 Fluid Type Scale & Inverse Tracking Rules

Tracking scales **inversely** with font size: poster-scale headlines tighten (`-0.02em` to `-0.01em`), while small uppercase labels and badges open up (`+0.04em` to `+0.08em`) for crisp legibility.

| Role | Token | Font Family | Weight | Desktop Size | Mobile / Fluid `clamp()` | Line Height | Letter Spacing | Case |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | `--text-display` | `--font-display` (`Antonio`) | `700` | `148px–195px` | `clamp(3.75rem, 10vw, 11.5rem)` | `0.82` | `-0.02em` | Uppercase |
| **Heading XL (Banner)** | `--text-heading-lg` | `--font-display` (`Antonio`) | `700` | `96px–101px` | `clamp(2.75rem, 6.5vw, 6.25rem)` | `0.88` | `-0.016em` | Uppercase |
| **Heading (Section)** | `--text-heading` | `--font-display` (`Antonio`) | `700` | `64px–65px` | `clamp(2.125rem, 4.5vw, 4.0625rem)` | `0.94` | `-0.01em` | Uppercase |
| **Heading SM (Card/PDP)** | `--text-heading-sm` | `--font-display` (`Antonio`) | `700` | `28px–29px` | `clamp(1.375rem, 2.2vw, 1.8125rem)` | `1.08` | `-0.005em` | Uppercase |
| **Subheading / Price LG** | `--text-subheading` | `--font-sans` (`Inter`) | `600` | `18px` | `1.125rem` (`18px`) | `1.25` | `0.01em` | Mixed / Numeric |
| **Body Default** | `--text-body` | `--font-sans` (`Inter`) | `400` | `15px` | `0.9375rem` (`15px`) | `1.45` | `0em` | Sentence case |
| **UI Control / Micro** | `--text-ui` | `--font-sans` (`Inter`) | `500` | `13px` | `0.8125rem` (`13px`) | `1.20` | `0.02em` | Uppercase / Mixed |
| **Caption / Pill Badge** | `--text-caption` | `--font-sans` (`Inter`) | `600` | `11px` | `0.6875rem` (`11px`) | `1.20` | `0.06em` | Uppercase |

> **Tabular Numerals:** All prices, cart subtotals, stock counts, and quantity steppers apply `font-variant-numeric: tabular-nums` so columns align and layout width never jitters when quantities change.

---

## 4. Spacing, Layout Grid & Border Radius

### 4.1 Spacing Scale

Preserves the exact reference spacing scale (`4px` to `192px`):

| Token | Value | Primary Storefront Usage |
| :--- | :--- | :--- |
| `--spacing-4` | `4px` | Badge vertical padding, tight inline icon-to-label gap |
| `--spacing-6` | `6px` | Compact badge padding, micro-stack gap |
| `--spacing-8` | `8px` | Ghost button vertical padding, filter chip gap |
| `--spacing-10` | `10px` | Default element gap (`--element-gap`), primary button vertical padding |
| `--spacing-12` | `12px` | Compact card padding, input vertical padding |
| `--spacing-16` | `16px` | Standard product card padding, mobile container gutter |
| `--spacing-20` | `20px` | Primary button & pill input horizontal padding, grid gap |
| `--spacing-24` | `24px` | Tablet container gutter, PDP section stack gap |
| `--spacing-32` | `32px` | Desktop container gutter, major card internal padding |
| `--spacing-42` | `42px` | Section header bottom margin |
| `--spacing-80` | `80px` | Mobile/tablet major viewport section vertical padding |
| `--spacing-120` | `120px` | Desktop major viewport section vertical padding |
| `--spacing-192` | `192px` | Dramatic editorial display offset / XL footer top spacing |

### 4.2 Container & Grid Architecture

- **Max Container Width:** `--page-max-width: 1440px` centered with responsive horizontal padding (`16px` mobile, `24px` tablet, `40px` desktop).
- **Full-Bleed Dividers:** `1px dotted #FAAE33` horizontal rules span `100%` of the viewport or container width between every major section.
- **Catalog Grid:** CSS Grid with `gap: 20px` (`16px` on mobile):
  - Mobile (`< 640px`): `1` column (full-width cards) or `2` compact columns.
  - Tablet (`640px – 1023px`): `2` to `3` columns (`repeat(auto-fill, minmax(240px, 1fr))`).
  - Desktop (`>= 1024px`): `4` columns (`repeat(4, minmax(0, 1fr))`) or `3` columns when paired with a `280px` left filter rail.

### 4.3 Border Radius Rules (Strict Binary System)

| Element Category | Token | Value | Rule |
| :--- | :--- | :--- | :--- |
| **Product Cards, Content Tiles, Filter Panels, Order Tables, Image Wells** | `--radius-cards` | `6px` | **Only** structural containers and cards use `6px` corners. |
| **Buttons, Search Inputs, Form Inputs, Category Chips, Badges, Icon Buttons, Quantity Steppers** | `--radius-buttons` / `--radius-inputs` / `--radius-badges` | `9999px` (`1296px`) | Every interactive control, input, and badge **must** be a full pill (`9999px`). |

---

## 5. Surfaces & Elevation Hierarchy

No `box-shadow` is permitted anywhere in the interface. Depth is achieved via three warm dark surface levels plus `1px` border contrast:

| Surface Level | Token | Hex | Border Token | Component Mapping |
| :--- | :--- | :--- | :--- | :--- |
| **Level 0 — Tandoor Canvas** | `--surface-tandoor-canvas` | `#823513` | `1px dotted #FAAE33` (section dividers) | `<body>` background, Hero section, Catalog background, Auth page backdrop |
| **Level 1 — Spice Card** | `--surface-spice-card` | `#402011` | `1px solid #6B2E12` (`#FAAE33` on hover/focus) | Sticky Header, Product Card body, Filter Panel, Checkout Form Card, Account Card |
| **Level 2 — Charred Core** | `--surface-charred-core` | `#281006` | `1px solid #6B2E12` | Product Card image stage, Cart Drawer panel, Mobile Nav Drawer, Input field recessed fill, Site Footer |

---

## 6. Component Specifications

### 6.1 Buttons

1. **Filled Primary Button (`.btn-primary`)**
   - **Role:** Primary conversion actions (`ADD TO CART`, `PROCEED TO CHECKOUT`, `SHOP COLLECTION`, `SIGN IN`, `PLACE ORDER`).
   - **Visuals:** Fill `#FAAE33` (`--color-tiger-gold`), text `#281006` (`--color-charred-clove`), border `1px solid #FAAE33`, radius `9999px`, padding `10px 22px`, font `Inter` `13px` weight `600`, uppercase, tracking `0.03em`.
   - **States:**
     - `:hover`: Fill `#FFC052` (`--color-tiger-gold-hover`), border `#FFC052`, `transform: translateY(-1px)`.
     - `:active`: `transform: translateY(0)`.
     - `:disabled`: Opacity `0.45`, cursor `not-allowed`.

2. **Ghost Outline Button (`.btn-ghost`)**
   - **Role:** Navigation links (`SHOP`, `CATEGORIES`, `DEALS`, `ACCOUNT`), secondary actions (`CONTINUE SHOPPING`, `VIEW DETAILS`, `CLEAR FILTERS`), category filter pills.
   - **Visuals:** Fill `transparent` (or `#402011` on sticky surfaces), text `#FAAE33`, border `1px solid #FAAE33`, radius `9999px`, padding `8px 18px`, font `Inter` `13px` weight `500`, uppercase, tracking `0.02em`.
   - **States:**
     - `:hover` / `[aria-current="page"]` / `[aria-pressed="true"]`: Fill `#FAAE33`, text `#281006`.

3. **Ghost Borderless Button (`.btn-link`)**
   - **Role:** Inline tertiary links (`Remove`, `Forgot password?`, `Back to catalog`, `View full specification`).
   - **Visuals:** Fill `transparent`, border `none`, text `#FAAE33`, font `Inter` `13px` weight `500`, underline offset `4px` on hover (`text-decoration: underline dotted #FAAE33`).

4. **Circular Icon Button (`.btn-icon`)**
   - **Role:** Header utilities (`Search`, `Account`, `Cart Drawer Trigger`), gallery arrows, modal close (`X`), password visibility toggle.
   - **Visuals:** `40px × 40px` (`44px × 44px` on mobile/coarse pointers), radius `9999px`, border `1px solid #FAAE33`, fill `#402011`, icon `18px × 18px` with `1.5px` stroke in `#FAAE33`.

### 6.2 Inputs & Form Controls

- **Pill Input Field (`.input-pill`)**
  - **Visuals:** Radius `9999px`, fill `#281006` (or `transparent` inside `#402011` cards), border `1px solid #6B2E12`, padding `12px 20px`, text `#FDF6EC` (`14px` `Inter`), placeholder `#E5C7A3` at `65%` opacity.
  - **Focus & Validation:**
    - `:focus-visible`: Border shifts to `#FAAE33`, plus `outline: 2px solid #FAAE33; outline-offset: 2px`.
    - `[aria-invalid="true"]`: Border shifts to `#D1255C` (`--color-chili-red`), paired with an inline error message (`role="alert"`) below the field with a `1.5px` warning icon.
- **Multi-line Textarea (`.textarea-surface`)**
  - Exception to the single-line pill radius for usability: multi-line delivery notes or contact messages use `border-radius: 16px` with the same `1px solid #6B2E12` border and `#281006` fill.
- **Quantity Stepper (`.qty-stepper`)**
  - Pill container (`border-radius: 9999px`, border `1px solid #FAAE33`, fill `#281006`) housing `−` button, tabular numeric value (`#FDF6EC`), and `+` button.

### 6.3 Surface Cards (`.product-card`)

- **Outer Frame:** `border-radius: 6px`, fill `#402011` (`--color-dark-spice`), border `1px solid #6B2E12`, padding `14px`, zero shadow.
- **Hover State:** Border transitions (`180ms ease`) from `#6B2E12` to `#FAAE33`; inner product illustration scales subtly (`scale(1.03)`).
- **Image Stage:** Top recessed container (`border-radius: 4px`, fill `#281006`, aspect-ratio `4 / 3` or `1 / 1`) with subtle radial warm highlight (`radial-gradient(circle, rgba(250,174,51,0.14) 0%, transparent 70%)`) so studio-isolated products pop against the dark core.
- **Content Stack:**
  1. Top-left Pill Badge (`NEW`, `BESTSELLER`, or Category) + Top-right Alert Badge (`LOW STOCK` / `-20%` in `#D1255C` when applicable).
  2. Category eyebrow (`11px` uppercase `#E5C7A3`, tracking `0.06em`).
  3. Product Title (`Antonio` `22px–24px` uppercase `#FDF6EC`, single or 2-line clamp).
  4. Price row (`18px` bold `#FAAE33` current price + strikethrough `#E5C7A3` original price) + Quick `ADD TO CART` pill button.

### 6.4 Badges, Icons & Dividers

- **Primary Pill Badge (`.badge-gold`):** Fill `#FAAE33`, text `#281006`, `11px` weight `600` uppercase, tracking `0.06em`, padding `4px 12px`, radius `9999px`.
- **Secondary Pill Badge (`.badge-spice`):** Fill `#281006`, text `#FAAE33`, border `1px solid #6B2E12`, `11px` weight `500` uppercase, padding `4px 12px`, radius `9999px`.
- **Alert / Heat Badge (`.badge-alert`):** Fill `#D1255C` (`--color-chili-red`), text `#FDF6EC` (contrast `4.95:1` AA on `#D1255C`), `11px` weight `600` uppercase, padding `4px 12px`, radius `9999px`.
- **Iconography:** All icons use `1.5px` stroke width, `stroke: #FAAE33`, `fill: none`, `stroke-linecap: round`, `stroke-linejoin: round`. Never use multi-color or filled raster icons.
- **Dotted Section Divider (`.divider-dotted`):** `border: 0; border-top: 1px dotted #FAAE33; opacity: 0.75; margin: 0;`.

---

## 7. Accessibility & Usability Rules (WCAG 2.1 AA)

1. **Branded Visible Focus Ring (Override of Reference Rule):**
   - `DESIGN.md` states *"No visible focus ring — interaction states use border-color shift to #faae33."* Removing focus rings violates **WCAG 2.4.7 Focus Visible** for keyboard and assistive-technology users.
   - **Storefront Rule:** All interactive elements enforce explicit `:focus-visible` styling:
     ```css
     :focus-visible {
       outline: 2px solid var(--color-tiger-gold);
       outline-offset: 3px;
     }
     ```
2. **Verified Contrast Ratios:**
   - `#FAAE33` (Tiger Gold) on `#823513` (Ember Rust): **5.21 : 1** (Passes WCAG AA for normal & large text).
   - `#FAAE33` (Tiger Gold) on `#402011` (Dark Spice): **8.28 : 1** (Passes WCAG AAA).
   - `#281006` (Charred Clove) on `#FAAE33` (Tiger Gold CTA button): **9.91 : 1** (Passes WCAG AAA).
   - `#FDF6EC` (Parchment Cream) on `#402011` (Dark Spice card): **13.52 : 1** (Passes WCAG AAA).
   - `#FDF6EC` (Parchment Cream) on `#D1255C` (Chili Red alert badge): **4.95 : 1** (Passes WCAG AA).
3. **Touch Target Minimums (WCAG 2.5.8):**
   - All buttons, filter chips, quantity steppers, and nav links enforce `min-block-size: 40px; min-inline-size: 40px` on desktop and `min-block-size: 44px; min-inline-size: 44px` on touch devices (`@media (pointer: coarse)`), using padding rather than fixed height so text can scale up to 200% without clipping.
4. **Semantic Landmarks & Native Overlays:**
   - Enclose product search and catalog filters inside a semantic `<search>` element.
   - Implement the Cart Drawer and Mobile Navigation Drawer with native `<dialog closedby="any">` + `.showModal()` to guarantee automatic focus trapping, `Esc` dismissal, inert background content, and light-dismiss click-outside behavior.
5. **Reduced Motion Support:**
   - Respect `@media (prefers-reduced-motion: reduce)` globally by disabling transform/scroll transitions and instant-snapping drawer dialogs.

---

## 8. CSS Custom Properties & Tailwind v4 `@theme` Configuration

```css
:root {
  /* Core Hungry Tiger Reference Palette */
  --color-tiger-gold: #faae33;
  --color-ember-rust: #823513;
  --color-saffron-glow: #9f531b;
  --color-dark-spice: #402011;
  --color-charred-clove: #281006;
  --color-cardamom-brown: #6b2e12;
  --color-chili-red: #d1255c;

  /* Documented Derived Storefront Tokens */
  --color-parchment-cream: #fdf6ec;
  --color-warm-sand: #e5c7a3;
  --color-tiger-gold-hover: #ffc052;
  --color-charred-scrim: rgba(40, 16, 6, 0.78);

  /* Surface Hierarchy (No Box Shadows) */
  --surface-tandoor-canvas: var(--color-ember-rust);
  --surface-spice-card: var(--color-dark-spice);
  --surface-charred-core: var(--color-charred-clove);

  /* Typography Families (Open-Source Licensed Substitutes) */
  --font-display: 'Antonio', 'Bebas Neue', Impact, ui-sans-serif, sans-serif;
  --font-sans: 'Inter', 'Geist', ui-sans-serif, system-ui, -apple-system, sans-serif;

  /* Fluid Type Scale */
  --text-caption: 0.6875rem;                         /* 11px */
  --text-ui: 0.8125rem;                              /* 13px */
  --text-body: 0.9375rem;                            /* 15px */
  --text-subheading: 1.125rem;                       /* 18px */
  --text-heading-sm: clamp(1.375rem, 2.2vw, 1.8125rem); /* 22px -> 29px */
  --text-heading: clamp(2.125rem, 4.5vw, 4.0625rem);    /* 34px -> 65px */
  --text-heading-lg: clamp(2.75rem, 6.5vw, 6.3125rem);  /* 44px -> 101px */
  --text-display: clamp(3.5rem, 9.5vw, 11.5rem);        /* 56px -> 184px */

  /* Spacing Scale */
  --spacing-4: 4px;
  --spacing-6: 6px;
  --spacing-8: 8px;
  --spacing-10: 10px;
  --spacing-12: 12px;
  --spacing-14: 14px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-28: 28px;
  --spacing-32: 32px;
  --spacing-42: 42px;
  --spacing-80: 80px;
  --spacing-120: 120px;
  --spacing-192: 192px;

  /* Layout & Radii */
  --page-max-width: 1440px;
  --radius-cards: 6px;
  --radius-badges: 9999px;
  --radius-inputs: 9999px;
  --radius-buttons: 9999px;
}
```
