/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    
    colors: {
      prime: '#282828',
      card_bg: '#f2f2f2',
      main_bg: '#FAFFFD',
      white: '#ffffff',
      text_grey: '#75787d',
      text_primary: '#2B303A',
      black: '#2b303a',
      red: "#FE3A3A",
      highlight_bg: '#990033',
      splash_bg: '#FF9000',
      accent_bg: '#0081AF',
      border_grey: '#edf0f3',
      border_grey_two: '#f1f1f1',
      border_grey_three: '#ebe7fc',
      border_grey_four: '#93959b',
      border_grey_five: '#cacfd5',
      transparent: 'transparent'
    },
    gridTemplateColumns: {
      'tapbarmenu': '1fr 1fr 1fr 1fr 1fr',
      'filter_btns': 'auto auto 1fr 1fr',
      'category_grid': 'repeat(2, minmax(0, 1fr))',
      'featured_grid': 'repeat(1, minmax(0, 1fr))',
      'upload_thumbnail_grid': 'repeat(5, minmax(0, 1fr))',
      'product_list_item': '130px, 1fr',
      'product_tab': 'repeat(3, minmax(0, 1fr))'
    },
    gridTemplateRows: {
      'tapbarmenu': '100%',
      'dashboard_services': 'repeat(4, minmax(0, 1fr))',
      'cars_grid': '1fr 1fr',
      'habits': '1fr 1fr 1fr 1fr'
    },
    extend: {
      fontFamily: {
        africa: ["Africa"],
        ariadne: ["Ariadne"],
        vivaldi: ["Vivaldi"],
        delap: ["Delap"],
      },
    },
  },
  plugins: [],
}

