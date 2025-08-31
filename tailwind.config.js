/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Si tu as un dossier 'app' à la racine (peu probable avec 'src')
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Si tu as un dossier 'pages' à la racine (peu probable avec 'src')
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Si tu as un dossier 'components' à la racine (peu probable avec 'src')
  ],
  theme: {
    extend: {
      colors: {
        senegalGreen: '#00843D',
        senegalGold: '#FDD100',
        senegalRed: '#E4002B',
        neutralLight: '#F5F5F5',
        neutralDark: '#333333',
        senegalGreen: 'var(--senegal-green)',
        'senegal-green-light': 'var(--senegal-green-light)',
        'senegal-green-dark': 'var(--senegal-green-dark)',
        senegalGold: 'var(--senegal-gold)',
        'senegal-gold-dark': 'var(--senegal-gold-dark)',
        senegalRed: 'var(--senegal-red)',
        neutralLight: 'var(--neutral-light)',
        neutralDark: 'var(--neutral-dark)',
      },
      fontFamily: {
        sans: ['Inter', 'Lato', 'Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}