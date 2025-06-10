export const theme = {
  colors: {
    primary: {
      light: '#E6E6FA', // Light Lavender
      main: '#9678B6',  // Medium Lavender
      dark: '#4B0082',  // Deep Lavender
    },
    text: {
      primary: '#2D3748',   // Dark gray for main text
      secondary: '#4A5568', // Medium gray for secondary text
      light: '#718096',     // Light gray for subtle text
    },
    background: {
      default: '#FFFFFF',
      paper: '#F7FAFC',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
} as const;

export type Theme = typeof theme; 