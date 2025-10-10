import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { colors, radii, spacing } from '../theme';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      style={{
        padding: `${spacing.sm} ${spacing.lg}`,
        borderRadius: radii.md,
        border: 'none',
        background: colors.primary,
        color: colors.text,
        cursor: 'pointer',
        fontWeight: 600,
      }}
    >
      {children}
    </button>
  );
}
