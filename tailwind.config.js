/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          950: '#062324',
          900: '#0B3B3C',
          800: '#105658',
          700: '#14A3A8',
          600: '#18BCC2',
          500: '#2CD5DC',
          100: '#E6FAFA',
          50: '#F0FCFC',
        },
        sand: {
          50: '#FAF7F2',
          100: '#F5EFE6',
          200: '#E8DCCB',
          300: '#D9C5AA',
          800: '#5C4E3A',
          900: '#382E21',
        },
        ink: {
          950: '#080A0A',
          900: '#0E1111',
          800: '#1A1E1E',
          700: '#2B3131',
          500: '#5A6363',
          300: '#9DA6A6',
          100: '#E2E6E6',
        },
        saffron: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        mist: '#F8FAFA',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}
