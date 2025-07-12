// tailwind.config.js
module.exports = {
  // ...
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // ...
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.page-break': {
          pageBreakBefore: 'always',
          breakBefore: 'page',
        },
      });
    },
  ],
};
