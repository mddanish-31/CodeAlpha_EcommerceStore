'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { LineIcon } from '@/components/ui/LineIcon';
import { FreeShippingBar } from './FreeShippingBar';
import { CartItemRow } from './CartItemRow';
import { StateFeedbackCard } from '@/components/ui/StateFeedbackCard';

export function CartDrawer() {
  const {
    cart,
    cartCount,
    subtotal,
    shippingCost,
    totalAmount,
    isCartDrawerOpen,
    closeCartDrawer,
  } = useStore();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (isCartDrawerOpen && !dlg.open) {
      dlg.showModal();
    } else if (!isCartDrawerOpen && dlg.open) {
      dlg.close();
    }
  }, [isCartDrawerOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const rect = dlg.getBoundingClientRect();
    const clickedInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;
    if (!clickedInDialog) {
      closeCartDrawer();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id="cart-drawer-dialog"
      className="drawer-dialog"
      onClose={closeCartDrawer}
      onClick={handleBackdropClick}
      aria-labelledby="cart-drawer-title"
      {...({ closedby: 'any' } as Record<string, string>)}
    >
      <div className="flex flex-col h-full justify-between gap-4">
        <div className="flex-1 overflow-y-auto pr-1">
          <div className="flex items-center justify-between pb-4 border-b border-dotted border-tiger-gold">
            <h2 id="cart-drawer-title" className="heading-card text-tiger-gold">
              YOUR CART ({cartCount})
            </h2>
            <button
              type="button"
              onClick={closeCartDrawer}
              className="btn-icon"
              aria-label="Close shopping cart drawer"
            >
              <LineIcon name="close" size={18} />
            </button>
          </div>

          {cart.length > 0 && <FreeShippingBar />}

          {cart.length === 0 ? (
            <div className="my-8">
              <StateFeedbackCard
                status="empty"
                badgeText="CART EMPTY"
                title="YOUR SHOPPING CART IS EMPTY"
                message="Explore our four curated departments to add desk lighting, field watches, home objects, or utility goods."
                actionLabel="Explore Catalog"
                actionHref="/shop"
              />
            </div>
          ) : (
            <div className="space-y-3 mt-3">
              {cart.map((item) => (
                <CartItemRow key={item.product.id} item={item} compact />
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="pt-4 border-t border-dotted border-tiger-gold">
            <div className="flex justify-between text-xs text-warm-sand mb-1">
              <span>Subtotal</span>
              <span className="tabular-nums">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-warm-sand mb-3">
              <span>Estimated Shipping</span>
              <span className="text-tiger-gold font-semibold tabular-nums">
                {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="flex items-baseline justify-between mb-4">
              <span className="heading-card text-parchment-cream">TOTAL</span>
              <span className="font-display text-3xl font-bold text-tiger-gold tabular-nums">
                ${totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <Link
                href="/cart"
                onClick={closeCartDrawer}
                className="btn btn-ghost w-full"
              >
                View Full Cart
              </Link>
              <Link
                href="/checkout"
                onClick={closeCartDrawer}
                className="btn btn-primary w-full"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
