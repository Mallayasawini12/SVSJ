/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#0A0A0B',
          dark: '#121214',
          gray: '#1E1E22',
          lightGray: '#2D2D35',
          gold: {
            light: '#F5E6C4',
            DEFAULT: '#D4AF37', // Metallic Gold
            dark: '#B8860B', // Dark Goldenrod
            deep: '#8C620C',
            shimmer: '#FFDF73'
          },
          cream: '#FAF6EE',
          sand: '#E6DFD3'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Montserrat"', 'Arial', 'sans-serif'],
        display: ['"Playfair Display"', 'serif']
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite linear',
        'float': 'float 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scroll-down': 'scroll-down 1.5s infinite',
        'ticker': 'ticker 30s linear infinite'
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' }
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(15px) rotate(-3deg)' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
          '50%': { opacity: 0.6, transform: 'scale(1.05)' }
        },
        'scroll-down': {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '50%': { opacity: 1 },
          '100%': { opacity: 0, transform: 'translateY(10px)' }
        },
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F5E6C4 0%, #D4AF37 50%, #8C620C 100%)',
        'gold-soft-gradient': 'linear-gradient(135deg, rgba(245, 230, 196, 0.15) 0%, rgba(212, 175, 55, 0.1) 50%, rgba(140, 98, 12, 0.15) 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0A0A0B 0%, #121214 100%)',
        'radial-glow': 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(10,10,11,0) 70%)',
        'radial-glow-strong': 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, rgba(10,10,11,0) 60%)'
      }
    },
  },
  plugins: [],
}
