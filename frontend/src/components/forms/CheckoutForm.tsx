'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { OrderSummary, ShippingAddress } from '@/types/store';
import { useStore } from '@/context/StoreContext';
import { LineIcon } from '@/components/ui/LineIcon';
import { StateFeedbackCard } from '@/components/ui/StateFeedbackCard';
import { CartSummaryCard } from '@/components/cart/CartSummaryCard';

export function CheckoutForm() {
  const { cart, user, placeDemoOrder } = useStore();

  const [fullName, setFullName] = useState(user?.fullName ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.defaultAddress.phone ?? '');
  const [streetAddress, setStreetAddress] = useState(user?.defaultAddress.streetAddress ?? '');
  const [city, setCity] = useState(user?.defaultAddress.city ?? '');
  const [stateRegion, setStateRegion] = useState(user?.defaultAddress.state ?? '');
  const [postalCode, setPostalCode] = useState(user?.defaultAddress.postalCode ?? '');
  const [country, setCountry] = useState(user?.defaultAddress.country ?? 'India');
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');

  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const [errors, setErrors] = useState<string[]>([]);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderSummary | null>(null);

  if (confirmedOrder) {
    return (
      <div className="surface-card p-6 sm:p-10 max-w-2xl mx-auto space-y-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-pill bg-violet-wash/40 border border-shop-violet text-shop-violet flex items-center justify-center">
            <LineIcon name="check" size={24} />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-gray m-0">
              Simulated Demo Order Confirmed
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.045em] text-ink-black m-0">
              Order {confirmedOrder.orderId} Placed
            </h2>
          </div>
          <p className="text-sm text-muted-gray max-w-md m-0">
            Saved locally to your browser session history. No payment was processed and no external order API was called.
          </p>
        </div>

        <div className="rounded-image bg-canvas-mist border border-faint-border p-4 sm:p-5 space-y-3 text-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-faint-border">
            <span className="font-medium text-ink-black">
              Ship to {confirmedOrder.shippingAddress.fullName}
            </span>
            <span className="text-xs text-canvas-secondary tabular-nums">
              {confirmedOrder.createdAt}
            </span>
          </div>
          <p className="text-xs text-canvas-secondary m-0">
            {confirmedOrder.shippingAddress.streetAddress}, {confirmedOrder.shippingAddress.city},{' '}
            {confirmedOrder.shippingAddress.state} {confirmedOrder.shippingAddress.postalCode},{' '}
            {confirmedOrder.shippingAddress.country}
          </p>
          <ul className="space-y-1.5 list-none p-0 m-0 pt-2 border-t border-faint-border">
            {confirmedOrder.items.map((item) => (
              <li
                key={item.product.id}
                className="flex items-center justify-between gap-2 text-xs text-ink-black"
              >
                <span className="truncate">
                  {item.product.title} × {item.quantity}
                </span>
                <span className="font-medium tabular-nums shrink-0">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between pt-2 border-t border-faint-border text-sm font-semibold text-ink-black">
            <span>Demo Total ({confirmedOrder.status})</span>
            <span className="tabular-nums">${confirmedOrder.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/account" className="btn-primary flex-1">
            View Order in Account
          </Link>
          <Link href="/shop" className="btn-secondary flex-1">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <StateFeedbackCard
        icon="bag"
        title="Your shopping bag is empty"
        description="Add one or more studio objects before proceeding to simulated checkout."
        actionLabel="Explore Catalog"
        actionHref="/shop"
      />
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: string[] = [];

    if (fullName.trim().length < 2) nextErrors.push('Full name is required.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.push('Valid contact email address is required.');
    }
    if (phone.trim().length < 7) nextErrors.push('Valid contact phone number is required.');
    if (streetAddress.trim().length < 4) nextErrors.push('Street address is required.');
    if (city.trim().length < 2) nextErrors.push('City is required.');
    if (stateRegion.trim().length < 2) nextErrors.push('State or region is required.');
    if (postalCode.trim().length < 3) nextErrors.push('Postal / ZIP code is required.');

    const digits = cardNumber.replace(/\D/g, '');
    if (cardHolder.trim().length < 2) nextErrors.push('Simulated cardholder name is required.');
    if (digits.length < 12) nextErrors.push('Simulated demo card number needs at least 12 digits.');
    if (!/^\d{2}\/\d{2}$/.test(expiry.trim())) nextErrors.push('Expiry must follow MM/YY format.');
    if (!/^\d{3,4}$/.test(cvc.trim())) nextErrors.push('Security code needs 3 or 4 digits.');

    if (nextErrors.length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors([]);
    const shippingAddress: ShippingAddress = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      streetAddress: streetAddress.trim(),
      city: city.trim(),
      state: stateRegion.trim(),
      postalCode: postalCode.trim(),
      country: country.trim() || 'India',
    };

    const order = placeDemoOrder(shippingAddress);
    setConfirmedOrder(order);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Simulated storefront checkout"
        className="lg:col-span-8 surface-card p-5 sm:p-8 space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-faint-border">
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.04em] text-ink-black m-0">
              Shipping &amp; Simulated Checkout
            </h2>
            <p className="text-xs text-muted-gray mt-1 mb-0">
              Preview checkout flow — orders save locally without external charges.
            </p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-pill bg-canvas-mist border border-faint-border text-[11px] font-medium text-ink-black max-w-full">
            Demo Checkout Only
          </span>
        </div>

        {errors.length > 0 ? (
          <div
            role="alert"
            className="p-4 rounded-image bg-canvas-mist border border-ink-black space-y-1.5 text-xs sm:text-sm text-ink-black"
          >
            <div className="flex items-center gap-2 font-medium">
              <LineIcon name="alert" size={16} />
              <span>Please review the highlighted checkout fields:</span>
            </div>
            <ul className="list-disc pl-5 m-0 space-y-0.5 text-slate-ink">
              {errors.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <fieldset className="border-0 p-0 m-0 space-y-4">
          <legend className="text-sm font-semibold text-ink-black tracking-[-0.02em]">
            1. Contact &amp; Shipping Address
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label htmlFor="chk-fullname" className="block text-xs font-medium text-slate-ink">
                Full Name
              </label>
              <input
                id="chk-fullname"
                name="fullName"
                type="text"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="MD Danish"
                required
                className="input-pill"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="chk-email" className="block text-xs font-medium text-slate-ink">
                Email Address
              </label>
              <input
                id="chk-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="danish.demo@codealpha.dev"
                required
                className="input-pill"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="chk-phone" className="block text-xs font-medium text-slate-ink">
                Phone Number
              </label>
              <input
                id="chk-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98000 12345"
                required
                className="input-pill tabular-nums"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="chk-country" className="block text-xs font-medium text-slate-ink">
                Country
              </label>
              <input
                id="chk-country"
                name="country"
                type="text"
                autoComplete="country-name"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="India"
                required
                className="input-pill"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label htmlFor="chk-street" className="block text-xs font-medium text-slate-ink">
                Street Address
              </label>
              <input
                id="chk-street"
                name="streetAddress"
                type="text"
                autoComplete="street-address"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="22 Atelier Lane, Indiranagar"
                required
                className="input-pill"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="chk-city" className="block text-xs font-medium text-slate-ink">
                City
              </label>
              <input
                id="chk-city"
                name="city"
                type="text"
                autoComplete="address-level2"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Bengaluru"
                required
                className="input-pill"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="chk-state" className="block text-xs font-medium text-slate-ink">
                State / Region
              </label>
              <input
                id="chk-state"
                name="state"
                type="text"
                autoComplete="address-level1"
                value={stateRegion}
                onChange={(e) => setStateRegion(e.target.value)}
                placeholder="Karnataka"
                required
                className="input-pill"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label htmlFor="chk-postal" className="block text-xs font-medium text-slate-ink">
                Postal Code
              </label>
              <input
                id="chk-postal"
                name="postalCode"
                type="text"
                autoComplete="postal-code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="560038"
                required
                className="input-pill"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="border-0 pt-4 border-t border-faint-border p-0 m-0 space-y-3">
          <legend className="text-sm font-semibold text-ink-black tracking-[-0.02em]">
            2. Delivery Speed (Demo Options)
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label
              className={`flex items-start gap-3 p-4 rounded-image border cursor-pointer transition-colors ${
                deliveryMethod === 'standard'
                  ? 'bg-canvas-mist border-ink-black'
                  : 'bg-pure-white border-faint-border hover:border-ink-black/40'
              }`}
            >
              <input
                type="radio"
                name="deliveryMethod"
                value="standard"
                checked={deliveryMethod === 'standard'}
                onChange={() => setDeliveryMethod('standard')}
                className="mt-1 w-4 h-4 accent-shop-violet"
              />
              <div>
                <div className="text-sm font-medium text-ink-black">Studio Standard</div>
                <div className="text-xs text-canvas-secondary">
                  3–5 business days · Free at $75+ ($8 flat under $75)
                </div>
              </div>
            </label>

            <label
              className={`flex items-start gap-3 p-4 rounded-image border cursor-pointer transition-colors ${
                deliveryMethod === 'express'
                  ? 'bg-canvas-mist border-ink-black'
                  : 'bg-pure-white border-faint-border hover:border-ink-black/40'
              }`}
            >
              <input
                type="radio"
                name="deliveryMethod"
                value="express"
                checked={deliveryMethod === 'express'}
                onChange={() => setDeliveryMethod('express')}
                className="mt-1 w-4 h-4 accent-shop-violet"
              />
              <div>
                <div className="text-sm font-medium text-ink-black">Priority Courier</div>
                <div className="text-xs text-canvas-secondary">
                  1–2 business days · Included in preview calculation
                </div>
              </div>
            </label>
          </div>
        </fieldset>

        <fieldset className="border-0 pt-4 border-t border-faint-border p-0 m-0 space-y-4">
          <legend className="text-sm font-semibold text-ink-black tracking-[-0.02em]">
            3. Simulated Payment Card (No Real Charge)
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label htmlFor="chk-card-name" className="block text-xs font-medium text-slate-ink">
                Cardholder Name
              </label>
              <input
                id="chk-card-name"
                name="cardHolder"
                type="text"
                autoComplete="cc-name"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                placeholder="MD Danish"
                required
                className="input-pill"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="chk-card-num" className="block text-xs font-medium text-slate-ink">
                Demo Card Number (Test digits only)
              </label>
              <input
                id="chk-card-num"
                name="cardNumber"
                type="text"
                inputMode="numeric"
                autoComplete="cc-number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="4242 4242 4242 4242"
                required
                className="input-pill tabular-nums"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="chk-card-exp" className="block text-xs font-medium text-slate-ink">
                Expiry (MM/YY)
              </label>
              <input
                id="chk-card-exp"
                name="expiry"
                type="text"
                autoComplete="cc-exp"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="08/29"
                required
                className="input-pill tabular-nums"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="chk-card-cvc" className="block text-xs font-medium text-slate-ink">
                Demo CVC
              </label>
              <input
                id="chk-card-cvc"
                name="cvc"
                type="text"
                inputMode="numeric"
                autoComplete="cc-csc"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                placeholder="424"
                required
                className="input-pill tabular-nums"
              />
            </div>
          </div>
        </fieldset>

        <div className="pt-2">
          <button type="submit" className="btn-primary w-full justify-between">
            <span>Place Simulated Demo Order</span>
            <LineIcon name="arrow-right" size={16} />
          </button>
        </div>
      </form>

      <div className="lg:col-span-4">
        <CartSummaryCard showCheckoutCta={false} />
      </div>
    </div>
  );
}
