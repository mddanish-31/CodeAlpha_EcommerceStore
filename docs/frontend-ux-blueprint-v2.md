# Frontend UX Blueprint v2 — Floating Shopping Constellation (White Canvas Commerce)

> [!IMPORTANT]
> **Status:** Approved Authoritative UX & Route Blueprint (Implemented in Phase 4D)
> **Supersedes:** [frontend-ux-blueprint.md](./frontend-ux-blueprint.md) (plus the dark visual shell rules in [frontend-component-architecture.md](./frontend-component-architecture.md) and [responsive-design-spec.md](./responsive-design-spec.md))
> **Related Docs:** [design-system-v2.md](./design-system-v2.md) · [design-reference-mapping-v2.md](./design-reference-mapping-v2.md) · [shop-constellation-preview.html](./preview/shop-constellation-preview.html)

---

## 1. Architectural Shift Overview (v1 -> v2)

| Aspect | Superseded v1 (*Editorial Craft Market*) | Proposed v2 (*Floating Shopping Constellation*) |
|---|---|---|
| **Visual Shell** | Sticky full-width dark horizontal header (`#402011`) on `#823513` ember canvas | Persistent **`64px` `#FFFFFF` left navigation rail** (`>= 1024px`) paired with a `#F2F4F5` Canvas Mist stage (`1200px` centered max-width) |
| **Mobile Shell (`< 1024px`)** | Dark mobile hamburger bar | Sticky `#FFFFFF` top bar (`simple.` mark, Search jump, Cart bag badge, Menu button) -> native `<dialog closedby="any">` slide-over drawer |
| **Typography & Hierarchy** | `Antonio` (`700` uppercase posters) + dotted gold dividers | Self-hosted `Inter` (`400` / `500` / `600`, zero `700+`), tight negative tracking (`-0.055em`), `64px–80px` vertical breathing room |
| **Card Surfaces & Borders** | `#402011` rectangles (`6px`), recessed `#281006` wells, dotted outlines | `#FFFFFF` cards (`28px` radius, `--shadow-sm-2`), `8px` white breathing frame around `20px` `1:1` flat studio object stage |
| **Interactive Accent** | `#FAAE33` Tiger Gold + `#D1255C` Chili Red alerts | Single saturated **`#5433EB` Violet Accent** (`--color-violet-accent`) + `#C0B5F3` tint; semantic states pair copy/borders/icons |
| **Business Functionality** | Same 11 routes, `StoreContext`, `SAMPLE_PRODUCTS` (12 items) | **100% Preserved** — zero removals of routes, cart persistence, auth/account flows, filtering, sorting, or stock handling |

---

## 2. Shell Layout & Responsive Breakpoint Rules

Tested target widths: **`320px`, `375px`, `768px`, `1024px`, `1440px`**.

### 2.1 Global App Frame

1. **Skip Link:** `.visually-hidden` skip link (`Skip to main content`) focuses `<main id="main-content">` on `Tab`.
2. **Announcement Strip (`44px` min-height):** Compact top bar sitting on `#F2F4F5` / `#FFFFFF` with `1px solid #EBEBEB` bottom hairline: *"Free carbon-neutral delivery on orders over \$75 — Phase 4B Storefront Preview"*.
3. **Desktop Left Rail (`>= 1024px` ONLY):**
   - `width: 64px`, sticky/fixed left viewport column, `background: #FFFFFF`, `border-right: 1px solid #EBEBEB`.
   - Houses `48px × 48px` tappable controls (`border-radius: 20px` when active `#F2F4F5` with `#5433EB` icon):
     1. **Home (`/`)**
     2. **Catalog (`/shop`)**
     3. **Search** (focuses hero `<search>` or opens `/shop` search bar)
     4. **Account & Orders (`/account`)**
     5. **Cart Bag** (`CartDrawer` trigger with `#5433EB` item count badge)
     6. **About (`/about`)** & **Contact (`/contact`)**
     7. Bottom **32px Account Avatar** (`1px solid #EBEBEB` ring linking to `/account` or `/auth/login`).
   - Every icon button includes a distinct `aria-label` AND a lightweight focus/hover tooltip pill so destination purpose is always clear.
