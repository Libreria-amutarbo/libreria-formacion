export declare const DCX_DATEPICKER_MONTHS: string[];
export declare const DCX_DATEPICKER_WEEKDAYS_SUNDAY: string[];
export declare const DCX_DATEPICKER_WEEKDAYS_MONDAY: string[];
export declare const DCX_DATEPICKER_WEEKDAYS: string[];
export type FirstDayOfWeek = 'monday' | 'sunday';
export declare const DCX_DATEPICKER_LABELS: {
    clearDate: string;
    previous: string;
    next: string;
    selectMonth: string;
    selectYear: string;
    today: string;
    goToToday: string;
};
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
export type DatePickerMode = 'calendar' | 'month' | 'year';
export interface DatePickerProps {
    selectedDate: Date | null;
    selectedDates: Date[];
    multiSelect: boolean;
    rangeSelect: boolean;
    startDate: Date | null;
    endDate: Date | null;
    minDate: Date | null;
    maxDate: Date | null;
    disabled: boolean;
    placeholder: string;
    dateFormat: DateFormat;
    firstDayOfWeek: FirstDayOfWeek;
}
export declare const DATEPICKER_SIMPLE_PROPS: readonly ["multiSelect", "rangeSelect", "disabled", "placeholder", "dateFormat", "firstDayOfWeek"];
export declare const DATEPICKER_DATE_PROPS: readonly ["selectedDate", "startDate", "endDate", "minDate", "maxDate"];
