const colors = require('tailwindcss/colors')
module.exports = {
    purge: {
      enabled: true,
      content: ['./src/**/*.{html,ts}']
    },
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
    },
    content: ['./src/**/*.{html,ts,js,jsx,tsx}',
    ],
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
        blue: colors.blue,
        yellow: colors.amber,
        gray: colors.slate,
        white: colors.white,
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
    },
    plugins: [
      require('@tailwindcss/aspect-ratio'),
    ]
};

