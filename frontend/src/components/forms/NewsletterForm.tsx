'use client';

import React, { useState } from 'react';
import { PillBadge } from '@/components/ui/PillBadge';
import { LineIcon } from '@/components/ui/LineIcon';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

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
    <div className="surface-card border-tiger-gold p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-widest text-tiger-gold block mb-1.5">
          05 // EDITION DISPATCH
        </span>
        <h2 className="heading-section text-2xl sm:text-4xl">
          JOIN THE OBJECT DISPATCH
        </h2>
        <p className="text-xs sm:text-sm text-warm-sand mt-1.5 max-w-lg">
          Receive notifications on restocks, limited brass batches, and new catalog releases. Zero spam.
        </p>
      </div>

      {submittedEmail ? (
        <div
          role="status"
          className="rounded-card bg-charred-clove border border-tiger-gold p-4 flex items-center gap-3"
        >
          <PillBadge tone="gold">SUBSCRIBED</PillBadge>
          <span className="text-xs text-parchment-cream">
            Dispatches will be sent to <strong>{submittedEmail}</strong> (Demo).
          </span>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full lg:max-w-md space-y-2"
        >
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address for newsletter
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                spellCheck={false}
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                aria-invalid={error ? 'true' : 'false'}
                placeholder="Enter your email address..."
                enterKeyHint="done"
                className="input-pill"
              />
            </div>
            <button type="submit" className="btn btn-primary shrink-0">
              <span>Subscribe</span>
              <LineIcon name="arrow-right" size={16} />
            </button>
          </div>
          {error && (
            <p role="alert" className="text-xs text-chili-red pl-3">
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
