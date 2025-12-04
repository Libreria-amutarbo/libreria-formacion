import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgIconComponent } from '../../dcx-ng-components/dcx-ng-icon/dcx-ng-icon.component';
import { BOOTSTRAP_ICONS } from 'libs/dcx-ng-lib/.storybook/bootstrap-icons';

const meta: Meta<DcxNgIconComponent> = {
  title: 'DCXLibrary/Icon/Class based',
  component: DcxNgIconComponent,
  tags: ['autodocs'],
  argTypes: {
    name: { 
      control: 'select',
      options: BOOTSTRAP_ICONS,
      description: 'Icono de Bootstrap Icons'
    },
    color: { 
      control: 'color',
      description: 'Color del icono'
    },
    size: { 
      control: 'select', 
      options: ['s', 'm', 'l', 'xl'],
      description: 'Tamaño'
    },
    spacing: { 
      control: 'select', 
      options: ['none', 'compact', 'spacious'],
      description: 'Espaciado'
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgIconComponent>;

export const Default: Story = {
  args: {
    name: 'house-fill',
    color: '#000000',
    size: 'm',
    spacing: 'none',
  },
};

export const Small: Story = {
  args: {
    name: 'heart-fill',
    color: '#e74c3c',
    size: 's',
    spacing: 'none',
  },
};

export const Medium: Story = {
  args: {
    name: 'star-fill',
    color: '#f39c12',
    size: 'm',
    spacing: 'compact',
  },
};

export const Large: Story = {
  args: {
    name: 'gear-fill',
    color: '#3498db',
    size: 'l',
    spacing: 'spacious',
  },
};

export const ExtraLarge: Story = {
  args: {
    name: 'search',
    color: '#2c3e50',
    size: 'xl',
    spacing: 'none',
  },
};
