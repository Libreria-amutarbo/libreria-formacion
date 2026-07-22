import { DcxRadioOption } from '../interfaces/radio';

export const RADIO_DEFAULT_OPTIONS: DcxRadioOption[] = [
  { value: 'opcion1', label: 'Opción 1' },
  { value: 'opcion2', label: 'Opción 2' },
  { value: 'opcion3', label: 'Opción 3' },
];

export const RADIO_DEFAULT_VALUES = {
  size: 'l' as const,
  disabled: false,
  error: false,
};
