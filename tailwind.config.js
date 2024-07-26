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
          DEFAULT: "#38B2AC", // Teal
          light: "#4FD1C5", // Slightly lighter variant
        },
      },
    },
  },
  plugins: [],
};
