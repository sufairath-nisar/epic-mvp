/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    fontFamily: {
      sans: ["Lexend", "ui-sans-serif", "system-ui", "sans-serif"],
      display: ["Sulphur Point", "Lexend", "ui-sans-serif", "system-ui", "sans-serif"],
      serif: ["Georgia", "Cambria", "Times New Roman", "serif"]
    },
    extend: {
      colors: {
        cream: "#FFFCF2",
        butter: "#fff7dd",
        forest: "#154527",
        deep: "#154527",
        ink: "#154527",
        gold: "#f1ce00",
        blush: "#ffcbc6"
      },
      boxShadow: {
        soft: "0 22px 70px rgba(13, 61, 35, 0.13)"
      }
    }
  },
  plugins: []
};
