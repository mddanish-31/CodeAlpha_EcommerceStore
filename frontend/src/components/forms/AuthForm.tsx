'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { LineIcon } from '@/components/ui/LineIcon';

interface AuthFormProps {
  mode: 'login' | 'register';
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { signInDemo, user } = useStore();
  const isRegister = mode === 'register';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const fillDemoCredentials = () => {
    setError('');
    setEmail('danish.demo@codealpha.dev');
    setPassword('StudioDemo2026');
    if (isRegister) {
      setName('MD Danish');
      setConfirmPassword('StudioDemo2026');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const cleanName = name.trim();

    if (isRegister && cleanName.length < 2) {
      setError('Please enter your full name (at least 2 characters).');
      return;
    }

    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError('Please provide a valid email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (isRegister && password !== confirmPassword) {
      setError('Passwords do not match. Please verify both fields.');
      return;
    }

    setError('');
    const derivedName = isRegister
      ? cleanName
      : cleanEmail
          .split('@')[0]
          .replace(/[._-]+/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());

    signInDemo(cleanEmail, derivedName || 'Studio Member');
    router.push('/account');
  };

  return (
    <div className="surface-card p-6 sm:p-8 max-w-md w-full mx-auto space-y-6">
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center justify-center text-2xl font-semibold tracking-[-0.055em] text-ink-black">
          <span>simple</span>
          <span className="wordmark-dot" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-semibold tracking-[-0.045em] text-ink-black m-0">
          {isRegister ? 'Create Demo Account' : 'Sign In to Studio Account'}
        </h1>
        <p className="text-sm text-muted-gray m-0">
          {isRegister
            ? 'Frontend demo registration persists locally in browser storage.'
            : 'Access sample orders and saved shipping preferences.'}
        </p>
      </div>

      {user ? (
        <div className="p-4 rounded-image bg-canvas-mist border border-faint-border text-xs text-slate-ink flex items-center justify-between gap-2">
          <span>Currently signed in as {user.email}.</span>
          <Link href="/account" className="font-medium text-ink-black underline underline-offset-4 shrink-0">
            View Account
          </Link>
        </div>
      ) : null}

      {error ? (
        <div
          role="alert"
          className="p-3.5 rounded-image bg-canvas-mist border border-ink-black text-xs sm:text-sm font-medium text-ink-black flex items-start gap-2.5"
        >
          <LineIcon name="alert" size={16} className="shrink-0 mt-0.5" />
          <span>Error: {error}</span>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {isRegister ? (
          <div className="space-y-1.5">
            <label htmlFor="auth-name" className="block text-xs font-medium text-slate-ink">
              Full Name
            </label>
            <input
              id="auth-name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="MD Danish"
              required
              className="input-pill"
            />
          </div>
        ) : null}

        <div className="space-y-1.5">
          <label htmlFor="auth-email" className="block text-xs font-medium text-slate-ink">
            Email Address
          </label>
          <input
            id="auth-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="danish.demo@codealpha.dev"
            required
            className="input-pill"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="auth-password" className="block text-xs font-medium text-slate-ink">
              Password
            </label>
            <button
              type="button"
              aria-pressed={showPassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((prev) => !prev)}
              className="inline-flex items-center gap-1 text-xs font-medium text-muted-gray hover:text-ink-black py-1 px-2 rounded-pill"
            >
              <LineIcon name={showPassword ? 'eye-off' : 'eye'} size={14} />
              <span>{showPassword ? 'Hide' : 'Show'}</span>
            </button>
          </div>
          <p id="auth-password-hint" className="text-xs text-muted-gray m-0">
            Minimum 8 characters (demo verification only).
          </p>
          <input
            id="auth-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            aria-describedby="auth-password-hint"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter at least 8 characters"
            minLength={8}
            required
            className="input-pill"
          />
        </div>

        {isRegister ? (
          <div className="space-y-1.5">
            <label htmlFor="auth-confirm" className="block text-xs font-medium text-slate-ink">
              Confirm Password
            </label>
            <input
              id="auth-confirm"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              required
              className="input-pill"
            />
          </div>
        ) : null}

        <div className="pt-1 space-y-2.5">
          <button type="submit" className="btn-primary w-full">
            {isRegister ? 'Create Demo Account' : 'Sign In'}
          </button>
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="btn-secondary w-full"
          >
            Fill Demo Credentials
          </button>
        </div>
      </form>

      <div className="pt-4 border-t border-faint-border text-center text-xs text-muted-gray">
        {isRegister ? (
          <>
            Already have a demo session?{' '}
            <Link href="/auth/login" className="font-medium text-ink-black underline underline-offset-4">
              Sign in instead
            </Link>
          </>
        ) : (
          <>
            New to simple. Store?{' '}
            <Link href="/auth/register" className="font-medium text-ink-black underline underline-offset-4">
              Create demo account
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
