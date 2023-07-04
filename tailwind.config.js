/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        title: ["2.2rem", "3rem"],
      },
      colors: {
        menu: "#1B40C2",
        "menu-title": "#829DFD",
      },
    },
  },
  plugins: [],
};
