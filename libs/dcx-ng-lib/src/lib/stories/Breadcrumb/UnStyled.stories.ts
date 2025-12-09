import { Meta, StoryObj } from '@storybook/angular';
import {
  DcxNgBreadcrumbComponent,
  DcxBreadCrumbItemMock,
  DcxBreadCrumbIcon,
} from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgBreadcrumbComponent> = {
  title: 'DCXLibrary/Breadcrumb/Unstyled',
  component: DcxNgBreadcrumbComponent,
  tags: ['autodocs'],
  argTypes: {
    items: { control: { type: 'object' } },
  },
  args: { items: DcxBreadCrumbItemMock, iconSeparator: DcxBreadCrumbIcon },
};

export default meta;
type Story = StoryObj<DcxNgBreadcrumbComponent>;

export const UnstyledDemo: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Versión sin estilos para personalización completa.',
      },
    },
  },
  render: args => ({
    props: args,
    template: `
      <div style="all: unset;">
        <dcx-ng-breadcrumb [items]="items" [iconSeparator]="iconSeparator"></dcx-ng-breadcrumb>
      </div>
    `,
  }),
};