4. **Mobile & Tablet Header (`< 1024px`, `320px–1023px`):**
   - Left `64px` rail is completely hidden (`display: none`).
   - Top sticky `#FFFFFF` header (`min-height: 56px`, `border-bottom: 1px solid #EBEBEB`) renders compact `simple.` wordmark (`aria-label="Simple Store Home"`), Search jump icon, Cart button with `#5433EB` count badge, and Hamburger button (`44px × 44px`) opening `<dialog id="mobile-nav-dialog" closedby="any">`.
5. **Dark Brand Footer (All Viewports):**
   - Full-width `#000000` canvas separated by `64px–80px` top margin, `#FFFFFF` headings, `#CCCCCC` secondary links, `#C0B5F3` violet wash metadata pill, and `1px solid #332F2D` bottom hairline.

---

## 3. Complete Route-by-Route Visual Mapping (All 11 Existing Routes)

### 3.1 Homepage (`/`) — *Floating Shopping Constellation*

- **Hero Constellation Stage (`margin: 24px auto 64px`):**
  - Central **`simple.`** wordmark + compact `<h1>` (*"Thoughtful everyday objects, framed in calm studio clarity"*).
  - Centered **`620px` Search Pill** (`<search role="search">`): `#FFFFFF`, `9999px`, `1px solid rgba(0, 0, 0, 0.14)`, live catalog query input (`>= 16px`), and `48px × 48px` circular **`#5433EB`** submit button with `--shadow-lg-2`.
  - **Floating Product Constellation (`8`–`10` desktop tiles, collapsing gracefully to a compact 4-tile or 2×2 studio ribbon on mobile `< 768px` without overlapping the search input!):** Gentle subtle white `28px` tiles featuring flat studio silhouettes around the central search anchor. Clicking any constellation tile navigates to `/shop/[id]`. Zero overlapping clutter; single-axis micro-float only inside `@media (prefers-reduced-motion: no-preference)`.
  - **Horizontal Category Pill Strip (`<nav aria-label="Catalog departments">`):** `All Objects`, `Audio & Desk Craft`, `Everyday Carry`, `Home Objects`, `Apparel & Goods` (`9999px` white chips with monochrome `16px` stroke icons + `--shadow-sm`; active chip switches cleanly to `#5433EB` fill + `#FFFFFF` ink).
- **Curated Spotlight Duo (`2` Columns Desktop / `1` Column Mobile):**
  - Left card: `#332F2D` Slate Ink `28px` spotlight card (*"Audio & Desk Craft — Studio Precision"*) with crisp `#FFFFFF` headline, `Shop Desk Craft ->` `#FFFFFF` pill CTA, and bottom-left frosted `12px` tag.
  - Right card: `#FFFFFF` `28px` interactive spotlight card (*"Chrono Brass Desk Lamp — Spotlight Edition"*) with flat studio preview, **3 mini `48px × 48px` (`12px` radius) interactive angle/finish swatches** for instant preview switching, and direct `Add to Bag` pill.
- **Catalog Discovery Row / Featured Grid (`4` cols `>= 1280px`, `3` cols `1024px`, `2` cols `640–768px`, `1` col `320–390px`):**
  - Section crown: `Featured Collection` (`20px`, weight `600`, `-0.05em`) + right-side `32px`/`44px` circular `--shadow-lg` `#FFFFFF` carousel/view-all trigger (`-> /shop`).
  - Uses pure white `28px` `ProductCard` with `8px` frame, `20px` `1:1` solid neutral stage (`#F2F4F5` / `#EBEBEB` / `#332F2D` / `#665A54`), subtle `NEW ARRIVAL` / `BESTSELLER` / `LIMITED DROP` / `Sold Out` tag, `14px` weight `500` title, compact rating/SKU row (`#787574` inside `#FFFFFF` surface), tabular price + `compareAtPrice` strikethrough, and `Add` pill CTA.

### 3.2 Shop Catalog (`/shop`)

