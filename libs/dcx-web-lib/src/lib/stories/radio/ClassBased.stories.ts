import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../../../index';
import type { DcxRadioOption } from '../../core/interfaces/radio';
import { RADIO_DEFAULT_OPTIONS, RADIO_SIZES } from '../../core/defaults';


const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Radio',
  component: 'dcx-web-radio',
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Array de opciones del grupo: { value, label, disabled? }.',
      table: {
        category: 'Atributos',
        type: { summary: 'DcxRadioOption[]' },
      },
    },
    label: {
      control: 'text',
      description: 'Texto del legend del grupo — nombre accesible del conjunto de radios.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
      },
    },
    name: {
      control: 'text',
      description: 'Nombre nativo del grupo. Se genera automáticamente si no se indica.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
      },
    },
    size: {
      control: { type: 'radio' },
      options: RADIO_SIZES,
      description: 'Tamaño de los radio buttons del grupo.',
      table: {
        category: 'Atributos',
        type: { summary: 'DcxRadioSize' },
        defaultValue: { summary: 'l' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita todas las opciones del grupo.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Estado de error del grupo.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    errorMessage: {
      control: 'text',
      description: 'Mensaje de error, anunciado con role="alert".',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
      },
    },
    hint: {
      control: 'text',
      description: 'Texto de ayuda bajo el grupo. Se oculta si hay error visible.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Nombre accesible cuando no hay label visible.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: 'Valor seleccionado actualmente.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    options: RADIO_DEFAULT_OPTIONS,
    label: 'Elige tu opción favorita',
    size: 'm',
    disabled: false,
    error: false,
    errorMessage: '',
    hint: '',
    ariaLabel: '',
    value: '',
  },
  render: (args: any) => {
    return html`
      <dcx-web-radio
        .options="${args.options}"
        .label="${args.label}"
        .name="${args.name || ''}"
        .size="${args.size}"
        ?disabled="${args.disabled}"
        ?error="${args.error}"
        .errorMessage="${args.errorMessage || ''}"
        .hint="${args.hint || ''}"
        .ariaLabel="${args.ariaLabel || ''}"
        .value="${args.value || ''}"
        @valueChange="${(e: CustomEvent) => args.value = e.detail}"
      ></dcx-web-radio>
    `;
  },
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  args: {
    options: RADIO_DEFAULT_OPTIONS,
    label: 'Elige tu opción favorita',
    size: 'm',
    disabled: false,
  },
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <dcx-web-radio .options="${[{ value: 's', label: 'Small (S)' }]}" size="s"></dcx-web-radio>
      <dcx-web-radio .options="${[{ value: 'm', label: 'Medium (M)' }]}" size="m"></dcx-web-radio>
      <dcx-web-radio .options="${[{ value: 'l', label: 'Large (L)' }]}" size="l"></dcx-web-radio>
    </div>
  `,
};

export const WithDisabledOption: Story = {
  args: {
    label: 'Elige un plan',
    size: 'm',
    options: [
      { value: 'basico', label: 'Básico' },
      { value: 'pro', label: 'Pro' },
      { value: 'enterprise', label: 'Enterprise (no disponible)', disabled: true },
    ],
  },
};

export const Disabled: Story = {
  args: {
    label: 'Grupo deshabilitado',
    size: 'm',
    disabled: true,
    options: RADIO_DEFAULT_OPTIONS,
  },
};

export const WithHint: Story = {
  args: {
    label: 'Tipo de suscripción',
    size: 'm',
    hint: 'Puedes cambiar de plan en cualquier momento',
    options: [
      { value: 'mensual', label: 'Plan mensual' },
      { value: 'anual', label: 'Plan anual' },
    ],
  },
};

export const Error: Story = {
  args: {
    label: '¿Aceptas los términos?',
    size: 'm',
    error: true,
    errorMessage: 'Debes seleccionar una opción',
    options: [
      { value: 'si', label: 'Sí' },
      { value: 'no', label: 'No' },
    ],
  },
};
