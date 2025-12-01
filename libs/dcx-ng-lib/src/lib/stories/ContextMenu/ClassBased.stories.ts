import { Meta, StoryObj } from '@storybook/angular';
import { ContextMenuComponent } from '../../dcx-ng-components/dcx-ng-contextMenu/dcx-ng-contextMenu.component';
import { DcxContextMenuItem } from '../../core/interfaces';

const meta: Meta<ContextMenuComponent> = {
  title: 'DCXLibrary/ContextMenu/ClassBased',
  component: ContextMenuComponent,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of menu items with label and action',
    },
    visible: {
      control: 'boolean',
      defaultValue: true,
    },
    position: {
      control: 'object',
      defaultValue: { x: 50, y: 50 },
    },
  },
};

export default meta;
type Story = StoryObj<ContextMenuComponent>;

const mockItems: DcxContextMenuItem[] = [
  {
    label: 'Edit',
    action: () => console.log('Edit clicked'),
  },
  {
    label: 'Delete',
    action: () => console.log('Delete clicked'),
  },
  {
    label: 'Share',
    action: () => console.log('Share clicked'),
  },
];

const basicItems: DcxContextMenuItem[] = [
  {
    label: 'Option 1',
    action: () => console.log('Option 1 clicked'),
  },
  {
    label: 'Option 2',
    action: () => console.log('Option 2 clicked'),
  },
];

export const Default: Story = {
  args: {
    items: mockItems,
    visible: true,
    position: { x: 50, y: 50 },
  },
};

export const BasicMenu: Story = {
  args: {
    items: basicItems,
    visible: true,
    position: { x: 100, y: 100 },
  },
};

export const Hidden: Story = {
  args: {
    items: mockItems,
    visible: false,
    position: { x: 50, y: 50 },
  },
};

export const CustomPosition: Story = {
  args: {
    items: mockItems,
    visible: true,
    position: { x: 200, y: 150 },
  },
};

export const SingleItem: Story = {
  args: {
    items: [
      {
        label: 'Single Option',
        action: () => console.log('Single option clicked'),
      },
    ],
    visible: true,
    position: { x: 50, y: 50 },
  },
};

export const ManyItems: Story = {
  args: {
    items: [
      { label: 'Open', action: () => console.log('Open') },
      { label: 'Edit', action: () => console.log('Edit') },
      { label: 'Copy', action: () => console.log('Copy') },
      { label: 'Paste', action: () => console.log('Paste') },
      { label: 'Delete', action: () => console.log('Delete') },
      { label: 'Share', action: () => console.log('Share') },
    ],
    visible: true,
    position: { x: 50, y: 50 },
  },
};
