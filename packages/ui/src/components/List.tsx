import type { HTMLAttributes, LiHTMLAttributes, ReactNode } from 'react';
import { createContext, createElement, useContext, useMemo } from 'react';

import { colors, radii, spacing, typography } from '../theme';

type ListMarker = 'disc' | 'number' | 'none' | 'check';

type ListContextValue = {
  marker: ListMarker;
  inset?: boolean;
};

const ListContext = createContext<ListContextValue | null>(null);

function useListContext() {
  const ctx = useContext(ListContext);
  if (!ctx) {
    throw new Error('ListItem must be rendered within a <List> component.');
  }
  return ctx;
}

export type ListProps = HTMLAttributes<HTMLUListElement> & {
  marker?: ListMarker;
  inset?: boolean;
  heading?: ReactNode;
  description?: ReactNode;
};

export function List({
  children,
  marker = 'disc',
  inset = false,
  heading,
  description,
  style,
  ...rest
}: ListProps) {
  const isOrdered = marker === 'number';
  const elementTag = isOrdered ? 'ol' : 'ul';

  const listStyle = useMemo(
    () => ({
      margin: 0,
      paddingInlineStart: inset ? spacing.lg : spacing.xl,
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.sm,
      listStyleType: marker === 'none' || marker === 'check' ? 'none' : marker === 'disc' ? 'disc' : 'decimal',
    }),
    [inset, marker],
  );

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
      {heading && (
        <header style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
          <strong style={{ fontFamily: typography.fontFamily, fontSize: '1rem' }}>{heading}</strong>
          {description && (
            <span style={{ fontSize: '0.9rem', color: colors.textSubtle }}>{description}</span>
          )}
        </header>
      )}
      <ListContext.Provider value={{ marker, inset }}>
        {createElement(
          elementTag,
          {
            ...rest,
            style: { ...listStyle, ...style },
          },
          children,
        )}
      </ListContext.Provider>
    </section>
  );
}

export type ListItemProps = LiHTMLAttributes<HTMLLIElement> & {
  icon?: ReactNode;
  meta?: ReactNode;
  action?: ReactNode;
};

export function ListItem({ children, icon, meta, action, style, ...rest }: ListItemProps) {
  const { marker, inset } = useListContext();

  const renderMarker = () => {
    if (marker === 'check') {
      return (
        <span
          aria-hidden="true"
          style={{
            width: '1.25rem',
            height: '1.25rem',
            borderRadius: radii.pill,
            background: colors.primarySoft,
            color: colors.primary,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 600,
          }}
          >
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
        </span>
      );
    }

    if (marker === 'none' || marker === 'disc' || marker === 'number') {
      return null;
    }

    return null;
  };

  return (
    <li
      {...rest}
      style={{
        display: 'flex',
        alignItems: meta || action ? 'flex-start' : 'center',
        gap: spacing.sm,
        padding: inset ? `${spacing.xs} 0` : `${spacing.xs} ${spacing.sm}`,
        borderRadius: radii.md,
        background: marker === 'none' ? colors.surface : 'transparent',
        ...style,
      }}
    >
      {marker === 'check' && renderMarker()}
      {icon && <span aria-hidden="true">{icon}</span>}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
        <span style={{ fontFamily: typography.fontFamily, color: colors.text }}>{children}</span>
        {meta && <span style={{ fontSize: '0.8rem', color: colors.textSubtle }}>{meta}</span>}
      </div>
      {action && <span>{action}</span>}
    </li>
  );
}
