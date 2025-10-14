import type { CSSProperties, ReactNode } from 'react';

import { colors, radii, spacing } from '../theme';

export type CardShadow = 'none' | 'sm' | 'md';
export type CardHighlight = 'none' | 'primary' | 'accent' | 'warning';

export type CardProps = {
  children: ReactNode;
  padding?: keyof typeof spacing | number | string;
  shadow?: CardShadow;
  border?: boolean;
  highlight?: CardHighlight;
  header?: ReactNode;
  footer?: ReactNode;
  style?: CSSProperties;
};

const shadowMap: Record<CardShadow, string> = {
  none: 'none',
  sm: '0 10px 20px rgba(16, 18, 35, 0.06)',
  md: '0 20px 40px rgba(16, 18, 35, 0.10)',
};

const highlightMap: Record<Exclude<CardHighlight, 'none'>, string> = {
  primary: colors.primary,
  accent: colors.accent,
  warning: colors.warning,
};

function resolvePadding(padding?: CardProps['padding']) {
  if (!padding) {
    return spacing.xl;
  }
  if (typeof padding === 'string' && padding in spacing) {
    return spacing[padding as keyof typeof spacing];
  }
  return padding;
}

export function Card({
  children,
  padding,
  shadow = 'sm',
  border = true,
  highlight = 'none',
  header,
  footer,
  style,
}: CardProps) {
  const cardPadding = resolvePadding(padding);
  const highlightColor = highlight === 'none' ? undefined : highlightMap[highlight];

  const baseStyle: CSSProperties = {
    background: colors.surface,
    borderRadius: radii.lg,
    border: border ? `1px solid ${colors.border}` : 'none',
    boxShadow: highlightColor
      ? `${shadowMap[shadow]}, 0 0 0 1px ${highlightColor}`
      : shadowMap[shadow],
    padding: cardPadding,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
    position: 'relative',
  };

  return (
    <section style={{ ...baseStyle, ...style }}>
      {header && <header style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>{header}</header>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>{children}</div>
      {footer && <footer style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>{footer}</footer>}
    </section>
  );
}
