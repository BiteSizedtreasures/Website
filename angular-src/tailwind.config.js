module.exports = {
  content: [
      "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      'taupe': '#FFF5DA', 
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
