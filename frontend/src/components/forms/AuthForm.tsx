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
  const [rememberMe, setRememberMe] = useState(true);
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
      <div className="space-y-2.5 text-center">
        <div className="inline-flex items-center justify-center gap-2 text-lg font-semibold tracking-tight text-ink">
          <span
            className="w-8 h-8 rounded-lg bg-brand-violet text-surface inline-flex items-center justify-center"
            aria-hidden="true"
          >
            <LineIcon name="layers" size={16} />
          </span>
          <span>CodeAlpha Store</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink m-0">
          {isRegister ? 'Create your demo account' : 'Sign in to your account'}
        </h1>
        <p className="text-sm text-muted m-0">
          {isRegister
            ? 'Frontend demo registration stored locally in browser storage.'
            : 'Access your sample order history and saved shipping details.'}
        </p>
      </div>

      {user ? (
        <div className="p-3.5 rounded-image bg-violet-soft border border-violet-border text-xs text-brand-dark flex items-center justify-between gap-2">
          <span className="truncate">Signed in as {user.email}.</span>
          <Link href="/account" className="font-semibold text-brand-dark underline underline-offset-4 shrink-0">
            Account
          </Link>
        </div>
      ) : null}

      {error ? (
        <div
          role="alert"
          className="p-3.5 rounded-image bg-page-bg border border-brand-violet text-xs sm:text-sm font-medium text-ink flex items-start gap-2.5"
        >
          <LineIcon name="alert" size={16} className="text-brand-violet shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {isRegister ? (
          <div className="space-y-1.5">
            <label htmlFor="auth-name" className="block text-xs font-medium text-ink-secondary">
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
              className="input-field"
            />
          </div>
        ) : null}

        <div className="space-y-1.5">
          <label htmlFor="auth-email" className="block text-xs font-medium text-ink-secondary">
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
            className="input-field"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="auth-password" className="block text-xs font-medium text-ink-secondary">
              Password
            </label>
            <button
              type="button"
              aria-pressed={showPassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((prev) => !prev)}
              className="inline-flex items-center gap-1 text-xs font-medium text-muted hover:text-ink py-1 px-2 rounded-lg"
            >
              <LineIcon name={showPassword ? 'eye-off' : 'eye'} size={14} />
              <span>{showPassword ? 'Hide' : 'Show'}</span>
            </button>
          </div>
          <p id="auth-password-hint" className="text-xs text-muted m-0">
            Minimum 8 characters (frontend demo validation).
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
            className="input-field"
          />
        </div>

        {isRegister ? (
          <div className="space-y-1.5">
            <label htmlFor="auth-confirm" className="block text-xs font-medium text-ink-secondary">
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
              className="input-field"
            />
          </div>
        ) : (
          <label className="inline-flex items-center gap-2 text-xs text-ink-secondary cursor-pointer py-1">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 accent-brand-violet rounded cursor-pointer"
            />
            <span>Keep demo session stored on this browser</span>
          </label>
        )}

        <div className="pt-1 space-y-2.5">
          <button type="submit" className="btn-primary w-full">
            {isRegister ? 'Create Account' : 'Sign In'}
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

      <div className="pt-4 border-t border-border-default text-center text-xs text-muted">
        {isRegister ? (
          <>
            Already have a demo session?{' '}
            <Link href="/auth/login" className="font-semibold text-brand-violet hover:text-brand-dark underline underline-offset-4">
              Sign in instead
            </Link>
          </>
        ) : (
          <>
            New to CodeAlpha Store?{' '}
            <Link href="/auth/register" className="font-semibold text-brand-violet hover:text-brand-dark underline underline-offset-4">
              Create demo account
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
