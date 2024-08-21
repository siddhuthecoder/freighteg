/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Add all colors for background
        bg: Object.assign({}, require("tailwindcss/colors"), {
          transparent: "transparent",
          current: "currentColor",
        }),
        // Add all colors for text
        text: Object.assign({}, require("tailwindcss/colors"), {
          transparent: "transparent",
          current: "currentColor",
        }),
      },
    },
  },
  plugins: [],
};
