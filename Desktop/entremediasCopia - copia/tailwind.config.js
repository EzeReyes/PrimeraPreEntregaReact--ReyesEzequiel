/** @type {import('tailwindcss').Config} */
const textShadowPlugin = require('tailwindcss-textshadow');

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Si usas un directorio 'src' o tienes otros directorios que contengan componentes React, agrégalos aquí.
  ],
  theme: {
    extend: {
      fontFamily: {
        lobster: ['Lobster', 'cursive'], // Agregamos la fuente "Lobster"
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    textShadowPlugin, // Correcto: sin array
  ],
};
