import type { CSSProperties, ReactNode, TextareaHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { colors, radii, spacing, typography } from '../theme';

export type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  fullWidth?: boolean;
};

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ label, description, error, fullWidth = false, style, id, rows = 4, ...rest }, ref) => {
    const fieldId = id ?? (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const descriptionId = description ? `${fieldId}-description` : undefined;
    const errorId = error ? `${fieldId}-error` : undefined;

    const wrapperStyle: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.xs,
      width: fullWidth ? '100%' : undefined,
      fontFamily: typography.fontFamily,
    };

    const textareaStyle: CSSProperties = {
      borderRadius: radii.md,
      border: `1px solid ${error ? colors.danger : colors.border}`,
      padding: spacing.md,
      fontFamily: typography.fontFamily,
      fontSize: '0.95rem',
      color: colors.text,
      resize: 'vertical',
      minHeight: '120px',
      boxShadow: error ? '0 0 0 3px rgba(227, 79, 79, 0.12)' : 'none',
    };

    return (
      <label style={{ ...wrapperStyle, ...style }} htmlFor={fieldId}>
        {label && (
          <span style={{ fontWeight: 600, color: colors.text }}>
            {label}
          </span>
        )}
        <textarea
          {...rest}
          ref={ref}
          id={fieldId}
          rows={rows}
          style={textareaStyle}
          aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
          aria-invalid={Boolean(error) || undefined}
        />
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

TextAreaField.displayName = 'TextAreaField';
