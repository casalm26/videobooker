import type { CSSProperties, HTMLAttributes, KeyboardEvent, ReactNode } from 'react';

import { colors, radii, spacing, typography } from '../theme';

export type ChipVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';

type BaseDivProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;
type DivClickHandler = NonNullable<HTMLAttributes<HTMLDivElement>['onClick']>;
type DivClickEvent = Parameters<DivClickHandler>[0];

export type ChipProps = BaseDivProps & {
  children: ReactNode;
  variant?: ChipVariant;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  selected?: boolean;
  interactive?: boolean;
  onRemove?: () => void;
  removeLabel?: string;
};

const variantStyles: Record<ChipVariant, { background: string; color: string; border?: string }> = {
  default: {
    background: colors.surfaceMuted,
    color: colors.text,
    border: `1px solid ${colors.border}`,
  },
  primary: {
    background: colors.primarySoft,
    color: colors.primary,
  },
  success: {
    background: 'rgba(107, 195, 183, 0.18)',
    color: colors.success,
  },
  warning: {
    background: 'rgba(255, 209, 102, 0.24)',
    color: colors.warning,
  },
  danger: {
    background: 'rgba(227, 79, 79, 0.18)',
    color: colors.danger,
  },
};

export function Chip({
  children,
  variant = 'default',
  leadingIcon,
  trailingIcon,
  selected = false,
  interactive = false,
  onRemove,
  removeLabel = 'Remove',
  style,
  onClick,
  onKeyDown,
  ...rest
}: ChipProps) {
  const baseStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.xs,
    padding: `${spacing.xs} ${spacing.md}`,
    borderRadius: radii.pill,
    fontFamily: typography.fontFamily,
    fontSize: '0.875rem',
    lineHeight: 1.4,
    cursor: interactive ? 'pointer' : 'default',
    transition: 'transform 140ms ease, box-shadow 140ms ease',
    userSelect: interactive ? 'none' : 'auto',
    outline: 'none',
    ...variantStyles[variant],
    ...(selected
      ? {
          boxShadow: `0 0 0 2px rgba(30, 122, 120, 0.2)`,
        }
      : null),
  };

  return (
    <div
      {...rest}
      role={interactive ? 'button' : rest.role}
      tabIndex={interactive ? 0 : rest.tabIndex}
      style={{ ...baseStyle, ...style }}
      onClick={
        interactive
          ? (event) => {
              onClick?.(event);
            }
          : onClick
      }
      onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
        if (interactive && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          onClick?.(event as unknown as DivClickEvent);
        }

        if (onRemove && (event.key === 'Backspace' || event.key === 'Delete')) {
          event.preventDefault();
          onRemove();
          return;
        }

        onKeyDown?.(event);
      }}
    >
      {leadingIcon && <span aria-hidden="true">{leadingIcon}</span>}
      <span>{children}</span>
      {trailingIcon && <span aria-hidden="true">{trailingIcon}</span>}
      {onRemove && (
        <button
          type="button"
          aria-label={removeLabel}
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
          style={{
            marginLeft: spacing.xs,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            color: variantStyles[variant].color,
            padding: 0,
            fontSize: '1rem',
            lineHeight: 1,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}
