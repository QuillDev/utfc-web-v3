module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: {
          darkest: "#131517",
          dark: "#23272a",
          lessDark: "#2c2f33"
        }
      },
      backgroundImage: theme => ({
        "scenery": "url('./assets/mainpage-bg.jpg')"
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
