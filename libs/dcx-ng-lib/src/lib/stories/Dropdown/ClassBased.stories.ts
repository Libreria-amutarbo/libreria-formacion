import {
  DcxDropdownOptions,
  DcxNgDropdownComponent
} from '@dcx-ng-components/dcx-ng-lib';
import { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';

const ActionsData = {
  selectedKeyChange: fn(),
};

const meta: Meta<DcxNgDropdownComponent> = {
  title: 'DCXLibrary/Dropdown',
  component: DcxNgDropdownComponent,
  tags: ['autodocs'],
  argTypes: {
    dropdownOptions: {
      control: { type: 'object' },
      description: 'Array de opciones disponibles en el dropdown',
      table: {
        type: { summary: 'DcxDropdownOptions[]' },
        category: 'Attributes'
      },
    },
    selectedKey: {
      control: 'text',
      description: 'Clave de la opción actualmente seleccionada',
      table: { 
        category: 'Attributes',
        defaultValue: { summary: 'null' }
      }
    },
    placeholder: {
      control: 'text',
      description: 'Texto mostrado cuando no hay selección',
      table: { 
        category: 'Attributes',
        defaultValue: { summary: 'Select an option' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita la interacción con el dropdown',
      table: { 
        category: 'Attributes',
        defaultValue: { summary: 'false' }
      }
    },
    selectedKeyChange: {
      action: 'selectedKeyChange',
      description: 'Emitido cuando el usuario selecciona una opción',
      table: { 
        category: 'Events',
        type: { summary: 'Output<string | null>' }
      }
    },
  },
  args: {
    dropdownOptions: [
      { key: '1', value: 'Option 1' },
      { key: '2', value: 'Option 2' },
      { key: '3', value: 'Option 3' },
    ],
    placeholder: 'Select an option',
    disabled: false,
    selectedKey: null,
  },
};

export default meta;
type Story = StoryObj<DcxNgDropdownComponent>;

export const ClassBasedDemo: Story = {
  render: args => ({
    props: {
      ...args,
      onSelectedKeyChange: (key: string | null) => {
        ActionsData.selectedKeyChange(key);
        (args as any).selectedKey = key;
        const out = document.getElementById('log-output');
        if (out) out.textContent = String(key ?? '(ninguna)');
      },

      setSelected: (key: string | null) => {
        (args as any).selectedKey = key;
      },
      toggleDisabled: () => {
        (args as any).disabled = !args.disabled;
      },
      updatePlaceholder: (value: string) => {
        (args as any).placeholder = value;
      },
    },
    template: `
      <div style="display:grid; gap:16px; max-width:560px; height:110px;">
        <!-- Componente -->
        <dcx-ng-dropdown
          [dropdownOptions]="dropdownOptions"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [selectedKey]="selectedKey"
          (selectedKeyChange)="onSelectedKeyChange($event)"
        >
        </dcx-ng-dropdown>
      </div>
    `,
  }),
};

export const Basic: Story = {
  args: {
    dropdownOptions: [
      { key: 'red', value: 'Rojo' },
      { key: 'green', value: 'Verde' },
      { key: 'blue', value: 'Azul' },
    ],
    placeholder: 'Selecciona color',
    disabled: false,
    selectedKey: null,
  },
};

export const WithSelection: Story = {
  args: {
    dropdownOptions: [
      { key: 'opt1', value: 'Opción 1' },
      { key: 'opt2', value: 'Opción 2' },
      { key: 'opt3', value: 'Opción 3' },
      { key: 'opt4', value: 'Opción 4' },
    ],
    placeholder: 'Select',
    disabled: false,
    selectedKey: 'opt2',
  },
};

export const Disabled: Story = {
  args: {
    dropdownOptions: [
      { key: '1', value: 'Deshabilitado' },
      { key: '2', value: 'No disponible' },
    ],
    placeholder: 'Select an option',
    disabled: true,
    selectedKey: null,
  },
};

export const ManyOptions: Story = {
  args: {
    dropdownOptions: Array.from({ length: 15 }, (_, i) => ({
      key: `option-${i + 1}`,
      value: `Option ${i + 1}`,
    })),
    placeholder: 'Choose from many...',
    disabled: false,
    selectedKey: null,
  },
};
