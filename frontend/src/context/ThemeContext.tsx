'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark';

/**
 * Persistent theme preference stored separately from all existing e-commerce
 * localStorage keys (cart, orders, user) so demo shopping state is never touched.
 */
const STORAGE_KEY = 'codealpha_ecommerce_theme_v1';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === 'undefined') {
      return 'light';
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch {
      // Ignore storage errors in restricted environments
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Apply theme to the document element and persist. An inline init script in
  // RootLayout sets the class before first paint so there is no wrong-theme flash.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  // Follow system preference only when the user has not made an explicit choice.
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) {
        return;
      }
    } catch {
      return;
    }
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setTheme(media.matches ? 'dark' : 'light');
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  const toggleTheme = useCallback(
    () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
    []
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
