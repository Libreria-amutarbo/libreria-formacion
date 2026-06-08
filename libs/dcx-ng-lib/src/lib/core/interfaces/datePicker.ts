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

/** Do → Sa  (inicio en domingo — calendario anglosajón) */
export const DCX_DATEPICKER_WEEKDAYS_SUNDAY = [
  'Do',
  'Lu',
  'Ma',
  'Mi',
  'Ju',
  'Vi',
  'Sa',
];

/** Lu → Do  (inicio en lunes — estándar europeo / ISO 8601) */
export const DCX_DATEPICKER_WEEKDAYS_MONDAY = [
  'Lu',
  'Ma',
  'Mi',
  'Ju',
  'Vi',
  'Sa',
  'Do',
];

/** @deprecated Usa DCX_DATEPICKER_WEEKDAYS_SUNDAY o DCX_DATEPICKER_WEEKDAYS_MONDAY */
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
