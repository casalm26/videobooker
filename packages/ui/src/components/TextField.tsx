import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

import { colors, radii, spacing, typography } from '../theme';

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  fullWidth?: boolean;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      description,
      error,
      prefix,
      suffix,
      fullWidth = false,
      style,
      id,
      ...rest
    },
    ref,
  ) => {
    const inputId = id ?? (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    const wrapperStyle: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.xs,
      width: fullWidth ? '100%' : undefined,
      fontFamily: typography.fontFamily,
    };

    const fieldStyle: CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: spacing.xs,
      padding: `${spacing.sm} ${spacing.md}`,
      borderRadius: radii.md,
      border: `1px solid ${error ? colors.danger : colors.border}`,
      background: colors.surface,
      boxShadow: error ? '0 0 0 3px rgba(227, 79, 79, 0.12)' : 'none',
    };

    const inputStyle: CSSProperties = {
      flex: 1,
      border: 'none',
      outline: 'none',
      fontFamily: typography.fontFamily,
      fontSize: '0.95rem',
      color: colors.text,
      background: 'transparent',
    };

    return (
      <label style={{ ...wrapperStyle, ...style }} htmlFor={inputId}>
        {label && (
          <span style={{ fontWeight: 600, color: colors.text }}>
            {label}
          </span>
        )}
        <div style={fieldStyle}>
          {prefix && <span aria-hidden="true">{prefix}</span>}
          <input
            {...rest}
            ref={ref}
            id={inputId}
            style={inputStyle}
            aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
            aria-invalid={Boolean(error) || undefined}
          />
          {suffix && <span aria-hidden="true">{suffix}</span>}
        </div>
        {description && (
          <span id={descriptionId} style={{ fontSize: '0.85rem', color: colors.textSubtle }}>
            {description}
          </span>
        )}
        {error && (
          <span id={errorId} style={{ fontSize: '0.85rem', color: colors.danger }}>
            {error}
          </span>
        )}
      </label>
    );
  },
);

TextField.displayName = 'TextField';
