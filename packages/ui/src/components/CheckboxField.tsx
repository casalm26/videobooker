import type { InputHTMLAttributes, MutableRefObject, ReactNode } from 'react';
import { forwardRef, useEffect, useId, useRef, useState } from 'react';

import { colors, radii, spacing, typography } from '../theme';

export type CheckboxFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  indeterminate?: boolean;
};

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  (
    {
      label,
      description,
      error,
      indeterminate = false,
      style,
      id,
      onChange,
      checked,
      defaultChecked,
      ...rest
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLInputElement | null>(null);
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const [isChecked, setIsChecked] = useState<boolean>(
      Boolean(checked ?? defaultChecked),
    );

    useEffect(() => {
      const element = internalRef.current;
      if (!element) {
        return;
      }
      element.indeterminate = indeterminate;
    }, [indeterminate]);

    useEffect(() => {
      if (typeof checked === 'boolean') {
        setIsChecked(checked);
      }
    }, [checked]);

    return (
      <label
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: spacing.sm,
          fontFamily: typography.fontFamily,
          color: colors.text,
          ...style,
        }}
        htmlFor={fieldId}
      >
        <span
          style={{
            position: 'relative',
            width: '20px',
            height: '20px',
            borderRadius: radii.sm,
            border: `1px solid ${error ? colors.danger : colors.border}`,
            background: colors.surface,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <input
            {...rest}
            checked={checked}
            defaultChecked={defaultChecked}
            ref={(node) => {
              internalRef.current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                (ref as MutableRefObject<HTMLInputElement | null>).current = node;
              }
            }}
            id={fieldId}
            type="checkbox"
            style={{
              position: 'absolute',
              inset: 0,
              margin: 0,
              opacity: 0,
              cursor: 'pointer',
            }}
            onChange={(event) => {
              setIsChecked(event.target.checked);
              onChange?.(event);
            }}
          />
          {isChecked && (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              aria-hidden="true"
            >
              <polyline
                points="2.5 6.5 4.75 9 9.5 3"
                fill="none"
                stroke={colors.primary}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {indeterminate && !isChecked && (
            <span
              aria-hidden="true"
              style={{
                width: '10px',
                height: '2px',
                background: colors.primary,
                borderRadius: radii.pill,
              }}
            />
          )}
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
          <span style={{ fontWeight: 500 }}>{label}</span>
          {description && <span style={{ fontSize: '0.85rem', color: colors.textSubtle }}>{description}</span>}
          {error && <span style={{ fontSize: '0.85rem', color: colors.danger }}>{error}</span>}
        </span>
      </label>
    );
  },
);

CheckboxField.displayName = 'CheckboxField';
