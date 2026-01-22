export type DateFormat = 'dd/MM/yyyy' | 'MM/dd/yyyy'
export interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    isInRange?: boolean;
    isDisabled: boolean;
}