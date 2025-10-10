import type { CSSProperties, ReactNode } from 'react';

import { spacing } from '../theme';

export type StackProps = {
  direction?: 'row' | 'column';
  gap?: keyof typeof spacing | number | string;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  children: ReactNode;
  style?: CSSProperties;
};

export function Stack({
  direction = 'column',
  gap = 'md',
  align,
  justify,
  children,
  style,
}: StackProps) {
  let resolvedGap: CSSProperties['gap'];
  if (typeof gap === 'string' && gap in spacing) {
    resolvedGap = spacing[gap as keyof typeof spacing];
  } else {
    resolvedGap = gap;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: direction,
        gap: resolvedGap,
        alignItems: align,
        justifyContent: justify,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
