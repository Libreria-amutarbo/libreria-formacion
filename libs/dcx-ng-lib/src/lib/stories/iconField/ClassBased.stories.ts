import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  DcxInputType,
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
      name: 'iconName',
      control: 'select',
      options: BOOTSTRAP_ICONS,
      description: 'Icono de Bootstrap Icons (p.ej. "search", "envelope", "lock").',
      table: { category: 'Atributos', type: { summary: 'string' } },
    },
    iconPosition: {
      name: 'iconPosition',
      control: 'select',
      options: DcxIconFieldPositionList,
      description: 'Posición del icono respecto al campo proyectado.',
      table: {
        category: 'Atributos',
        type: { summary: "'left' | 'right'" },
        defaultValue: { summary: 'left' },
      },
    },
    iconSize: {
      name: 'iconSize',
      control: 'select',
      options: ICON_SIZE_LIST,
      description: 'Tamaño del icono.',
      table: {
        category: 'Atributos',
        type: { summary: "'s' | 'm' | 'l' | 'xl'" },
        defaultValue: { summary: 'm' },
      },
    },
    iconClickable: {
      name: 'iconClickable',
      control: 'boolean',
      description:
        'Si es true, el icono se renderiza como un botón interactivo (requiere iconAriaLabel). Si es false (por defecto), es puramente decorativo y no recibe foco.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    iconAriaLabel: {
      name: 'iconAriaLabel',
      control: 'text',
      description: 'Nombre accesible del botón del icono. Obligatorio cuando iconClickable es true.',
      table: { category: 'Atributos', type: { summary: 'string | null' } },
    },
    disabled: {
      name: 'disabled',
      control: 'boolean',
      description: 'Deshabilita el botón del icono y atenúa visualmente el contenedor.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    iconClick: {
      name: 'iconClick',
      action: 'iconClick',
      description: 'Se emite al hacer clic en el icono (solo cuando iconClickable es true).',
      table: { category: 'Eventos', type: { summary: '() => void' } },
    },
  },
  args: {
    iconName: ICON_FIELD_ICON_NAME,
    iconPosition: ICON_FIELD_ICON_POSITION,
    iconSize: ICON_FIELD_ICON_SIZE,
    iconClickable: false,
    disabled: false,
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
        [iconClickable]="iconClickable"
        [iconAriaLabel]="iconAriaLabel"
        [disabled]="disabled"
        (iconClick)="iconClick()"
      >
        <dcx-ng-input label="Buscar" [placeholder]="'Icon Field por defecto'"></dcx-ng-input>
      </dcx-ng-icon-field>
    `,
  }),
};

export const IconInRightPosition: Story = {
  ...ClassBased,
  args: { iconPosition: 'right' },
};

export const IconClickable: Story = {
  args: {
    iconClickable: true,
    iconAriaLabel: 'Buscar',
  },
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
        [iconClickable]="iconClickable"
        [iconAriaLabel]="iconAriaLabel"
        (iconClick)="iconClick()"
      >
        <dcx-ng-input label="Buscar" [placeholder]="'Icon Field clicable'"></dcx-ng-input>
      </dcx-ng-icon-field>
    `,
  }),
};

export const DisabledIconField: Story = {
  args: {
    iconClickable: true,
    iconAriaLabel: 'Buscar',
    disabled: true,
  },
  render: args => ({
    props: args,
    template: `
      <dcx-ng-icon-field
        [iconName]="iconName"
        [iconPosition]="iconPosition"
        [iconSize]="iconSize"
        [iconClickable]="iconClickable"
        [iconAriaLabel]="iconAriaLabel"
        [disabled]="disabled"
      >
        <dcx-ng-input label="Buscar" [placeholder]="'No disponible'" [disabled]="true"></dcx-ng-input>
      </dcx-ng-icon-field>
    `,
  }),
};

export const PasswordComposition: Story = {
  args: {
    iconName: 'lock',
    iconPosition: 'left',
  },
  render: args => ({
    props: { ...args, passwordType: DcxInputType.PASSWORD },
    template: `
      <dcx-ng-icon-field
        [iconName]="iconName"
        [iconPosition]="iconPosition"
        [iconSize]="iconSize"
      >
        <dcx-ng-input label="Contraseña" [type]="passwordType" [placeholder]="'Introduce tu contraseña'"></dcx-ng-input>
      </dcx-ng-icon-field>
    `,
  }),
};
