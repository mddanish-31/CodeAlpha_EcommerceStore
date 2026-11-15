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
      <div className="flex flex-col h-full bg-pure-white text-ink-black">
        <div className="flex items-center justify-between px-5 py-4 border-b border-faint-border">
          <div>
            <h2 id="cart-drawer-heading" className="text-lg font-semibold tracking-[-0.04em]">
              Shopping Bag
            </h2>
            <p className="text-xs text-muted-gray tabular-nums">
              {cartCount} item{cartCount === 1 ? '' : 's'}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCartDrawer}
            aria-label="Close shopping bag"
            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-pill bg-canvas-mist border border-faint-border text-ink-black hover:border-ink-black transition-colors"
          >
            <LineIcon name="close" size={18} />
          </button>
        </div>

        <div className="px-5 pt-4">
          <FreeShippingBar />
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {cart.length === 0 ? (
            <div className="p-6 rounded-image bg-canvas-mist border border-faint-border text-center space-y-3 mt-4">
              <div className="w-11 h-11 rounded-pill bg-pure-white border border-faint-border text-ink-black flex items-center justify-center mx-auto">
                <LineIcon name="bag" size={20} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-ink-black m-0">
                  Your shopping bag is empty
                </p>
                <p className="text-xs text-canvas-secondary m-0">
                  Add any studio object to review quantities and shipping progress.
                </p>
              </div>
              <Link href="/shop" onClick={closeCartDrawer} className="btn-primary w-full">
                Explore Catalog
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

        <div className="p-5 border-t border-faint-border bg-canvas-mist space-y-3">
          <div className="space-y-1.5 text-sm">
            <div className="flex items-center justify-between text-canvas-secondary">
              <span>Subtotal</span>
              <span className="font-medium text-ink-black tabular-nums">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-canvas-secondary">
              <span>Shipping</span>
              <span className="font-medium text-ink-black tabular-nums">
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
              View Bag
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
