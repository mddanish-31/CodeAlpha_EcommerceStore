# Frontend Component Architecture — Simple E-commerce Store

**Project:** Simple E-commerce Store (`CodeAlpha_EcommerceStore`)  
**Target Framework:** Next.js (App Router) + TypeScript + Tailwind CSS *(Planned — Phase 4B)*  
**Design Principle:** Ponytail Minimalist Architecture — native HTML elements (`<dialog>`, `<details>`, `<search>`, `<form>`) first, strict TypeScript interfaces, zero unnecessary third-party UI or state libraries.

---

## 1. Architectural Principles (Ponytail + Next.js App Router)

1. **Native Platform Over Heavy Dependencies:**
   - **Modals & Drawers:** Use native HTML `<dialog closedby="any">` controlled via `ref.current?.showModal()` and `.close()` instead of installing Radix Dialog, Headless UI, or Framer Motion.
   - **Accordions:** Use native HTML `<details name="group">` and `<summary>` for exclusive product specification and FAQ accordions.
   - **Search Landmark:** Use native `<search>` wrapper for catalog search and filter controls.
2. **Server Components by Default, Client Components at Interactive Leaves:**
   - Route layouts, static sections (Hero, Trust Band, Footer, About), and initial catalog structures remain React Server Components (RSC).
   - Only interactive leaves (`CartDrawer`, `QuantityStepper`, `AddToCartButton`, `SearchFilterBar`, `AuthForm`, `ProductGallery`) use `'use client'`.
3. **Lightweight State Management:**
   - **Cart & Auth Context:** A single lightweight React Context + `localStorage` hydration hook (`CartProvider`, `AuthProvider`) handles client-side cart state and JWT session state until/alongside backend synchronization in Phases 5–6. No Redux, Zustand, or MobX boilerplate is needed.
   - **Filter & Sort State:** Stored in URL search parameters (`?category=audio&q=lamp&sort=price-asc`) via `useSearchParams` / standard links so filtered views are bookmarkable and shareable.

---

## 2. Planned Directory Structure (`frontend/src/`)

> **Note:** `frontend/` is currently an empty directory prepared in Phase 2. The structure below will be created when Phase 4B (`T-026` Frontend Implementation) is approved.

```text
frontend/
└── src/
    ├── app/
    │   ├── layout.tsx                  # Root layout: Antonio + Inter fonts, Header, CartDrawer, Footer
    │   ├── globals.css                 # CSS Custom Properties & Tailwind v4 @theme tokens
    │   ├── page.tsx                    # Homepage (10 editorial & shopping sections)
    │   ├── not-found.tsx               # Custom 404 Poster Page
    │   ├── shop/
    │   │   ├── page.tsx                # Catalog Listing, Search, Filters, Grid
    │   │   └── [id]/
    │   │       └── page.tsx            # Product Details Page (PDP)
    │   ├── cart/
    │   │   └── page.tsx                # Dedicated Full-Page Shopping Cart
    │   ├── checkout/
    │   │   └── page.tsx                # Customer Info, Shipping Address & Order Summary
    │   ├── auth/
    │   │   ├── login/page.tsx          # Customer Sign In
    │   │   └── register/page.tsx       # Customer Registration
    │   ├── account/
    │   │   └── page.tsx                # Customer Profile & Order History
    │   ├── about/
    │   │   └── page.tsx                # Storefront Ethos & Internship Context
    │   └── contact/
    │       └── page.tsx                # Support Form & FAQ Accordion
    ├── components/
    │   ├── layout/                     # Header, Footer, AnnouncementBar, SectionDivider, PageHeader
    │   ├── navigation/                 # MainNavPills, MobileNavDrawer, Breadcrumbs, FilterDrawer
    │   ├── product/                    # ProductCard, ProductGrid, ProductGallery, ProductSpecsAccordion
    │   ├── cart/                       # CartDrawer, CartItemRow, CartSummaryCard, FreeShippingBar
    │   ├── forms/                      # SearchFilterBar, CheckoutForm, AuthForm, NewsletterForm
    │   └── ui/                         # Button, PillBadge, PillInput, QuantityStepper, Icon, EmptyState
    ├── context/
    │   ├── CartContext.tsx             # Cart items, add/remove/updateQty, subtotal calculation
    │   └── AuthContext.tsx             # User session state & planned JWT token storage
    └── types/
        └── store.ts                    # Shared TypeScript interfaces (Product, CartItem, Order, User)
```

