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
import { userEvent, within, fn } from '@storybook/test';

const keepSamePage = <T extends { href?: string }>(items: T[]): T[] =>
  items.map(item => ({
    ...item,
    href: '#',
  }));

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
    itemSelected: fn((item: any) => {
      alert(`Navegando a: ${item.label}`);
    }),
  },
};

export default meta;
type Story = StoryObj<DcxNgBreadcrumbComponent>;

export const ClassBased: Story = {
  args: {
    itemSelected: fn((item: any) => {
      alert(`Navegando a: ${item.label}`);
    }),
  },
  render: args => ({
    props: args,
    template: `
      <dcx-ng-breadcrumb
        [items]="items"
        [iconSeparator]="iconSeparator"
        (itemSelected)="itemSelected($event)"
      ></dcx-ng-breadcrumb>
    `,
  }),
};

export const WithIconInText: Story = {
  args: {
    items: keepSamePage(DcxBreadCrumbItemWithIcon),
    iconSeparator: DcxBreadCrumbSlashIcon,
    itemSelected: fn((item: any) => {
      alert(`Navegando a: ${item.label}`);
    }),
  },
  render: args => ({
    props: args,
    template: `
      <dcx-ng-breadcrumb
        [items]="items"
        [iconSeparator]="iconSeparator"
        (itemSelected)="itemSelected($event)"
      ></dcx-ng-breadcrumb>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    items: keepSamePage(DcxBreadCrumbDisabled),
    iconSeparator: DcxBreadCrumbSlashIcon,
    itemSelected: fn((item: any) => {
      alert(`Navegando a: ${item.label}`);
    }),
  },
  render: args => ({
    props: args,
    template: `
      <dcx-ng-breadcrumb
        [items]="items"
        [iconSeparator]="iconSeparator"
        (itemSelected)="itemSelected($event)"
      ></dcx-ng-breadcrumb>
    `,
  }),
};

export const ArrowIcon: Story = {
  args: {
    items: keepSamePage(DcxBreadCrumbItemDefault),
    iconSeparator: DcxBreadCrumbArrowhIcon,
    itemSelected: fn((item: any) => {
      alert(`Navegando a: ${item.label}`);
    }),
  },
  render: args => ({
    props: args,
    template: `
      <dcx-ng-breadcrumb
        [items]="items"
        [iconSeparator]="iconSeparator"
        (itemSelected)="itemSelected($event)"
      ></dcx-ng-breadcrumb>
    `,
  }),
};

export const ChevronIcon: Story = {
  args: {
    items: keepSamePage(DcxBreadCrumbItemDefault),
    iconSeparator: DcxBreadChevronSlashIcon,
    itemSelected: fn((item: any) => {
      alert(`Navegando a: ${item.label}`);
    }),
  },
  render: args => ({
    props: args,
    template: `
      <dcx-ng-breadcrumb
        [items]="items"
        [iconSeparator]="iconSeparator"
        (itemSelected)="itemSelected($event)"
      ></dcx-ng-breadcrumb>
    `,
  }),
};

export const CurrentPage: Story = {
  args: {
    items: keepSamePage(DcxBreadCrumbCurrentPage),
    iconSeparator: DcxBreadCrumbSlashIcon,
    itemSelected: fn((item: any) => {
      alert(`Navegando a: ${item.label}`);
    }),
  },
  render: args => ({
    props: args,
    template: `
      <dcx-ng-breadcrumb
        [items]="items"
        [iconSeparator]="iconSeparator"
        (itemSelected)="itemSelected($event)"
      ></dcx-ng-breadcrumb>
    `,
  }),
};

export const OverflowMenu: Story = {
  args: {
    items: keepSamePage(DcxBreadCrumbOverflow),
    iconSeparator: DcxBreadCrumbSlashIcon,
    itemSelected: fn((item: any) => {
      alert(`Navegando a: ${item.label}`);
    }),
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
