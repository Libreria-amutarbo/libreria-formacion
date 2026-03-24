import { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { DcxNgButtonComponent } from '../../dcx-ng-components/dcx-ng-button/dcx-ng-button.component';
import { BOOTSTRAP_ICONS } from '../../../../.storybook/bootstrap-icons';
import {
  BUTTON_VARIANT_LIST,
  DcxIconPositionList,
  SIZE_LIST,
} from '@dcx-ng-components/dcx-ng-lib';

const ActionsData = { buttonClick: fn() };

const meta: Meta<DcxNgButtonComponent> = {
  title: 'DCXLibrary/Components/Button',
  component: DcxNgButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto visible del botón',
      table: { category: 'Attributes' },
    },
    ariaLabel: {
      control: 'text',
      description: 'Nombre accesible (úsalo en botones de solo icono)',
      table: { category: 'Attributes' },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Tipo nativo del botón',
      table: {
        category: 'Attributes',
        defaultValue: {
          summary: 'button',
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita el botón y previene interacción',
      table: {
        category: 'Attributes',
        defaultValue: {
          summary: 'false',
        },
      },
    },
    pressed: {
      control: 'boolean',
      description: 'Estado presionado del botón',
      table: {
        category: 'Attributes',
        defaultValue: {
          summary: 'false',
        },
      },
    },
    hover: {
      control: 'boolean',
      description: 'Estado hover estático del botón',
      table: {
        category: 'Attributes',
        defaultValue: {
          summary: 'false',
        },
      },
    },
    focused: {
      control: 'boolean',
      description: 'Estado focus estático del botón',
      table: {
        category: 'Attributes',
        defaultValue: {
          summary: 'false',
        },
      },
    },
    variant: {
      control: 'select',
      options: BUTTON_VARIANT_LIST,
      description: 'Estilo visual del botón (primary, secondary, ghost, danger)',
      table: {
        category: 'Attributes',
        defaultValue: {
          summary: 'primary',
        },
      },
    },
    size: {
      control: 'select',
      options: SIZE_LIST,
      description: 'Tamaño del botón (s, m, l)',
      table: {
        category: 'Attributes',
        defaultValue: {
          summary: 'm',
        },
      },
    },
    icon: {
      control: 'boolean',
      table: {
        category: 'Attributes',
        defaultValue: {
          summary: 'false',
        },
      },
    },
    iconPosition: {
      control: 'select',
      options: DcxIconPositionList,
      description: 'Posición del icono para cuando el button tiene label',
      table: { category: 'Attributes' },
    },
    iconName: {
      control: 'select',
      options: BOOTSTRAP_ICONS,
      description:
        'Icono de Bootstrap Icons (p.ej. "chevron-left", "save")',
      table: { category: 'Attributes' },
    },
    iconRightName: {
      control: 'select',
      options: BOOTSTRAP_ICONS,
      description:
        'Icono derecho de Bootstrap Icons (p.ej. "chevron-right")',
      table: { category: 'Attributes' },
    },
    href: {
      control: 'text',
      description: 'URL del enlace. Si se proporciona, renderiza un <a> en vez de <button>',
      table: { category: 'Attributes' },
    },
    target: {
      control: 'select',
      options: ['', '_blank', '_self', '_parent', '_top'],
      description: 'Target del enlace (solo aplica cuando href está definido)',
      table: { category: 'Attributes' },
    },
    iconSize: {
      control: 'select',
      options: ['s', 'm', 'l', 'xl'],
      table: { category: 'Attributes' },
    },
    iconSpacing: {
      control: 'select',
      options: ['none', 'compact', 'spacious'],
      table: { category: 'Attributes' },
    },
    iconColor: {
      control: 'color',
      table: { category: 'Attributes' },
    },
    buttonClick: {
      action: 'buttonClick',
      description: 'Output al hacer click',
      table: {
        category: 'Eventos',
        type: { summary: '(clicked: boolean) => void' },
        defaultValue: { summary: '-' },
      },
    },
  },
  args: {
    label: 'Click me',
    ariaLabel: '',
    type: 'button',
    disabled: false,
    pressed: false,
    hover: false,
    focused: false,
    variant: 'primary',
    size: 'm',
    icon: false,
    iconPosition: 'start',
    iconSize: undefined,
    iconSpacing: 'none',
    iconColor: '',
    iconRightName: '',
    href: '',
    target: '',
    buttonClick: ActionsData.buttonClick,
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<DcxNgButtonComponent>;

export const Default: Story = {
  args: { variant: 'primary', label: 'Default' },
};

export const Types: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <form style="display:flex; gap:12px; align-items:center;">
        <dcx-ng-button label="Submit" type="submit" variant="primary"></dcx-ng-button>
        <dcx-ng-button label="Reset"  type="reset"  variant="primary"></dcx-ng-button>
        <dcx-ng-button label="Button" type="button" variant="primary"></dcx-ng-button>
      </form>
    `,
  }),
};

export const Disabled: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <dcx-ng-button label="Disabled" variant="primary" [disabled]="true"></dcx-ng-button>
    `,
  }),
};

