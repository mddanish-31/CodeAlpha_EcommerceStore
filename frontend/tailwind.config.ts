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
        'canvas-mist': '#F2F4F5',
        'pure-white': '#FFFFFF',
        'ink-black': '#000000',
        'faint-border': '#EBEBEB',
        'muted-gray': '#787574',
        'canvas-secondary': '#595655',
        'cool-stone': '#CCCCCC',
        'warm-fog': '#ACB0AA',
        'shop-violet': '#5433EB',
        'violet-wash': '#C0B5F3',
        'slate-ink': '#332F2D',
        'ash-veil': '#665A54',
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
      },
      borderRadius: {
        card: '28px',
        image: '20px',
        tile: '12px',
        pill: '9999px',
      },
      boxShadow: {
        'sm-soft': '0 2px 8px 0 rgba(0, 0, 0, 0.06)',
        'card-soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'lg-soft': '0 4px 24px 0 rgba(0, 0, 0, 0.12)',
        'violet-glow': '0 4px 24px 0 rgba(69, 36, 219, 0.34)',
      },
      maxWidth: {
        store: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
