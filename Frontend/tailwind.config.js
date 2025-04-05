/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'orange-gradient': 'linear-gradient(to right, #ff9901, #ff7801)',
      },
      borderColor: {
        'orange-gradient': 'linear-gradient(to right, #ff9901, #ff7801)',
      }
    },
  },
  plugins: [],
}