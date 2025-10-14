import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { colors, spacing, typography } from '../theme';

export type SidePanelWidth = 'sm' | 'md' | 'lg';

export type SidePanelProps = {
  open: boolean;
  onClose?: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  width?: SidePanelWidth;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  style?: CSSProperties;
};

const widthMap: Record<SidePanelWidth, string> = {
  sm: '320px',
  md: '420px',
  lg: '520px',
};

const canUseDom = typeof window !== 'undefined' && typeof document !== 'undefined';

export function SidePanel({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  width = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  style,
}: SidePanelProps) {
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!canUseDom) {
      return;
    }
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!canUseDom || !open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, closeOnEscape, onClose]);

  useEffect(() => {
    if (!canUseDom || !open || !panelRef.current) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current.focus();

    return () => {
      previouslyFocused?.focus();
    };
  }, [open]);

  const overlayStyle: CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(16, 18, 35, 0.46)',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    zIndex: 1000,
  };

  const panelStyle: CSSProperties = useMemo(
    () => ({
      width: widthMap[width],
      maxWidth: '100%',
      height: '100%',
      background: colors.surface,
      boxShadow: '-20px 0 40px rgba(16, 18, 35, 0.28)',
      display: 'flex',
      flexDirection: 'column',
      outline: 'none',
    }),
    [width],
  );

  if (!mounted || !open || !canUseDom) {
    return null;
  }

  const labelledBy = title ? titleId : undefined;
  const describedBy = description ? descriptionId : undefined;

  const panel = (
    <div
      style={overlayStyle}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget && closeOnOverlayClick) {
          onClose?.();
        }
      }}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        style={{ ...panelStyle, ...style }}
      >
        {(title || description) && (
          <header
            style={{
              padding: `${spacing.lg} ${spacing.lg} ${spacing.sm}`,
              borderBottom: `1px solid ${colors.border}`,
              display: 'flex',
              flexDirection: 'column',
              gap: spacing.xs,
            }}
          >
            {title && (
              <h2
                id={titleId}
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                id={descriptionId}
                style={{
                  margin: 0,
                  color: colors.textSubtle,
                  fontSize: '0.95rem',
                }}
              >
                {description}
              </p>
            )}
          </header>
        )}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: spacing.lg,
            display: 'flex',
            flexDirection: 'column',
            gap: spacing.md,
          }}
        >
          {children}
        </div>
        {footer && (
          <footer
            style={{
              borderTop: `1px solid ${colors.border}`,
              padding: `${spacing.sm} ${spacing.lg}`,
              display: 'flex',
              justifyContent: 'flex-end',
              gap: spacing.sm,
            }}
          >
            {footer}
          </footer>
        )}
      </div>
    </div>
  );

  return createPortal(panel, document.body);
}
