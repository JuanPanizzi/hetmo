/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-purple': '#14151B',
        'gray-purple': '#282936',
        // 'light-gray-purple': '#282936',
      },
    },
  },
  plugins: [],
}

