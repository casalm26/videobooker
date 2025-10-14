import type { CSSProperties } from 'react';

import { colors, radii, spacing, typography } from '../theme';

export type UsagePillProps = {
  used: number;
  total: number;
  label?: string;
  showPercent?: boolean;
  showRemaining?: boolean;
  style?: CSSProperties;
};

export function UsagePill({
  used,
  total,
  label,
  showPercent = true,
  showRemaining = true,
  style,
}: UsagePillProps) {
  const safeTotal = total <= 0 ? 1 : total;
  const percent = Math.min(100, Math.max(0, Math.round((used / safeTotal) * 100)));
  const remaining = Math.max(0, total - used);

  const containerStyle: CSSProperties = {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: spacing.xs,
    padding: spacing.sm,
    borderRadius: radii.lg,
    background: colors.surface,
    border: `1px solid ${colors.border}`,
    minWidth: '220px',
    fontFamily: typography.fontFamily,
  };

  const barStyle: CSSProperties = {
    position: 'relative',
    height: '10px',
    borderRadius: radii.pill,
    background: colors.surfaceMuted,
    overflow: 'hidden',
  };

  return (
    <div style={{ ...containerStyle, ...style }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 600, color: colors.text }}>
          {label ?? 'Usage'}
        </span>
        <span style={{ fontSize: '0.85rem', color: colors.textSubtle }}>
          {used}/{total}
        </span>
      </div>
      <div style={barStyle}>
        <span
          style={{
            position: 'absolute',
            inset: 0,
            width: `${percent}%`,
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
          }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: colors.textSubtle }}>
        {showPercent && <span>{percent}% used</span>}
        {showRemaining && <span>{remaining} remaining</span>}
      </div>
    </div>
  );
}
