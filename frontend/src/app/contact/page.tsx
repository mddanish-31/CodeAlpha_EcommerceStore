'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { LineIcon } from '@/components/ui/LineIcon';

const FAQS = [
  {
    q: 'Are orders or payments processed for real right now?',
    a: 'No. In the current frontend milestone, cart items, sign-in state, and checkout orders are simulated cleanly inside local browser storage (localStorage). No real charge takes place.',
  },
  {
    q: 'How does the $75 free shipping threshold work?',
    a: 'Your Shopping Cart and Order Summary track subtotal in real time. Orders reaching $75 USD or higher receive $0 shipping; subtotals below $75 apply an $8 flat standard shipping rate.',
  },
  {
    q: 'Why does the Fluted Stoneware Carafe show Sold Out?',
    a: 'It demonstrates zero-stock validation across cards, product galleries, and buy controls, disabling Add to Cart actions while keeping specs readable.',
  },
  {
    q: 'Will a live backend API be added later?',
    a: 'Yes. Express.js REST API endpoints, JWT authentication, and MongoDB Atlas persistence are planned for subsequent internship phases after frontend review.',
  },
];

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Product Question');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sentConfirmation, setSentConfirmation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError('Please enter your name (at least 2 characters).');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (message.trim().length < 10) {
      setError('Please enter a message of at least 10 characters.');
      return;
    }
    setError('');
    setSentConfirmation(
      `Demo inquiry recorded for ${name.trim()} (${topic}). No external backend transmission occurred.`
    );
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="store-container pt-6 sm:pt-8 pb-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Contact & FAQ' },
        ]}
      />

      <header className="space-y-2 max-w-2xl">
        <h1 className="display-hero m-0">Contact &amp; Frequently Asked Questions</h1>
        <p className="text-sm sm:text-base text-muted m-0">
          Review shipping calculations, stock behavior, and test client-side inquiry validation below.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <section aria-labelledby="faq-section-heading" className="lg:col-span-6 space-y-4">
          <h2 id="faq-section-heading" className="heading-sub m-0">
            Storefront Questions
          </h2>

          <div className="surface-card overflow-hidden divide-y divide-border-default">
            {FAQS.map((item, idx) => (
              <details key={item.q} name="contact-faq" open={idx === 0} className="group">
                <summary className="list-none cursor-pointer flex items-center justify-between gap-4 px-6 py-4 text-sm font-semibold text-ink hover:bg-page-bg transition-colors">
                  <span>{item.q}</span>
                  <span className="text-brand-violet transition-transform duration-200 group-open:rotate-45 shrink-0">
                    <LineIcon name="plus" size={16} />
                  </span>
                </summary>
                <div className="px-6 pb-5 pt-1 text-sm text-muted leading-relaxed">
                  <p className="m-0">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="contact-form-heading"
          className="lg:col-span-6 surface-card p-6 sm:p-8 space-y-5"
        >
          <div className="space-y-1">
            <h2 id="contact-form-heading" className="heading-sub m-0">
              Send a Store Inquiry
            </h2>
            <p className="text-xs text-muted m-0">
              All fields validate client-side (demo confirmation only; no external API configured).
            </p>
          </div>

          {error ? (
            <div
              role="alert"
              className="p-3.5 rounded-image bg-page-bg border border-brand-violet text-xs sm:text-sm font-medium text-ink flex items-start gap-2"
            >
              <LineIcon name="alert" size={16} className="text-brand-violet shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          ) : null}

          {sentConfirmation ? (
            <div
              role="status"
              className="p-4 rounded-image bg-violet-soft border border-violet-border text-xs sm:text-sm font-medium text-brand-dark flex items-start gap-2.5"
            >
              <LineIcon name="check" size={16} className="text-brand-violet shrink-0 mt-0.5" />
              <span>{sentConfirmation}</span>
            </div>
          ) : null}

          <form
            onSubmit={handleSubmit}
            noValidate
            aria-labelledby="contact-form-heading"
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <label htmlFor="contact-name" className="block text-xs font-medium text-ink-secondary">
                Full Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="input-field"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-email" className="block text-xs font-medium text-ink-secondary">
                Email Address
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="input-field"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-topic" className="block text-xs font-medium text-ink-secondary">
                Inquiry Topic
              </label>
              <select
                id="contact-topic"
                name="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="input-field cursor-pointer"
              >
                <option value="Product Question">Product Question</option>
                <option value="Shipping & Returns">Shipping &amp; Returns</option>
                <option value="Store Feedback">Storefront Feedback</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-message" className="block text-xs font-medium text-ink-secondary">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your question or feedback (at least 10 characters)..."
                required
                className="textarea-field"
              />
            </div>

            <button type="submit" className="btn-primary w-full justify-between">
              <span>Send Demo Inquiry</span>
              <LineIcon name="arrow-right" size={16} />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
