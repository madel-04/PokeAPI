/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pokemon': ['"Pokemon Solid"', 'sans-serif'],
        'pixel': ['"Press Start 2P"', 'cursive'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        'pokemon-red': '#FF0000',
        'pokemon-yellow': '#FFCB05',
        'pokemon-blue': '#3B4CCA',
      },
    },
  },
  plugins: [],
}