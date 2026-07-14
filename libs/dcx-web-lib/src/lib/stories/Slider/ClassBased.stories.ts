import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { SLIDER_DEFAULT_VALUES } from '../../core/defaults/slider';
import '../../../index';

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Slider',
  component: 'dcx-web-slider',
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    showLabel: {
      control: 'boolean',
      description: 'Muestra la etiqueta con el texto y el valor actual.',
      table: {
        category: 'Atributos',
      },
    },
    textLabel: {
      control: 'text',
      description: 'Texto de la etiqueta mostrada junto al valor.',
      table: {
        category: 'Atributos',
      },
    },
    value: {
      control: 'number',
      description: 'Valor actual del slider.',
      table: {
        category: 'Atributos',
      },
    },
    min: {
      control: 'number',
      description: 'Valor mínimo del slider.',
      table: {
        category: 'Atributos',
      },
    },
    max: {
      control: 'number',
      description: 'Valor máximo del slider.',
      table: {
        category: 'Atributos',
      },
    },
    step: {
      control: 'number',
      description: 'Incremento entre valores.',
      table: {
        category: 'Atributos',
      },
    },
    vertical: {
      control: 'boolean',
      description: 'Muestra el slider en orientación vertical.',
      table: {
        category: 'Atributos',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita el slider.',
      table: {
        category: 'Atributos',
      },
    },
    ariaLabel: {
      control: 'text',
      description:
        'Nombre accesible explícito. Si no se indica y showLabel es true, se usa textLabel como alternativa. Obligatorio cuando showLabel es false.',
      table: {
        category: 'Atributos',
      },
    },
    valueSuffix: {
      control: 'text',
      description:
        'Sufijo de unidad mostrado junto al valor (p.ej. "k€", " personas") y expuesto vía aria-valuetext.',
      table: {
        category: 'Atributos',
      },
    },
    valueChange: {
      action: 'valueChange',
      description: 'Se emite cuando cambia el valor del slider.',
      table: {
        category: 'Eventos',
      },
    },
  },
  args: {
    ...SLIDER_DEFAULT_VALUES,
  },
  render: (args) => html`
    <dcx-web-slider
      .showLabel="${args.showLabel}"
      .textLabel="${args.textLabel}"
      .value="${args.value}"
      .min="${args.min}"
      .max="${args.max}"
      .step="${args.step}"
      .vertical="${args.vertical}"
      .disabled="${args.disabled}"
      .ariaLabel="${args.ariaLabel}"
      .valueSuffix="${args.valueSuffix}"
      @valueChange="${args.valueChange}"
    ></dcx-web-slider>
  `,
};

export default meta;
type Story = StoryObj;

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
