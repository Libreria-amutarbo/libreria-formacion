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
  title: 'DCXLibrary/Dropdown/Class based',
  component: DcxNgDropdownComponent,
  tags: ['autodocs'],
  argTypes: {
    dropdownOptions: {
      control: { type: 'object' },
      table: {
        type: { summary: 'Array<{ key: string; value: string | number }>' },
        category: 'Attributes'
      },
    },
    selectedKey: {
      control: 'text',
      table: { category: 'Attributes' }
    },
    placeholder: {
      control: 'text',
      table: { category: 'Attributes' }
    },
    disabled: {
      control: 'boolean',
      table: { category: 'Attributes' }
    },
    selectedKeyChange: {
      action: 'selectedKeyChange',
      table: { category: 'Events' }
    },
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
