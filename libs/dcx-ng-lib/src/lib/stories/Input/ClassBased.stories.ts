import { DcxNgInputComponent } from '@dcx-ng-components/dcx-ng-lib';
import { Meta, StoryObj } from '@storybook/angular';


const meta: Meta<DcxNgInputComponent> = {
  title: 'DCXLibrary/Input/ClassBased',
  component: DcxNgInputComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'number', 'email', 'password', 'date', 'search', 'tel', 'url'],
      defaultValue: 'text',
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l', 'xl'],
      defaultValue: 'm',
    },
    placeholder: {
      control: 'text',
      defaultValue: null,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    required: {
      control: 'boolean',
      defaultValue: false,
    },
    label: {
      control: 'text',
      defaultValue: null,
    },
    value: {
      control: 'text',
      defaultValue: null,
    }
  },
};

export default meta;
type Story = StoryObj<DcxNgInputComponent>;

export const TextSmall: Story = {
  args: {
    type: 'text',
    size: 's',
    placeholder: 'Enter text...',
    disabled: false,
    required: false,
    label: 'Input Label',
    value: '',
  },
};

export const NumberMedium: Story = {
  args: {
    type: 'number',
    size: 'm',
    placeholder: 'Enter number...',
    disabled: false,
    required: false,
    label: 'Input Label',
    value: '',
  },
};

export const EmailLargeRequired: Story = {
  args: {
    type: 'email',
    size: 'l',
    placeholder: 'Enter email...',
    disabled: false,
    required: true,
    label: 'Input Label',
    value: '',
  },
};

export const PasswordExtraLarge: Story = {
  args: {
    type: 'password',
    size: 'xl',
    placeholder: 'Enter password...',
    disabled: false,
    required: false,
    label: 'Input Label',
    value: '',
  },
};

export const DateSmallRequired: Story = {
  args: {
    type: 'date',
    size: 's',
    placeholder: 'Select date...',
    disabled: false,
    required: true,
    label: 'Date Input',
    value: '',
  },
};

export const SearchDefault: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
    label: 'Search Input',
    value: '',
  },
};

export const TelDisabled: Story = {
  args: {
    type: 'tel',
    size: 'm',
    placeholder: 'Enter phone number...',
    disabled: true,
    required: false,
    label: 'Phone Input',
    value: '',
  },
};
