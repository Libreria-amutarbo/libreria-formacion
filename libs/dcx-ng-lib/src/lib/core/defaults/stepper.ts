import { DcxStepperItem } from '../interfaces';

export const STEPPER_BASIC_STEPS: DcxStepperItem[] = [
  {
    id: '1',
    label: 'Datos personales',
    description: 'Introduce tus datos',
  },
  {
    id: '2',
    label: 'Dirección',
    description: 'Confirma tu dirección',
  },
  {
    id: '3',
    label: 'Revisión',
    description: 'Revisa tu información',
  },
];

export const STEPPER_WITH_COMPLETED: DcxStepperItem[] = [
  {
    id: '1',
    label: 'Datos personales',
    completed: true,
  },
  {
    id: '2',
    label: 'Dirección',
    completed: true,
  },
  {
    id: '3',
    label: 'Revisión',
  },
  {
    id: '4',
    label: 'Pago',
  },
];

export const STEPPER_WITH_DISABLED: DcxStepperItem[] = [
  {
    id: '1',
    label: 'Paso 1',
  },
  {
    id: '2',
    label: 'Paso 2 (deshabilitado)',
    disabled: true,
  },
  {
    id: '3',
    label: 'Paso 3',
  },
];

export const STEPPER_WITH_ERROR: DcxStepperItem[] = [
  {
    id: '1',
    label: 'Paso 1',
    completed: true,
  },
  {
    id: '2',
    label: 'Paso 2 (error)',
    error: true,
  },
  {
    id: '3',
    label: 'Paso 3',
  },
];

export const STEPPER_WITH_OPTIONAL: DcxStepperItem[] = [
  {
    id: '1',
    label: 'Paso obligatorio',
    description: 'Este paso es obligatorio',
  },
  {
    id: '2',
    label: 'Paso opcional',
    description: 'Este paso se puede omitir',
    optional: true,
  },
  {
    id: '3',
    label: 'Paso obligatorio',
    description: 'Otro paso obligatorio',
  },
];

export const STEPPER_WITH_ICONS: DcxStepperItem[] = [
  {
    id: '1',
    label: 'Inicio',
    icon: 'house',
  },
  {
    id: '2',
    label: 'Ajustes',
    icon: 'gear',
  },
  {
    id: '3',
    label: 'Usuarios',
    icon: 'people',
  },
];
