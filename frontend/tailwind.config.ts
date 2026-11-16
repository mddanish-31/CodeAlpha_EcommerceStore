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
        'brand-violet': '#7C3AED',
        'brand-dark': '#5B21B6',
        'violet-soft': '#F5F3FF',
        'violet-border': '#DDD6FE',
        'page-bg': '#F9FAFB',
        surface: '#FFFFFF',
        'surface-subtle': '#F3F4F6',
        ink: '#111827',
        'ink-secondary': '#374151',
        muted: '#6B7280',
        'border-default': '#E5E7EB',
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
          'sans-serif',
        ],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      borderRadius: {
        card: '16px',
        image: '12px',
        control: '10px',
        pill: '9999px',
      },
      boxShadow: {
        'card-subtle': '0 1px 3px 0 rgba(17, 24, 39, 0.06), 0 1px 2px -1px rgba(17, 24, 39, 0.04)',
        'card-hover': '0 10px 24px -4px rgba(17, 24, 39, 0.08), 0 4px 10px -4px rgba(17, 24, 39, 0.05)',
        drawer: '0 20px 38px -8px rgba(17, 24, 39, 0.16)',
      },
      maxWidth: {
        store: '1280px',
      },
    },
  },
  plugins: [],
};

export default config;
