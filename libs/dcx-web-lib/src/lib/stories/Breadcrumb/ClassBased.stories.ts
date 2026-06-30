import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { userEvent, fn } from '@storybook/test';
import {
  DcxBreadCrumbDisabled,
  DcxBreadCrumbSlashIcon,
  DcxBreadCrumbIconList,
  DcxBreadCrumbItemDefault,
  DcxBreadCrumbItemWithIcon,
  DcxBreadCrumbOverflow,
  DcxBreadCrumbArrowhIcon,
  DcxBreadChevronSlashIcon,
  DcxBreadCrumbCurrentPage,
} from '../../core/defaults/breadcrumb';
import type { DcxBreadcrumbItem } from '../../core/interfaces/breadcrumb';
import '../../../index';

const keepSamePage = <T extends { href?: string }>(items: T[]): T[] =>
  items.map(item => ({
    ...item,
    href: undefined,
  }));

const onItemSelected = fn((item: DcxBreadcrumbItem) => {
  alert(`Navegando a: ${item.label}`);
});

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Breadcrumb',
  component: 'dcx-web-breadcrumb',
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    items: {
      name: 'items',
      control: { type: 'object' },
      table: {
        category: 'Atributos',
        type: { summary: 'DcxBreadcrumbItem[]' },
        defaultValue: { summary: 'DcxBreadCrumbItemDefault' },
      },
    },
    iconSeparator: {
      name: 'iconSeparator',
      control: 'select',
      options: DcxBreadCrumbIconList,
      table: {
        category: 'Atributos',
        type: { summary: 'DcxBreadCrumbSeparatorIcons (string)' },
        defaultValue: { summary: DcxBreadCrumbSlashIcon },
      },
    },
    itemSelected: {
      name: 'itemSelected',
      action: 'itemSelected',
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
  render: (args) => html`
    <dcx-web-breadcrumb
      .items="${args.items}"
      icon-separator="${args.iconSeparator}"
      @itemSelected="${args.itemSelected}"
    ></dcx-web-breadcrumb>
  `,
};

export default meta;
type Story = StoryObj;

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
    const breadcrumb = canvasElement.querySelector('dcx-web-breadcrumb');
    const ellipsisButton = breadcrumb?.shadowRoot?.querySelector('.dcx-bc__ellipsis-btn') as HTMLElement;
    if (ellipsisButton) {
      await userEvent.click(ellipsisButton);
    }
  },
};
