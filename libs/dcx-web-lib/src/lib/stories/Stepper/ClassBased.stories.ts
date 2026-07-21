import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';

import '../../../index';
import {LAYOUT_LIST, SIZE_LIST} from '../../core/defaults/generic';

import '../../dcx-web-components/dcx-web-stepper/dcx-web-stepper.component';

import {
  STEPPER_BASIC_STEPS,
  STEPPER_WITH_COMPLETED,
  STEPPER_WITH_DISABLED,
  STEPPER_WITH_ERROR,
  STEPPER_WITH_OPTIONAL,
  STEPPER_WITH_ICONS,
} from '../../core/defaults/stepper';

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Stepper',
  component: 'dcx-web-stepper',
  tags: ['autodocs'],

  parameters: {
    controls: {
      expanded: true,
    },
  },

  argTypes: {
    steps: {
      control: 'object',
      description: 'Array de pasos del stepper.',
      table: {
        category: 'Atributos',
      },
    },

    activeStepId: {
      control: 'text',
      description: 'Id del paso activo.',
      table: {
        category: 'Atributos',
      },
    },

    orientation: {
      control: 'select',
      options: LAYOUT_LIST,
      description: 'Orientación del stepper.',
      table: {
        category: 'Atributos',
      },
    },

    linear: {
      control: 'boolean',
      description: 'Activa navegación secuencial.',
      table: {
        category: 'Atributos',
      },
    },

    showStepNumbers: {
      control: 'boolean',
      description: 'Muestra números de paso.',
      table: {
        category: 'Atributos',
      },
    },

    size: {
      control: 'select',
      options: SIZE_LIST,
      description: 'Tamaño del componente.',
      table: {
        category: 'Atributos',
      },
    },

    ariaLabel: {
      control: 'text',
      description: 'Nombre accesible del landmark.',
      table: {
        category: 'Atributos',
      },
    },

    stepClick: {
      action: 'stepClick',
      description:
        'Emitido cuando se hace click sobre un paso.',
      table: {
        category: 'Eventos',
      },
    },

    stepChange: {
      action: 'stepChange',
      description:
        'Emitido cuando cambia el paso activo.',
      table: {
        category: 'Eventos',
      },
    },
  },

  args: {
    steps: STEPPER_BASIC_STEPS,
    activeStepId: '1',
    orientation: 'horizontal',
    linear: false,
    showStepNumbers: true,
    size: 'm',
    ariaLabel: '',
  },

  render: args => html`
    <dcx-web-stepper
      .steps=${args.steps}
      .activeStepId=${args.activeStepId}
      orientation=${args.orientation}
      ?linear=${args.linear}
      .showStepNumbers=${args.showStepNumbers}
      size=${args.size}
      aria-label=${args.ariaLabel}
    >
    </dcx-web-stepper>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
};

export const Linear: Story = {
  args: {
    linear: true,
  },
};

export const WithCompletedSteps: Story = {
  name: 'Con pasos completados',
  args: {
    steps: STEPPER_WITH_COMPLETED,
    activeStepId: '3',
  },
};

export const WithDisabledSteps: Story = {
  name: 'Con pasos deshabilitados',
  args: {
    steps: STEPPER_WITH_DISABLED,
  },
};

export const WithErrorSteps: Story = {
  name: 'Con estado de error',
  args: {
    steps: STEPPER_WITH_ERROR,
    activeStepId: '2',
  },
};

export const WithOptionalSteps: Story = {
  name: 'Con paso opcional',
  args: {
    steps: STEPPER_WITH_OPTIONAL,
  },
};

export const Small: Story = {
  name: 'Pequeño',
  args: {
    size: 's',
  },
};

export const Large: Story = {
  name: 'Grande',
  args: {
    size: 'l',
  },
};

export const ExtraLarge: Story = {
  name: 'Extra grande',
  args: {
    size: 'xl',
  },
};

export const WithoutNumbers: Story = {
  name: 'Sin números (con iconos)',
  args: {
    showStepNumbers: false,
    steps: STEPPER_WITH_ICONS,
  },
};

export const WithContent: Story = {
  name: 'Con contenido por paso',

  render: () => html`
    <dcx-web-stepper
      .steps=${[
        {
          id: '1',
          label: 'Datos personales',
          description: 'Completado',
          completed: true,
        },
        {
          id: '2',
          label: 'Dirección de envío',
          description: 'Introduce tu dirección',
          contentTpl: 'slot',
        },
        {
          id: '3',
          label: 'Método de pago',
          description: 'Pendiente',
        },
      ]}
      activeStepId="2"
      orientation="vertical"
      aria-label="Proceso de compra"
    >
      <div slot="step-content">
        <p style="margin:0 0 var(--sp-2, 8px);font-weight: var(--fw-semibold, 600);">
          Dirección de envío
        </p>

        <p
          style="
            margin:0;
            color:var(--text-muted,#696e75);
            font-size:var(--fs-base, 13px);
          "
        >
          Calle Ejemplo, 42 · 28001 Madrid · España
        </p>
      </div>
    </dcx-web-stepper>
  `,

  parameters: {
    controls: {
      disable: true,
    },
  },
};