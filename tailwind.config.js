/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/assets/img/user-header.png')",
        "dark-hero-pattern": "url('/assets/img/header.png')",
      },
    },
  },
  plugins: [],
};
