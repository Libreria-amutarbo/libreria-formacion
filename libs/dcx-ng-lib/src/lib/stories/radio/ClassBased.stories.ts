import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgRadioComponent } from '../../dcx-ng-components/dcx-ng-radio/dcx-ng-radio.component';

const meta: Meta<DcxNgRadioComponent> = {
  title: 'DCXLibrary/Radio/Class based',
  component: DcxNgRadioComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['s', 'm', 'l'],
      description: 'Tamaño del radio button',
      table: {
        category: 'Attributes',
        type: { summary: "'s' | 'm' | 'l'" },
        defaultValue: { summary: 'l' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Estado deshabilitado',
      table: {
        category: 'Attributes',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Estado de error',
      table: {
        category: 'Attributes',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    hover: {
      control: 'boolean',
      description: 'Estado hover',
      table: {
        category: 'Attributes',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    focus: {
      control: 'boolean',
      description: 'Estado focus',
      table: {
        category: 'Attributes',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    unstyled: {
      control: 'boolean',
      description: 'Sin estilos personalizados',
      table: {
        category: 'Attributes',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Texto del label',
      table: {
        category: 'Attributes',
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: 'Valor del radio button',
      table: {
        category: 'Attributes',
        type: { summary: 'string' },
      },
    },
    name: {
      control: 'text',
      description: 'Nombre del grupo de radios',
      table: {
        category: 'Attributes',
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgRadioComponent>;

export const Basico: Story = {
  args: {
    name: 'ejemplo',
    value: 'valor1',
    label: 'Basico',
    size: 'm',
    disabled: false,
    unstyled: false,
    error: false,
    hover: false,
    focus: false,
  },
};

export const Tamaños: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 1rem; flex-direction: column;">
        <dcx-ng-radio name="grupo" value="s" label="Small (S)" size="s"></dcx-ng-radio>
        <dcx-ng-radio name="grupo" value="m" label="Medium (M)" size="m"></dcx-ng-radio>
        <dcx-ng-radio name="grupo" value="l" label="Large (L)" size="l"></dcx-ng-radio>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    name: 'disabled',
    value: 'valorDisabled',
    label: 'Radio deshabilitado',
    size: 'm',
    disabled: true,
    unstyled: false,
    error: false,
    hover: false,
    focus: false,
  },
};

export const Error: Story = {
  args: {
    name: 'error',
    value: 'valorError',
    label: 'Estado de error',
    size: 'm',
    disabled: false,
    unstyled: false,
    error: true,
    hover: false,
    focus: false,
  },
};

export const Hover: Story = {
  args: {
    name: 'hover',
    value: 'valorHover',
    label: 'Estado hover',
    size: 'm',
    disabled: false,
    unstyled: false,
    error: false,
    hover: true,
    focus: false,
  },
};

export const Focus: Story = {
  args: {
    name: 'focus',
    value: 'valorFocus',
    label: 'Estado focus',
    size: 'm',
    disabled: false,
    unstyled: false,
    error: false,
    hover: false,
    focus: true,
  },
};

export const GrupoCompleto: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 1rem; flex-direction: column;">
        <h3>Selecciona una opción</h3>
        <dcx-ng-radio name="opciones" value="opcion1" label="Opción 1" size="m"></dcx-ng-radio>
        <dcx-ng-radio name="opciones" value="opcion2" label="Opción 2" size="m"></dcx-ng-radio>
        <dcx-ng-radio name="opciones" value="opcion3" label="Opción 3" size="m"></dcx-ng-radio>
        <dcx-ng-radio name="opciones" value="opcion4" label="Opción 4 (Error)" size="m" [error]="true"></dcx-ng-radio>
      </div>
    `,
  }),
};