import { Meta, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { DcxNgTabsComponent } from '@dcx-ng-components/dcx-ng-lib';
import { DcxTabItemMock } from '../../core/mock';

const meta: Meta<DcxNgTabsComponent> = {
  title: 'DCXLibrary/Tabs/Unstyled',
  component: DcxNgTabsComponent,
  tags: ['autodocs'],
  argTypes: {
    tabs: { control: 'object' },
    activeTabId: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    tabs: DcxTabItemMock,
    activeTabId: 'tab1',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<DcxNgTabsComponent>;

export const Basic: Story = {
  parameters: {
    docs: {
      story: {
        height: '200px',
      },
    },
  },
  render: args => ({
    imports: [CommonModule, DcxNgTabsComponent],
    props: {
      tabs: args.tabs,
      activeTabId: args.activeTabId,
      disabled: args.disabled,
      handleTabChange(tabId: string) {
        console.log('Tab changed to:', tabId);
      },
    },
    template: `
      <dcx-ng-tabs
        [tabs]="tabs"
        [activeTabId]="activeTabId"
        [disabled]="disabled"
        (tabChange)="handleTabChange($event)"
      ></dcx-ng-tabs>
    `,
  }),
};
