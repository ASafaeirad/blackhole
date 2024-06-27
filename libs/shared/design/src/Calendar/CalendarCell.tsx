import { cn } from '@blackhole/cn';
import type { CalendarDate } from '@internationalized/date';
import { useRef } from 'react';
import { useCalendarCell } from 'react-aria';
import type { CalendarState, RangeCalendarState } from 'react-stately';

interface CalendarCellProps {
  date: CalendarDate;
  state: CalendarState | RangeCalendarState;
}

export const CalendarCell = ({ state, date }: CalendarCellProps) => {
  const ref = useRef(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);

  return (
    <td {...cellProps}>
      <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={cn('fr center w-10 h-10 cursor-pointer', {
          'color-cta': isSelected,
          'color-muted': isDisabled,
          'color-[red]': isUnavailable,
        })}
      >
        {formattedDate}
      </div>
    </td>
  );
};
