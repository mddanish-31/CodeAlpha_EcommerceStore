'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { PillBadge } from '@/components/ui/PillBadge';
import { LineIcon } from '@/components/ui/LineIcon';

export default function ContactPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [orderRef, setOrderRef] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setError('Please enter a message of at least 10 characters.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <div className="store-container py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Contact & Support FAQ' },
        ]}
      />

      <div className="mb-8">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-tiger-gold block mb-1.5">
          CUSTOMER CARE &amp; INQUIRIES
        </span>
        <h1 className="heading-section">CONTACT &amp; SUPPORT</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Inquiry Form */}
        <section
          aria-labelledby="contact-form-heading"
          className="lg:col-span-7 surface-card p-6 sm:p-8 min-w-0"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
            <h2
              id="contact-form-heading"
              className="heading-card text-tiger-gold"
            >
              SEND A DISPATCH INQUIRY
            </h2>
            <PillBadge tone="spice">DEMO SUPPORT FORM</PillBadge>
          </div>

          {submitted ? (
            <div
              role="status"
              className="rounded-card bg-charred-clove border border-tiger-gold p-6 space-y-3"
            >
              <PillBadge tone="gold">INQUIRY RECEIVED (DEMO)</PillBadge>
              <h3 className="heading-card text-parchment-cream">
                THANK YOU, {fullName}
              </h3>
              <p className="text-xs text-warm-sand leading-relaxed">
                Your demo inquiry has been validated. In the full-stack application, support messages are routed to our customer care queue.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFullName('');
                  setEmail('');
                  setOrderRef('');
                  setMessage('');
                }}
                className="btn btn-ghost text-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {error && (
                <div
                  role="alert"
                  className="rounded-card bg-charred-clove border border-chili-red p-3.5 text-xs text-parchment-cream flex items-center gap-2"
                >
                  <span className="text-chili-red">
                    <LineIcon name="alert" size={16} />
                  </span>
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-warm-sand mb-1.5"
                  >
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    className="input-pill"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold uppercase tracking-wider text-warm-sand mb-1.5"
                  >
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    spellCheck={false}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="input-pill"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-order-id"
                  className="block text-xs font-semibold uppercase tracking-wider text-warm-sand mb-1.5"
                >
                  Order Reference ID (Optional)
                </label>
                <input
                  id="contact-order-id"
                  name="orderRef"
                  type="text"
                  value={orderRef}
                  onChange={(e) => setOrderRef(e.target.value)}
                  placeholder="e.g., ORD-2026-0104"
                  className="input-pill"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold uppercase tracking-wider text-warm-sand mb-1.5"
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help with your order or product specification inquiry?"
                  className="textarea-surface"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                <span>Send Inquiry</span>
                <LineIcon name="arrow-right" size={16} />
              </button>
            </form>
          )}
        </section>

        {/* Right: Exclusive FAQ Accordions */}
        <section
          aria-labelledby="faq-heading"
          className="lg:col-span-5 surface-card p-6 sm:p-8"
        >
          <h2 id="faq-heading" className="heading-card text-tiger-gold mb-4">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <div className="border-t border-dotted border-tiger-gold">
            <details
              {...({ name: 'contact-faq' } as Record<string, string>)}
              open
              className="border-b border-dotted border-tiger-gold py-3.5"
            >
              <summary className="list-none flex items-center justify-between cursor-pointer text-xs font-semibold uppercase tracking-wider text-tiger-gold py-1">
                <span>01 // How does Free Shipping work?</span>
                <span aria-hidden="true">+</span>
              </summary>
              <p className="pt-2.5 text-xs text-parchment-cream leading-relaxed">
                All orders totaling $75.00 or more automatically qualify for free tracked standard shipping. Orders under $75.00 carry a flat $8.00 shipping fee.
              </p>
            </details>

            <details
              {...({ name: 'contact-faq' } as Record<string, string>)}
              className="border-b border-dotted border-tiger-gold py-3.5"
            >
              <summary className="list-none flex items-center justify-between cursor-pointer text-xs font-semibold uppercase tracking-wider text-tiger-gold py-1">
                <span>02 // Is checkout connected to a live bank?</span>
                <span aria-hidden="true">+</span>
              </summary>
              <p className="pt-2.5 text-xs text-parchment-cream leading-relaxed">
                No. In Phase 4B, checkout is a frontend demonstration flow. No credit card details are requested or processed, and demo orders are saved locally in your browser session.
              </p>
            </details>

            <details
              {...({ name: 'contact-faq' } as Record<string, string>)}
              className="border-b border-dotted border-tiger-gold py-3.5"
            >
              <summary className="list-none flex items-center justify-between cursor-pointer text-xs font-semibold uppercase tracking-wider text-tiger-gold py-1">
                <span>03 // What is your return policy?</span>
                <span aria-hidden="true">+</span>
              </summary>
              <p className="pt-2.5 text-xs text-parchment-cream leading-relaxed">
                Unused items in original packaging are eligible for return or exchange within 30 days of delivery.
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}

