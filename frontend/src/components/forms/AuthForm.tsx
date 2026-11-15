'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { PillBadge } from '@/components/ui/PillBadge';
import { LineIcon } from '@/components/ui/LineIcon';

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const isLogin = mode === 'login';
  const { signInDemo } = useStore();
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();

    if (!isLogin && !fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    setErrorMessage(null);
    signInDemo(trimmedEmail, isLogin ? undefined : fullName.trim());
    router.push('/account');
  };

  return (
    <div className="max-w-md mx-auto surface-card border-t-2 border-t-tiger-gold p-6 sm:p-8">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
        <PillBadge tone="gold">
          {isLogin ? 'CUSTOMER SIGN IN' : 'NEW CUSTOMER ACCOUNT'}
        </PillBadge>
        <PillBadge tone="spice">FRONTEND DEMO</PillBadge>
      </div>

      <h1 className="heading-section mb-2">
        {isLogin ? 'WELCOME BACK' : 'CREATE ACCOUNT'}
      </h1>
      <p className="text-xs text-warm-sand mb-6 leading-relaxed">
        {isLogin
          ? 'Sign in to view your demo customer profile, saved delivery details, and order history.'
          : 'Create a frontend demo customer profile. Real JWT backend authentication will be connected in Phase 5.'}
      </p>

      {errorMessage && (
        <div
          role="alert"
          className="rounded-card bg-charred-clove border border-chili-red p-3.5 mb-5 flex items-center gap-2.5 text-xs text-parchment-cream"
        >
          <span className="text-chili-red">
            <LineIcon name="alert" size={16} />
          </span>
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {!isLogin && (
          <div>
            <label
              htmlFor="register-full-name"
              className="block text-xs font-semibold uppercase tracking-wider text-warm-sand mb-1.5"
            >
              Full Name *
            </label>
            <input
              id="register-full-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              enterKeyHint="next"
              className="input-pill"
            />
          </div>
        )}

        <div>
          <label
            htmlFor="auth-email"
            className="block text-xs font-semibold uppercase tracking-wider text-warm-sand mb-1.5"
          >
            Email Address *
          </label>
          <input
            id="auth-email"
            name="email"
            type="email"
            autoComplete="username"
            spellCheck={false}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            enterKeyHint="next"
            className="input-pill"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor={isLogin ? 'current-password' : 'new-password'}
              className="text-xs font-semibold uppercase tracking-wider text-warm-sand"
            >
              Password *
            </label>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-pressed={showPassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-describedby="password-toggle-warning"
              className="inline-flex items-center gap-1.5 text-xs text-tiger-gold hover:underline cursor-pointer py-1"
            >
              <LineIcon name={showPassword ? 'eye-off' : 'eye'} size={15} />
              <span>{showPassword ? 'Hide' : 'Show'}</span>
            </button>
            <span id="password-toggle-warning" className="sr-only">
              Warning: this will display your password on the screen.
            </span>
          </div>

          <input
            id={isLogin ? 'current-password' : 'new-password'}
            name={isLogin ? 'password' : 'new-password'}
            type={showPassword ? 'text' : 'password'}
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            minLength={8}
            aria-describedby="password-constraints"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 8 characters"
            enterKeyHint="done"
            className="input-pill"
          />
          <div
            id="password-constraints"
            className="text-[11px] text-warm-sand mt-1 pl-3"
          >
            Eight or more characters (pasting enabled).
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-2">
          <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
          <LineIcon name="arrow-right" size={16} />
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-dotted border-tiger-gold text-center text-xs text-warm-sand">
        {isLogin ? (
          <>
            New customer?{' '}
            <Link href="/auth/register" className="btn-link">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link href="/auth/login" className="btn-link">
              Sign in here
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
