/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#D9B75A', // updated to prototype gold
        gold2: '#C9A227',
        goldDeep: '#8C6A1D',
        darkGold: '#A88A2B',
        champagne: '#F3DF9C',
        deepBlack: '#030303',
        obsidian: '#060907',
        obsidian2: '#0A0F0C',
        abyss: '#062119',
        abyss2: '#04180F',
        emerald: '#12B76A',
        emeraldBright: '#3CDA96',
        emeraldDeep: '#0E5A3C',
        ivory: '#F4EFE6',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
