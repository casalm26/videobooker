import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { colors, radii, spacing, typography } from '../theme';

export type ModalSize = 'sm' | 'md' | 'lg';

export type ModalProps = {
  open: boolean;
  onClose?: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  style?: CSSProperties;
};

const sizeWidth: Record<ModalSize, string> = {
  sm: '360px',
  md: '520px',
  lg: '720px',
};

const canUseDom = typeof window !== 'undefined' && typeof document !== 'undefined';

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  style,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
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
    if (!canUseDom || !open || !dialogRef.current) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;

    dialogRef.current.focus();

    return () => {
      previouslyFocused?.focus();
    };
  }, [open]);

  const overlayStyle: CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(16, 18, 35, 0.56)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    zIndex: 1000,
  };

  const dialogStyle: CSSProperties = useMemo(
    () => ({
      background: colors.surface,
      borderRadius: radii.lg,
      width: '100%',
      maxWidth: sizeWidth[size],
      maxHeight: '90vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 40px 80px rgba(16, 18, 35, 0.22)',
      outline: 'none',
    }),
    [size],
  );

  if (!mounted || !open || !canUseDom) {
    return null;
  }

  const labelledBy = title ? titleId : undefined;
  const describedBy = description ? descriptionId : undefined;

  const dialog = (
    <div
      style={overlayStyle}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget && closeOnOverlayClick) {
          onClose?.();
        }
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        style={{ ...dialogStyle, ...style }}
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
                  fontSize: '1.2rem',
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
                  fontSize: '0.95rem',
                  color: colors.textSubtle,
                }}
              >
                {description}
              </p>
            )}
          </header>
        )}
        <div
          style={{
            padding: spacing.lg,
            overflowY: 'auto',
            flex: 1,
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

  return createPortal(dialog, document.body);
}
