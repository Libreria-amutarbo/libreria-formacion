import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { fn } from '@storybook/test';
import { DcxNgProgressbarComponent } from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgProgressbarComponent> = {
  title: 'DCXLibrary/Components/Progressbar',
  component: DcxNgProgressbarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DcxNgProgressbarComponent],
    }),
  ],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          '`dcx-ng-progressbar` es un componente versátil para mostrar el progreso de tareas o guiar al usuario a través de pasos. ' +
          'Soporta tres variantes: barra de progreso simple (default), barra segmentada con animación (segmented), y stepper con pasos numerados o checkmarks (stepper).',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'segmented', 'stepper'],
      description: 'Variante del progressbar: default (barra simple), segmented (barra con segmentos animados), o stepper (pasos)',
      table: {
        type: { summary: "'default' | 'segmented' | 'stepper'" },
        defaultValue: { summary: 'default' },
      },
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'Porcentaje de progreso (0-100). Solo aplica para variantes default y segmented',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    showTooltip: {
      control: 'boolean',
      description: 'Muestra un tooltip con el porcentaje sobre la barra de progreso',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showLabel: {
      control: 'boolean',
      description: 'Muestra el porcentaje como texto al lado de la barra',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    steps: {
      control: 'object',
      description: 'Array de pasos para la variante stepper. Cada paso debe tener una propiedad label',
      table: {
        type: { summary: 'DcxProgressStep[]' },
        defaultValue: { summary: '[]' },
      },
    },
    currentStep: {
      control: { type: 'number', min: 1, max: 5 },
      description: 'Número del paso actual (1, 2, 3...). Solo aplica para variante stepper',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    showCheckmarks: {
      control: 'boolean',
      description: 'Muestra checkmarks en los pasos completados. Solo aplica para variante stepper',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgProgressbarComponent>;

/**
 * Story por defecto mostrando una barra de progreso simple al 60%
 */
export const Default: Story = {
  args: {
    variant: 'default',
    value: 60,
    showTooltip: false,
    showLabel: false,
    steps: [
      { label: 'Paso 1' },
      { label: 'Paso 2' },
      { label: 'Paso 3' },
    ],
    currentStep: 1,
    showCheckmarks: false,
  },
};

/**
 * Barra de progreso segmentada con animación de carga
 */
export const Segmented: Story = {
  args: {
    variant: 'segmented',
    value: 70,
    showTooltip: false,
    showLabel: false,
  },
};

/**
 * Barra de progreso con tooltip mostrando el porcentaje
 */
export const WithTooltip: Story = {
  args: {
    variant: 'default',
    value: 75,
    showTooltip: true,
    showLabel: false,
  },
};

/**
 * Barra de progreso con label mostrando el porcentaje
 */
export const WithLabel: Story = {
  args: {
    variant: 'default',
    value: 85,
    showTooltip: false,
    showLabel: true,
  },
};

/**
 * Stepper con pasos numerados
 */
export const StepperNumbered: Story = {
  args: {
    variant: 'stepper',
    steps: [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' },
      { label: 'Step 4' },
    ],
    currentStep: 3,
    showCheckmarks: false,
  },
};

/**
 * Stepper con checkmarks en pasos completados
 */
export const StepperCheckmarks: Story = {
  args: {
    variant: 'stepper',
    steps: [
      { label: 'Completado' },
      { label: 'Completado' },
      { label: 'En proceso' },
      { label: 'Pendiente' },
    ],
    currentStep: 3,
    showCheckmarks: true,
  },
};

/**
 * Stepper de proceso con etiquetas descriptivas
 */
export const StepperProcess: Story = {
  args: {
    variant: 'stepper',
    steps: [
      { label: 'Carrito' },
      { label: 'Envío' },
      { label: 'Revisión' },
      { label: 'Pago' },
    ],
    currentStep: 3,
    showCheckmarks: false,
  },
};
