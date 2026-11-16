'use client';

import { useStore } from '@/context/StoreContext';
import { SAMPLE_PRODUCTS } from '@/data/products';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { CartItemRow } from '@/components/cart/CartItemRow';
import { CartSummaryCard } from '@/components/cart/CartSummaryCard';
import { StateFeedbackCard } from '@/components/ui/StateFeedbackCard';
import { ProductGrid } from '@/components/product/ProductGrid';

export default function CartPage() {
  const { cart, cartCount, clearCart } = useStore();

  const inCartIds = new Set(cart.map((c) => c.product.id));
  const suggestions = SAMPLE_PRODUCTS.filter(
    (p) => !inCartIds.has(p.id) && p.stockCount > 0
  ).slice(0, 4);

  return (
    <div className="store-container pt-6 sm:pt-8 pb-8 space-y-12">
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shopping Cart' },
          ]}
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="heading-primary m-0">Shopping Cart</h1>
            <p className="text-sm text-ink-muted m-0 tabular-nums">
              {cartCount === 0
                ? 'Your shopping cart is currently empty'
                : `${cartCount} curated object${cartCount === 1 ? '' : 's'} ready for simulated checkout`}
            </p>
          </div>

          {cart.length > 0 ? (
            <button type="button" onClick={clearCart} className="btn-secondary">
              Clear Cart
            </button>
          ) : null}
        </div>

        {cart.length === 0 ? (
          <StateFeedbackCard
            icon="bag"
            title="Your shopping cart is empty"
            description="Explore Everyday Carry, Desk Craft, Home Objects, or Apparel to build your order."
            actionLabel="Browse Shop"
            actionHref="/shop"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 space-y-3">
              {cart.map((item) => (
                <CartItemRow key={item.product.id} item={item} />
              ))}
            </div>
            <div className="lg:col-span-4">
              <CartSummaryCard />
            </div>
          </div>
        )}
      </div>

      {suggestions.length > 0 ? (
        <section aria-labelledby="cart-suggestions-heading" className="space-y-5">
          <h2 id="cart-suggestions-heading" className="display-section m-0">
            Pair with Your Selection
          </h2>
          <ProductGrid products={suggestions} columns="4" />
        </section>
      ) : null}
    </div>
  );
}
