export const colors = {
  primary: '#1E7A78',
  primaryDark: '#155E5D',
  primarySoft: '#EAF7F5',
  secondary: '#FF8A4C',
  accent: '#6BC3B7',
  success: '#6BC3B7',
  warning: '#FFD166',
  danger: '#E34F4F',
  canvas: '#F8F9FC',
  surface: '#FFFFFF',
  surfaceMuted: '#EEF2F6',
  border: '#D5D7E7',
  text: '#101223',
  textMuted: '#3B3F5C',
  textSubtle: '#5F6585',
} as const;

export const spacing = {
  xxs: '0.125rem',
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
} as const;

export const radii = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '1rem',
  pill: '9999px',
} as const;

export const typography = {
  displayFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
  subheadingFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
  fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
  headingWeight: 600,
  bodyWeight: 400,
  buttonTransform: 'uppercase',
  buttonLetterSpacing: '0.12em',
  buttonFontSize: '0.875rem',
} as const;
