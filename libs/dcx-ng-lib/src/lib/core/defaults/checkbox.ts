import { DcxCheckbox } from '../interfaces';

export const DcxSingleCheck: DcxCheckbox[] = [
  {
    id: '1',
    value: true,
    label: 'Chceckbox único',
  },
];

export const DcxErrorCheck: DcxCheckbox[] = [
  {
    id: '1',
    value: true,
    label: 'Chceckbox erróneo',
    error: true,
    errorMessage: 'Checkbox con error',
  },
];

export const DcxDisabledCheck: DcxCheckbox[] = [
  {
    id: '1',
    value: true,
    label: 'Chceckbox dehabilitado',
    disabled: true,
  },
];

export const DcxDiferentsLabelPositionsCheck: DcxCheckbox[] = [
  {
    id: '1',
    value: true,
    label: 'Izquierda',
    labelPosition: 'left',
  },
  {
    id: '2',
    value: true,
    label: 'Derecha',
    labelPosition: 'right',
  },
];
export const DcxRequiredCheck: DcxCheckbox[] = [
  {
    id: '1',
    value: true,
    label: 'Required',
    labelPosition: 'right',
    required: true,
  },
];

export const DcxCheckboxGroup: DcxCheckbox[] = [
  {
    id: '1',
    value: true,
    label: 'Válido',
    labelPosition: 'right',
  },
  {
    id: '2',
    value: false,
    label: 'Inválido',
    labelPosition: 'right',
  },
  {
    id: '3',
    value: null,
    label: 'Sin valor',
    labelPosition: 'right',
  },
];
