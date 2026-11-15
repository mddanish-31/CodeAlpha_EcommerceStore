import React from 'react';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { AuthForm } from '@/components/forms/AuthForm';

export default function LoginPage() {
  return (
    <div className="store-container py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Customer Sign In' },
        ]}
      />
      <AuthForm mode="login" />
    </div>
  );
}
