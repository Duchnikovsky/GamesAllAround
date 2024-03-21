/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "main": "url('/src/assets/background.jpg')",
        "blur": 'radial-gradient(circle, rgba(39,39,42,0.4) 0%, rgba(39,39,42,0.85) 60%, rgba(39,39,42,1) 100%)',
      },
    },
  },
  plugins: [],
}