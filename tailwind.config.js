/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ── FONTS ──────────────────────────────────────────────────────────────
      // Loaded via Google Fonts in index.html
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Pinyon Script"', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },

      // ── COLORS ─────────────────────────────────────────────────────────────
      // CUSTOMIZE: Adjust this palette to change the entire feel of the site
      colors: {
        cream: {
          DEFAULT: '#FAF7F2',   // main background
          dark:    '#F0E8DC',   // slightly warmer — used for alternating sections
          subtle:  '#E5D9CC',   // borders, dividers
        },
        charcoal: {
          DEFAULT: '#1C1917',   // primary text, dark section bg
          muted:   '#44403C',   // secondary text
          light:   '#78716C',   // captions, labels
        },
        gold: {
          DEFAULT: '#B8957A',   // primary accent
          light:   '#D4B896',   // lighter accent, decorative lines
          pale:    '#F0E4D6',   // very light gold for backgrounds
        },
        rose: {
          muted: '#C4A8A8',
          light: '#F5ECEC',
          deep:  '#9A7070',
        },
      },

      // ── ANIMATIONS ─────────────────────────────────────────────────────────
      animation: {
        'float':      'float 7s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'draw':       'draw 2s ease-in-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
