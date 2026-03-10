import { DcxNgTabsComponent } from '@dcx-ng-components/dcx-ng-lib';
import { Meta, StoryObj } from '@storybook/angular';
import { DcxTabItemMock } from '../../core/mock';

const meta: Meta<DcxNgTabsComponent> = {
  title: 'DCXLibrary/Tabs',
  component: DcxNgTabsComponent,
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: 'object',
      description: 'Array de tabs con id, label y contenido',
      table: {
        category: 'Attributes',
        type: { summary: 'DcxTabItem[]' },
      }
    },
    activeTabId: {
      control: 'text',
      description: 'ID del tab actualmente seleccionado',
      table: { 
        category: 'Attributes',
        type: { summary: 'string' },
        defaultValue: { summary: 'tab1' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita todos los tabs',
      table: { 
        category: 'Attributes',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgTabsComponent>;

export const Basic: Story = {
  args: {
    tabs: DcxTabItemMock,
    activeTabId: 'tab1',
    disabled: false,
  },
  parameters: {
    docs: {
      story: { height: '200px' },
    },
  },
  render: args => {
    return {
      template: `
      <dcx-ng-tabs
        [tabs]="tabs"
        [activeTabId]="activeTabId"
        [disabled]="disabled"
        (tabChange)="onTabChange($event)"
      ></dcx-ng-tabs>
    `,
      props: {
        tabs: args.tabs,
        activeTabId: args.activeTabId,
        disabled: args.disabled,
        onTabChange: (tabId: string) => console.log('Selected tab:', tabId),
      },
    };
  },
};
