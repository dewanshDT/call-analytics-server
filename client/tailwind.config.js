/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "bar-loader": {
          "0%": { transform: "scaleX(0)", opacity: "1" },
          "90%": { opacity: "0" },
          "100%": { transform: "scaleX(1)", opacity: "0" },
        },
      },
      animation: {
        "bar-loader": "bar-loader 1s ease infinite",
      },
    },
  },
  plugins: [],
}
