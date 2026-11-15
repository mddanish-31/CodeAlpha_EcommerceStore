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
        'tiger-gold': '#FAAE33',
        'tiger-gold-hover': '#FFC052',
        'ember-rust': '#823513',
        'saffron-glow': '#9F531B',
        'dark-spice': '#402011',
        'charred-clove': '#281006',
        'cardamom-brown': '#6B2E12',
        'chili-red': '#D1255C',
        'parchment-cream': '#FDF6EC',
        'warm-sand': '#E5C7A3',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Bahnschrift SemiCondensed', 'Arial Narrow', 'Impact', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        card: '6px',
        pill: '9999px',
      },
      maxWidth: {
        store: '1440px',
      },
    },
  },
  plugins: [],
};

export default config;
