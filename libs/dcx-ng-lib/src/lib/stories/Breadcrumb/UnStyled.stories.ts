import { Meta, StoryObj } from '@storybook/angular';
import {
  DcxNgBreadcrumbComponent,
  BreadcrumbItem,
} from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgBreadcrumbComponent> = {
  title: 'DCXLibrary/Breadcrumb/Unstyled',
  component: DcxNgBreadcrumbComponent,
  tags: ['autodocs'],
  argTypes: {
    items: { control: { type: 'object' } },
  },
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Library', href: '/library' },
      { label: 'Data' },
    ] as BreadcrumbItem[],
  },
};

export default meta;
type Story = StoryObj<DcxNgBreadcrumbComponent>;

export const Basic: Story = {
  render: args => ({
    props: { ...args },
    template: `<dcx-ng-breadcrumb [items]="items"></dcx-ng-breadcrumb>`,
  }),
};
