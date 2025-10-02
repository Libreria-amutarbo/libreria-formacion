import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgSelectComponent } from '../../dcx-ng-components/dcx-ng-select/dcx-ng-select.component';

const meta: Meta<DcxNgSelectComponent> = {
  title: 'DCXLibrary/Select/Class based',
  component: DcxNgSelectComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    areaLabel: { control: 'text' },
    options: {
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgSelectComponent>;

export const DefaultSelect: Story = {
  args: {
    disabled: false,
    placeholder: 'Choose an option',
    areaLabel: 'Select input',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
  },
};

export const DisabledSelect: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled',
    areaLabel: 'Select Disabled',
    options: [
      { value: '1', label: 'Disabled 1' },
      { value: '2', label: 'Disabled 2' },
    ],
  },
};

export const SelectWithoutPlaceholder: Story = {
  args: {
    disabled: false,
    areaLabel: 'Without placeholder',
    options: [
      { value: 'a', label: 'Item A' },
      { value: 'b', label: 'Item B' },
      { value: 'c', label: 'Item C' },
    ],
  },
};
