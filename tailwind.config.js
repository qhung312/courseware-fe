/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        sml: { min: '320px', max: '640px' },
        '3xl': '1872px',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
