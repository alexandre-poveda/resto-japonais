/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        qitchen: {
          bg: '#0a0b0a',
          surface: '#121312',
          card: '#161716',
          cardHover: '#1c1e1c',
          border: '#333330',
          borderLight: 'rgba(239, 231, 210, 0.12)',
          borderDashed: 'rgba(239, 231, 210, 0.18)',
          cream: '#efe7d2',
          creamMuted: 'rgba(239, 231, 210, 0.7)',
          creamFaint: 'rgba(239, 231, 210, 0.45)',
          gold: '#cfbe91',
          goldDark: '#b29f70',
        },
      },
      fontFamily: {
        serif: ['Forum', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        wider: '0.15em',
        subtle: '0.05em',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
}
