// ClassBased.stories.ts (fix)
import {
  DcxBreadCrumbIcon,
  DcxBreadCrumbIconList,
  DcxBreadcrumbItem,
  DcxBreadCrumbItemMock,
  DcxNgBreadcrumbComponent,
} from '@dcx-ng-components/dcx-ng-lib';
import { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<DcxNgBreadcrumbComponent> = {
  title: 'DCXLibrary/Breadcrumb/Class based',
  component: DcxNgBreadcrumbComponent,
  tags: ['autodocs'],
  argTypes: {
    items: { control: { type: 'object' } },
    iconSeparator: {
      control: 'select',
      options: DcxBreadCrumbIconList.map(element => {return element}),
      description: 'Opciones de iconos para separar los elementos del breadcrumb'
    }
  },
  args: { 
    items: DcxBreadCrumbItemMock,
    iconSeparator: DcxBreadCrumbIcon
  },
};

export default meta;
type Story = StoryObj<DcxNgBreadcrumbComponent>;

export const ClassBasedDemo: Story = {
  render: args => {
    const pathText = (args.items ?? [])
      .map((i: DcxBreadcrumbItem) => i.label)
      .join(' / ');

    return {
      props: { ...args, pathText, },
      template: `
        <div style="display:grid; gap:8px; max-width:640px;">
          <dcx-ng-breadcrumb [items]="items" [iconSeparator]="iconSeparator"></dcx-ng-breadcrumb>
        </div>
      `,
    };
  },
};
