# Frontend Component Architecture — White Canvas Commerce (`simple.`)

**Project:** CodeAlpha Internship — Simple E-commerce Store  
**Framework:** Next.js `16.4.5` (App Router) + React `19.3.0` + TypeScript `5.9.3` + Tailwind CSS `3.4.19`  
**Status:** Implemented (Phase 4D)

> [!NOTE]
> This architecture reflects the live component tree inside `frontend/src/`, styled with **Floating Shopping Constellation — White Canvas Commerce** ([design-system-v2.md](./design-system-v2.md)).

---

## 1. Directory Structure (`frontend/src/`)

```text
frontend/src/
├── app/
│   ├── globals.css                    # White Canvas CSS variables, @layer components headings, dialog animations, forced-colors rules
│   ├── layout.tsx                     # Root HTML shell, local Inter (400/500/600), skip link, StoreProvider, global chrome
│   ├── not-found.tsx                  # White Canvas 404 recovery page
│   ├── page.tsx                       # Home: 8-card constellation hero, spotlight, featured objects, newsletter
│   ├── about/page.tsx                 # Brand & design craft overview
│   ├── account/page.tsx               # Demo customer account & ORD-2026 order history
│   ├── auth/
│   │   ├── login/page.tsx             # Sign-in route
│   │   └── register/page.tsx          # Registration route
│   ├── cart/page.tsx                  # Dedicated shopping bag page
│   ├── checkout/page.tsx              # Simulated checkout & ORD-2026 confirmation
│   ├── contact/page.tsx               # Contact form & FAQ page
│   └── shop/
│       ├── page.tsx                   # Full catalog wrapped in <Suspense> with query params
│       └── [id]/page.tsx              # Static/SSG product detail page (12 items)
├── components/
│   ├── ui/
│   │   ├── LineIcon.tsx               # Clean 1.5px stroke SVG icons (bag, search, menu, close, check, etc.)
│   │   ├── PillBadge.tsx              # Compact category, stock, and status pill labels
│   │   ├── ProductIllustration.tsx    # Custom minimalist vector illustrations per product SVG ID
│   │   ├── QuantityStepper.tsx        # Accessible - / count / + quantity buttons
│   │   ├── StateFeedbackCard.tsx      # Unified 28px White Canvas card for empty, error, and confirmation states
│   │   └── ToastBanner.tsx            # Polite live-region status toast
│   ├── layout/
│   │   ├── AnnouncementBar.tsx        # Top utility strip ($75 free shipping & static demo notice)
│   │   ├── DottedDivider.tsx          # Faint #EAEBED section divider
│   │   ├── SiteHeader.tsx             # 64px fixed desktop left rail (>= 1024px) + sticky mobile bar (< 1024px)
│   │   └── SiteFooter.tsx             # Clean white-canvas multi-column studio footer
│   ├── navigation/
│   │   ├── Breadcrumbs.tsx            # Accessible route hierarchy links
│   │   ├── FilterDrawer.tsx           # Mobile `<dialog closedby="any">` catalog filter & sort modal
│   │   ├── MainNavPills.tsx           # Department filter pills bar
│   │   └── MobileNavDrawer.tsx        # Mobile `<dialog closedby="any">` route menu
│   ├── product/
│   │   ├── ProductBuyBox.tsx          # PDP title, price, stock status, stepper & Add to Bag CTA
│   │   ├── ProductCard.tsx            # 28px `#FFFFFF` card + 20px `1:1` inner stage + Quick Add button
│   │   ├── ProductGallery.tsx         # Interactive multi-stage SVG viewer & swatch toggles
│   │   ├── ProductGrid.tsx            # Responsive 1/2/3/4-column catalog grid
│   │   └── ProductSpecsAccordion.tsx  # Native `<details>` specs, materials & shipping panels
│   ├── cart/
│   │   ├── CartDrawer.tsx             # Global `<dialog closedby="any">` slide-over bag drawer
│   │   ├── CartItemRow.tsx            # Line item preview, quantity stepper & remove button
│   │   ├── CartSummaryCard.tsx        # Subtotal, shipping, total & checkout CTA
│   │   └── FreeShippingBar.tsx        # Progress indicator toward $75 free shipping threshold
│   └── forms/
│       ├── AuthForm.tsx               # Login/register client validation, password visibility toggle & demo fill button
│       ├── CheckoutForm.tsx           # Shipping + demo card validation & ORD-2026 placement
│       ├── NewsletterForm.tsx         # Demo newsletter email signup feedback
│       └── SearchFilterBar.tsx        # `<search>` pill input, department selector, sort & stock toggle
├── context/
│   └── StoreContext.tsx               # Cart, orders, user auth state, toast queue & drawer controls
├── data/
│   └── products.ts                    # 4 DEPARTMENTS, 12 SAMPLE_PRODUCTS, INITIAL_DEMO_USER, INITIAL_SAMPLE_ORDERS
└── types/
    └── store.ts                       # TypeScript interfaces for Product, CartItem, OrderSummary, DemoUser, ShippingAddress
```

---

## 2. Core Data & Interface Guarantees (`frontend/src/types/store.ts`)

- `ProductCategory`: `'Audio & Desk Craft' | 'Everyday Carry' | 'Home Objects' | 'Apparel & Goods'`
- `Product`: `{ id, sku, title, category, price, compareAtPrice?, shortDescription, description, stockCount, badge?, specs, materialsCare, shippingReturns, imageSvgId, featured }`
- `CartItem`: `{ product: Product; quantity: number }`
- `OrderSummary`: `{ orderId, placedAt, status, items, subtotal, shipping, total, shippingAddress }`
- `DemoUser`: `{ fullName, email, phone, defaultAddress, isAuthenticated }`

No backend HTTP API calls exist in Phase 4D; all state reads and mutates locally in memory + `localStorage`.
