import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { DcxNgDropdownComponent } from '../../dcx-ng-components/dcx-ng-dropdown/dcx-ng-dropdown.component';
import { DcxDropdownOptions } from '../../core/interfaces/dropdown';

// Mock data
const basicOptions: DcxDropdownOptions[] = [
  { key: '1', value: 'Option 1' },
  { key: '2', value: 'Option 2' },
  { key: '3', value: 'Option 3' },
  { key: '4', value: 'Option 4' },
];

const optionsWithIcons: DcxDropdownOptions[] = [
  { key: 'home', value: 'Home', icon: 'house-fill' },
  { key: 'profile', value: 'Profile', icon: 'person-fill' },
  { key: 'settings', value: 'Settings', icon: 'gear-fill' },
  { key: 'messages', value: 'Messages', icon: 'envelope-fill' },
  { key: 'notifications', value: 'Notifications', icon: 'bell-fill' },
];

const optionsWithDisabled: DcxDropdownOptions[] = [
  { key: '1', value: 'Available Option 1' },
  { key: '2', value: 'Available Option 2' },
  { key: '3', value: 'Disabled Option', disabled: true },
  { key: '4', value: 'Available Option 3' },
  { key: '5', value: 'Another Disabled', disabled: true },
];

const optionsWithDividers: DcxDropdownOptions[] = [
  { key: 'new', value: 'New File', icon: 'file-earmark-plus' },
  { key: 'open', value: 'Open File', icon: 'folder2-open' },
  { key: 'div1', value: '', divider: true },
  { key: 'save', value: 'Save', icon: 'save' },
  { key: 'saveas', value: 'Save As...', icon: 'save-fill' },
  { key: 'div2', value: '', divider: true },
  { key: 'print', value: 'Print', icon: 'printer' },
  { key: 'export', value: 'Export', icon: 'box-arrow-up' },
  { key: 'div3', value: '', divider: true },
  { key: 'exit', value: 'Exit', icon: 'x-circle' },
];

const optionsWithAll: DcxDropdownOptions[] = [
  { key: 'edit', value: 'Edit', icon: 'pencil-square' },
  { key: 'copy', value: 'Copy', icon: 'clipboard' },
  { key: 'paste', value: 'Paste', icon: 'clipboard-check', disabled: true },
  { key: 'div1', value: '', divider: true },
  { key: 'delete', value: 'Delete', icon: 'trash' },
  { key: 'rename', value: 'Rename', icon: 'pen' },
  { key: 'div2', value: '', divider: true },
  { key: 'properties', value: 'Properties', icon: 'info-circle' },
];

const manyOptions: DcxDropdownOptions[] = Array.from({ length: 20 }, (_, i) => ({
  key: `option-${i + 1}`,
  value: `Option ${i + 1}`,
  icon: i % 3 === 0 ? 'star-fill' : undefined,
}));

