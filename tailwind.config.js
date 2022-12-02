/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "octo-dark-purple": "#6D0195",
        "octo-yellow": "#FFD81B",
        "octo-light-yellow": "#FEF9DB",
        "octo-light-purple": "#D501BB",
      }
    },
  },
  plugins: [],
}
