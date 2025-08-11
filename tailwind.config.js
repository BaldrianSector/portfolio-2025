export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'solid-black': 'var(--color-solid-black)',
        'black': 'var(--color-black)',
        'white': 'var(--color-white)',
        'light': 'var(--color-light)',
        'dark': 'var(--color-dark)',
        'gray': 'var(--color-gray)',
        'link': 'var(--color-link)',
        'contact-link': 'var(--color-contact-link)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        reem: ['Reem Kufi', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
    },
    screens: {
      xs: '438px',
      sm: '640px',
      'short-sm': { raw: '(max-height: 700px)' },
      'short-md': { raw: '(max-height: 840px)' },
    },
  },
  plugins: [],
};
