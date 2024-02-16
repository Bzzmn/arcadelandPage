/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'hog': "url('../images/whac-a-mole/hog.png')",
        'punch': "url('../images/whac-a-mole/punch.png')",
        'hole': "url('../images/whac-a-mole/hole.png')",
        'stars': "url('../images/whac-a-mole/stars.png')",
      }, 
      cursor: {
        'hammer-up': "url('../images/whac-a-mole/hammer-up.png'), pointer",
        'hammer-down': "url('../images/whac-a-mole/hammer-down.png'), pointer",
      }
    },
  },
  plugins: [],
}

