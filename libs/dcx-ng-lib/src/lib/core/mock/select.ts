import {
  DISABLED,
  SPACING_DEFAULT,
  DcxSelectOptions,
  DcxSpacing,
} from '@dcx-ng-components/dcx-ng-lib';

export const LABEL = 'Select';
export const OPTIONS: DcxSelectOptions[] = [
  {
    value: 'one',
    label: 'Uno',
  },
  {
    value: 'two',
    label: 'Dos',
  },
  {
    value: 'three',
    label: 'Tres',
  },
];

export const PLACEHOLDER = 'Seleccione una opción';
export const SEARCHABLE = false;
export const CLEARABLE = false;
export const REQUIRED = false;
export const ISINVALID = false;
export const ERRORMESSAGE = '';
export const ERRORICON = 'info-circle';
export const VALUEINPUT: string | null = null;
export const SPACING: DcxSpacing = SPACING_DEFAULT;

export const SELECTDEFAULTARGS = {
  label: LABEL,
  options: OPTIONS,
  placeholder: PLACEHOLDER,
  searchable: SEARCHABLE,
  clearable: CLEARABLE,
  disabled: DISABLED,
  required: REQUIRED,
  invalid: ISINVALID,
  errorMessage: ERRORMESSAGE,
  valueInput: VALUEINPUT,
  spacing: SPACING,
};
