import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgIconComponent } from './dcx-ng-icon.component';

const meta: Meta<DcxNgIconComponent> = {
  component: DcxNgIconComponent,
  title: 'Icon',
};
export default meta;
type Story = StoryObj<DcxNgIconComponent>;

export const Default: Story = {
  args: {
    size: 'm',
    spacing: 'none',
    color: '#010101',
    name: 'heart',
  },
};

export const Small: Story = {
  args: {
    size: 's',
    spacing: 'none',
    color: '#010101',
    name: 'star-fill',
  },
};

export const Medium: Story = {
  args: {
    size: 'm',
    spacing: 'none',
    color: '#010101',
    name: 'search',
  },
};

export const Large: Story = {
  args: {
    size: 'l',
    spacing: 'none',
    color: '#010101',
    name: 'exclamation-circle',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    spacing: 'none',
    color: '#010101',
    name: 'gear',
  },
};

export const WithColor: Story = {
  args: {
    size: 'm',
    spacing: 'none',
    color: '#e74c3c',
    name: 'heart-fill',
  },
};

export const WithCompactSpacing: Story = {
  args: {
    size: 'm',
    spacing: 'compact',
    color: '#010101',
    name: 'bell',
  },
};

export const WithSpaciousSpacing: Story = {
  args: {
    size: 'm',
    spacing: 'spacious',
    color: '#010101',
    name: 'check-circle',
  },
};
