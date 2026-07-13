import {
  SLIDER_DEFAULT_VALUES,
  DcxNgSliderComponent,
} from '@dcx-ng-components/dcx-ng-lib';
import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';

const meta: Meta<DcxNgSliderComponent> = {
  title: 'DCXLibrary/Components/Slider',
  component: DcxNgSliderComponent,
  tags: ['autodocs'],
  argTypes: {
    showLabel: {
      name: 'showLabel',
      description: 'Muestra la etiqueta con el texto y el valor actual.',
      control: { type: 'boolean' },
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    textLabel: {
      name: 'textLabel',
      description: 'Texto de la etiqueta mostrada junto al valor.',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: 'Value' },
      },
    },
    value: {
      name: 'value',
      control: { type: 'number' },
      description: 'Valor actual del slider.',
      table: {
        category: 'Atributos',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    min: {
      name: 'min',
      control: { type: 'number' },
      description: 'Valor mínimo del slider.',
      table: {
        category: 'Atributos',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    max: {
      name: 'max',
      control: { type: 'number' },
      description: 'Valor máximo del slider.',
      table: {
        category: 'Atributos',
        type: { summary: 'number' },
        defaultValue: { summary: '50' },
      },
    },
    step: {
      name: 'step',
      control: { type: 'number' },
      description: 'Incremento entre valores.',
      table: {
        category: 'Atributos',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    vertical: {
      name: 'vertical',
      control: { type: 'boolean' },
      description: 'Muestra el slider en orientación vertical.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      name: 'disabled',
      control: { type: 'boolean' },
      description: 'Deshabilita el slider.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    ariaLabel: {
      name: 'ariaLabel',
      control: { type: 'text' },
      description:
        'Nombre accesible explícito. Si no se indica y showLabel es true, se usa textLabel como alternativa. Obligatorio cuando showLabel es false.',
      table: {
        category: 'Atributos',
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
      },
    },
    valueSuffix: {
      name: 'valueSuffix',
      control: { type: 'text' },
      description:
        'Sufijo de unidad mostrado junto al valor (p.ej. "k€", " personas") y expuesto vía aria-valuetext.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    valueChange: {
      name: 'valueChange',
      action: 'value changed',
      description: 'Se emite cuando cambia el valor del slider.',
      table: {
        category: 'Eventos',
        type: {
          summary: '(value: number) => void',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
  },
  args: {
    showLabel: SLIDER_DEFAULT_VALUES.showLabel,
    textLabel: SLIDER_DEFAULT_VALUES.textLabel,
    value: SLIDER_DEFAULT_VALUES.value,
    step: SLIDER_DEFAULT_VALUES.step,
    vertical: SLIDER_DEFAULT_VALUES.vertical,
    min: SLIDER_DEFAULT_VALUES.min,
    max: SLIDER_DEFAULT_VALUES.max,
    disabled: SLIDER_DEFAULT_VALUES.disabled,
  },
  decorators: [
    moduleMetadata({
      imports: [DcxNgSliderComponent],
    }),
  ],
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<DcxNgSliderComponent>;

export const Default: Story = {};

export const Vertical: Story = {
  args: {
    vertical: true,
  },
};

export const ConSufijo: Story = {
  args: {
    textLabel: 'Presupuesto (k€)',
    value: 60,
    max: 100,
    valueSuffix: 'k€',
  },
};

export const Disabled: Story = {
  args: {
    textLabel: 'Duración (deshabilitado)',
    value: 12,
    min: 1,
    max: 24,
    valueSuffix: ' meses',
    disabled: true,
  },
};
