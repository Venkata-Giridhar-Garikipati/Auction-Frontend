/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          main: '#7C3AED',
          dark: '#6D28D9',
        },
        secondary: {
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
          main: '#0891B2',
          dark: '#0E7490',
        },
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          500: '#22C55E',
          600: '#16A34A',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B',
          600: '#D97706',
        },
        danger: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          500: '#EF4444',
          600: '#DC2626',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))',
      },
    },
  },
  plugins: [],
  safelist: [
    'status-active',
    'status-upcoming',
    'status-ended',
    'bg-theme-gradient',
    'bg-theme-gradient-reverse',
    'text-theme-primary',
    'text-theme-secondary',
    'bg-theme-primary',
    'bg-theme-secondary',
    {
      pattern: /bg-(primary|secondary|success|warning|danger)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /text-(primary|secondary|success|warning|danger)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /from-(primary|secondary)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /to-(primary|secondary)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    'bg-clip-text',
    'text-transparent',
    'gradient-text',
    'background-animate',
  ],
};