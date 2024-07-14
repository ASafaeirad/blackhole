import { Actions } from '@blackhole/actions';
import { useKeyFlowContext } from '@blackhole/keybinding-manager';
import {
  createCalendar,
  getLocalTimeZone,
  today,
} from '@internationalized/date';
import type { AriaCalendarProps, DateValue } from 'react-aria';
import { useCalendar, useLocale } from 'react-aria';
import { useCalendarState } from 'react-stately';

import { Button } from '../Button';
import { CalendarGrid } from './CalendarGrid';

export interface CalendarProps<T extends DateValue = DateValue>
  extends AriaCalendarProps<T> {
  onClose?: () => void;
}

export const Calendar = <T extends DateValue>({
  onClose,
  ...props
}: CalendarProps<T>) => {
  const { locale } = useLocale();
  const state = useCalendarState({ ...props, locale, createCalendar });

  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, state);

  const { keyHandler } = useKeyFlowContext({
    [Actions.FocusToday]: () => state.setFocusedDate(today(getLocalTimeZone())),
    [Actions.FocusPrevMonth]: () => state.focusPreviousPage(),
    [Actions.FocusNextMonth]: () => state.focusNextPage(),
    [Actions.FocusPrevWeek]: () => state.focusPreviousRow(),
    [Actions.FocusNextWeek]: () => state.focusNextRow(),
    [Actions.FocusPrevDay]: () => state.focusPreviousDay(),
    [Actions.FocusNextDay]: () => state.focusNextDay(),
    [Actions.CloseModal]: () => onClose?.(),
  });

  return (
    <div
      {...calendarProps}
      onKeyDown={keyHandler}
      tabIndex={0}
      className="w-fit"
    >
      <div className="fr px-3 mb-4 justify-between">
        <Button {...prevButtonProps}>&lt;</Button>
        <h2>{title}</h2>
        <Button {...nextButtonProps}>&gt;</Button>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
};
