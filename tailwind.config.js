import forms from '@tailwindcss/forms'
import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/**/*.tsx',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Figtree', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [forms],
}
