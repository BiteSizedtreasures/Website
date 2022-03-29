module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}'],
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/aspect-ratio'),
    ],
  }
};
