import type { CSSProperties, ReactNode } from 'react';

import { colors, radii, spacing, typography } from '../theme';

export type BadgeVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
export type BadgeTone = 'solid' | 'soft' | 'outline';

export type BadgeProps = {
  children: ReactNode;
  icon?: ReactNode;
  variant?: BadgeVariant;
  tone?: BadgeTone;
  style?: CSSProperties;
};

const variantColorMap: Record<BadgeVariant, string> = {
  neutral: colors.textMuted,
  primary: colors.primary,
  success: colors.success,
  warning: colors.warning,
  danger: colors.danger,
};

const softBackgroundMap: Record<BadgeVariant, string> = {
  neutral: 'rgba(16, 18, 35, 0.08)',
  primary: colors.primarySoft,
  success: 'rgba(107, 195, 183, 0.16)',
  warning: 'rgba(255, 209, 102, 0.16)',
  danger: 'rgba(227, 79, 79, 0.16)',
};

const outlineBackground = 'transparent';

export function Badge({
  children,
  icon,
  variant = 'neutral',
  tone = 'soft',
  style,
}: BadgeProps) {
  const toneColor = variantColorMap[variant];

  let background: CSSProperties['background'];
  let border: CSSProperties['border'];
  let textColor: CSSProperties['color'] = toneColor;

  switch (tone) {
    case 'solid': {
      background = toneColor;
      border = 'none';
      textColor = colors.surface;
      break;
    }
    case 'outline': {
      background = outlineBackground;
      border = `1px solid ${toneColor}`;
      break;
    }
    case 'soft':
    default: {
      background = softBackgroundMap[variant];
      border = 'none';
      break;
    }
  }

  const baseStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    padding: `${spacing.xs} ${spacing.sm}`,
    borderRadius: radii.pill,
    fontFamily: typography.fontFamily,
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: 1,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    background,
    border,
    color: textColor,
  };

  return (
    <span style={{ ...baseStyle, ...style }}>
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
}
