export const DCX_DATEPICKER_MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export const DCX_DATEPICKER_WEEKDAYS_SUNDAY = [
  'Do',
  'Lu',
  'Ma',
  'Mi',
  'Ju',
  'Vi',
  'Sa',
];

export const DCX_DATEPICKER_WEEKDAYS_MONDAY = [
  'Lu',
  'Ma',
  'Mi',
  'Ju',
  'Vi',
  'Sa',
  'Do',
];

export const DCX_DATEPICKER_WEEKDAYS = DCX_DATEPICKER_WEEKDAYS_SUNDAY;

export type FirstDayOfWeek = 'monday' | 'sunday';

export const DCX_DATEPICKER_LABELS = {
  clearDate: 'Limpiar',
  previous: 'Anterior',
  next: 'Siguiente',
  selectMonth: 'Selecciona mes',
  selectYear: 'Selecciona año',
  today: 'Hoy',
  goToToday: 'Ir a hoy',
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

export const DATEPICKER_SIMPLE_PROPS = [
  'multiSelect',
  'rangeSelect',
  'disabled',
  'placeholder',
  'dateFormat',
  'firstDayOfWeek',
] as const;

export const DATEPICKER_DATE_PROPS = [
  'selectedDate',
  'startDate',
  'endDate',
  'minDate',
  'maxDate',
] as const;



