import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgIconComponent, IconSize, IconSpacing } from './dcx-ng-icon.component';

const meta: Meta<DcxNgIconComponent> = {
  component: DcxNgIconComponent,
  title: 'DcxNgIconComponent',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['s', 'm', 'l', 'xl'] as IconSize[],
      description: 'Icon size variant',
    },
    spacing: {
      control: 'select',
      options: ['none', 'compact', 'spacious'] as IconSpacing[],
      description: 'Icon spacing/margin variant',
    },
    color: {
      control: 'color',
      description: 'Icon color (CSS color value)',
    },
    name: {
      control: 'text',
      description: 'Bootstrap icon name',
    },
  },
};
export default meta;
type Story = StoryObj<DcxNgIconComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<i dcx-ng-icon [attr.name]="name" [size]="size" [spacing]="spacing" [color]="color"></i>`,
  }),
  args: {
    size: 'm',
    spacing: 'none',
    color: '#010101',
    name: 'heart',
  },
};

export const Small: Story = {
  ...Default,
  args: {
    size: 's',
    spacing: 'none',
    color: '#010101',
    name: 'star-fill',
  },
};

export const Medium: Story = {
  ...Default,
  args: {
    size: 'm',
    spacing: 'none',
    color: '#010101',
    name: 'search',
  },
};

export const Large: Story = {
  ...Default,
  args: {
    size: 'l',
    spacing: 'none',
    color: '#010101',
    name: 'exclamation-circle',
  },
};

export const ExtraLarge: Story = {
  ...Default,
  args: {
    size: 'xl',
    spacing: 'none',
    color: '#010101',
    name: 'gear',
  },
};

export const WithColor: Story = {
  ...Default,
  args: {
    size: 'm',
    spacing: 'none',
    color: '#e74c3c',
    name: 'heart-fill',
  },
};

export const WithCompactSpacing: Story = {
  ...Default,
  args: {
    size: 'm',
    spacing: 'compact',
    color: '#010101',
    name: 'bell',
  },
};

export const WithSpaciousSpacing: Story = {
  ...Default,
  args: {
    size: 'm',
    spacing: 'spacious',
    color: '#010101',
    name: 'check-circle',
  },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <i dcx-ng-icon size="s" color="#010101" name="star" title="Small"></i>
        <i dcx-ng-icon size="m" color="#010101" name="star" title="Medium"></i>
        <i dcx-ng-icon size="l" color="#010101" name="star" title="Large"></i>
        <i dcx-ng-icon size="xl" color="#010101" name="star" title="Extra Large"></i>
      </div>
    `,
  }),
};

export const AllSpacings: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem;">
        <i dcx-ng-icon size="m" spacing="none" color="#010101" name="bell" title="No Spacing"></i>
        <i dcx-ng-icon size="m" spacing="compact" color="#010101" name="bell" title="Compact"></i>
        <i dcx-ng-icon size="m" spacing="spacious" color="#010101" name="bell" title="Spacious"></i>
      </div>
    `,
  }),
};
