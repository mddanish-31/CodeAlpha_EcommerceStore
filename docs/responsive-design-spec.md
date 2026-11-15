# Responsive Design Specification — White Canvas Commerce (`simple.`)

**Project:** CodeAlpha Internship — Simple E-commerce Store  
**Status:** Verified in Headless Chromium (Phase 4D)  
**Companion Preview:** [shop-constellation-preview.html](./preview/shop-constellation-preview.html)

> [!NOTE]
> Supersedes the v1 responsive spec. Verified in headless Chromium across all 11 App Router routes and all 8 required viewport widths (`88/88` checks passed with `0` horizontal overflow).

---

## 1. Breakpoint & Chrome Adaptation

| Breakpoint Width | Shell Chrome | Product Grid | Content Container / Offset | Drawer Behavior |
| --- | --- | --- | --- | --- |
| **`320px`** | Sticky white top header (`header.lg:hidden`), rail hidden | `1 col` | Full width (`px-4`), `2×2` compact hero tiles | `<dialog closedby="any">` full-height / bottom sheet |
| **`375px`** | Sticky white top header, rail hidden | `1 col` (`2 col` compact category tiles) | Comfortable `44px` pill touch targets | `MobileNavDrawer`, `FilterDrawer`, `CartDrawer` |
| **`390px`** | Sticky white top header, rail hidden | `1 col` | Zero clipping on breadcrumbs & stepper controls | Escape & backdrop light-dismiss enabled |
| **`640px`** (`sm`) | Sticky white top header, rail hidden | `2 col` | Balanced 2-column forms & cart layout | Side/modal slide-over drawers |
| **`768px`** (`md`) | Sticky white top header, rail hidden | `2 col` | 2-column home spotlight & constellation grouping | Native `.showModal()` focus trap |
| **`1024px`** (`lg`) | **`64px` fixed white left nav rail visible**, mobile header hidden | `3 col` | `lg:pl-[64px]` shell offset, `max-w-[1200px]` centered | Inline desktop filters; slide-over `CartDrawer` |
| **`1280px`** (`xl`) | **`64px` fixed left nav rail visible** | `3–4 col` | Spacious `1200px` centered canvas | Right-aligned slide-over `CartDrawer` |
| **`1440px`** | **`64px` fixed left nav rail visible** | `4 col` | Full 8-tile asymmetric constellation framing centered `<search>` bar | Zero horizontal scroll (`scrollWidth <= innerWidth`) |

---

## 2. Phase 4D Browser Verification Matrix Summary

Verified automatically against production `next start` build across all `11` routes (`/`, `/shop`, `/shop/chrono-brass-desk-lamp`, `/cart`, `/checkout`, `/auth/login`, `/auth/register`, `/account`, `/about`, `/contact`, `/nonexistent-route-v2-check`) × all `8` exact widths (`320`, `375`, `390`, `640`, `768`, `1024`, `1280`, `1440`px):
- **Layout Overflow:** `88/88` viewports measured `document.documentElement.scrollWidth <= window.innerWidth` and zero child elements protruding past viewport bounds.
- **Navigation Switch:** `100%` pass — `< 1024px` displays sticky top bar and hides desktop rail; `>= 1024px` displays exact `64px` left rail and hides mobile bar.
- **Design System Constraints:** `#F2F4F5` canvas background (`rgb(242, 244, 245)`), self-hosted `Inter` max weight `600`, zero `Antonio` font references, zero CSS gradients, and verified `#FFFFFF` spotlight heading on `#332F2D` Slate Ink panels.
