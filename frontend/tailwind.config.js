/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{jsx,html}", "./index.html"],
  theme: {
    extend: {
      screens: {
        'xs':'400px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

