/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: "#0a88fd",
        customHoverBlue: "#00234c",
        customForeground: "#475564",
        customInputGray: "#364453",
        customBackground: "#15181c",
        customGold: "#cea359",
      },
    },
  },
  plugins: [],
};
