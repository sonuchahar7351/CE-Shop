export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'custom': 'minmax(25%, 25vw) minmax(75%, 75vw)',
        'home':'minmax(20%,20vw) minmax(80%,80vw)',
        'product':'minmax(40%,40vw) minmax(60%,60vw)',
        'cart':'minmax(55%,55vw) minmax(45%,45vw)'
      },
    },
  },
  plugins: [],
}
