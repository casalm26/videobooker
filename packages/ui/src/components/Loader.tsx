import type { CSSProperties } from 'react';

import { colors, spacing, typography } from '../theme';

export type LoaderProps = {
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  inline?: boolean;
};

export function Loader({
  size = 48,
  strokeWidth = 4,
  color = colors.primary,
  label = 'Loading...',
  inline = false,
}: LoaderProps) {
  const radius = (48 - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const containerStyle: CSSProperties = {
    display: inline ? 'inline-flex' : 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    color,
    fontFamily: typography.fontFamily,
    fontSize: '0.9rem',
  };

  return (
    <span
      role="status"
      aria-live="polite"
      style={containerStyle}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke={color}
          strokeOpacity="0.16"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference / 3} ${circumference}`}
          fill="none"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 24 24"
            to="360 24 24"
            dur="0.9s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <span>{label}</span>
    </span>
  );
}
