import {
  DcxBreadCrumbDisabled,
  DcxBreadCrumbSlashIcon,
  DcxBreadCrumbIconList,
  DcxBreadCrumbItemDefault,
  DcxBreadCrumbItemWithIcon,
  DcxNgBreadcrumbComponent,
  DcxBreadCrumbArrowhIcon,
  DcxBreadChevronSlashIcon,
  DcxBreadCrumbCurrentPage,
} from '@dcx-ng-components/dcx-ng-lib';
import { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<DcxNgBreadcrumbComponent> = {
  title: 'DCXLibrary/Breadcrumb/Class based',
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
        defaultValue: { summary: DcxBreadCrumbSlashIcon },
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
        defaultValue: { summary: 'slash-lg' },
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
