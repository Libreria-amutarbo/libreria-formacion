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
  DcxBreadcrumbItem,
} from '@dcx-ng-components/dcx-ng-lib';
import { Meta, StoryObj } from '@storybook/angular';
import { userEvent, within, fn } from '@storybook/test';

const keepSamePage = <T extends { href?: string }>(items: T[]): T[] =>
  items.map(item => ({
    ...item,
    href: undefined,
  }));

const onItemSelected = fn((item: DcxBreadcrumbItem) => {
  alert(`Navegando a: ${item.label}`);
});

const breadcrumbRender: NonNullable<Meta<DcxNgBreadcrumbComponent>['render']> =
  args => ({
    props: args,
    template: `
      <dcx-ng-breadcrumb
        [items]="items"
        [iconSeparator]="iconSeparator"
        (itemSelected)="itemSelected($event)"
      ></dcx-ng-breadcrumb>
    `,
  });

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
    items: keepSamePage(DcxBreadCrumbItemDefault),
    iconSeparator: DcxBreadCrumbSlashIcon,
    itemSelected: onItemSelected,
  },
  render: breadcrumbRender,
};

export default meta;
type Story = StoryObj<DcxNgBreadcrumbComponent>;

export const ClassBased: Story = {
  args: {
    itemSelected: onItemSelected,
  },
};

export const WithIconInText: Story = {
  args: {
    items: keepSamePage(DcxBreadCrumbItemWithIcon),
    iconSeparator: DcxBreadCrumbSlashIcon,
    itemSelected: onItemSelected,
  },
};

export const Disabled: Story = {
  args: {
    items: keepSamePage(DcxBreadCrumbDisabled),
    iconSeparator: DcxBreadCrumbSlashIcon,
    itemSelected: onItemSelected,
  },
};

export const ArrowIcon: Story = {
  args: {
    items: keepSamePage(DcxBreadCrumbItemDefault),
    iconSeparator: DcxBreadCrumbArrowhIcon,
    itemSelected: onItemSelected,
  },
};

export const ChevronIcon: Story = {
  args: {
    items: keepSamePage(DcxBreadCrumbItemDefault),
    iconSeparator: DcxBreadChevronSlashIcon,
    itemSelected: onItemSelected,
  },
};

export const CurrentPage: Story = {
  args: {
    items: keepSamePage(DcxBreadCrumbCurrentPage),
    iconSeparator: DcxBreadCrumbSlashIcon,
    itemSelected: onItemSelected,
  },
};

export const OverflowMenu: Story = {
  args: {
    items: keepSamePage(DcxBreadCrumbOverflow),
    iconSeparator: DcxBreadCrumbSlashIcon,
    itemSelected: onItemSelected,
  },
  parameters: {
    layout: 'fullscreen',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const ellipsisButton = canvas.getByRole('button', {
      name: /mostrar rutas anteriores/i,
    });

    await userEvent.click(ellipsisButton);
  },
};
