/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'magenta': '#FF00FF',
        'magenta-footer': '#E91E8C',
      },
      fontFamily: {
        'redaction': ['Redaction 35', 'serif'],
        'redaction-50': ['Redaction 50', 'serif'],
        'jermilov': ['KTF Jermilov', 'sans-serif'],
        'terminal': ['Terminal Grotesque', 'monospace'],
        'plex': ['IBM Plex Serif', 'serif'],
      },
    },
  },
  plugins: [],
}
