/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "Inconsolata"],
      display: ["Inconsolata"],
      body: ['"Inconsolata"'],
      colors: {
        brand: "#1e40af",
      },
    },
    extend: {},
  },
  plugins: [],
};
