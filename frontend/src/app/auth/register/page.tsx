import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { AuthForm } from '@/components/forms/AuthForm';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create a frontend demo customer session for saving addresses and viewing demo orders.',
};

export default function RegisterPage() {
  return (
    <div className="store-container pt-6 sm:pt-10 pb-10 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Create Account' },
        ]}
      />
      <AuthForm mode="register" />
    </div>
  );
}
