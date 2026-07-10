import { CalendarDay } from '../interfaces';

export const makeDay = (overrides: Partial<CalendarDay> = {}): CalendarDay => ({
  date: new Date(2025, 0, 15),
  isCurrentMonth: true,
  isToday: false,
  isSelected: false,
  isDisabled: false,
  isInRange: false,
  ...overrides,
});
