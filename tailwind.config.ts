import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'green-100': '#9DFACD',
        'green-200': '#279292',
        'green-300': '#17303D',
        'dark-100': '#3C414A',
        'dark-200': '#2A2E34',
        'dark-300': '#1E2024',
        'blue-100': '#7F77F1',
        'shimmer-dark': '#1E2024',
        'shimmer-light': '#2A2E34',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
