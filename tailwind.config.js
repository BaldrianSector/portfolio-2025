/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        reem: ['Reem Kufi', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
    },
    screens: {
      xs: '438px',
      sm: '640px',
      // keep the rest
    },
  },
  plugins: [],
}