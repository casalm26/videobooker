import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        border: 'none',
        background: '#3b82f6',
        color: '#fff',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}
