/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0a0a0f',
          soft: '#11111a',
          card: '#161622',
          border: '#222232',
        },
        accent: {
          DEFAULT: '#7c3aed',
          glow: '#a855f7',
          cyan: '#22d3ee',
          pink: '#ec4899',
        },
        ink: {
          DEFAULT: '#e5e7eb',
          muted: '#9ca3af',
          dim: '#6b7280',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow': {
          '0%': { 'box-shadow': '0 0 20px rgba(124, 58, 237, 0.3)' },
          '100%': { 'box-shadow': '0 0 40px rgba(124, 58, 237, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
