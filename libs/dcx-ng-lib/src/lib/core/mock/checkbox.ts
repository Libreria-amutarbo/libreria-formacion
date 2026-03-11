import { CheckboxOption } from '@dcx-ng-components/dcx-ng-lib';

export const CHECKBOX_OPTIONS: CheckboxOption[] = [
  { value: 'opt1', label: 'Opción 1' },
  { value: 'opt2', label: 'Opción 2' },
];

export const CHECKBOX_OPTIONS_WITH_DISABLED: CheckboxOption[] = [
  { value: 'opt1', label: 'Opción 1' },
  { value: 'opt2', label: 'Opción 2', disabled: true },
];

export const CHECKBOX_SINGLE_OPTION: CheckboxOption[] = [
  { value: 'opt1', label: 'Opción 1' },
];

export const CHECKBOX_SINGLE_DISABLED: CheckboxOption[] = [
  { value: 'opt1', label: 'Opción 1', disabled: true },
];
