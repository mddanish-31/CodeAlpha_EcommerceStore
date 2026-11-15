# Design Reference Mapping — Phase 4C/4D Active Architecture

**Project:** CodeAlpha Internship — Simple E-commerce Store (`simple.`)  
**Status:** Active Visual Mapping (Implemented in Phase 4D)  
**Detailed Structural Mapping:** [design-reference-mapping-v2.md](./design-reference-mapping-v2.md)

> [!NOTE]
> The earlier Phase 4A *Editorial Craft Market* reference mapping (v1 dark storefront direction) was formally superseded after user approval of **Floating Shopping Constellation — White Canvas Commerce** (Phase 4C/4D).

---

## Active Reference Translation Summary

| Visual Element | Authoritative v2 Decision | Production Location |
| --- | --- | --- |
| **Brand Wordmark** | Minimal lowercase `simple.` with `#5433EB` period (`s.` compact icon on desktop rail) | [SiteHeader.tsx](../frontend/src/components/layout/SiteHeader.tsx) |
| **Canvas & Card Hierarchy** | `#F2F4F5` Canvas Mist viewport with `#FFFFFF` `28px`-radius outer cards + `20px` inner `1:1` stages | [globals.css](../frontend/src/app/globals.css), [ProductCard.tsx](../frontend/src/components/product/ProductCard.tsx) |
| **Desktop & Mobile Navigation** | Persistent `64px` left rail (`>= 1024px`) + sticky white mobile header and `<dialog closedby="any">` drawer (`< 1024px`) | [SiteHeader.tsx](../frontend/src/components/layout/SiteHeader.tsx), [MobileNavDrawer.tsx](../frontend/src/components/navigation/MobileNavDrawer.tsx) |
| **Hero Constellation** | Asymmetric 8-tile product mini-card constellation flanking centered pill `<search>` bar and department filter pills | [page.tsx](../frontend/src/app/page.tsx), [SearchFilterBar.tsx](../frontend/src/components/forms/SearchFilterBar.tsx) |
| **Spotlight & Merchandising** | Inverted dark Slate Ink (`#332F2D`) department spotlight paired with interactive white product stage preview card | [page.tsx](../frontend/src/app/page.tsx), [ProductGallery.tsx](../frontend/src/components/product/ProductGallery.tsx) |
| **Cart, Checkout & Account** | Slide-over `<dialog>` cart drawer (`FREE_SHIPPING_THRESHOLD = $75`) + full white-surface transactional routes | [CartDrawer.tsx](../frontend/src/components/cart/CartDrawer.tsx), [CheckoutForm.tsx](../frontend/src/components/forms/CheckoutForm.tsx) |

For full token-by-token rationale and component deltas, read [design-reference-mapping-v2.md](./design-reference-mapping-v2.md) and [design-system-v2.md](./design-system-v2.md).
