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

export const DCX_DATEPICKER_WEEKDAYS = [
  'Dom',
  'Lun',
  'Mar',
  'Mié',
  'Jue',
  'Vie',
  'Sáb',
];

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