---

## 3. Component Catalog by Category

### 3.1 Shared UI Primitives (`components/ui/`)

| Component | Rendering | Key Props | Design System Mapping |
| :--- | :--- | :--- | :--- |
| **`Button`** | Server / Client | `variant: 'primary' \| 'ghost' \| 'link' \| 'icon'`, `size?: 'sm' \| 'md' \| 'lg'`, `isLoading?: boolean` | Full pill (`9999px`). `primary` = `#FAAE33` fill / `#281006` text; `ghost` = `1px solid #FAAE33` outline; `link` = borderless `#FAAE33` |
| **`PillBadge`** | Server | `tone: 'gold' \| 'spice' \| 'alert'`, `children: ReactNode` | `9999px` radius, `11px` uppercase, `0.06em` tracking. `alert` uses `#D1255C` Chili Red fill with `#FDF6EC` text |
| **`PillInput`** | Client / Server | `label: string`, `error?: string`, `icon?: IconName`, standard `<input>` props | `9999px` radius, `#281006` fill, `1px solid #6B2E12` border (`#FAAE33` on `:focus-visible`, `#D1255C` on `aria-invalid="true"`), explicit `<label>` |
| **`QuantityStepper`** | Client | `value: number`, `min?: number`, `max: number`, `onChange: (qty: number) => void` | Pill container (`9999px`), `−` and `+` buttons (`min 40px` target), `tabular-nums` display |
| **`LineIcon`** | Server | `name: 'bag' \| 'search' \| 'user' \| 'menu' \| 'close' \| 'check' \| 'alert' \| 'arrow-right' \| 'eye' \| 'eye-off' \| 'trash' \| 'filter'` | `1.5px` stroke width SVG in `#FAAE33`, `fill="none"`, `aria-hidden="true"` |
| **`StateFeedbackCard`** | Server / Client | `status: 'loading' \| 'empty' \| 'error' \| 'success'`, `title: string`, `message: string`, `actionLabel?: string`, `onAction?: () => void` | `6px`-radius `#402011` or `#281006` surface card for consistent Empty, Error, and Confirmation feedback |

---

### 3.2 Layout Components (`components/layout/`)

| Component | Rendering | Responsibility |
| :--- | :--- | :--- |
| **`AnnouncementBar`** | Server | Top `#281006` bar with uppercase `11px` Tiger Gold dispatch/shipping message |
| **`SiteHeader`** | Client wrapper | Sticky `#402011` bar (`border-bottom: 1px dotted #FAAE33`) housing brand wordmark, `MainNavPills`, compact `<search>` input, Account trigger, and Cart button with live item count badge |
| **`DottedDivider`** | Server | Semantic `<hr className="divider-dotted" />` (`1px dotted #FAAE33`) separating major viewport bands |
| **`EditorialSectionHeader`** | Server | Reusable section crown: optional `PillBadge` eyebrow + `Antonio` `65px` uppercase headline + optional right-aligned Ghost Outline CTA |
| **`SiteFooter`** | Server | `#281006` Charred Clove footer with 4 navigation/info columns, `1px dotted #FAAE33` rules, and oversized watermarked brand signature |

---

### 3.3 Navigation Components (`components/navigation/`)

| Component | Rendering | Responsibility |
| :--- | :--- | :--- |
| **`MainNavPills`** | Client | Renders desktop Ghost Outline Pill links (`SHOP`, `CATEGORIES`, `NEW ARRIVALS`, `ABOUT`, `CONTACT`) with `aria-current="page"` fill highlight |
| **`MobileNavDrawer`** | Client | Native `<dialog closedby="any">` slide-over drawer (`#281006` surface) for viewports `< 1024px`, containing `<search>` input, primary route pills, category quick-links, and Account/Cart shortcuts |
| **`FilterDrawer`** | Client | Native `<dialog closedby="any">` bottom/side sheet on mobile (`< 768px`) housing Category, Price Range, and Availability filters with `APPLY FILTERS` primary CTA |
| **`Breadcrumbs`** | Server | Accessible `<nav aria-label="Breadcrumb">` trail for `/shop`, `/shop/[id]`, and `/checkout` |

