import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgIconComponent } from '../../dcx-ng-components/dcx-ng-icon/dcx-ng-icon.component';

const meta: Meta<DcxNgIconComponent> = {
  title: 'DCXLibrary/Icon/Unstyled',
  component: DcxNgIconComponent,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text', description: 'Bootstrap Icon name' },
    color: { control: 'text' },
    size: { control: 'select', options: ['s', 'm', 'l', 'xl'] },
    spacing: { control: 'select', options: ['none', 'compact', 'spacious'] },
  },
};

export default meta;
type Story = StoryObj<DcxNgIconComponent>;

export const Basic: Story = {
  args: {
    name: 'heart',
    color: '#000000',
    size: 'm',
    spacing: 'none',
  },
};

export const AllSizes: Story = {
  args: {
    name: 'star-fill',
    color: '#f39c12',
    size: 'm',
    spacing: 'none',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 20px; align-items: center; padding: 20px;">
        <dcx-ng-icon [name]="'star-fill'" [color]="'#f39c12'" [size]="'s'"></dcx-ng-icon>
        <dcx-ng-icon [name]="'star-fill'" [color]="'#f39c12'" [size]="'m'"></dcx-ng-icon>
        <dcx-ng-icon [name]="'star-fill'" [color]="'#f39c12'" [size]="'l'"></dcx-ng-icon>
        <dcx-ng-icon [name]="'star-fill'" [color]="'#f39c12'" [size]="'xl'"></dcx-ng-icon>
      </div>
    `,
  }),
};

export const AllSpacings: Story = {
  args: {
    name: 'bell',
    color: '#3498db',
    size: 'm',
    spacing: 'none',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 20px; align-items: center; padding: 20px;">
        <dcx-ng-icon [name]="'bell'" [color]="'#3498db'" [size]="'m'" [spacing]="'none'"></dcx-ng-icon>
        <dcx-ng-icon [name]="'bell'" [color]="'#3498db'" [size]="'m'" [spacing]="'compact'"></dcx-ng-icon>
        <dcx-ng-icon [name]="'bell'" [color]="'#3498db'" [size]="'m'" [spacing]="'spacious'"></dcx-ng-icon>
      </div>
    `,
  }),
};

export const ColorVariants: Story = {
  args: {
    name: 'check-circle',
    color: '#27ae60',
    size: 'm',
    spacing: 'none',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 20px; align-items: center; padding: 20px;">
        <dcx-ng-icon [name]="'check-circle'" [color]="'#27ae60'" [size]="'m'"></dcx-ng-icon>
        <dcx-ng-icon [name]="'exclamation-circle'" [color]="'#e67e22'" [size]="'m'"></dcx-ng-icon>
        <dcx-ng-icon [name]="'x-circle'" [color]="'#c0392b'" [size]="'m'"></dcx-ng-icon>
        <dcx-ng-icon [name]="'info-circle'" [color]="'#2980b9'" [size]="'m'"></dcx-ng-icon>
        <dcx-ng-icon [name]="'question-circle'" [color]="'#8e44ad'" [size]="'m'"></dcx-ng-icon>
      </div>
    `,
  }),
};
