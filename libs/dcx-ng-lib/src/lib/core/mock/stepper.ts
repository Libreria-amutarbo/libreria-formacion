import { DcxStepperItem } from '../interfaces/stepper';

export const STEPPER_BASIC_STEPS: DcxStepperItem[] = [
  {
    id: '1',
    label: 'Personal Information',
    description: 'Enter your details',
  },
  {
    id: '2',
    label: 'Address',
    description: 'Confirm your address',
  },
  {
    id: '3',
    label: 'Review',
    description: 'Review your information',
  },
];

export const STEPPER_WITH_COMPLETED: DcxStepperItem[] = [
  {
    id: '1',
    label: 'Personal Information',
    completed: true,
  },
  {
    id: '2',
    label: 'Address',
    completed: true,
  },
  {
    id: '3',
    label: 'Review',
  },
  {
    id: '4',
    label: 'Payment',
  },
];

export const STEPPER_WITH_DISABLED: DcxStepperItem[] = [
  {
    id: '1',
    label: 'Step 1',
  },
  {
    id: '2',
    label: 'Step 2 (Disabled)',
    disabled: true,
  },
  {
    id: '3',
    label: 'Step 3',
  },
];

export const STEPPER_WITH_ERROR: DcxStepperItem[] = [
  {
    id: '1',
    label: 'Step 1',
    completed: true,
  },
  {
    id: '2',
    label: 'Step 2 (Error)',
    error: true,
  },
  {
    id: '3',
    label: 'Step 3',
  },
];

export const STEPPER_WITH_OPTIONAL: DcxStepperItem[] = [
  {
    id: '1',
    label: 'Required Step',
    description: 'This step is required',
  },
  {
    id: '2',
    label: 'Optional Step',
    description: 'This step is optional',
    optional: true,
  },
  {
    id: '3',
    label: 'Required Step',
    description: 'Another required step',
  },
];

export const STEPPER_WITH_ICONS: DcxStepperItem[] = [
  {
    id: '1',
    label: 'Home',
    icon: 'home',
  },
  {
    id: '2',
    label: 'Settings',
    icon: 'cog',
  },
  {
    id: '3',
    label: 'Users',
    icon: 'users',
  },
];
