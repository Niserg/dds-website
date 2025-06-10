import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
      },
      colors: {
        primary: {
          light: '#E6E6FA',
          main: '#9678B6',
          dark: '#4B0082',
        },
        text: {
          primary: '#2D3748',
          secondary: '#4A5568',
          light: '#718096',
        },
        background: {
          default: '#FFFFFF',
          paper: '#F7FAFC',
        },
      },
    },
  },
  plugins: [],
};

export default config; 