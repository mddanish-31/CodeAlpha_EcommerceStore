import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-elevated': 'var(--color-surface-elevated)',
        'surface-subtle': 'var(--color-surface-subtle)',
        ink: 'var(--color-text)',
        'ink-secondary': 'var(--color-text-secondary)',
        'ink-muted': 'var(--color-text-muted)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        'input-bg': 'var(--color-input-bg)',
        'focus-ring': 'var(--color-focus-ring)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
        serif: [
          'ui-serif',
          'Georgia Pro',
          'Georgia',
          'Cambria',
          '"Times New Roman"',
          'Times',
          'serif',
        ],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      borderRadius: {
        card: '10px',
        image: '8px',
        control: '8px',
        pill: '9999px',
      },
      boxShadow: {
        drawer: '0 20px 40px -10px rgba(0, 0, 0, 0.25)',
      },
      maxWidth: {
        store: '1280px',
      },
    },
  },
  plugins: [],
};

export default config;
