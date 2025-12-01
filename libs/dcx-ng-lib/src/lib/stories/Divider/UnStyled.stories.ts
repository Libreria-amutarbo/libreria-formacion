import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgDividerComponent } from '../../dcx-ng-components/dcx-ng-divider/dcx-ng-divider.component';

const meta: Meta<DcxNgDividerComponent> = {
  title: 'DCXLibrary/Divider/Without style',
  component: DcxNgDividerComponent,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: 'color',
    },
    thickness: {
      control: { type: 'number', min: 0, max: 20, step: 0.2 },
      defaultValue: 1,
    },
    ariaLabel: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgDividerComponent>;

export const UnstyledHorizontal: Story = {
  args: {
    orientation: 'horizontal',
    size: 'm',
    thickness: 1,
    color: '#9b9b9b',
    ariaLabel: 'Horizontal Divider Medium',
  },
};

export const UnstyledVertical: Story = {
  args: {
    orientation: 'vertical',
    size: 'm',
    thickness: 1,
    color: '#9b9b9b',
    ariaLabel: 'Vertical Divider Medium',
  },
};
