import type { CSSProperties, ReactNode } from 'react';

import { colors, radii, spacing, typography } from '../theme';

export type PillTagTone = 'solid' | 'soft';
export type PillTagVariant = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'danger';

export type PillTagProps = {
  children: ReactNode;
  variant?: PillTagVariant;
  tone?: PillTagTone;
  icon?: ReactNode;
  trailing?: ReactNode;
  style?: CSSProperties;
};

const variantColorMap: Record<PillTagVariant, string> = {
  default: colors.textSubtle,
  primary: colors.primary,
  accent: colors.accent,
  success: colors.success,
  warning: colors.warning,
  danger: colors.danger,
};

const softBackgroundMap: Record<PillTagVariant, string> = {
  default: colors.surfaceMuted,
  primary: colors.primarySoft,
  accent: 'rgba(107, 195, 183, 0.2)',
  success: 'rgba(107, 195, 183, 0.2)',
  warning: 'rgba(255, 209, 102, 0.22)',
  danger: 'rgba(227, 79, 79, 0.22)',
};

export function PillTag({
  children,
  variant = 'default',
  tone = 'soft',
  icon,
  trailing,
  style,
}: PillTagProps) {
  const resolvedColor = variantColorMap[variant];

  const baseStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.xs,
    padding: `${spacing.xs} ${spacing.sm}`,
    borderRadius: radii.pill,
    fontFamily: typography.fontFamily,
    fontSize: '0.8rem',
    fontWeight: 500,
    background: tone === 'solid' ? resolvedColor : softBackgroundMap[variant],
    color: tone === 'solid' ? colors.surface : resolvedColor,
  };

  return (
    <span style={{ ...baseStyle, ...style }}>
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{children}</span>
      {trailing && <span>{trailing}</span>}
    </span>
  );
}
