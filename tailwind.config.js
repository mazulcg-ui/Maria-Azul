/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        spin: 'spin 1s linear infinite',
        'border-glow': 'border-glow 1.5s ease-in-out infinite alternate',
        'fade-in': 'fade-in 0.5s ease-out forwards',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'border-glow': {
          'from': { 'box-shadow': '0 0 5px -2px #3b82f6' },
          'to': { 'box-shadow': '0 0 10px 3px #3b82f6' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}