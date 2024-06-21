/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "move-arrow": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(5px)" },
        },
      },
      animation: {
        "move-arrow": "move-arrow 1s infinite alternate",
      },
    },
  },
  plugins: [],
};
