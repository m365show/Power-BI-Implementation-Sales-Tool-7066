/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        powerbi: {
          yellow: '#F2C811',
          blue: '#0078D4',
          dark: '#002050',
          light: '#E6F3FF'
        }
      },
      fontFamily: {
        'segoe': ['Segoe UI', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}