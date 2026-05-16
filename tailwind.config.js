/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1f35',
        secondary: '#252b47',
        accent: {
          gradient: '#4a9eff',
          orange: '#ff6b4a',
          purple: '#8b5cf6',
          blue: '#4a9eff',
        }
      },
      fontFamily: {
        sans: ['Noto Sans SC', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}