import type { CSSProperties, ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { colors, radii, spacing, typography } from '../theme';

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
};

export type CalendarProps = {
  month?: Date;
  selectedDate?: Date;
  onSelect?: (date: Date) => void;
  onMonthChange?: (nextMonth: Date) => void;
  renderDay?: (day: CalendarDay) => ReactNode;
  showNavigation?: boolean;
  allowOutsideDays?: boolean;
  style?: CSSProperties;
};

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function isSameDay(left?: Date, right?: Date) {
  if (!left || !right) {
    return false;
  }
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function isToday(date: Date) {
  return isSameDay(date, new Date());
}

function addMonths(date: Date, amount: number) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + amount);
  next.setDate(1);
  return next;
}

function buildCalendarGrid(month: Date, selectedDate?: Date) {
  const start = startOfMonth(month);
  const startDay = start.getDay();
  const days: CalendarDay[] = [];

  // Prepend days from previous month to fill the first week.
  for (let i = startDay - 1; i >= 0; i -= 1) {
    const date = new Date(month.getFullYear(), month.getMonth(), -i);
    days.push({
      date,
      isCurrentMonth: false,
      isToday: isToday(date),
      isSelected: isSameDay(date, selectedDate),
    });
  }

  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(month.getFullYear(), month.getMonth(), day);
    days.push({
      date,
      isCurrentMonth: true,
      isToday: isToday(date),
      isSelected: isSameDay(date, selectedDate),
    });
  }

  const trailingDays = 42 - days.length; // 6 weeks grid
  for (let i = 1; i <= trailingDays; i += 1) {
    const date = new Date(month.getFullYear(), month.getMonth() + 1, i);
    days.push({
      date,
      isCurrentMonth: false,
      isToday: isToday(date),
      isSelected: isSameDay(date, selectedDate),
    });
  }

  return days;
}

export function Calendar({
  month,
  selectedDate,
  onSelect,
  onMonthChange,
  renderDay,
  showNavigation = true,
  allowOutsideDays = false,
  style,
}: CalendarProps) {
  const [internalMonth, setInternalMonth] = useState<Date>(() => startOfMonth(new Date()));

  useEffect(() => {
    if (month) {
      setInternalMonth(startOfMonth(month));
    }
  }, [month]);

  const currentMonth = month ? startOfMonth(month) : internalMonth;

  const handleMonthShift = useCallback(
    (delta: number) => {
      const next = addMonths(currentMonth, delta);
      if (!month) {
        setInternalMonth(next);
      }
      onMonthChange?.(next);
    },
    [currentMonth, month, onMonthChange],
  );

  const days = useMemo(
    () => buildCalendarGrid(currentMonth, selectedDate),
    [currentMonth, selectedDate],
  );

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: spacing.xs,
  };

  const headerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: typography.fontFamily,
  };

  const formattedMonth = currentMonth.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div
      style={{
        border: `1px solid ${colors.border}`,
        borderRadius: radii.lg,
        padding: spacing.lg,
        background: colors.surface,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.md,
        fontFamily: typography.fontFamily,
        ...style,
      }}
    >
      <header style={headerStyle}>
        <strong>{formattedMonth}</strong>
        {showNavigation && (
          <div style={{ display: 'flex', gap: spacing.xs }}>
            <button
              type="button"
              onClick={() => handleMonthShift(-1)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: radii.md,
                border: `1px solid ${colors.border}`,
                background: colors.surface,
                cursor: 'pointer',
              }}
              aria-label="Go to previous month"
            >
              {'<'}
            </button>
            <button
              type="button"
              onClick={() => handleMonthShift(1)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: radii.md,
                border: `1px solid ${colors.border}`,
                background: colors.surface,
                cursor: 'pointer',
              }}
              aria-label="Go to next month"
            >
              {'>'}
            </button>
          </div>
        )}
      </header>

      <div style={{ ...gridStyle, fontSize: '0.75rem', color: colors.textSubtle, textTransform: 'uppercase' }}>
        {WEEKDAY_LABELS.map((weekday) => (
          <span
            key={weekday}
            style={{ textAlign: 'center', letterSpacing: '0.08em' }}
          >
            {weekday}
          </span>
        ))}
      </div>

      <div style={gridStyle}>
        {days.map((day) => {
          const isDisabled = !day.isCurrentMonth && !allowOutsideDays;
          const dayStyle: CSSProperties = {
            borderRadius: radii.md,
            border: `1px solid ${day.isSelected ? colors.primary : colors.border}`,
            background: day.isSelected ? colors.primarySoft : colors.surface,
            color: day.isCurrentMonth ? colors.text : colors.textSubtle,
            position: 'relative',
            padding: spacing.sm,
            height: '64px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            opacity: isDisabled ? 0.4 : 1,
          };

          return (
            <button
              key={day.date.toISOString()}
              type="button"
              onClick={() => {
                if (isDisabled) {
                  return;
                }
                onSelect?.(day.date);
              }}
              style={dayStyle}
              disabled={isDisabled}
              aria-pressed={day.isSelected}
              aria-label={day.date.toDateString()}
            >
              {day.isToday && (
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: spacing.xs,
                    right: spacing.xs,
                    width: '6px',
                    height: '6px',
                    borderRadius: radii.pill,
                    background: colors.accent,
                  }}
                />
              )}
              {renderDay ? (
                renderDay(day)
              ) : (
                <span style={{ fontWeight: day.isSelected ? 600 : 500 }}>{day.date.getDate()}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
