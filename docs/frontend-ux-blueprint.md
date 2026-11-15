# Frontend UX Blueprint — White Canvas Commerce (`simple.`)

**Project:** CodeAlpha Internship — Simple E-commerce Store  
**Status:** Active Production UX Architecture (Phase 4D Implemented)  
**Detailed Phase 4C/4D Route & Migration Blueprint:** [frontend-ux-blueprint-v2.md](./frontend-ux-blueprint-v2.md)

> [!NOTE]
> Updated from the superseded v1 *Editorial Craft Market* layout to match the implemented **Floating Shopping Constellation — White Canvas Commerce** storefront across all 11 App Router routes.

---

## 1. Navigation & Shell Structure

- **Desktop (`>= 1024px`):** Fixed `64px` pure white (`#FFFFFF`) left rail (`aria-label="Desktop navigation rail"`) with compact `s.` emblem, primary route icons (Home, Shop, Search, Account, Bag with live badge count, About, Contact), and user initials chip (`MD`), paired with `lg:pl-[64px]` content offset.
- **Mobile & Tablet (`< 1024px`):** Sticky `64px` white top header (`header.lg:hidden`) with menu trigger opening native `<dialog closedby="any">` `MobileNavDrawer`, centered `simple.` wordmark, quick `/shop` search trigger, and slide-over `CartDrawer` button.
- **Top Announcement Strip:** Lightweight mist/white banner noting `$75` free studio shipping threshold and static demo persistence status.

---

## 2. Implemented App Router Map (`11` Routes)

| Route | Purpose | Key UX Patterns |
| --- | --- | --- |
| `/` | Storefront Home | Asymmetric 8-tile floating constellation hero, centered `<search>` pill bar, department filter pills, `#332F2D` dark spotlight card + interactive lamp swatch preview, curated bestsellers grid, white newsletter card |
| `/shop` | Full Catalog (`12` Objects) | Wrapped in `<Suspense>`, live URL query sync (`category`, `q`, `sort`, `inStock`), desktop filter pills + mobile `FilterDrawer`, reset/empty state recovery |
| `/shop/[id]` | Product Detail (`SSG` `generateStaticParams`) | Breadcrumbs, multi-angle SVG stage gallery with finish/angle toggles, price & compare-at display, `QuantityStepper`, Sold Out stock guard (`fluted-stoneware-carafe-set`), expandable specs accordion, related objects |
| `/cart` | Shopping Bag Page | `CartItemRow` list, `FreeShippingBar` (`FREE_SHIPPING_THRESHOLD = 75`), live quantity controls, remove item, empty state CTA, `CartSummaryCard` |
| `/checkout` | Simulated Checkout | Pre-filled demo contact/shipping fields + demo card validation (`Simulated cardholder name...`), simulated order confirmation (`ORD-2026-XXXX`), automatic cart reset & order history append |
| `/auth/login` | Demo Sign-In | Email/password fields with visibility toggle, one-click `Fill Demo Credentials` helper, simulated session redirect to `/account` |
| `/auth/register` | Demo Account Registration | Client validation with inline error summary and simulated demo user creation |
| `/account` | Customer Profile & Orders | Demo member profile details, shipping address summary, persisted simulated `ORD-2026-` order history list, sign-out control |
| `/about` | Studio Craft & Design Principles | Brand story, White Canvas studio material principles (`28px` light & `#332F2D` dark panels), craft metrics |
| `/contact` | Studio Support & FAQ | Validated contact inquiry form showing non-persistent demo confirmation banner + expandable studio FAQ details |
| `/not-found` | 404 Recovery | Studio 404 card linking back to `/` and `/shop` |

---

## 3. Preserved Client State Contracts (`frontend/src/context/StoreContext.tsx`)

All business logic remains local to browser storage until Phase 5/6 backend integration:
- `localStorage` keys: `codealpha_ecommerce_cart_v1` (empty `[]` default on fresh visit), `codealpha_ecommerce_orders_v1`, `codealpha_ecommerce_user_v1`.
- Shipping math: `FREE_SHIPPING_THRESHOLD = 75`, `STANDARD_SHIPPING = 8`.
- Drawers: Native `<dialog closedby="any">` via `.showModal()` for `CartDrawer`, `MobileNavDrawer`, and `FilterDrawer`.