export const Variants: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
        <dcx-ng-button label="Primary"   size="m" variant="primary"></dcx-ng-button>
        <dcx-ng-button label="Secondary" size="m" variant="secondary"></dcx-ng-button>
        <dcx-ng-button label="Terciary"  size="m" variant="terciary"></dcx-ng-button>
        <dcx-ng-button label="Danger"    size="m" variant="danger"></dcx-ng-button>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
        <dcx-ng-button label="Guardar"   size="m" variant="primary" icon iconName="save"        iconPosition="left" iconSize="m"></dcx-ng-button>
        <dcx-ng-button label="Siguiente" size="m" variant="primary" icon iconName="arrow-right" iconPosition="left" iconSize="m"></dcx-ng-button>
      </div>
    `,
  }),
};

export const StatesPrimary: Story = {
  name: 'Estados — Primary',
  render: args => ({
    props: { ...args },
    template: `
      <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
        <dcx-ng-button label="Default"  size="m" variant="primary"></dcx-ng-button>
        <dcx-ng-button label="Hover"    size="m" variant="primary" hover></dcx-ng-button>
        <dcx-ng-button label="Pressed"  size="m" variant="primary" pressed></dcx-ng-button>
        <dcx-ng-button label="Focus"    size="m" variant="primary" focused></dcx-ng-button>
        <dcx-ng-button label="Disabled" size="m" variant="primary" [disabled]="true"></dcx-ng-button>
      </div>
    `,
  }),
};

export const StatesSecondary: Story = {
  name: 'Estados — Secondary',
  render: args => ({
    props: { ...args },
    template: `
      <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
        <dcx-ng-button label="Default"  size="m" variant="secondary"></dcx-ng-button>
        <dcx-ng-button label="Hover"    size="m" variant="secondary" hover></dcx-ng-button>
        <dcx-ng-button label="Pressed"  size="m" variant="secondary" pressed></dcx-ng-button>
        <dcx-ng-button label="Focus"    size="m" variant="secondary" focused></dcx-ng-button>
        <dcx-ng-button label="Disabled" size="m" variant="secondary" [disabled]="true"></dcx-ng-button>
      </div>
    `,
  }),
};

export const StatesTerciary: Story = {
  name: 'Estados — Terciary',
  render: args => ({
    props: { ...args },
    template: `
      <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
        <dcx-ng-button label="Default"  size="m" variant="terciary"></dcx-ng-button>
        <dcx-ng-button label="Hover"    size="m" variant="terciary" hover></dcx-ng-button>
        <dcx-ng-button label="Pressed"  size="m" variant="terciary" pressed></dcx-ng-button>
        <dcx-ng-button label="Focus"    size="m" variant="terciary" focused></dcx-ng-button>
        <dcx-ng-button label="Disabled" size="m" variant="terciary" [disabled]="true"></dcx-ng-button>
      </div>
    `,
  }),
};

export const StatesDanger: Story = {
  name: 'Estados — Danger',
  render: args => ({
    props: { ...args },
    template: `
      <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
        <dcx-ng-button label="Default"  size="m" variant="danger"></dcx-ng-button>
        <dcx-ng-button label="Hover"    size="m" variant="danger" hover></dcx-ng-button>
        <dcx-ng-button label="Pressed"  size="m" variant="danger" pressed></dcx-ng-button>
        <dcx-ng-button label="Focus"    size="m" variant="danger" focused></dcx-ng-button>
        <dcx-ng-button label="Disabled" size="m" variant="danger" [disabled]="true"></dcx-ng-button>
      </div>
    `,
  }),
};

export const VariantsLarge: Story = {
  name: 'Variantes — Large',
  render: args => ({
    props: { ...args },
    template: `
      <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
        <dcx-ng-button label="Button" size="l" variant="primary"   icon iconName="chevron-left" iconPosition="left" iconSize="s" iconRightName="chevron-right"></dcx-ng-button>
        <dcx-ng-button label="Button" size="l" variant="secondary" icon iconName="chevron-left" iconPosition="left" iconSize="s" iconRightName="chevron-right"></dcx-ng-button>
        <dcx-ng-button label="Button" size="l" variant="terciary"  icon iconName="chevron-left" iconPosition="left" iconSize="s" iconRightName="chevron-right"></dcx-ng-button>
        <dcx-ng-button label="Button" size="l" variant="danger"    icon iconName="chevron-left" iconPosition="left" iconSize="s" iconRightName="chevron-right"></dcx-ng-button>
      </div>
    `,
  }),
};

export const VariantsMedium: Story = {
  name: 'Variantes — Medium',
  render: args => ({
    props: { ...args },
    template: `
      <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
        <dcx-ng-button label="Button" size="m" variant="primary"   icon iconName="chevron-left" iconPosition="left" iconSize="s" iconRightName="chevron-right"></dcx-ng-button>
        <dcx-ng-button label="Button" size="m" variant="secondary" icon iconName="chevron-left" iconPosition="left" iconSize="s" iconRightName="chevron-right"></dcx-ng-button>
        <dcx-ng-button label="Button" size="m" variant="terciary"  icon iconName="chevron-left" iconPosition="left" iconSize="s" iconRightName="chevron-right"></dcx-ng-button>
        <dcx-ng-button label="Button" size="m" variant="danger"    icon iconName="chevron-left" iconPosition="left" iconSize="s" iconRightName="chevron-right"></dcx-ng-button>
      </div>
    `,
  }),
};

export const VariantsSmall: Story = {
  name: 'Variantes — Small',
  render: args => ({
    props: { ...args },
    template: `
      <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
        <dcx-ng-button label="Button" size="s" variant="primary"   icon iconName="chevron-left" iconPosition="left" iconSize="s" iconRightName="chevron-right"></dcx-ng-button>
        <dcx-ng-button label="Button" size="s" variant="secondary" icon iconName="chevron-left" iconPosition="left" iconSize="s" iconRightName="chevron-right"></dcx-ng-button>
        <dcx-ng-button label="Button" size="s" variant="terciary"  icon iconName="chevron-left" iconPosition="left" iconSize="s" iconRightName="chevron-right"></dcx-ng-button>
        <dcx-ng-button label="Button" size="s" variant="danger"    icon iconName="chevron-left" iconPosition="left" iconSize="s" iconRightName="chevron-right"></dcx-ng-button>
      </div>
    `,
  }),
};

export const AsLink: Story = {
  name: 'Botón como enlace',
  render: args => ({
    props: { ...args },
    template: `
      <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
        <dcx-ng-button label="Enlace Primary"   variant="primary"   href="https://angular.dev" target="_blank"></dcx-ng-button>
        <dcx-ng-button label="Enlace Secondary" variant="secondary" href="https://angular.dev" target="_blank"></dcx-ng-button>
        <dcx-ng-button label="Enlace Terciary"  variant="terciary"  href="https://angular.dev" target="_blank"></dcx-ng-button>
        <dcx-ng-button label="Enlace Danger"    variant="danger"    href="https://angular.dev" target="_blank"></dcx-ng-button>
        <dcx-ng-button label="Enlace Disabled"  variant="primary"   href="https://angular.dev" [disabled]="true"></dcx-ng-button>
      </div>
    `,
  }),
};
