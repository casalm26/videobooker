export const colors = {
  primary: '#3b82f6',
  primaryDark: '#1d4ed8',
  secondary: '#f97316',
  surface: '#0f172a',
  surfaceMuted: '#1e293b',
  text: '#e2e8f0',
  textMuted: '#94a3b8',
  success: '#22c55e',
  warning: '#facc15',
  danger: '#ef4444',
} as const;

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
} as const;

export const radii = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '1rem',
  pill: '9999px',
} as const;

export const typography = {
  fontFamily: "'Inter', system-ui, sans-serif",
  headingWeight: 600,
  bodyWeight: 400,
} as const;
