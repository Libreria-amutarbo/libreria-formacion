import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgToggleComponent } from '../../dcx-ng-components/dcx-ng-toggle/dcx-ng-toggle.component';

const meta: Meta<DcxNgToggleComponent> = {
  title: 'DCXLibrary/Toggle/Without style',
  component: DcxNgToggleComponent,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    size: {
      control: 'select',
      options: ['s', 'm', 'l'],
    },
    color: { control: 'color' },
    ariaLabel: { control: 'text' },
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
    color: 'black',
    ariaLabel: 'Enable feature',
  },
};

export const CheckedByDefault: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Active by default',
    size: 'm',
    color: 'black',
    ariaLabel: 'Active toggle',
  },
};

export const DisabledToggle: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Cannot interact',
    size: 'm',
    color: 'black',
    ariaLabel: 'Disabled toggle',
  },
};

export const AriaOnlyToggle: Story = {
  args: {
    checked: false,
    disabled: false,
    label: null,
    size: 'm',
    color: 'black',
    ariaLabel: 'Toggle without visible label',
  },
};

export const SmallToggle: Story = {
  args: {
    checked: false,
    disabled: false,
    label: 'Small toggle',
    size: 's',
    color: 'black',
    ariaLabel: 'Small toggle',
  },
};
export const MediumToggle: Story = {
  args: {
    checked: false,
    disabled: false,
    label: 'Medium toggle',
    size: 'm',
    color: 'black',
    ariaLabel: 'Medium toggle',
  },
};

export const LargeToggle: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Large toggle',
    size: 'l',
    color: '',
    ariaLabel: 'Large toggle',
  },
};
