import { DcxNgRadioComponent } from '@dcx-ng-components/dcx-ng-lib';
import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator } from '@storybook/angular';

const BASIC_OPTIONS = [
  { value: 'opcion1', label: 'Opción 1' },
  { value: 'opcion2', label: 'Opción 2' },
  { value: 'opcion3', label: 'Opción 3' },
];

const meta: Meta<DcxNgRadioComponent> = {
  title: 'DCXLibrary/Components/Radio',
  component: DcxNgRadioComponent,
  tags: ['autodocs'],
  decorators: [componentWrapperDecorator(story => `<div>${story}</div>`)],
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
      options: ['s', 'm', 'l'],
      description: 'Tamaño de los radio buttons del grupo.',
      table: {
        category: 'Atributos',
        type: { summary: "'s' | 'm' | 'l'" },
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
  },
};

export default meta;
type Story = StoryObj<DcxNgRadioComponent>;

export const Basic: Story = {
  render: args => ({
    props: args,
    template: `
      <dcx-ng-radio
        [options]="options"
        [label]="label"
        [size]="size"
        [disabled]="disabled">
      </dcx-ng-radio>
    `,
  }),
  args: {
    options: BASIC_OPTIONS,
    label: 'Elige tu opción favorita',
    size: 'm',
    disabled: false,
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <dcx-ng-radio [options]="[{value:'s',label:'Small (S)'}]" size="s"></dcx-ng-radio>
        <dcx-ng-radio [options]="[{value:'m',label:'Medium (M)'}]" size="m"></dcx-ng-radio>
        <dcx-ng-radio [options]="[{value:'l',label:'Large (L)'}]" size="l"></dcx-ng-radio>
      </div>
    `,
  }),
};

export const WithDisabledOption: Story = {
  render: args => ({
    props: args,
    template: `
      <dcx-ng-radio [options]="options" [label]="label" [size]="size"></dcx-ng-radio>
    `,
  }),
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
  render: args => ({
    props: args,
    template: `
      <dcx-ng-radio [options]="options" [label]="label" [size]="size" [disabled]="disabled"></dcx-ng-radio>
    `,
  }),
  args: {
    label: 'Grupo deshabilitado',
    size: 'm',
    disabled: true,
    options: BASIC_OPTIONS,
  },
};

export const WithHint: Story = {
  render: args => ({
    props: args,
    template: `
      <dcx-ng-radio [options]="options" [label]="label" [size]="size" [hint]="hint"></dcx-ng-radio>
    `,
  }),
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
  render: args => ({
    props: args,
    template: `
      <dcx-ng-radio
        [options]="options"
        [label]="label"
        [size]="size"
        [error]="error"
        [errorMessage]="errorMessage">
      </dcx-ng-radio>
    `,
  }),
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
