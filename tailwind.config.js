/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        btn: {
          background: 'var(--btn-background)',
          'background-hover': 'var(--btn-background-hover)',
        },
        inactive: '#757576',
        leaf: {
          100: '#dbe7c9',
          200: '#93b1a6',
          300: '#789461',
          400: '#50623a',
          700: '#183d3d',
          800: '#294b29',
          950: '#252525',
        },
      },
    },
  },
  plugins: [],
}
