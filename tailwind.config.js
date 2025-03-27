/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sidebarLight: "#10A3E9",
        sidebarDark: "#1D2939",
        bgDark: "#323C48",
      },
    },
  },
  plugins: [],
};
