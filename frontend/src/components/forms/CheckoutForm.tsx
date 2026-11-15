'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { OrderSummary, ShippingAddress } from '@/types/store';
import { PillBadge } from '@/components/ui/PillBadge';
import { LineIcon } from '@/components/ui/LineIcon';
import { StateFeedbackCard } from '@/components/ui/StateFeedbackCard';
import { DottedDivider } from '@/components/layout/DottedDivider';

export function CheckoutForm() {
  const { cart, subtotal, shippingCost, totalAmount, user, placeDemoOrder } =
    useStore();

  const [fullName, setFullName] = useState(
    user?.defaultAddress.fullName || ''
  );
  const [email, setEmail] = useState(user?.defaultAddress.email || '');
  const [phone, setPhone] = useState(user?.defaultAddress.phone || '');
  const [streetAddress, setStreetAddress] = useState(
    user?.defaultAddress.streetAddress || ''
  );
  const [city, setCity] = useState(user?.defaultAddress.city || '');
  const [stateProvince, setStateProvince] = useState(
    user?.defaultAddress.state || ''
  );
  const [postalCode, setPostalCode] = useState(
    user?.defaultAddress.postalCode || ''
  );
  const [country, setCountry] = useState(
    user?.defaultAddress.country || 'India'
  );
  const [notes, setNotes] = useState(user?.defaultAddress.notes || '');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedOrder, setConfirmedOrder] = useState<OrderSummary | null>(
    null
  );

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};
    if (!fullName.trim()) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!phone.trim() || phone.trim().length < 7) {
      nextErrors.phone = 'Please enter a valid contact phone number.';
    }
    if (!streetAddress.trim()) {
      nextErrors.streetAddress = 'Please enter your delivery street address.';
    }
    if (!city.trim()) {
      nextErrors.city = 'Please enter your city.';
    }
    if (!country.trim()) {
      nextErrors.country = 'Please enter your country.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const address: ShippingAddress = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      streetAddress: streetAddress.trim(),
      city: city.trim(),
      state: stateProvince.trim(),
      postalCode: postalCode.trim(),
      country: country.trim(),
      notes: notes.trim() || undefined,
    };

    const created = placeDemoOrder(address);
    setConfirmedOrder(created);
  };

  if (confirmedOrder) {
    return (
      <div
        role="status"
        className="rounded-card bg-charred-clove border border-tiger-gold p-6 sm:p-10 max-w-3xl mx-auto"
      >
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <PillBadge tone="gold">DEMO ORDER CONFIRMED</PillBadge>
          <PillBadge tone="spice">REF: {confirmedOrder.orderId}</PillBadge>
        </div>

        <h2 className="heading-section text-parchment-cream mb-3">
          THANK YOU, {confirmedOrder.shippingAddress.fullName}
        </h2>
        <p className="text-sm text-warm-sand leading-relaxed mb-6">
          This is a <strong className="text-tiger-gold">Phase 4B Frontend Demonstration Order</strong>. No real payment card was charged and no live payment gateway was invoked. Your demo order has been saved to your local Customer Account Order History.
        </p>

        <div className="surface-card p-5 mb-6 space-y-3 text-xs">
          <div className="flex justify-between">
            <span className="text-warm-sand">Order Reference:</span>
            <strong className="text-tiger-gold">{confirmedOrder.orderId}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-warm-sand">Delivery Recipient:</span>
            <span>{confirmedOrder.shippingAddress.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-warm-sand">Delivery Address:</span>
            <span className="text-right">
              {confirmedOrder.shippingAddress.streetAddress},{' '}
              {confirmedOrder.shippingAddress.city},{' '}
              {confirmedOrder.shippingAddress.country}
            </span>
          </div>
          <DottedDivider className="my-2" />
          <div className="flex justify-between text-sm font-bold text-tiger-gold tabular-nums">
            <span>Demo Order Total:</span>
            <span>${confirmedOrder.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/account" className="btn btn-primary flex-1">
            <span>View in Order History</span>
            <LineIcon name="arrow-right" size={16} />
          </Link>
          <Link href="/shop" className="btn btn-ghost flex-1">
            Continue Browsing Catalog
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <StateFeedbackCard
        status="empty"
        badgeText="NO ITEMS FOR CHECKOUT"
        title="YOUR CART IS EMPTY"
        message="Add one or more products from the catalog before proceeding to checkout."
        actionLabel="Return to Shop"
        actionHref="/shop"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="lg:col-span-7 space-y-6 min-w-0"
      >
        {/* Demo Mode Disclosure Banner */}
        <div className="rounded-card bg-charred-clove border border-tiger-gold p-4 flex items-start gap-3">
          <span className="text-tiger-gold mt-0.5">
            <LineIcon name="alert" size={18} />
          </span>
          <div className="text-xs text-warm-sand leading-relaxed">
            <strong className="text-tiger-gold uppercase tracking-wider block mb-0.5">
              Frontend Demonstration Checkout (No Payment Gateway)
            </strong>
            Per Phase 4B scope, this checkout validates customer contact and delivery address details and records a local demo order in your account history. No payment details are requested or processed.
          </div>
        </div>

        {Object.keys(errors).length > 0 && (
          <div
            role="alert"
            className="rounded-card bg-charred-clove border border-chili-red p-4 text-xs text-parchment-cream"
          >
            <strong className="text-chili-red uppercase tracking-wider block mb-1">
              Please review the highlighted fields below:
            </strong>
            <ul className="list-disc list-inside space-y-1 text-warm-sand">
              {Object.values(errors).map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Section 1: Customer Contact */}
        <section
          aria-labelledby="checkout-contact-heading"
          className="surface-card p-6 space-y-4"
        >
          <h2
            id="checkout-contact-heading"
            className="heading-card text-tiger-gold"
          >
            01 // CUSTOMER CONTACT INFORMATION
          </h2>

          <div>
            <label
              htmlFor="checkout-full-name"
              className="block text-xs font-semibold uppercase tracking-wider text-warm-sand mb-1.5"
            >
              Full Name *
            </label>
            <input
              id="checkout-full-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              aria-invalid={errors.fullName ? 'true' : 'false'}
              placeholder="e.g., MD Danish Raza"
              enterKeyHint="next"
              className="input-pill"
            />
            {errors.fullName && (
              <p className="text-xs text-chili-red mt-1 pl-3">
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="checkout-email"
                className="block text-xs font-semibold uppercase tracking-wider text-warm-sand mb-1.5"
              >
                Email Address *
              </label>
              <input
                id="checkout-email"
                name="email"
                type="email"
                autoComplete="email"
                spellCheck={false}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={errors.email ? 'true' : 'false'}
                placeholder="you@example.com"
                enterKeyHint="next"
                className="input-pill"
              />
              {errors.email && (
                <p className="text-xs text-chili-red mt-1 pl-3">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="checkout-phone"
                className="block text-xs font-semibold uppercase tracking-wider text-warm-sand mb-1.5"
              >
                Phone Number *
              </label>
              <input
                id="checkout-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-invalid={errors.phone ? 'true' : 'false'}
                placeholder="+91 98765 43210"
                enterKeyHint="next"
                className="input-pill"
              />
              {errors.phone && (
                <p className="text-xs text-chili-red mt-1 pl-3">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Section 2: Delivery Address */}
        <section
          aria-labelledby="checkout-address-heading"
          className="surface-card p-6 space-y-4"
        >
          <h2
            id="checkout-address-heading"
            className="heading-card text-tiger-gold"
          >
            02 // DELIVERY ADDRESS
          </h2>

          <div>
            <label
              htmlFor="checkout-street-address"
              className="block text-xs font-semibold uppercase tracking-wider text-warm-sand mb-1.5"
            >
              Street Address (House, Street, Apartment/Suite) *
            </label>
            <textarea
              id="checkout-street-address"
              name="street-address"
              autoComplete="street-address"
              rows={2}
              required
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              aria-invalid={errors.streetAddress ? 'true' : 'false'}
              placeholder="Street address, building, apartment or suite"
              className="textarea-surface"
            />
            {errors.streetAddress && (
              <p className="text-xs text-chili-red mt-1 pl-3">
                {errors.streetAddress}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="checkout-city"
                className="block text-xs font-semibold uppercase tracking-wider text-warm-sand mb-1.5"
              >
                City / Town *
              </label>
              <input
                id="checkout-city"
                name="city"
                type="text"
                autoComplete="address-level2"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                aria-invalid={errors.city ? 'true' : 'false'}
                placeholder="City"
                enterKeyHint="next"
                className="input-pill"
              />
              {errors.city && (
                <p className="text-xs text-chili-red mt-1 pl-3">
                  {errors.city}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="checkout-state"
                className="block text-xs font-semibold uppercase tracking-wider text-warm-sand mb-1.5"
              >
                State / Province / Region
              </label>
              <input
                id="checkout-state"
                name="state"
                type="text"
                autoComplete="address-level1"
                value={stateProvince}
                onChange={(e) => setStateProvince(e.target.value)}
                placeholder="State or Province"
                enterKeyHint="next"
                className="input-pill"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="checkout-postal-code"
                className="block text-xs font-semibold uppercase tracking-wider text-warm-sand mb-1.5"
              >
                Postal / ZIP Code (Optional)
              </label>
              <input
                id="checkout-postal-code"
                name="postal-code"
                type="text"
                autoComplete="postal-code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Postal code"
                enterKeyHint="next"
                className="input-pill"
              />
            </div>

            <div>
              <label
                htmlFor="checkout-country"
                className="block text-xs font-semibold uppercase tracking-wider text-warm-sand mb-1.5"
              >
                Country *
              </label>
              <input
                id="checkout-country"
                name="country"
                type="text"
                autoComplete="country-name"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                aria-invalid={errors.country ? 'true' : 'false'}
                placeholder="Country"
                enterKeyHint="done"
                className="input-pill"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="checkout-notes"
              className="block text-xs font-semibold uppercase tracking-wider text-warm-sand mb-1.5"
            >
              Delivery Instructions (Optional)
            </label>
            <textarea
              id="checkout-notes"
              name="notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Gate code, preferred drop-off spot, etc."
              className="textarea-surface"
            />
          </div>
        </section>

        <button type="submit" className="btn btn-primary w-full py-3.5 text-sm">
          <span>Place Demo Order — ${totalAmount.toFixed(2)}</span>
          <LineIcon name="arrow-right" size={18} />
        </button>
      </form>

      {/* Right Column: Order Summary */}
      <aside className="lg:col-span-5 rounded-card bg-charred-clove border border-tiger-gold p-6 sticky top-24">
        <div className="flex items-center justify-between mb-4">
          <h2 className="heading-card text-tiger-gold">
            03 // ORDER SUMMARY ({cart.length})
          </h2>
          <Link href="/cart" className="btn-link text-xs">
            Edit Cart
          </Link>
        </div>

        <div className="space-y-3 mb-4 max-h-80 overflow-y-auto pr-1">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="surface-card p-3 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="text-xs font-semibold text-parchment-cream truncate">
                  {item.product.title}
                </div>
                <div className="text-[11px] text-warm-sand tabular-nums">
                  Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                </div>
              </div>
              <div className="text-sm font-bold text-tiger-gold tabular-nums">
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <DottedDivider className="my-4" />

        <div className="space-y-2 text-xs text-warm-sand">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="text-parchment-cream font-semibold tabular-nums">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Standard Shipping</span>
            <span className="text-tiger-gold font-semibold tabular-nums">
              {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
            </span>
          </div>
        </div>

        <DottedDivider className="my-4" />

        <div className="flex items-baseline justify-between">
          <span className="heading-card text-parchment-cream">TOTAL DUE</span>
          <span className="font-display text-3xl font-bold text-tiger-gold tabular-nums">
            ${totalAmount.toFixed(2)}
          </span>
        </div>
      </aside>
    </div>
  );
}

