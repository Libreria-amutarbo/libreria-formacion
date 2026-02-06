export type DateFormat = 'dd/MM/yyyy' | 'MM/dd/yyyy';

export type DateFormatPattern = {
    [K in DateFormat]: (day: string, month: string, year: string) => string;
};

export interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    isInRange?: boolean;
    isDisabled: boolean;
}