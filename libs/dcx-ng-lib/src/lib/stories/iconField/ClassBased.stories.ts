import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  DcxNgIconFieldComponent,
  DcxNgInputComponent,
  DcxIconFieldPositionList,
  ICON_FIELD_ICON_NAME,
  ICON_FIELD_ICON_POSITION,
  ICON_FIELD_ICON_SIZE,
  ICON_SIZE_LIST,
} from '@dcx-ng-components/dcx-ng-lib';
import { BOOTSTRAP_ICONS } from 'libs/dcx-ng-lib/.storybook/bootstrap-icons';

const meta: Meta<DcxNgIconFieldComponent> = {
  title: 'DCXLibrary/Components/IconField',
  component: DcxNgIconFieldComponent,
  decorators: [
    moduleMetadata({
      imports: [DcxNgIconFieldComponent, DcxNgInputComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    iconName: {
      control: 'select',
      options: BOOTSTRAP_ICONS,
      description:
        'Icono de Bootstrap Icons al final (p.ej. "arrow-right", "chevron-right")',
      table: { category: 'Attributes' },
    },
    iconPosition: {
      control: 'select',
      options: DcxIconFieldPositionList,
      description: 'Posición del icono',
      table: {
        category: 'Attributes',
      },
    },
    iconSize: {
      control: 'select',
      options: ICON_SIZE_LIST,
      table: { category: 'Attributes' },
    },
    iconClick: {
      action: 'iconClick',
      description: 'Emitted when the icon is clicked',
      table: { category: 'Events' },
    },
  },
  args: {
    iconName: ICON_FIELD_ICON_NAME,
    iconPosition: ICON_FIELD_ICON_POSITION,
    iconSize: ICON_FIELD_ICON_SIZE,
  },
};

export default meta;
type Story = StoryObj<DcxNgIconFieldComponent>;

export const ClassBased: Story = {
  render: args => ({
    props: args,
    template: `
      <dcx-ng-icon-field
        [iconName]="iconName"
        [iconPosition]="iconPosition"
        [iconSize]="iconSize"
        (iconClick)="iconClick()"
      >
        <dcx-ng-input [placeholder]="'Icon Field por defecto'"></dcx-ng-input>
      </dcx-ng-icon-field>
    `,
  }),
};

export const IconInRightPosition: Story = {
  ...ClassBased,
  args: { iconPosition: 'right' },
};

export const IconClickable: Story = {
  render: args => ({
    props: {
      ...args,
      iconClick: () => alert('Icono clickado'),
    },
    template: `
      <dcx-ng-icon-field
        [iconName]="iconName"
        [iconPosition]="iconPosition"
        [iconSize]="iconSize"
        (iconClick)="iconClick()"
      >
        <dcx-ng-input [placeholder]="'Icon Field por defecto'"></dcx-ng-input>
      </dcx-ng-icon-field>
    `,
  }),
};
