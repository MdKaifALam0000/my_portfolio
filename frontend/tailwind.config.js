/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#07080b",     // Deep night black/grey
        darkCard: "#10131a",   // Slate card bg
        lightGrey: "#8e9aa8",  // Cool slate-grey text
        neonCyan: "#e04646",   // Mapped to vibrant red
        neonPurple: "#e8a838", // Mapped to amber gold
        carBg: "#07080b",
        carPlum: "#10131a",
        carRed: "#e04646",
        carGold: "#e8a838",
        carRose: "#649cc4",
        textWarm: "#e2e8f0",
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
