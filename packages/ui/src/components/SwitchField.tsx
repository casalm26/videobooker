import type { ReactNode } from 'react';
import { useCallback } from 'react';

import { colors, radii, spacing, typography } from '../theme';

export type SwitchFieldProps = {
  label: ReactNode;
  description?: ReactNode;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
};

export function SwitchField({ label, description, checked, onChange, disabled = false }: SwitchFieldProps) {
  const handleToggle = useCallback(() => {
    if (disabled) {
      return;
    }
    onChange?.(!checked);
  }, [checked, disabled, onChange]);

  return (
    <button
      type="button"
      onClick={handleToggle}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: `${spacing.sm} ${spacing.md}`,
        borderRadius: radii.lg,
        border: `1px solid ${colors.border}`,
        background: colors.surface,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        fontFamily: typography.fontFamily,
        color: colors.text,
        textAlign: 'left',
        gap: spacing.md,
      }}
    >
      <span style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
        <span style={{ fontWeight: 600 }}>{label}</span>
        {description && <span style={{ fontSize: '0.85rem', color: colors.textSubtle }}>{description}</span>}
      </span>
      <span
        aria-hidden="true"
        style={{
          width: '46px',
          height: '26px',
          borderRadius: radii.pill,
          background: checked ? colors.primary : colors.surfaceMuted,
          border: `1px solid ${checked ? colors.primaryDark : colors.border}`,
          display: 'inline-flex',
          alignItems: 'center',
          padding: '2px',
          transition: 'background 160ms ease, border 160ms ease',
        }}
      >
        <span
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: colors.surface,
            transform: checked ? 'translateX(20px)' : 'translateX(0)',
            transition: 'transform 160ms ease',
            boxShadow: '0 4px 8px rgba(16, 18, 35, 0.12)',
          }}
        />
      </span>
    </button>
  );
}