const meta: Meta<DcxNgDropdownComponent> = {
  title: 'DCXLibrary/Dropdown/ClassBased',
  component: DcxNgDropdownComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, DcxNgDropdownComponent],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
  },
  argTypes: {
    dropdownOptions: {
      name: 'dropdownOptions',
      control: { type: 'object' },
      description: 'Array of dropdown options',
      table: {
        category: 'Attributes',
        type: { summary: 'DcxDropdownOptions[]' },
      },
    },
    placeholder: {
      name: 'placeholder',
      control: { type: 'text' },
      description: 'Placeholder text when no option is selected',
      table: {
        category: 'Attributes',
        type: { summary: 'string' },
        defaultValue: { summary: 'Select an option' },
      },
    },
    disabled: {
      name: 'disabled',
      control: { type: 'boolean' },
      description: 'Disable the entire dropdown',
      table: {
        category: 'Attributes',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    selectedKey: {
      name: 'selectedKey',
      control: { type: 'text' },
      description: 'Key of the selected option',
      table: {
        category: 'Attributes',
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
      },
    },
    buttonIcon: {
      name: 'buttonIcon',
      control: { type: 'text' },
      description: 'Icon to display in the button',
      table: {
        category: 'Attributes',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    trigger: {
      name: 'trigger',
      control: { type: 'select' },
      options: ['click', 'hover'],
      description: 'How the dropdown is triggered',
      table: {
        category: 'Attributes',
        type: { summary: "'click' | 'hover'" },
        defaultValue: { summary: 'click' },
      },
    },
    buttonVariant: {
      name: 'buttonVariant',
      control: { type: 'select' },
      options: ['primary', 'secondary', 'link', 'icon'],
      description: 'Button variant style',
      table: {
        category: 'Attributes',
        type: { summary: 'ButtonVariant' },
        defaultValue: { summary: 'secondary' },
      },
    },
    buttonSize: {
      name: 'buttonSize',
      control: { type: 'select' },
      options: ['s', 'm', 'l'],
      description: 'Button size',
      table: {
        category: 'Attributes',
        type: { summary: "'s' | 'm' | 'l'" },
        defaultValue: { summary: 'm' },
      },
    },
    selectedKeyChange: {
      name: 'selectedKeyChange',
      action: 'selectedKeyChange',
      description: 'Event emitted when selected option changes',
      table: {
        category: 'Events',
        type: { summary: '(key: string | null) => void' },
      },
    },
    optionSelected: {
      name: 'optionSelected',
      action: 'optionSelected',
      description: 'Event emitted when an option is selected',
      table: {
        category: 'Events',
        type: { summary: '(option: DcxDropdownOptions) => void' },
      },
    },
    opened: {
      name: 'opened',
      action: 'opened',
      description: 'Event emitted when dropdown opens',
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
    closed: {
      name: 'closed',
      action: 'closed',
      description: 'Event emitted when dropdown closes',
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
  },
  args: {
    dropdownOptions: basicOptions,
    placeholder: 'Select an option',
    disabled: false,
    selectedKey: null,
    buttonIcon: '',
    trigger: 'click',
    buttonVariant: 'secondary',
    buttonSize: 'm',
  },
};

export default meta;
type Story = StoryObj<DcxNgDropdownComponent>;

export const Default: Story = {
  args: {
    dropdownOptions: basicOptions,
  },
};

export const WithIcons: Story = {
  args: {
    dropdownOptions: optionsWithIcons,
    placeholder: 'Choose a section',
  },
};

export const WithButtonIcon: Story = {
  args: {
    dropdownOptions: basicOptions,
    buttonIcon: 'star-fill',
    placeholder: 'Favorites',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    dropdownOptions: optionsWithDisabled,
    placeholder: 'Select an option',
  },
};

export const WithDividers: Story = {
  args: {
    dropdownOptions: optionsWithDividers,
    placeholder: 'File Menu',
  },
};

export const WithAllFeatures: Story = {
  args: {
    dropdownOptions: optionsWithAll,
    placeholder: 'Actions',
    buttonIcon: 'three-dots',
    buttonVariant: 'icon',
  },
};

export const HoverTrigger: Story = {
  args: {
    dropdownOptions: optionsWithIcons,
    trigger: 'hover',
    placeholder: 'Hover to open',
  },
};

export const ClickTrigger: Story = {
  args: {
    dropdownOptions: optionsWithIcons,
    trigger: 'click',
    placeholder: 'Click to open',
  },
};

export const DisabledDropdown: Story = {
  args: {
    dropdownOptions: basicOptions,
    disabled: true,
    placeholder: 'Disabled dropdown',
  },
};

export const PreSelected: Story = {
  args: {
    dropdownOptions: optionsWithIcons,
    selectedKey: 'profile',
  },
};

export const LargeSize: Story = {
  args: {
    dropdownOptions: optionsWithIcons,
    buttonSize: 'l',
    placeholder: 'Large dropdown',
  },
};

export const SmallSize: Story = {
  args: {
    dropdownOptions: optionsWithIcons,
    buttonSize: 's',
    placeholder: 'Small dropdown',
  },
};

export const PrimaryVariant: Story = {
  args: {
    dropdownOptions: basicOptions,
    buttonVariant: 'primary',
    placeholder: 'Primary style',
  },
};

export const ManyOptions: Story = {
  args: {
    dropdownOptions: manyOptions,
    placeholder: 'Many options (scroll)',
  },
};

export const IconButton: Story = {
  args: {
    dropdownOptions: optionsWithAll,
    buttonVariant: 'icon',
    buttonIcon: 'three-dots-vertical',
    placeholder: '',
  },
};

export const Interactive: Story = {
  render: (args) => ({
    props: {
      ...args,
      currentSelection: null as string | null,
      onSelectionChange(key: string | null) {
        (this as any).currentSelection = key;
        const option = (this as any).dropdownOptions.find((opt: DcxDropdownOptions) => opt.key === key);
        console.log('Selected:', key, option);
      },
    },
    template: `
      <div style="max-width: 400px; padding: 20px;">
        <h3 style="margin-bottom: 16px;">Interactive Dropdown Demo</h3>
        
        <dcx-ng-dropdown
          [dropdownOptions]="dropdownOptions"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [selectedKey]="currentSelection"
          [buttonIcon]="buttonIcon"
          [trigger]="trigger"
          [buttonVariant]="buttonVariant"
          [buttonSize]="buttonSize"
          (selectedKeyChange)="onSelectionChange($event)"
          (optionSelected)="optionSelected($event)"
          (opened)="opened()"
          (closed)="closed()">
        </dcx-ng-dropdown>
        
        <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px;">
          <strong>Selected Key:</strong> {{ currentSelection || '(none)' }}
        </div>
      </div>
    `,
  }),
  args: {
    dropdownOptions: optionsWithAll,
    placeholder: 'Choose an action',
    trigger: 'click',
  },
};
