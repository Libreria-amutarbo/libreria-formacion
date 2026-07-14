import { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import {
  DcxNgStepperComponent,
  STEPPER_BASIC_STEPS,
  STEPPER_WITH_COMPLETED,
  STEPPER_WITH_DISABLED,
  STEPPER_WITH_ERROR,
  STEPPER_WITH_OPTIONAL,
  STEPPER_WITH_ICONS,
  LAYOUT_LIST,
} from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgStepperComponent> = {
  title: 'DCXLibrary/Components/Stepper',
  component: DcxNgStepperComponent,
  tags: ['autodocs'],
  argTypes: {
    steps: {
      description: 'Array de pasos a mostrar',
      control: 'object',
      table: {
        category: 'Atributos',
        type: { summary: 'DcxStepperItem[]' },
      },
    },
    activeStepId: {
      description: 'ID del paso actualmente activo',
      control: 'text',
      table: {
        category: 'Atributos',
        type: { summary: 'string | number' },
        defaultValue: { summary: "''" },
      },
    },
    orientation: {
      description: 'Orientación del stepper',
      control: 'radio',
      options: LAYOUT_LIST,
      table: {
        category: 'Atributos',
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: 'horizontal' },
      },
    },
    linear: {
      description:
        'Fuerza la navegación secuencial (solo se puede avanzar cuando el paso actual está completado) cuando es true; si es false, permite navegar libremente entre pasos',
      control: 'boolean',
      table: {
        category: 'Atributos',
        defaultValue: { summary: 'false' },
      },
    },
    showStepNumbers: {
      description: 'Muestra el número de paso en los indicadores',
      control: 'boolean',
      table: {
        category: 'Atributos',
        defaultValue: { summary: 'true' },
      },
    },
    size: {
      description: 'Tamaño del stepper',
      control: 'radio',
      options: ['s', 'm', 'l', 'xl'],
      table: {
        category: 'Atributos',
        type: { summary: "'s' | 'm' | 'l' | 'xl'" },
        defaultValue: { summary: 'm' },
      },
    },
    ariaLabel: {
      description: 'Nombre accesible del landmark de navegación',
      control: 'text',
      table: {
        category: 'Atributos',
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
      },
    },
    stepChange: {
      description: 'Se emite cuando cambia el paso activo',
      action: 'stepChange',
      table: {
        category: 'Eventos',
        type: { summary: '(event: DcxStepperChangeEvent) => void' },
      },
    },
    stepClick: {
      description: 'Se emite cuando se hace click en un paso',
      action: 'stepClick',
      table: {
        category: 'Eventos',
        type: { summary: '(step: DcxStepperItem) => void' },
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
    ariaLabel: null,
    stepChange: fn(),
    stepClick: fn(),
  },
};

export default meta;
type Story = StoryObj<DcxNgStepperComponent>;

export const Default: Story = {
  args: {
    steps: STEPPER_BASIC_STEPS,
    activeStepId: '1',
  },
};

export const Vertical: Story = {
  args: {
    steps: STEPPER_BASIC_STEPS,
    activeStepId: '1',
    orientation: 'vertical',
  },
};

export const Linear: Story = {
  args: {
    steps: STEPPER_BASIC_STEPS,
    activeStepId: '1',
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
    activeStepId: '1',
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
    activeStepId: '1',
  },
};

export const Small: Story = {
  name: 'Pequeño',
  args: {
    steps: STEPPER_BASIC_STEPS,
    activeStepId: '1',
    size: 's',
  },
};

export const Large: Story = {
  name: 'Grande',
  args: {
    steps: STEPPER_BASIC_STEPS,
    activeStepId: '1',
    size: 'l',
  },
};

export const ExtraLarge: Story = {
  name: 'Extra grande',
  args: {
    steps: STEPPER_BASIC_STEPS,
    activeStepId: '1',
    size: 'xl',
  },
};

export const WithoutNumbers: Story = {
  name: 'Sin números (con iconos)',
  args: {
    steps: STEPPER_WITH_ICONS,
    activeStepId: '1',
    showStepNumbers: false,
  },
};

export const WithContent: Story = {
  name: 'Con contenido por paso',
  render: () => ({
    template: `
      <ng-template #addressTpl>
        <p style="margin: 0 0 8px; font-weight: 600;">Dirección de envío</p>
        <p style="margin: 0; color: var(--text-muted, #696e75); font-size: 13px;">
          Calle Ejemplo, 42 · 28001 Madrid · España
        </p>
      </ng-template>

      <dcx-ng-stepper
        [steps]="[
          { id: '1', label: 'Datos personales', description: 'Completado', completed: true },
          { id: '2', label: 'Dirección de envío', description: 'Introduce tu dirección', contentTpl: addressTpl },
          { id: '3', label: 'Método de pago', description: 'Pendiente' }
        ]"
        [orientation]="'vertical'"
        [activeStepId]="'2'"
        ariaLabel="Proceso de compra"
      ></dcx-ng-stepper>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};
