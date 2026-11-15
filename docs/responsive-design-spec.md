# Responsive Design Specification — Simple E-commerce Store

**Project:** Simple E-commerce Store (`CodeAlpha_EcommerceStore`)  
**Target Stack:** Next.js + TypeScript + Tailwind CSS *(Planned — Phase 4B)*  
**Core Rule:** Do not merely shrink the desktop layout. Adapt navigation, typography scale, filter ergonomics, and touch targets specifically for mobile, tablet, and desktop viewports.

---

## 1. Breakpoint Strategy

Aligned with standard Tailwind CSS mobile-first breakpoints and a `1440px` maximum editorial container:

| Tier | Breakpoint Range | Tailwind Prefix | Container Padding | Max Container Width | Catalog Grid Columns |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Mobile (Compact)** | `320px – 639px` | *(default)* | `16px` (`px-4`) | `100%` | `1` column (full-width cards) or `2` compact cards (`>= 420px`) |
| **Tablet (Portrait & Landscape)** | `640px – 1023px` | `sm:` / `md:` | `24px` (`px-6`) | `100%` | `2` columns (`sm:`) → `3` columns (`md:`) |
| **Desktop (Standard)** | `1024px – 1279px` | `lg:` | `32px` (`px-8`) | `1280px` | `3` or `4` columns |
| **Desktop XL (Editorial Poster)** | `1280px – 1440px+` | `xl:` / `2xl:` | `40px` (`px-10`) | `1440px` | `4` columns (`gap: 20px`) |

---

## 2. Viewport-by-Viewport Behavior

### 2.1 Desktop (`>= 1024px`)

- **Sticky Header Navigation:** Full horizontal layout in a single `72px`-tall `#402011` bar:
  - Left: Brand Wordmark + emblem.
  - Center: 5 Ghost Outline Pill navigation buttons (`SHOP`, `CATEGORIES`, `NEW ARRIVALS`, `ABOUT`, `CONTACT`).
  - Right: Inline expandable `<search>` Pill Input (`240px` width), `ACCOUNT` Ghost Pill button, and Cart Circular Icon Button + item counter pill.
- **Hero Composition:** Asymmetric 12-column split (`7` columns left for `clamp(5.5rem, 9.5vw, 11.5rem)` `Antonio` poster headline + CTAs; `5` columns right for the studio product pedestal).
- **Catalog Filtering (`/shop`):** Horizontal `<search>` toolbar with inline Category Pills, Price Filter select pill, and Sort dropdown all visible without opening a modal.
- **Product Details (`/shop/[id]`):** Sticky left-column gallery (`55%` width) paired with scrolling right-column Buy Box & `<details>` specification accordions (`45%` width).
- **Cart Drawer:** Slides in from the right edge (`width: 420px`, `height: 100dvh`) over a `rgba(40, 16, 6, 0.78)` backdrop scrim.
- **Checkout (`/checkout`):** 2-column split (`60%` customer/shipping form on left, `40%` sticky Order Summary card on right).

---

### 2.2 Tablet (`640px – 1023px`)

- **Header Adaptation:**
  - Inline `<search>` bar remains accessible in header (or secondary header row), while primary route links collapse into the `MENU` pill trigger below `1024px` to prevent pill wrapping.
- **Hero Composition:**
  - Stacked or 2-column balanced split (`60% / 40%` at `>= 768px`, stacked below `768px`). Headline scales fluidly via `clamp()` (`68px–104px`) with `0.86` line-height so words never clip horizontally.
- **Catalog Grid:**
  - `2` columns (`640px–767px`) and `3` columns (`768px–1023px`) with `16px–20px` grid gap.
  - Category pills scroll horizontally (`overflow-x: auto; scrollbar-width: none`) with fade masks so all categories remain one tap away.
- **Product Details (`/shop/[id]`):**
  - At `768px–1023px`, maintains a `50% / 50%` 2-column layout; below `768px`, stacks the gallery above the Buy Box.
