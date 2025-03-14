/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#121212", // Midnight Blue
          light: "#1A1A1A", // Slightly lighter variant if needed
        },
        secondary: {
          // DEFAULT: "#38B2AC", // Teal
          DEFAULT: "#fff", // White
          light: "#4FD1C5", // Slightly lighter variant
        },
      },
      keyframes: {
        shine: {
          "0%": { "background-position": "100%" },
          "100%": { "background-position": "-100%" },
        },
      },
      animation: {
        shine: "shine 5s linear infinite",
      },
    },
  },
  plugins: [],
};
