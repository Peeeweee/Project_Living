/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: 'var(--cream)',
        'green-dark': 'var(--green-dark)',
        charcoal: 'var(--charcoal)',
        amber: 'var(--amber)',
        muted: 'var(--muted)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Rethink Sans"', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.3em',
        editorial: '.5em',
      },
      animation: {
        'slow-zoom': 'slow-zoom 20s linear infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
