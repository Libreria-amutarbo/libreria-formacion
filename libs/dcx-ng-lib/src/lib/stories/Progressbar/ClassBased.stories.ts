import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
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
      name: 'variant',
      control: 'select',
      options: ['default', 'segmented', 'stepper'],
      description: 'Variante del progressbar: default (barra simple), segmented (barra con segmentos animados) o stepper (pasos).',
      table: {
        category: 'Atributos',
        type: { summary: "'default' | 'segmented' | 'stepper'" },
        defaultValue: { summary: 'default' },
      },
    },
    value: {
      name: 'value',
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'Porcentaje de progreso (0-100). Aplica a default y segmented.',
      table: {
        category: 'Atributos',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    label: {
      name: 'label',
      control: 'text',
      description: 'Texto de la cabecera (izquierda) cuando showLabel está activo, p. ej. "Progreso".',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    ariaLabel: {
      name: 'ariaLabel',
      control: 'text',
      description: 'Nombre accesible de la barra cuando no hay cabecera visible.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    showLabel: {
      name: 'showLabel',
      control: 'boolean',
      description: 'Muestra la cabecera (etiqueta + porcentaje) encima de la barra.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showTooltip: {
      name: 'showTooltip',
      control: 'boolean',
      description: 'Muestra un tooltip con el porcentaje sobre la barra.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    steps: {
      name: 'steps',
      control: 'object',
      description: 'Array de pasos para la variante stepper. Cada paso tiene una propiedad label.',
      table: {
        category: 'Atributos',
        type: { summary: 'DcxProgressStep[]' },
        defaultValue: { summary: '[]' },
      },
    },
    currentStep: {
      name: 'currentStep',
      control: { type: 'number', min: 1, max: 5 },
      description: 'Número del paso actual (1, 2, 3...). Solo variante stepper.',
      table: {
        category: 'Atributos',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    showCheckmarks: {
      name: 'showCheckmarks',
      control: 'boolean',
      description: 'Muestra checkmarks en los pasos completados. Solo variante stepper.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    segments: {
      name: 'segments',
      control: { type: 'number', min: 1, max: 20 },
      description: 'Número de segmentos visibles. Solo variante segmented.',
      table: {
        category: 'Atributos',
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
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
    segments: 5,
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
 * Barra con cabecera del diseño: etiqueta a la izquierda y porcentaje a la derecha.
 */
export const WithHeaderLabel: Story = {
  args: {
    variant: 'default',
    value: 82,
    label: 'Progreso',
    showLabel: true,
  },
};

/**
 * Estado inicial (0%).
 */
export const Zero: Story = {
  args: {
    variant: 'default',
    value: 0,
    label: 'Progreso',
    showLabel: true,
  },
};

/**
 * Estado completado (100%).
 */
export const Complete: Story = {
  args: {
    variant: 'default',
    value: 100,
    label: 'Progreso',
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
