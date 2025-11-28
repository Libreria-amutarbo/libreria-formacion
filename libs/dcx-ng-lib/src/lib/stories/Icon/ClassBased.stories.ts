import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgIconComponent } from '../../dcx-ng-components/dcx-ng-icon/dcx-ng-icon.component';

const POPULAR_ICONS = [
  'heart-fill', 'star-fill', 'search', 'bell', 'check-circle-fill',
  'exclamation-circle-fill', 'x-circle-fill', 'info-circle-fill',
  'gear', 'gear-fill', 'house-fill', 'person', 'trash', 'pencil',
  'plus', 'dash', 'arrow-up', 'arrow-down', 'download', 'upload'
];

const meta: Meta<DcxNgIconComponent> = {
  title: 'DCXLibrary/Icon/Class based',
  component: DcxNgIconComponent,
  tags: ['autodocs'],
  argTypes: {
    name: { 
      control: 'text',
      description: 'Lista de los iconos en https://icons.getbootstrap.com/'
    },
    color: { control: 'text' },
    size: { control: 'select', options: ['s', 'm', 'l', 'xl'] },
    spacing: { control: 'select', options: ['none', 'compact', 'spacious'] },
  },
};

export default meta;
type Story = StoryObj<DcxNgIconComponent>;

export const SmallWithoutSpacing: Story = {
  args: {
    name: 'house-fill',
    color: '#e74c3c',
    size: 's',
    spacing: 'none',
  },
};

export const MediumCompact: Story = {
  args: {
    name: 'heart-fill',
    color: '#000000',
    size: 'm',
    spacing: 'compact',
  },
};

export const LargeSpacious: Story = {
  args: {
    name: 'star-fill',
    color: '#f39c12',
    size: 'l',
    spacing: 'spacious',
  },
};

export const ExtraLarge: Story = {
  args: {
    name: 'gear',
    color: '#3498db',
    size: 'xl',
    spacing: 'none',
  },
};

export const AllIcons: Story = {
  args: {
    name: 'search',
    color: '#000000',
    size: 'm',
    spacing: 'none',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 20px;">
        <dcx-ng-icon [name]="'heart-fill'" [color]="'#e74c3c'" [size]="'m'"></dcx-ng-icon>
        <dcx-ng-icon [name]="'star-fill'" [color]="'#f39c12'" [size]="'m'"></dcx-ng-icon>
        <dcx-ng-icon [name]="'search'" [color]="'#000000'" [size]="'m'"></dcx-ng-icon>
        <dcx-ng-icon [name]="'bell'" [color]="'#3498db'" [size]="'m'"></dcx-ng-icon>
        <dcx-ng-icon [name]="'check-circle'" [color]="'#27ae60'" [size]="'m'"></dcx-ng-icon>
        <dcx-ng-icon [name]="'exclamation-circle'" [color]="'#e67e22'" [size]="'m'"></dcx-ng-icon>
        <dcx-ng-icon [name]="'x-circle'" [color]="'#c0392b'" [size]="'m'"></dcx-ng-icon>
        <dcx-ng-icon [name]="'info-circle'" [color]="'#2980b9'" [size]="'m'"></dcx-ng-icon>
      </div>
    `,
  }),
};
