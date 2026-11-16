# Frontend UX Blueprint — CodeAlpha Store (Modern Redesign)

**Project:** CodeAlpha Internship — Simple E-commerce Store  
**Branch Status:** Implemented on `feature/modern-frontend-redesign`  
**Design Tokens:** [design-system.md](./design-system.md) · **Component Map:** [frontend-component-architecture.md](./frontend-component-architecture.md)

---

## 1. Navigation & Shell Structure

- **Top Utility Bar ([AnnouncementBar.tsx](../frontend/src/components/layout/AnnouncementBar.tsx)):** Compact `#111827` strip communicating the `$75` free shipping threshold, `$8` flat shipping rate below `$75`, and local demo storefront notice.
- **Sticky Global Header ([SiteHeader.tsx](../frontend/src/components/layout/SiteHeader.tsx)):** Full-width `64px` (`h-16`) `#FFFFFF/95` header with backdrop blur and `1px solid #E5E7EB` bottom border:
  - Left: Brand icon (`#7C3AED`) + `CodeAlpha Store` wordmark (`"Store"` hidden `< 640px` to preserve clean spacing on compact screens) + desktop `Main navigation` links (`Home`, `Shop`, `About`, `Contact`).
  - Right: Inline `<search>` bar (`lg+`), mobile quick-search icon (`< lg`), `Account` icon/name link, `Cart` trigger with violet item-count badge, and mobile drawer toggle (`< lg`).
- **Mobile Navigation & Drawers (< `1024px`):** Native `<dialog closedby="any">` modals via `.showModal()` for `MobileNavDrawer`, `FilterDrawer`, and `CartDrawer`.

---

## 2. Implemented App Router Map (`11` Routes)

| Route | Purpose | Key UX Patterns |
| --- | --- | --- |
| `/` | Storefront Home | Editorial two-column hero with `4:3` `hero-editorial.webp`, store metrics (`4 Curated`, `12 Objects`, `Above $75`), 3 benefit cards, 4 department cards, Featured Best Sellers (`4`), New Arrivals (`4`), demo newsletter form |
| `/shop` | Full Catalog (`12` Objects) | Wrapped in `<Suspense>`, live URL query sync (`category`, `q`, `sort`, `inStock`), desktop `<aside>` filter sidebar (`lg+`), `<search>` & sort bar, mobile `FilterDrawer`, empty-filter reset CTA |
| `/shop/[id]` | Product Detail (`SSG` `generateStaticParams`) | Breadcrumbs, `ProductGallery` (`Full Studio`, `Close-Up`, `Alternate Crop`), price & savings badge, stock status & `QuantityStepper`, `Sold Out` guard (`fluted-stoneware-carafe-set`), expandable specs accordion, related products |
| `/cart` | Shopping Bag Page | `CartItemRow` list with thumbnails, `FreeShippingBar` (`$75` threshold), live quantity steppers, item removal, empty cart state CTA, `CartSummaryCard` |
| `/checkout` | Simulated Checkout | Pre-filled demo contact/shipping fields + client card field validation, simulated `ORD-2026-XXXX` confirmation state, automatic cart clearing & local order history update |
| `/auth/login` | Demo Sign-In | Email & password fields with show/hide password toggle, one-click `Fill Demo Credentials`, simulated session redirect to `/account` |
| `/auth/register` | Demo Registration | Full name/email/password validation with inline error feedback and simulated account creation in local storage |
| `/account` | Customer Profile & Orders | Demo member profile summary, saved default address, persisted local `ORD-2026-` order history list, sign-out control |
| `/about` | Brand Story & Craft Mosaic | Store curation overview, 2×2 editorial product photo mosaic (`Chrono Brass Desk Lamp`, `Tactile Field Chronograph`, `Copper Gooseneck Kettle`, `Full-Grain Leather A5 Field Folio`), and local studio principles |
| `/contact` | Support & FAQ | Client-validated contact inquiry form showing a non-persistent demo confirmation banner + expandable `<details>` studio FAQ items |
| `/not-found` | 404 Recovery | Branded recovery card linking back to `/` and `/shop` |

---

## 3. Preserved Client State Contracts ([StoreContext.tsx](../frontend/src/context/StoreContext.tsx))

All shopping, user session, and order state remains local to the browser until Phase 5/6 backend integration:
- `localStorage` keys: `codealpha_ecommerce_cart_v1` (defaults to empty `[]` on initial visit), `codealpha_ecommerce_orders_v1`, `codealpha_ecommerce_user_v1`.
- Shipping math: `FREE_SHIPPING_THRESHOLD = 75`, `STANDARD_SHIPPING = 8`.
- Canonical catalog definitions in [products.ts](../frontend/src/data/products.ts) and interfaces in [store.ts](../frontend/src/types/store.ts) remain unmodified.
