# Frontend Component Architecture — CodeAlpha Store

**Project:** CodeAlpha Internship — Simple E-commerce Store  
**Framework:** Next.js `16.4.5` (App Router) + React `19.3.0` + TypeScript `5.9.3` + Tailwind CSS `3.4.19`  
**Branch Status:** Implemented on `feature/modern-frontend-redesign`

---

## 1. Directory Structure (`frontend/`)

```text
frontend/
├── public/
│   └── images/
│       ├── hero-editorial.webp                  # 1200×900 multi-object desk hero image
│       └── products/                            # 12 bespoke 900×900 studio product WebPs
└── src/
    ├── app/
    │   ├── globals.css                          # Modern #7C3AED/#F9FAFB CSS tokens, button/card styles, dialog transitions
    │   ├── layout.tsx                           # Root HTML shell, local Inter (400/500/600/700), skip link, StoreProvider
    │   ├── not-found.tsx                        # Branded 404 recovery page
    │   ├── page.tsx                             # Editorial hero, benefits, departments, best sellers, new arrivals, newsletter
    │   ├── about/page.tsx                       # Craft story + 2×2 studio product mosaic
    │   ├── account/page.tsx                     # Demo account profile & ORD-2026 order history
    │   ├── auth/
    │   │   ├── login/page.tsx                   # Demo sign-in page
    │   │   └── register/page.tsx                # Demo registration page
    │   ├── cart/page.tsx                        # Shopping cart page
    │   ├── checkout/page.tsx                    # Simulated checkout & ORD-2026 confirmation
    │   ├── contact/page.tsx                     # Validated demo contact form & FAQ
    │   └── shop/
    │       ├── page.tsx                         # Catalog wrapped in <Suspense> with <aside> desktop sidebar & URL sync
    │       └── [id]/page.tsx                    # Static/SSG product detail page (12 SKUs)
    ├── components/
    │   ├── ui/
    │   │   ├── LineIcon.tsx                     # Crisp stroke SVG icon set (bag, search, menu, check, layers, etc.)
    │   │   ├── PillBadge.tsx                    # Compact category, stock, and status badges
    │   │   ├── ProductMedia.tsx                 # Optimized <img> renderer (priority fetchPriority, lazy grid, fallback)
    │   │   ├── QuantityStepper.tsx              # Accessible - / count / + quantity stepper
    │   │   ├── StateFeedbackCard.tsx            # Unified card for empty, error, and confirmation states
    │   │   └── ToastBanner.tsx                  # Live-region toast feedback banner
    │   ├── layout/
    │   │   ├── AnnouncementBar.tsx              # Top announcement strip ($75 free shipping & local demo notice)
    │   │   ├── DottedDivider.tsx                # Clean #E5E7EB section divider
    │   │   ├── SiteHeader.tsx                   # Sticky white horizontal top header (brand, nav links, <search>, account, cart)
    │   │   └── SiteFooter.tsx                   # Multi-column light footer
    │   ├── navigation/
    │   │   ├── Breadcrumbs.tsx                  # Accessible route breadcrumb trail
    │   │   ├── FilterDrawer.tsx                 # Mobile `<dialog closedby="any">` catalog filter & sort sheet
    │   │   ├── MainNavPills.tsx                 # Department filter pills bar
    │   │   └── MobileNavDrawer.tsx              # Mobile `<dialog closedby="any">` route & search menu
    │   ├── product/
    │   │   ├── ProductBuyBox.tsx                # PDP pricing, stock notice, stepper & Add to Cart button
    │   │   ├── ProductCard.tsx                  # 16px surface card + 1:1 WebP image + category/SKU + Add button
    │   │   ├── ProductGallery.tsx               # Interactive Studio / Close-Up / Alternate Crop gallery switcher
    │   │   ├── ProductGrid.tsx                  # Responsive 1/2/3/4-column catalog grid
    │   │   └── ProductSpecsAccordion.tsx        # Native `<details>` specs, materials & shipping panels
    │   ├── cart/
    │   │   ├── CartDrawer.tsx                   # Global `<dialog closedby="any">` slide-over cart drawer
    │   │   ├── CartItemRow.tsx                  # Line item WebP preview, stepper & remove control
    │   │   ├── CartSummaryCard.tsx              # Subtotal, shipping, total & checkout CTA
    │   │   └── FreeShippingBar.tsx              # Violet progress indicator toward $75 free shipping
    │   └── forms/
    │       ├── AuthForm.tsx                     # Login/register client validation, password toggle & demo fill button
    │       ├── CheckoutForm.tsx                 # Shipping & simulated card validation + ORD-2026 creation
    │       ├── NewsletterForm.tsx               # Demo newsletter email signup feedback
    │       └── SearchFilterBar.tsx              # `<search>` input, mobile Filter & Sort trigger, and sort select
    ├── context/
    │   └── StoreContext.tsx                     # Preserved client cart, orders, demo user, toasts & drawer state
    ├── data/
    │   ├── products.ts                          # Preserved 4 DEPARTMENTS, 12 SAMPLE_PRODUCTS, demo user & initial orders
    │   └── productMedia.ts                      # Derived media manifest mapping SKUs & departments to local WebPs
    └── types/
        └── store.ts                             # Preserved Product, CartItem, OrderSummary, DemoUser, ShippingAddress types
```

---

## 2. Core Data & Media Contracts

- **Canonical Business Contracts ([store.ts](../frontend/src/types/store.ts) & [products.ts](../frontend/src/data/products.ts)):** Preserved untouched — `ProductCategory`, `Product`, `CartItem`, `OrderSummary`, `DemoUser`, `FREE_SHIPPING_THRESHOLD = 75`, and `STANDARD_SHIPPING = 8`.
- **Derived Media Layer ([productMedia.ts](../frontend/src/data/productMedia.ts)):** Exports `HERO_STUDIO_MEDIA`, `PRODUCT_MEDIA_BY_ID`, `DEPARTMENT_COVER_PRODUCT_ID`, and `getProductMedia()` so every component renders verified local `.webp` product imagery with explicit `width`, `height`, and descriptive `alt` text without altering canonical product schemas.
- **Zero Backend Calls:** All mutations operate client-side via browser `localStorage` until Phase 5/6 Express.js + MongoDB Atlas integration.
