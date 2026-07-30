import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import '../../../index';

import '../../dcx-web-components/dcx-web-progressbar/dcx-web-progressbar.component';

import type {
  DcxProgressStep,
} from '../../core/interfaces/progressbar';

import {PROGRESSBAR_VARIANTS} from '../../core/defaults/progressbar';



const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Progressbar',
  component: 'dcx-web-progressbar',
  tags: ['autodocs'],

  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component:
          '`dcx-web-progressbar` es un componente versátil para mostrar el progreso de tareas o guiar al usuario a través de pasos. Soporta tres variantes: barra de progreso simple (default), barra segmentada con animación (segmented) y stepper con pasos numerados o checkmarks (stepper).',
      },
    },
  },

  argTypes: {
    variant: {
      control: 'select',
      options: PROGRESSBAR_VARIANTS,
      description:
        'Variante del progressbar.',
      table: {
        category: 'Atributos',
      },
    },

    value: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 5,
      },
      description:
        'Porcentaje de progreso para variantes default y segmented.',
      table: {
        category: 'Atributos',
      },
    },

    label: {
      control: 'text',
      description:
        'Texto visible de la cabecera.',
      table: {
        category: 'Atributos',
      },
    },

    ariaLabel: {
      control: 'text',
      description:
        'Nombre accesible cuando no existe cabecera visible.',
      table: {
        category: 'Atributos',
      },
    },

    showLabel: {
      control: 'boolean',
      description:
        'Muestra cabecera con etiqueta y porcentaje.',
      table: {
        category: 'Atributos',
      },
    },

    showTooltip: {
      control: 'boolean',
      description:
        'Muestra tooltip con el porcentaje.',
      table: {
        category: 'Atributos',
      },
    },

    steps: {
      control: 'object',
      description:
        'Array de pasos para la variante stepper.',
      table: {
        category: 'Atributos',
      },
    },

    currentStep: {
      control: {
        type: 'number',
        min: 1,
        max: 10,
      },
      description:
        'Paso activo actual.',
      table: {
        category: 'Atributos',
      },
    },

    showCheckmarks: {
      control: 'boolean',
      description:
        'Muestra iconos check en pasos completados.',
      table: {
        category: 'Atributos',
      },
    },

    segments: {
      control: {
        type: 'number',
        min: 1,
        max: 20,
      },
      description:
        'Número de segmentos visibles.',
      table: {
        category: 'Atributos',
      },
    },
  },

  args: {
    variant: 'default',
    value: 60,
    label: '',
    ariaLabel: 'Progreso',
    showLabel: false,
    showTooltip: false,
    steps: [
      { label: 'Paso 1' },
      { label: 'Paso 2' },
      { label: 'Paso 3' },
    ] as DcxProgressStep[],
    currentStep: 1,
    showCheckmarks: false,
    segments: 5,
  },

  render: args => html`
    <dcx-web-progressbar
      variant=${args.variant}
      .value=${args.value}
      label=${args.label}
      aria-label=${args.ariaLabel}
      ?showLabel=${args.showLabel}
      ?showTooltip=${args.showTooltip}
      .steps=${args.steps}
      .currentStep=${args.currentStep}
      ?showCheckmarks=${args.showCheckmarks}
      .segments=${args.segments}
    >
    </dcx-web-progressbar>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Segmented: Story = {
  args: {
    variant: 'segmented',
    value: 70,
    segments: 5,
  },
};

export const WithTooltip: Story = {
  args: {
    value: 75,
    showTooltip: true,
  },
};

export const WithHeaderLabel: Story = {
  args: {
    value: 82,
    label: 'Progreso',
    showLabel: true,
  },
};

export const Zero: Story = {
  args: {
    value: 0,
    label: 'Progreso',
    showLabel: true,
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    label: 'Progreso',
    showLabel: true,
  },
};

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
  },
};