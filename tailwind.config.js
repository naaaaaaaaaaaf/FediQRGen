/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mastodon: {
          500: '#6364ff',
          600: '#5253e6',
        },
        misskey: {
          500: '#85b200',
          600: '#6a8f00',
        },
      },
    },
  },
  plugins: [],
}

