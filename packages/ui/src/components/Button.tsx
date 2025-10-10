import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

import { colors, radii, spacing, typography } from '../theme';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function Button({ children, style, onMouseEnter, onMouseLeave, ...props }: ButtonProps) {
  const baseStyle: CSSProperties = {
    padding: `${spacing.sm} ${spacing.lg}`,
    borderRadius: radii.md,
    border: 'none',
    background: colors.primary,
    color: colors.surface,
    cursor: 'pointer',
    fontFamily: typography.fontFamily,
    fontWeight: typography.headingWeight,
    fontSize: typography.buttonFontSize,
    letterSpacing: typography.buttonLetterSpacing,
    textTransform: typography.buttonTransform as CSSProperties['textTransform'],
    transition: 'transform 120ms ease, box-shadow 120ms ease, background 120ms ease',
    boxShadow: '0 10px 20px rgba(30, 122, 120, 0.18)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  };

  const mergedStyle = { ...baseStyle, ...style };
  const hasCustomBackground = style?.background !== undefined || style?.backgroundColor !== undefined;
  const baseBackground = (mergedStyle.background ?? colors.primary) as string;

  return (
    <button
      {...props}
      style={mergedStyle}
      onMouseEnter={(event) => {
        if (!hasCustomBackground) {
          event.currentTarget.style.background = colors.primaryDark;
        }
        event.currentTarget.style.transform = 'translateY(-1px)';
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        if (!hasCustomBackground) {
          event.currentTarget.style.background = baseBackground;
        }
        event.currentTarget.style.transform = 'translateY(0)';
        onMouseLeave?.(event);
      }}
    >
      {children}
    </button>
  );
}
