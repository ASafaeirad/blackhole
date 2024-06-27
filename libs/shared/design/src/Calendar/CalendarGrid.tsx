/* eslint-disable react/no-array-index-key */
import { range } from '@fullstacksjs/toolbox';
import { getWeeksInMonth } from '@internationalized/date';
import type { AriaCalendarGridProps } from 'react-aria';
import { useCalendarGrid, useLocale } from 'react-aria';
import type { CalendarState } from 'react-stately';

import { CalendarCell } from './CalendarCell';

type CalendarGirdProps = AriaCalendarGridProps & { state: CalendarState };

export const CalendarGrid = ({ state, ...props }: CalendarGirdProps) => {
  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

  const weeks = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <table {...gridProps}>
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <th key={index}>
              <div className="fr center h-10 w-10">{day}</div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {range(weeks).map(week => (
          <tr key={week}>
            {state
              .getDatesInWeek(week)
              .map((date, i) =>
                date ? (
                  <CalendarCell key={i} state={state} date={date} />
                ) : (
                  <td key={i} />
                ),
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
