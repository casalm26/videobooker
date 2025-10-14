import type {
  ButtonHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react';

import { colors, radii, spacing, typography } from '../theme';

type TabsContextValue = {
  activeValue: string | null;
  onActivate: (value: string) => void;
  registerTab: (value: string) => void;
  orientation: 'horizontal' | 'vertical';
  idBase: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string) {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error(`${component} must be rendered within a <Tabs> root component.`);
  }
  return ctx;
}

export type TabsProps = HTMLAttributes<HTMLDivElement> & {
  value?: string;
  defaultValue?: string;
  onChange?: (nextValue: string) => void;
  orientation?: 'horizontal' | 'vertical';
};

export function Tabs({
  children,
  value,
  defaultValue,
  onChange,
  orientation = 'horizontal',
  style,
  ...rest
}: TabsProps) {
  const [registeredTabs, setRegisteredTabs] = useState<string[]>([]);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string>(defaultValue ?? '');

  const registerTab = useCallback((tabValue: string) => {
    setRegisteredTabs((tabs) => (tabs.includes(tabValue) ? tabs : [...tabs, tabValue]));
  }, []);

  useEffect(() => {
    if (!isControlled && defaultValue && registeredTabs.includes(defaultValue)) {
      setInternalValue(defaultValue);
    }
  }, [defaultValue, isControlled, registeredTabs]);

  useEffect(() => {
    if (!isControlled && !internalValue && registeredTabs.length > 0) {
      setInternalValue(defaultValue && registeredTabs.includes(defaultValue) ? defaultValue : registeredTabs[0]);
    }
  }, [defaultValue, internalValue, isControlled, registeredTabs]);

  const handleActivate = useCallback(
    (next: string) => {
      if (!isControlled) {
        setInternalValue(next);
      }
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const activeValueRaw = isControlled ? value ?? '' : internalValue;
  const activeValue = registeredTabs.length
    ? activeValueRaw && registeredTabs.includes(activeValueRaw)
      ? activeValueRaw
      : registeredTabs[0]
    : null;

  const idBase = useId();

  const contextValue = useMemo<TabsContextValue>(
    () => ({
      activeValue,
      onActivate: handleActivate,
      registerTab,
      orientation,
      idBase,
    }),
    [activeValue, handleActivate, registerTab, orientation, idBase],
  );

  const rootStyle: CSSProperties = {
    display: 'flex',
    flexDirection: orientation === 'horizontal' ? 'column' : 'row',
    gap: spacing.lg,
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        {...rest}
        style={{ ...rootStyle, ...style }}
        data-orientation={orientation}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export type TabsListProps = HTMLAttributes<HTMLDivElement> & {
  stretch?: boolean;
};

export function TabsList({ children, stretch = false, style, ...rest }: TabsListProps) {
  const { orientation } = useTabsContext('TabsList');

  const listStyle: CSSProperties = {
    display: 'flex',
    flexDirection: orientation === 'horizontal' ? 'row' : 'column',
    gap: spacing.xs,
    background: colors.surfaceMuted,
    padding: spacing.xs,
    borderRadius: radii.md,
    border: `1px solid ${colors.border}`,
    ...(stretch
      ? {
          width: orientation === 'horizontal' ? '100%' : undefined,
        }
      : null),
  };

  return (
    <div
      {...rest}
      role="tablist"
      aria-orientation={orientation}
      style={{ ...listStyle, ...style }}
    >
      {children}
    </div>
  );
}

export type TabProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  badge?: ReactNode;
};

export function Tab({
  children,
  value,
  leadingIcon,
  trailingIcon,
  badge,
  style,
  ...rest
}: TabProps) {
  const { activeValue, onActivate, registerTab, idBase } = useTabsContext('Tab');

  useEffect(() => {
    registerTab(value);
  }, [registerTab, value]);

  const isActive = activeValue === value;
  const tabId = `${idBase}-tab-${value}`;
  const panelId = `${idBase}-panel-${value}`;

  const baseStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    padding: `${spacing.sm} ${spacing.md}`,
    borderRadius: radii.md,
    border: 'none',
    background: isActive ? colors.surface : 'transparent',
    color: isActive ? colors.text : colors.textSubtle,
    cursor: 'pointer',
    fontFamily: typography.fontFamily,
    fontWeight: isActive ? 600 : 500,
    fontSize: '0.9rem',
    lineHeight: 1.2,
    transition: 'background 160ms ease, color 160ms ease, box-shadow 160ms ease',
    boxShadow: isActive ? '0 10px 20px rgba(16, 18, 35, 0.08)' : 'none',
  };

  return (
    <button
      {...rest}
      id={tabId}
      role="tab"
      aria-selected={isActive}
      aria-controls={panelId}
      tabIndex={isActive ? 0 : -1}
      type="button"
      style={{ ...baseStyle, ...style }}
      onClick={(event) => {
        rest.onClick?.(event);
        if (rest.disabled) {
          return;
        }

        if (!isActive) {
          onActivate(value);
        }
      }}
    >
      {leadingIcon && <span aria-hidden="true">{leadingIcon}</span>}
      <span>{children}</span>
      {badge && <span>{badge}</span>}
      {trailingIcon && <span aria-hidden="true">{trailingIcon}</span>}
    </button>
  );
}

export type TabsPanelsProps = HTMLAttributes<HTMLDivElement>;

export function TabsPanels({ children, style, ...rest }: TabsPanelsProps) {
  const { orientation } = useTabsContext('TabsPanels');

  const panelsStyle: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
    minHeight: 0,
    ...(orientation === 'vertical'
      ? {
          paddingInlineStart: spacing.md,
          borderInlineStart: `1px solid ${colors.border}`,
        }
      : null),
  };

  return (
    <div
      {...rest}
      style={{ ...panelsStyle, ...style }}
    >
      {children}
    </div>
  );
}

export type TabPanelProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
  lazy?: boolean;
};

export function TabPanel({ children, value, lazy = false, style, ...rest }: TabPanelProps) {
  const { activeValue, idBase } = useTabsContext('TabPanel');
  const isActive = activeValue === value;
  const panelId = `${idBase}-panel-${value}`;
  const tabId = `${idBase}-tab-${value}`;

  if (!isActive && lazy) {
    return null;
  }

  const panelStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
    background: colors.surface,
    borderRadius: radii.lg,
    border: `1px solid ${colors.border}`,
    padding: spacing.xl,
    boxShadow: '0 12px 24px rgba(16, 18, 35, 0.08)',
  };

  return (
    <div
      {...rest}
      id={panelId}
      role="tabpanel"
      aria-labelledby={tabId}
      hidden={!isActive}
      style={{ ...panelStyle, ...style, display: isActive ? panelStyle.display : 'none' }}
    >
      {children}
    </div>
  );
}
