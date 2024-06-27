import {
  createCalendar,
  getLocalTimeZone,
  today,
} from '@internationalized/date';
import type { AriaCalendarProps, DateValue } from 'react-aria';
import { useCalendar, useKeyboard, useLocale } from 'react-aria';
import { useCalendarState } from 'react-stately';

import { Button } from '../Button';
import { CalendarGrid } from './CalendarGrid';

export interface CalendarProps<T extends DateValue = DateValue>
  extends AriaCalendarProps<T> {}

export const Calendar = <T extends DateValue>(props: CalendarProps<T>) => {
  const { locale } = useLocale();
  const state = useCalendarState({ ...props, locale, createCalendar });

  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, state);

  const { keyboardProps } = useKeyboard({
    onKeyDown: event => {
      switch (event.key) {
        case 'd': {
          event.preventDefault();
          const date = today(getLocalTimeZone());
          state.setFocusedDate(date);
          break;
        }
        case 'p':
          event.preventDefault();
          state.focusPreviousPage();
          break;
        case 'n':
          event.preventDefault();
          state.focusNextPage();
          break;
        case 'k':
          event.preventDefault();
          state.focusPreviousRow();
          break;
        case 'j':
          event.preventDefault();
          state.focusNextRow();
          break;
        case 'h':
          event.preventDefault();
          state.focusPreviousDay();
          break;
        case 'l':
          event.preventDefault();
          state.focusNextDay();
          break;
        default:
          event.continuePropagation();
          break;
      }
    },
  });

  return (
    <div {...calendarProps} {...keyboardProps} className="w-fit">
      <div className="fr px-3 mb-4 justify-between">
        <Button {...prevButtonProps}>&lt;</Button>
        <h2>{title}</h2>
        <Button {...nextButtonProps}>&gt;</Button>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
};