- **Header:** Compact `#FFFFFF` page banner/header or open `#F2F4F5` header showing `<h1>` (`Shop All Objects`), live result count (`#595655` for `6.59:1` AA on `#F2F4F5`), inline `<search>` bar, category pill strip, and native Sort dropdown (`featured`, `price-asc`, `price-desc`, `newest`).
- **Mobile Filter Drawer:** At `< 1024px`, `Filter` pill button opens native `<dialog id="filter-drawer-dialog" closedby="any">` holding Category pills, Stock toggle (`In stock only`), and Sort radio options.
- **Grid:** Renders all matching items from `SAMPLE_PRODUCTS` with `12px` gaps; empty-search state displays calm white `28px` card with `Reset all filters` `#5433EB` pill.

### 3.3 Product Detail Page (`/shop/[id]`)

- **Breadcrumb:** Clean `Home / Category / Product Title` in `#332F2D` / `#595655` directly on `#F2F4F5` canvas.
- **2-Column Studio Stage (`>= 1024px` 7/5 split; `1` col `< 1024px`):**
  - **Left Gallery:** `28px` white frame housing `20px` `1:1` primary studio view (`#F2F4F5` or `#332F2D` studio card) + clickable `3`-view `48px` (`12px` radius) mini thumbnail strip (`Studio Front`, `Detail Profile`, `Scale Context`) with `#5433EB` active outline.
  - **Right Buy Box (`#FFFFFF`, `28px` radius, `24px–32px` padding):** Category eyebrow, SKU (`AT-014`), `<h1>` title (`clamp(24px, 32px)` `600`), tabular price (`\$128`) + strikethrough `compareAtPrice`, stock indicator pill (`In Stock (14)` / `Low Stock (2)` / `Sold Out`), interactive quantity stepper (`- 1 +` pill with `44px` controls), full-width `#5433EB` `Add to Bag` pill CTA (disabled high-contrast stone state + helper text when `stockCount === 0`), and native `<details>` accordions (`Specifications & Dimensions`, `Care & Delivery`) with `1px #EBEBEB` separators.

### 3.4 Shopping Cart (`/cart`) & Slide-Over `CartDrawer`

- **Slide-Over `CartDrawer`:** Native `<dialog id="cart-drawer-dialog" closedby="any">` sliding cleanly from the right edge (`max-width: min(440px, 100vw)`, `#FFFFFF`, `28px` left corners on desktop). Features sticky header, free-shipping progress bar (`#EBEBEB` track -> `#5433EB` fill computing `FREE_SHIPPING_THRESHOLD = 75`), compact `20px`-radius item rows with quantity `-` / `+` / `Remove`, subtotal, and primary `#5433EB` pill link to `/checkout` + `/cart`.
- **Full `/cart` Page:** `2`-column layout (`>= 1024px`): item list cards on `#FFFFFF` (`28px` radius) on left + sticky Order Summary card on right showing subtotal, shipping (`\$0` over `\$75` else `\$8`), demo tax note, and `Proceed to Checkout ->`.

### 3.5 Checkout (`/checkout`)

- **Clean Split Flow:** Left `28px` white panel with native HTML5 validated form sections (`Shipping Address`, `Delivery Method`, `Simulated Payment Card — Demo Only`, zero real payment capture), paired pill inputs (`>= 48px` height, `9999px` or `16px` textarea radius, `#787574` focus border -> `#5433EB`), explicit `<label for>` + `autocomplete`. Right sticky summary card shows bag lines and `Place Demo Order` `#5433EB` pill.
- **Confirmation State:** Replaces grid with centered `28px` white celebration card containing `#5433EB` check emblem, generated order ID (`ORD-2026-XXXX`), itemized receipt, and CTA back to `/shop` or `/account`.

### 3.6 Auth & Account Routes (`/auth/login`, `/auth/register`, `/account`)

- **`/auth/login` & `/auth/register`:** Centered single-column `max-width: 480px` `#FFFFFF` `28px`-radius card floating over `#F2F4F5` Canvas Mist, subtle `simple.` emblem crown, pill inputs, inline `role="alert"` validation banner (`#000000` hairline + alert icon + copy), and `#5433EB` submit pill + one-click `Fill Demo Account` helper preserved from `AuthForm.tsx`.
- **`/account`:** Signed-in dashboard (or prompt redirecting cleanly to `/auth/login`): `28px` white profile card + `Recent Orders` list showing `INITIAL_SAMPLE_ORDERS` (`ORD-2026-0104`, `ORD-2026-0119`) and any newly checked-out orders saved in `localStorage`, plus Saved Shipping Address card and Sign Out pill button.

