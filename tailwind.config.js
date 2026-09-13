/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#0b192c',
          blue: '#1e3e62',
          subtle: '#475569',
          light: '#f8fafc',
          surface: '#f1f5f9',
          border: '#e2e8f0',
          emerald: '#047857',
          green: '#059669',
          lightgreen: '#ecfdf5',
          amber: '#d97706',
          lightamber: '#fffbeb',
          red: '#dc2626',
          lightred: '#fef2f2',
          saffron: '#ea580c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Consolas', 'monospace']
      }
    },
  },
  plugins: [],
}

