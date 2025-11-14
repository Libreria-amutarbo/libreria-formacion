import { Meta, StoryObj } from '@storybook/angular';
import { ContextMenuComponent, ContextMenuItem } from '../../dcx-ng-components/dcx-ng-contextMenu/dcx-ng-contextMenu.component';

const meta: Meta<ContextMenuComponent> = {
  title: 'DCXLibrary/ContextMenu/Without style',
  component: ContextMenuComponent,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of menu items with label and action',
    },
    visible: {
      control: 'boolean',
      description: 'Controls visibility of the context menu',
    },
    position: {
      control: 'object',
      description: 'X and Y coordinates for menu positioning',
    },
  },
};

export default meta;
type Story = StoryObj<ContextMenuComponent>;

const unstyledItems: ContextMenuItem[] = [
  {
    label: 'New',
    action: () => console.log('New clicked'),
  },
  {
    label: 'Open',
    action: () => console.log('Open clicked'),
  },
  {
    label: 'Save',
    action: () => console.log('Save clicked'),
  },
];

export const UnstyledBasic: Story = {
  args: {
    items: unstyledItems,
    visible: true,
    position: { x: 100, y: 100 },
  },
};

export const UnstyledHidden: Story = {
  args: {
    items: unstyledItems,
    visible: false,
    position: { x: 100, y: 100 },
  },
};

export const UnstyledTopLeft: Story = {
  args: {
    items: unstyledItems,
    visible: true,
    position: { x: 10, y: 10 },
  },
};

export const UnstyledBottomRight: Story = {
  args: {
    items: unstyledItems,
    visible: true,
    position: { x: 300, y: 300 },
  },
};