### 3.7 Informational & Error Routes (`/about`, `/contact`, `not-found.tsx`)

- **`/about`:** Airy editorial mission page on `#FFFFFF` `28px` cards + `#332F2D` dark craft ethos band highlighting CodeAlpha Simple E-commerce Store architecture and design principles.
- **`/contact`:** `2`-column FAQ `<details>` accordion + clean validated inquiry form card on `#FFFFFF`.
- **`not-found.tsx` (404):** Centered `#FFFFFF` `28px` card featuring ultra-tight `Inter 600` `404` numeral (`-0.055em`), calm recovery copy, and direct `#5433EB` `Return to Storefront` + `Browse Catalog` pills.

---

## 4. Strict Functionality Preservation Plan (Phase 4D Guarantee)

When Phase 4C is approved and implemented in Next.js during a future phase, **all** Phase 4B business logic and contracts MUST remain intact:

1. **Preserve Every File Contract:**
   - `frontend/src/types/store.ts` (`ProductCategory`, `Product`, `CartItem`, `ShippingAddress`, `OrderSummary`, `DemoUser`) stays unchanged.
   - `frontend/src/data/products.ts` (`DEPARTMENTS`, 12 `SAMPLE_PRODUCTS` with exact IDs/SKUs/prices/stockCounts, `INITIAL_DEMO_USER`, `INITIAL_SAMPLE_ORDERS`) stays intact.
   - `frontend/src/context/StoreContext.tsx` preserves `DEFAULT_CART`, `FREE_SHIPPING_THRESHOLD = 75`, `STANDARD_SHIPPING = 8`, and identical `localStorage` keys (`codealpha_ecommerce_cart_v1`, `codealpha_ecommerce_orders_v1`, `codealpha_ecommerce_user_v1`) so existing cart/account state migrates seamlessly.
2. **Preserve Route URLs & Query Params:**
   - Keep exact Next.js App Router paths (`/`, `/shop`, `/shop/[id]`, `/cart`, `/checkout`, `/auth/login`, `/auth/register`, `/account`, `/about`, `/contact`, `not-found`).
   - Keep `/shop` query sync (`category`, `q`, `sort`, `inStock`) and bookmarkable URL state.
3. **Preserve Native Accessibility Mechanics:**
   - Continue native `<dialog closedby="any">` + `.showModal()` for `CartDrawer`, `MobileNavDrawer`, and `FilterDrawer`, avoiding body scroll-locking hacks and honoring `@media (prefers-reduced-motion: no-preference)`.

---

## 5. Responsive Verification Matrix (Preview Scope)

The companion preview [shop-constellation-preview.html](./preview/shop-constellation-preview.html) is audited in headless Chromium at these 5 required viewports:

| Width | Layout Expectation | Navigation Mode | Product Grid Cols | Zero Overflow Target |
|---|---|---|---|---|
| **`320px`** | Compact mobile flow, 2×2 compact hero mini-tiles, single-col cards | Sticky white top header + `<dialog>` drawer | `1 col` | `scrollWidth <= 320px` |
| **`375px`** | Standard mobile flow, compact constellation ribbon, comfortable 44px pills | Sticky white top header + `<dialog>` drawer | `1 col` (or clean `2 col` categories) | `scrollWidth <= 375px` |
| **`768px`** | Tablet editorial rhythm, constellation around centered search, 2-col spotlight | Sticky white top header + `<dialog>` drawer (`< 1024px`) | `2 col` | `scrollWidth <= 768px` |
| **`1024px`** | Desktop shell activates (`64px` left rail visible), centered workspace | Persistent **`64px` left rail** | `3 col` | `scrollWidth <= 1024px` |
| **`1440px`** | Full `1200px` centered workspace + rich asymmetric floating constellation | Persistent **`64px` left rail** | `4 col` | `scrollWidth <= 1440px` |

