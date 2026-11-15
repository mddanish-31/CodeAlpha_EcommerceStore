import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { AuthForm } from '@/components/forms/AuthForm';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to access your demo profile and local order history.',
};

export default function LoginPage() {
  return (
    <div className="store-container pt-6 sm:pt-10 pb-10 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Sign In' },
        ]}
      />
      <AuthForm mode="login" />
    </div>
  );
}
