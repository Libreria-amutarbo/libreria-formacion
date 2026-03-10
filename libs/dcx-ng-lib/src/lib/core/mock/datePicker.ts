import { CalendarDay } from '@dcx-ng-components/dcx-ng-lib';

export function makeDay(overrides: Partial<CalendarDay> = {}): CalendarDay {
    return {
        date: new Date(2025, 0, 15),
        isCurrentMonth: true,
        isToday: false,
        isSelected: false,
        isDisabled: false,
        isInRange: false,
        ...overrides,
    };
}
