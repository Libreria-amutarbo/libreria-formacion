// ClassBased.stories.ts (fix)
import { Meta, StoryObj } from '@storybook/angular';
import {
  DcxNgBreadcrumbComponent,
  BreadcrumbItem,
} from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgBreadcrumbComponent> = {
  title: 'DCXLibrary/Breadcrumb/Class based',
  component: DcxNgBreadcrumbComponent,
  tags: ['autodocs'],
  argTypes: {
    items: { control: { type: 'object' } },
  },
  args: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Productos', href: '/productos' },
      { label: 'Teclados' },
    ] as BreadcrumbItem[],
  },
};

export default meta;
type Story = StoryObj<DcxNgBreadcrumbComponent>;

export const ClassBasedDemo: Story = {
  render: args => {
    const pathText = (args.items ?? [])
      .map((i: BreadcrumbItem) => i.label)
      .join(' / ');
    return {
      props: {
        ...args,
        pathText,
      },
      template: `
        <div style="display:grid; gap:8px; max-width:640px;">
          <dcx-ng-breadcrumb [items]="items"></dcx-ng-breadcrumb>
        </div>
      `,
    };
  },
};
