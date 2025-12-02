import { Meta, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { DcxNgTabsComponent } from '@dcx-ng-components/dcx-ng-lib';
import { DcxTabItemMock } from '../../core/mock';

const meta: Meta<DcxNgTabsComponent> = {
  title: 'DCXLibrary/Tabs/ClassBased',
  component: DcxNgTabsComponent,
  tags: ['autodocs'],
  argTypes: {
    tabs: { control: 'object' },
    activeTabId: { control: 'text' },
    disabled: { control: 'boolean' },
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
      tabs: DcxTabItemMock,
      activeTabId: 'tab1',
      disabled: false,
      onTabChange(tabId: string) {
        console.log('Selected tab:', tabId);
      },
    },
    template: `
      <dcx-ng-tabs
        [tabs]="tabs"
        [activeTabId]="activeTabId"
        [disabled]="disabled"
        (tabChange)="onTabChange($event)"
      ></dcx-ng-tabs>
    `,
  }),
};

export const Disabled: Story = {
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
      tabs: DcxTabItemMock,
      activeTabId: 'tab1',
      disabled: true,
      onTabChange(tabId: string) {
        console.log('Selected tab:', tabId);
      },
    },
    template: `
      <dcx-ng-tabs
        [tabs]="tabs"
        [activeTabId]="activeTabId"
        [disabled]="disabled"
        (tabChange)="onTabChange($event)"
      ></dcx-ng-tabs>
    `,
  }),
};
