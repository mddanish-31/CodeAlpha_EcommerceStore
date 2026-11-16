# Design Reference Mapping — Modern E-Commerce Redesign

**Project:** CodeAlpha Internship — Simple E-commerce Store (`CodeAlpha Store`)  
**Branch Status:** Implemented on `feature/modern-frontend-redesign`  
**Core Token Spec:** [design-system.md](./design-system.md)

---

## 1. Visual Architecture & Production Mapping

| Visual Element | Modern Redesign Decision | Production Location |
| --- | --- | --- |
| **Brand Identity & Top Header** | Sticky full-width white header (`h-16`) with violet layered icon + `CodeAlpha Store` wordmark, desktop nav (`Home`, `Shop`, `About`, `Contact`), inline `<search>` input (`lg+`), Account link, Cart bag counter badge, and compact mobile controls | [SiteHeader.tsx](../frontend/src/components/layout/SiteHeader.tsx) |
| **Page Canvas & Card Elevation** | `#F9FAFB` light canvas with `#FFFFFF` `16px`-radius cards (`--shadow-card`), `1px solid #E5E7EB` borders, and subtle lift hover states | [globals.css](../frontend/src/app/globals.css), [ProductCard.tsx](../frontend/src/components/product/ProductCard.tsx) |
| **Home Storefront Hero & Grid** | Two-column editorial hero featuring violet status pill, `<h1>`, Shop CTA, 3 store metrics, and `4:3` `HERO_STUDIO_MEDIA` showcase; followed by 3 benefit cards, 4 department cover cards, 4 Best Sellers, and 4 New Arrivals | [page.tsx](../frontend/src/app/page.tsx), [productMedia.ts](../frontend/src/data/productMedia.ts) |
| **Catalog Discovery & Sidebar** | Desktop `lg:grid-cols-12` layout pairing a sticky `<aside>` filter sidebar (department counts, `In stock only` toggle, reset) with `<search>` + sort controls and a 3-column product grid; mobile `< lg` uses `FilterDrawer` | [shop/page.tsx](../frontend/src/app/shop/page.tsx), [SearchFilterBar.tsx](../frontend/src/components/forms/SearchFilterBar.tsx), [FilterDrawer.tsx](../frontend/src/components/navigation/FilterDrawer.tsx) |
| **Product Media & Detail View** | Responsive `ProductMedia` wrapper (`width`/`height` attributes, `fetchPriority="high"` on priority LCP images, `loading="lazy"` on grid images, graceful fallback) + interactive `Full Studio` / `Close-Up` / `Alternate Crop` toggles | [ProductMedia.tsx](../frontend/src/components/ui/ProductMedia.tsx), [ProductGallery.tsx](../frontend/src/components/product/ProductGallery.tsx) |
| **Cart, Checkout & Account** | Slide-over `<dialog closedby="any">` `CartDrawer` (`FREE_SHIPPING_THRESHOLD = 75`, `STANDARD_SHIPPING = 8`), simulated checkout (`ORD-2026-XXXX`), demo sign-in/register, and order history | [CartDrawer.tsx](../frontend/src/components/cart/CartDrawer.tsx), [CheckoutForm.tsx](../frontend/src/components/forms/CheckoutForm.tsx), [StoreContext.tsx](../frontend/src/context/StoreContext.tsx) |

---

## 2. Product Media Sourcing & Provenance Notes

During asset preparation for `feature/modern-frontend-redesign`, external open-stock photo libraries were evaluated before generating local studio assets:
1. **Unsplash (`unsplash.com/napi/search/photos`):** Returned HTTP `401` gated behind an Anubis proof-of-work anti-bot gate (not bypassed).
2. **StockSnap CDN (`cdn.stocksnap.io`):** Direct downloads returned HTTP `403`.
3. **Wikimedia Commons & WordPress Photo Directory (via Openverse):** Ten candidates were downloaded and inspected visually, but carried visible third-party branding/logos (`YSTUDIO`, `SEVENFRIDAY`, WordPress bag markings), historical museum objects, or mismatched materials rather than the exact 12 CodeAlpha catalog SKUs.

To keep every SKU accurate, unbranded, lightweight, and free of external runtime network failures, all `13` production visual assets were generated as studio product scenes for this repository and converted via `sharp` into local `.webp` files inside [frontend/public/images/](../frontend/public/images/):
- `hero-editorial.webp` (`1200×900`) — Multi-object workspace hero setup
- `products/*.webp` (`900×900` each) — Clean studio product photos mapped 1:1 in [productMedia.ts](../frontend/src/data/productMedia.ts)
