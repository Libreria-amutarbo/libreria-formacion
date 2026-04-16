import {
  DcxBreadCrumbDisabled,
  DcxBreadCrumbSlashIcon,
  DcxBreadCrumbIconList,
  DcxBreadCrumbItemDefault,
  DcxBreadCrumbItemWithIcon,
  DcxBreadCrumbOverflow,
  DcxNgBreadcrumbComponent,
  DcxBreadCrumbArrowhIcon,
  DcxBreadChevronSlashIcon,
  DcxBreadCrumbCurrentPage,
} from '@dcx-ng-components/dcx-ng-lib';
import { Meta, StoryObj } from '@storybook/angular';
import { userEvent, within } from '@storybook/test';

const meta: Meta<DcxNgBreadcrumbComponent> = {
  title: 'DCXLibrary/Components/Breadcrumb',
  component: DcxNgBreadcrumbComponent,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    items: {
      name: 'items',
      control: { type: 'object' },
      description: 'Items del breadcrumb',
      table: {
        category: 'Atributos',
        type: { summary: 'DcxBreadcrumbItem[]' },
      },
    },
    iconSeparator: {
      name: 'iconSeparator',
      control: 'select',
      options: DcxBreadCrumbIconList,
      description:
        'Opciones de iconos para separar los elementos del breadcrumb',
      table: {
        category: 'Atributos',
        type: { summary: 'DcxBreadCrumbSeparatorIcons (string)' },
        defaultValue: { summary: DcxBreadCrumbSlashIcon },
      },
    },
    itemSelected: {
      name: 'itemSelected',
      action: 'itemSelected',
      description: 'Se emite al hacer clic en un item',
      table: {
        category: 'Eventos',
        type: { summary: '(item: DcxBreadcrumbItem) => void' },
        defaultValue: { summary: '-' },
      },
    },
  },
  args: {
    items: DcxBreadCrumbItemDefault,
    iconSeparator: DcxBreadCrumbSlashIcon,
  },
};

export default meta;
type Story = StoryObj<DcxNgBreadcrumbComponent>;

export const ClassBased: Story = {};

export const WithIconInText: Story = {
  args: {
    items: DcxBreadCrumbItemWithIcon,
    iconSeparator: DcxBreadCrumbSlashIcon,
  },
};

export const Disabled: Story = {
  args: {
    items: DcxBreadCrumbDisabled,
    iconSeparator: DcxBreadCrumbSlashIcon,
  },
};

export const ArrowIcon: Story = {
  args: {
    items: DcxBreadCrumbItemDefault,
    iconSeparator: DcxBreadCrumbArrowhIcon,
  },
};

export const ChevronIcon: Story = {
  args: {
    items: DcxBreadCrumbItemDefault,
    iconSeparator: DcxBreadChevronSlashIcon,
  },
};

export const CurrentPage: Story = {
  args: {
    items: DcxBreadCrumbCurrentPage,
    iconSeparator: DcxBreadCrumbSlashIcon,
  },
};

export const OverflowMenu: Story = {
  args: {
    items: DcxBreadCrumbOverflow,
    iconSeparator: DcxBreadCrumbSlashIcon,
  },
  parameters: {
    layout: 'fullscreen',
  },
  render: args => ({
    props: args,
    template: `
      <div
        style="
          min-height: 320px;
          padding: 16px 24px;
          overflow: visible;
          box-sizing: border-box;
        "
      >
        <dcx-ng-breadcrumb
          [items]="items"
          [iconSeparator]="iconSeparator"
          (itemSelected)="itemSelected($event)"
        ></dcx-ng-breadcrumb>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const ellipsisButton = canvas.getByRole('button', {
      name: /mostrar rutas anteriores/i,
    });

    await userEvent.click(ellipsisButton);
  },
};
