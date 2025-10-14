import type { ButtonHTMLAttributes, CSSProperties, HTMLAttributes, ReactNode } from 'react';

import { colors, radii, spacing, typography } from '../theme';

export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';

export type ToastProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  description?: ReactNode;
  variant?: ToastVariant;
  actionLabel?: string;
  onAction?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  onDismiss?: () => void;
  dismissLabel?: string;
};

const variantAccentMap: Record<ToastVariant, { accent: string; background: string; text: string }> = {
  info: {
    accent: colors.primary,
    background: colors.primarySoft,
    text: colors.text,
  },
  success: {
    accent: colors.success,
    background: 'rgba(107, 195, 183, 0.16)',
    text: colors.text,
  },
  warning: {
    accent: colors.warning,
    background: 'rgba(255, 209, 102, 0.18)',
    text: colors.text,
  },
  danger: {
    accent: colors.danger,
    background: 'rgba(227, 79, 79, 0.16)',
    text: colors.text,
  },
};

export function Toast({
  title,
  description,
  variant = 'info',
  actionLabel,
  onAction,
  onDismiss,
  dismissLabel = 'Dismiss notification',
  style,
  role = 'status',
  ...rest
}: ToastProps) {
  const variantTokens = variantAccentMap[variant];

  const baseStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radii.lg,
    background: variantTokens.background,
    color: variantTokens.text,
    border: `1px solid ${variantTokens.accent}`,
    boxShadow: '0 15px 35px rgba(16, 18, 35, 0.18)',
    maxWidth: '440px',
  };

  const actionButtonStyle: CSSProperties = {
    padding: `${spacing.xs} ${spacing.sm}`,
    borderRadius: radii.md,
    border: 'none',
    background: variantTokens.accent,
    color: colors.surface,
    fontFamily: typography.fontFamily,
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
  };

  return (
    <div
      {...rest}
      role={role}
      style={{ ...baseStyle, ...style }}
    >
      <span
        aria-hidden="true"
        style={{
          width: '6px',
          borderRadius: radii.pill,
          background: variantTokens.accent,
          alignSelf: 'stretch',
        }}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
        <strong style={{ fontFamily: typography.fontFamily, fontWeight: 600 }}>{title}</strong>
        {description && <span style={{ fontSize: '0.9rem', color: colors.textSubtle }}>{description}</span>}
        {(actionLabel || onDismiss) && (
          <div style={{ display: 'flex', gap: spacing.sm }}>
            {actionLabel && (
              <button
                type="button"
                onClick={onAction}
                style={actionButtonStyle}
              >
                {actionLabel}
              </button>
            )}
            {onDismiss && (
              <button
                type="button"
                onClick={onDismiss}
                style={{
                  ...actionButtonStyle,
                  background: 'transparent',
                  border: `1px solid ${variantTokens.accent}`,
                  color: variantTokens.accent,
                }}
                aria-label={dismissLabel}
              >
                Close
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
