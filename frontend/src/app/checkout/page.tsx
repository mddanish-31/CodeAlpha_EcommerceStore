import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { CheckoutForm } from '@/components/forms/CheckoutForm';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Review shipping details, order summary, and place a simulated demo order stored locally.',
};

export default function CheckoutPage() {
  return (
    <div className="store-container pt-6 sm:pt-8 pb-8 space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Cart', href: '/cart' },
          { label: 'Checkout' },
        ]}
      />

      <header className="space-y-1.5">
        <h1 className="display-hero m-0">Simulated Checkout</h1>
        <p className="text-sm sm:text-base text-muted m-0 max-w-2xl">
          Verify shipping calculation and order confirmation flow. No real payment or backend order API runs in this frontend milestone.
        </p>
      </header>

      <CheckoutForm />
    </div>
  );
}