- **Checkout (`/checkout`):**
  - Stacks Order Summary inside a collapsible `<details>` banner at the top of the page (showing total in the `<summary>` bar) plus a full summary card above the `PLACE ORDER` button.

---

### 2.3 Mobile (`320px – 639px`)

- **Dedicated Mobile Header & Navigation Drawer:**
  - Top bar (`60px` height) houses: Brand Wordmark (left), Cart Icon Button with count pill + Hamburger/Menu Circular Icon Button (`44px × 44px` touch targets, right).
  - Tapping the Menu button opens `<dialog id="mobile-nav-dialog" closedby="any">`: a full-height slide-over sheet (`#281006` Charred Clove) containing a prominent `<search>` Pill Input at the top, full-width Ghost Outline Pill links (`min-block-size: 48px`), category quick-chips, and Account actions.
- **Hero Typography Scaling:**
  - Display headline scales down cleanly via `clamp(3.25rem, 13vw, 4.75rem)` (`52px–76px`) with `line-height: 0.88` and `overflow-wrap: break-word`.
  - Primary and Secondary CTA buttons stack full-width (`width: 100%`, `justify-content: center`, `min-block-size: 48px`).
  - Featured Hero Product card sits directly below the CTA stack with compact padding (`16px`), keeping the primary `SHOP COLLECTION` CTA above the fold on a `390×844` viewport.
- **Mobile Filter Interaction (`/shop`):**
  - Instead of stacking 10 filter dropdowns that push products below the fold, mobile `/shop` displays a sticky 2-button control bar beneath the search input:
    - Left: `FILTERS (count)` Ghost Pill button → opens `<dialog id="filter-drawer" closedby="any">` bottom sheet.
    - Right: `SORT BY` Pill select.
- **Product Cards on Mobile:**
  - Single-column full-width cards (`320px–479px`) or 2-column compact cards (`480px–639px`) with `14px` padding, `16px` title, `16px` price, and a full-width `44px`-tall `ADD TO CART` pill button.
- **Cart Drawer on Mobile:**
  - Expands to `width: 100vw` (or `calc(100vw - 16px)`) with a sticky bottom checkout bar (`padding-bottom: env(safe-area-inset-bottom)`).
- **Checkout Form on Mobile:**
  - Single-column vertical stack; split fields (`City` / `Postal Code`) stack to `100%` width below `480px` to prevent cramped input typing; `font-size: 16px` (`1rem`) on `<input>` elements prevents involuntary iOS Safari viewport zoom on focus.

---

## 3. Responsive Component Matrix

| Feature / Element | Mobile (`< 640px`) | Tablet (`640px – 1023px`) | Desktop (`>= 1024px`) |
| :--- | :--- | :--- | :--- |
| **Hero Display Font Size** | `52px – 72px` (`line-height: 0.88`) | `72px – 112px` (`line-height: 0.85`) | `120px – 184px` (`line-height: 0.82`) |
| **Section Headline Size** | `34px – 42px` | `44px – 54px` | `64px – 65px` |
| **Section Vertical Padding** | `48px – 64px` | `72px – 88px` | `96px – 120px` |
| **Primary Navigation** | Slide-over `<dialog>` Drawer | Slide-over `<dialog>` Drawer | Inline Ghost Outline Pills |
| **Search Input Placement** | Top of Mobile Drawer + Sticky `/shop` bar | Header utility bar | Inline Header `<search>` pill |
| **Catalog Filters** | Slide-up `<dialog>` Filter Sheet | Horizontal scrollable pills | Inline toolbar / sidebar rail |
| **Product Grid Columns** | `1` column (or `2` at `>= 480px`) | `2` – `3` columns | `4` columns |
| **Minimum Touch Target** | `44px × 44px` (`min-block-size: 44px`) | `44px × 44px` | `40px × 40px` (`>= 24px` WCAG AA) |
| **Form Input Font Size** | `16px` (prevents mobile auto-zoom) | `15px` | `14px – 15px` |
