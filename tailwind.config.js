/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require("postcss-import"),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
