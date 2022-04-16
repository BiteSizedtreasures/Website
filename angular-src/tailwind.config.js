const colors = require('tailwindcss/colors')
module.exports = {
  purge: {
    content: [ "./src/**/*.{html,ts, scss}",]
  },
  darkMode: 'class', // false, 'class', 'media'
  theme: {
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'lite-pink': '#F7DAD9',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'bluesign': '#007AFF',
      "colors": colors,
      blue: colors.blue,
      yellow: colors.amber,
      gray: colors.slate,
      white: colors.white,
      pink: colors.pink,
      black: '#14171A',
      tb: '#000000',
      lightblack: '#181a1b',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Salsa', 'serif'],
    },
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'tiny': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ]
  }
