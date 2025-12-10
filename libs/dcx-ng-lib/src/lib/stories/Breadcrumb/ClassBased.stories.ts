// ClassBased.stories.ts (fix)
import {
  DcxBreadCrumbDisabled,
  DcxBreadCrumbSlashIcon,
  DcxBreadCrumbIconList,
  DcxBreadCrumbItemDefault,
  DcxBreadCrumbItemWithIcon,
  DcxNgBreadcrumbComponent,
  DcxBreadCrumbArrowhIcon,
  DcxBreadChevronSlashIcon,
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
      options: DcxBreadCrumbIconList.map(element => {
        return element;
      }),
      description:
        'Opciones de iconos para separar los elementos del breadcrumb',
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgBreadcrumbComponent>;

export const ClassBased: Story = {
  args: {
    items: DcxBreadCrumbItemDefault,
    iconSeparator: DcxBreadCrumbSlashIcon,
  },
};

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
