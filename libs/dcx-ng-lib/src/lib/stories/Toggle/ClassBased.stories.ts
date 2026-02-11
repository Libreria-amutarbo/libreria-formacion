import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgToggleComponent } from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgToggleComponent> = {
  title: 'DCXLibrary/Toggle/Class based',
  component: DcxNgToggleComponent,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      table: { category: 'Attributes' },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'Attributes' },
    },
    label: {
      control: 'text',
      table: { category: 'Attributes' },
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l'],
      table: { category: 'Attributes' },
    },
    ariaLabel: {
      control: 'text',
      table: { category: 'Attributes' },
    },
    textPosition: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      table: { category: 'Attributes' },
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgToggleComponent>;

export const DefaultToggle: Story = {
  args: {
    checked: false,
    disabled: false,
    label: 'Enable feature',
    size: 'm',
    ariaLabel: 'Enable feature',
    textPosition: 'right',
  },
};

export const CheckedByDefault: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Active by default',
    size: 'm',
    ariaLabel: 'Active toggle',
    textPosition: 'right',
  },
};

export const DisabledToggle: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Cannot interact',
    size: 'm',
    ariaLabel: 'Disabled toggle',
    textPosition: 'right',
  },
};

export const AriaOnlyToggle: Story = {
  args: {
    checked: false,
    disabled: false,
    label: null,
    size: 'm',
    ariaLabel: 'Toggle without visible label',
    textPosition: 'right',
  },
};

export const SmallToggle: Story = {
  args: {
    checked: false,
    disabled: false,
    label: 'Small toggle',
    size: 's',
    ariaLabel: 'Small toggle',
    textPosition: 'right',
  },
};

export const MediumToggle: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Medium toggle',
    size: 'm',
    ariaLabel: 'Medium toggle',
    textPosition: 'right',
  },
};

export const LargeToggle: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Large toggle',
    size: 'l',
    ariaLabel: 'Large toggle',
    textPosition: 'right',
  },
};

export const RightLabelToggle: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Right label toggle',
    size: 'm',
    ariaLabel: 'Right label toggle',
    textPosition: 'right',
  },
};

export const LeftLabelToggle: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Left label toggle',
    size: 'm',
    ariaLabel: 'Left label toggle',
    textPosition: 'left',
  },
};

export const TopLabelToggle: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Top label toggle',
    size: 'm',
    ariaLabel: 'Top label toggle',
    textPosition: 'top',
  },
};

export const BottomLabelToggle: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Bottom label toggle',
    size: 'm',
    ariaLabel: 'Bottom label toggle',
    textPosition: 'bottom',
  },
};
