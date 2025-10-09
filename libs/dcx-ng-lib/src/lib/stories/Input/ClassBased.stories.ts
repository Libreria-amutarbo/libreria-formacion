import { DcxNgInputComponent, InputSize, InputType } from '@dcx-ng-components/dcx-ng-lib';
import { Meta, StoryObj } from '@storybook/angular';


const meta: Meta<DcxNgInputComponent> = {
  title: 'DCXLibrary/Input/ClassBased',
  component: DcxNgInputComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [InputType.TEXT, InputType.NUMBER, InputType.EMAIL, InputType.PASSWORD, InputType.DATE, InputType.SEARCH, InputType.TEL, InputType.URL],
      defaultValue: InputType.TEXT,
    },
    size: {
      control: 'select',
      options: [InputSize.SMALL, InputSize.MEDIUM, InputSize.LARGE, InputSize.EXTRA_LARGE],
      defaultValue: InputSize.MEDIUM,
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
    }
  },
};

export default meta;
type Story = StoryObj<DcxNgInputComponent>;

export const TextSmall: Story = {
  args: {
    type: InputType.TEXT,
    size: InputSize.SMALL,
    placeholder: 'Enter text...',
    disabled: false,
    required: false,
    label: 'Input Label',
  },
};

export const NumberMedium: Story = {
  args: {
    type: InputType.NUMBER,
    size: InputSize.MEDIUM,
    placeholder: 'Enter number...',
    disabled: false,
    required: false,
    label: 'Input Label',
  },
};

export const EmailLargeRequired: Story = {
  args: {
    type: InputType.EMAIL,
    size: InputSize.LARGE,
    placeholder: 'Enter email...',
    disabled: false,
    required: true,
    label: 'Input Label',
  },
};

export const PasswordExtraLarge: Story = {
  args: {
    type: InputType.PASSWORD,
    size: InputSize.EXTRA_LARGE,
    placeholder: 'Enter password...',
    disabled: false,
    required: false,
    label: 'Input Label',
  },
};

export const DateSmallRequired: Story = {
  args: {
    type: InputType.DATE,
    size: InputSize.SMALL,
    placeholder: 'Select date...',
    disabled: false,
    required: true,
    label: 'Date Input',
  },
};

export const SearchDefault: Story = {
  args: {
    type: InputType.SEARCH,
    placeholder: 'Search...',
    label: 'Search Input'
  },
};

export const TelDisabled: Story = {
  args: {
    type: InputType.TEL,
    size: InputSize.MEDIUM,
    placeholder: 'Enter phone number...',
    disabled: true,
    required: false,
    label: 'Phone Input',
  },
};
