import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgDividerComponent } from '../../dcx-ng-components/dcx-ng-divider/dcx-ng-divider.component';

const meta: Meta<DcxNgDividerComponent> = {
  title: 'DCXLibrary/Divider/ClassBased',
  component: DcxNgDividerComponent,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l'],
    },
    color: {
      control: 'color',
      defaultValue: '#0056b3',
    },
    thickness: {
      control: { type: 'number', min: 0, max: 20, step: 0.2 },
      defaultValue: 1,
    },
    ariaLabel: {
      control: 'text',
      defaultValue: 'Divider',
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgDividerComponent>;

export const HorizontalSmall: Story = {
  args: {
    orientation: 'horizontal',
    size: 's',
    thickness: 0.25,
    color: '#0056b3',
    ariaLabel: 'Horizontal Divider Small',
  },
};

export const HorizontalMedium: Story = {
  args: {
    orientation: 'horizontal',
    size: 'm',
    thickness: 0.25,
    color: '#0056b3',
    ariaLabel: 'Horizontal Divider Medium',
  },
};

export const HorizontalLarge: Story = {
  args: {
    orientation: 'horizontal',
    size: 'l',
    thickness: 0.25,
    color: '#0056b3',
    ariaLabel: 'Horizontal Divider Large',
  },
};

export const VerticalSmall: Story = {
  args: {
    orientation: 'vertical',
    size: 's',
    thickness: 0.25,
    color: '#0056b3',
    ariaLabel: 'Vertical Divider Small',
  },
};

export const VerticalMedium: Story = {
  args: {
    orientation: 'vertical',
    size: 'm',
    thickness: 0.25,
    color: '#0056b3',
    ariaLabel: 'Vertical Divider Medium',
  },
};

export const VerticalLarge: Story = {
  args: {
    orientation: 'vertical',
    size: 'l',
    thickness: 0.25,
    color: '#0056b3',
    ariaLabel: 'Vertical Divider Large',
  },
};
