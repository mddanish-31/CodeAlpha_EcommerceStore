import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { CheckoutForm } from '@/components/forms/CheckoutForm';

export const metadata: Metadata = {
  title: 'Simulated Checkout',
  description: 'Review your bag and place a simulated demo order stored locally in browser state.',
};

export default function CheckoutPage() {
  return (
    <div className="store-container pt-6 sm:pt-8 pb-8 space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Bag', href: '/cart' },
          { label: 'Simulated Checkout' },
        ]}
      />

      <header className="space-y-1.5">
        <h1 className="display-hero m-0">Simulated Storefront Checkout</h1>
        <p className="text-sm text-canvas-secondary m-0 max-w-2xl">
          Verify shipping calculation and order confirmation UI. Real payment processing and backend persistence arrive in Phase 5.
        </p>
      </header>

      <CheckoutForm />
    </div>
  );
}
