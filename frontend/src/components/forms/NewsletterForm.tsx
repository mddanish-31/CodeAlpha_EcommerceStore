'use client';

import { useState } from 'react';
import { LineIcon } from '@/components/ui/LineIcon';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmittedEmail(trimmed);
    setEmail('');
  };

  return (
    <div className="space-y-3">
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Store updates newsletter"
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address for studio updates
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? 'newsletter-error' : undefined}
          className="input-field flex-1 min-w-0"
        />
        <button type="submit" className="btn-primary shrink-0">
          Subscribe
        </button>
      </form>

      {error ? (
        <p
          id="newsletter-error"
          role="alert"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-ink m-0"
        >
          <LineIcon name="alert" size={14} className="text-brand-violet shrink-0" />
          <span>{error}</span>
        </p>
      ) : null}

      {submittedEmail ? (
        <p
          role="status"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-control bg-violet-soft border border-violet-border text-xs font-medium text-brand-dark m-0"
        >
          <LineIcon name="check" size={14} className="text-brand-violet shrink-0" />
          <span>Demo subscription noted for {submittedEmail}.</span>
        </p>
      ) : null}
    </div>
  );
}
