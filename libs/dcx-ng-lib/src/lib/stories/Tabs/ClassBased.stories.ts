import { DcxNgTabsComponent } from '@dcx-ng-components/dcx-ng-lib';
import { Meta, StoryObj } from '@storybook/angular';
import { DcxTabItemMock } from '../../core/mock';

const meta: Meta<DcxNgTabsComponent> = {
  title: 'DCXLibrary/Tabs/Class Based',
  component: DcxNgTabsComponent,
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: 'object',
      table: {
        category: 'Attributes',
        type: { summary: 'DcxTabItem[]' },
      },
    },
    activeTabId: {
      control: 'text',
      table: { category: 'Attributes' },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'Attributes' },
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgTabsComponent>;

export const Basic: Story = {
  args: {
    tabs: DcxTabItemMock,
    activeTabId: 'tab3',
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
