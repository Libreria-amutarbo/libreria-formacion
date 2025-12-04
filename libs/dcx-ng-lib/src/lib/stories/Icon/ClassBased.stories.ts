import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgIconComponent } from '../../dcx-ng-components/dcx-ng-icon/dcx-ng-icon.component';

const meta: Meta<DcxNgIconComponent> = {
  title: 'DCXLibrary/Icon/Class based',
  component: DcxNgIconComponent,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    color: { control: 'text' },
    size: { control: 'select', options: ['s', 'm', 'l', 'xl'] },
    spacing: { control: 'select', options: ['none', 'compact', 'spacious'] },
  },
};

export default meta;
type Story = StoryObj<DcxNgIconComponent>;

export const SmallWithoutSpacing: Story = {
  args: {
    name: 'home',
    color: 'red',
    size: 's',
    spacing: 'none',
  },
};

export const MediumCompact: Story = {
  args: {
    name: 'home',
    color: 'black',
    size: 'm',
    spacing: 'compact',
  },
};

export const LargeSpacious: Story = {
  args: {
    name: 'home',
    color: 'black',
    size: 'l',
    spacing: 'spacious',
  },
};
