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
    colors: {
      'solid-black': '#000000',
      'black': '#0F0F0F',
      'white': '#FFFFFF',
      'light': '#D9D9D9',
      'dark': '#0E1010',
      'gray': '#656565',
      'link': '#FF6347',
    },
    screens: {
      xs: '438px',
      sm: '640px',
      // keep the rest
    },
  },
  plugins: [],
}