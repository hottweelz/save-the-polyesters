/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx,mdx}',
    './lib/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fbf7f1',
          100: '#f6efe3',
          200: '#ecdfc7',
        },
        moss: {
          400: '#7a9a6b',
          600: '#4a6b3f',
          700: '#384f30',
          900: '#1f2c1a',
        },
        rose: {
          200: '#f5d5d0',
          400: '#d98a82',
          600: '#a8534b',
        },
        sky: {
          100: '#e2ecf0',
          300: '#a8c0cb',
          500: '#5d7e8b',
        },
        alert: '#b3261e',
      },
      fontFamily: {
        serif: ['"EB Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -10px rgba(56, 79, 48, 0.18)',
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.06'/></svg>\")",
      },
      keyframes: {
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(168, 83, 75, 0.5)' },
          '50%': { boxShadow: '0 0 0 16px rgba(168, 83, 75, 0)' },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 2.4s ease-out infinite',
      },
    },
  },
  plugins: [],
};
