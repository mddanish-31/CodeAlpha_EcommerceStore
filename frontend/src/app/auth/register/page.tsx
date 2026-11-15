import React from 'react';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { AuthForm } from '@/components/forms/AuthForm';

export default function RegisterPage() {
  return (
    <div className="store-container py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Create Customer Account' },
        ]}
      />
      <AuthForm mode="register" />
    </div>
  );
}