---

### 3.4 Product Components (`components/product/`)

| Component | Rendering | Responsibility |
| :--- | :--- | :--- |
| **`ProductCard`** | Client / Server | `6px`-radius `#402011` card (`1px solid #6B2E12` → `#FAAE33` on hover) with `#281006` image well, `PillBadge` overlays (`BESTSELLER`, `LOW STOCK`, `-15%`), category caption, `Antonio` title link, `tabular-nums` price row, and `AddToCartButton` |
| **`ProductGrid`** | Server / Client | Responsive CSS Grid (`1` → `2–3` → `4` columns) handling empty search states and loading skeleton cards |
| **`ProductGallery`** | Client | PDP interactive image viewer: main `#281006` `6px`-radius stage + selectable thumbnail strip with `aria-current="true"` border highlight |
| **`ProductBuyBox`** | Client | PDP right column: SKU/Category pills, `Antonio` title, price/discount calculation, stock indicator dot, `QuantityStepper`, and primary `ADD TO CART` button |
| **`ProductSpecsAccordion`** | Server | Native HTML `<details name="pdp-specs">` exclusive accordion items (`Specifications`, `Materials & Care`, `Shipping & Returns`) styled with `1px dotted #FAAE33` dividers |

---

### 3.5 Cart Components (`components/cart/`)

| Component | Rendering | Responsibility |
| :--- | :--- | :--- |
| **`CartDrawer`** | Client | Global `<dialog id="cart-drawer" closedby="any">` right-anchored drawer (`max-width: 440px`, `#281006` fill, `border-left: 1px solid #FAAE33`) with backdrop click fallback, `FreeShippingBar`, scrollable `CartItemRow` list, and sticky summary footer |
| **`CartItemRow`** | Client | `6px`-radius `#402011` row displaying `64px` `#281006` thumbnail, title, unit price, compact `QuantityStepper`, `Remove` button, and line subtotal |
| **`CartSummaryCard`** | Client | Shared between `CartDrawer`, `/cart`, and `/checkout`: displays Subtotal, Shipping estimate, Discount, `1px dotted #FAAE33` divider, Total (`#FAAE33`), and Checkout CTA |
| **`FreeShippingBar`** | Client | Progress indicator calculating `Math.min(100, (subtotal / 75) * 100)` with dynamic helper text |

---

### 3.6 Form Components (`components/forms/`)

| Component | Rendering | Responsibility |
| :--- | :--- | :--- |
| **`SearchFilterBar`** | Client | Semantic `<search>` toolbar on `/shop` combining keyword `PillInput`, Category pill selector, Price filter pill select, and Sort dropdown |
| **`CheckoutForm`** | Client | Validated delivery address & contact form with standard HTML `autocomplete` tokens, inline `#D1255C` field error feedback, and Order Confirmation state transition |
| **`AuthForm`** | Client | Shared/specialized Login and Register form with password visibility toggle (`type="password"` ↔ `type="text"`), client-side validation, and `role="alert"` error banner |
| **`NewsletterForm`** | Client | Homepage email capture bar with inline validation and instant subscription confirmation badge |

---

## 4. Core TypeScript Domain Contracts (`types/store.ts`)

These conceptual interfaces align directly with the planned entities in [README.md](file:///c:/Users/mddan/Desktop/CodeAlpha_EcommerceStore/README.md#L111-L117) (`Users`, `Products`, `Carts`, `Orders`) without locking in unapproved backend implementation details:

```ts
export type ProductCategory =
  | 'Audio & Desk'
  | 'Everyday Carry'
  | 'Home Objects'
  | 'Apparel & Goods';

export interface Product {
  id: string;
  sku: string;
  title: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  description: string;
  stockCount: number;
  badge?: 'BESTSELLER' | 'NEW ARRIVAL' | 'LIMITED DROP';
  specs: Record<string, string>;
  imageSvgId: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  notes?: string;
}

export interface OrderSummary {
  orderId: string;
  createdAt: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  totalAmount: number;
  shippingAddress: ShippingAddress;
}
```
