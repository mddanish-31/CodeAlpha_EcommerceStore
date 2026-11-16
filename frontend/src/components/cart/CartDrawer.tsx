'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { LineIcon } from '@/components/ui/LineIcon';
import { FreeShippingBar } from './FreeShippingBar';
import { CartItemRow } from './CartItemRow';

export function CartDrawer() {
  const {
    cart,
    cartCount,
    subtotal,
    shippingCost,
    isCartDrawerOpen,
    closeCartDrawer,
  } = useStore();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isCartDrawerOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isCartDrawerOpen && dialog.open) {
      dialog.close();
    }
  }, [isCartDrawerOpen]);

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      if (isCartDrawerOpen) {
        closeCartDrawer();
      }
    }
  }, [pathname, isCartDrawerOpen, closeCartDrawer]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog || ('closedBy' in HTMLDialogElement.prototype)) return;
    if (e.target !== dialog) return;
    if (e.clientX === 0 && e.clientY === 0) return;

    const rect = dialog.getBoundingClientRect();
    const isInside =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    if (!isInside) {
      dialog.close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id="cart-drawer-dialog"
      closedby="any"
      aria-labelledby="cart-drawer-heading"
      onClose={closeCartDrawer}
      onClick={handleBackdropClick}
      className="drawer-dialog"
    >
      <div className="flex flex-col h-full bg-surface text-ink">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h2 id="cart-drawer-heading" className="text-lg font-semibold text-ink m-0">
              Shopping Cart
            </h2>
            <p className="text-xs text-ink-muted tabular-nums m-0">
              {cartCount} item{cartCount === 1 ? '' : 's'}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCartDrawer}
            aria-label="Close shopping cart"
            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-control bg-background border border-border text-ink hover:bg-surface-subtle transition-colors"
          >
            <LineIcon name="close" size={18} />
          </button>
        </div>

        <div className="px-5 pt-4">
          <FreeShippingBar />
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {cart.length === 0 ? (
            <div className="p-6 rounded-card bg-background border border-border text-center space-y-3 mt-4">
              <div className="w-11 h-11 rounded-pill bg-surface-subtle border border-border text-ink-secondary flex items-center justify-center mx-auto">
                <LineIcon name="bag" size={20} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-ink m-0">
                  Your shopping cart is empty
                </p>
                <p className="text-xs text-ink-muted m-0">
                  Add curated objects to inspect subtotal and shipping threshold.
                </p>
              </div>
              <Link href="/shop" onClick={closeCartDrawer} className="btn-primary w-full">
                Explore Shop
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <CartItemRow
                key={item.product.id}
                item={item}
                compact
                onNavigate={closeCartDrawer}
              />
            ))
          )}
        </div>

        <div className="p-5 border-t border-border bg-background space-y-3">
          <div className="space-y-1.5 text-sm">
            <div className="flex items-center justify-between text-ink-muted">
              <span>Subtotal</span>
              <span className="font-medium text-ink tabular-nums">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-ink-muted">
              <span>Shipping</span>
              <span className="font-medium text-ink tabular-nums">
                {cart.length === 0
                  ? '$0.00'
                  : shippingCost === 0
                  ? 'Free'
                  : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <Link href="/cart" onClick={closeCartDrawer} className="btn-secondary w-full">
              View Cart
            </Link>
            {cart.length > 0 ? (
              <Link href="/checkout" onClick={closeCartDrawer} className="btn-primary w-full">
                Checkout
              </Link>
            ) : (
              <Link href="/shop" onClick={closeCartDrawer} className="btn-primary w-full">
                Browse
              </Link>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
