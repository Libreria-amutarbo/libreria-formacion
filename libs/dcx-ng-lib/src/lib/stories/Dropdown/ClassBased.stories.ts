import { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import {
  DcxNgDropdownComponent,
  DropdownOptions,
} from '@dcx-ng-components/dcx-ng-lib';

const ActionsData = {
  selectedKeyChange: fn(),
};

const meta: Meta<DcxNgDropdownComponent> = {
  title: 'DCXLibrary/Dropdown/Class based',
  component: DcxNgDropdownComponent,
  tags: ['autodocs'],
  argTypes: {
    dropdownOptions: {
      control: { type: 'object' },
      table: {
        type: { summary: 'Array<{ key: string; value: string | number }>' },
      },
    },
    selectedKey: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    selectedKeyChange: { action: 'selectedKeyChange' },
  },
  args: {
    dropdownOptions: [
      { key: 'red', value: 'Rojo' },
      { key: 'green', value: 'Verde' },
      { key: 'blue', value: 'Azul' },
    ] as DropdownOptions[],
    selectedKey: null,
    placeholder: 'Selecciona color',
    disabled: false,
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
