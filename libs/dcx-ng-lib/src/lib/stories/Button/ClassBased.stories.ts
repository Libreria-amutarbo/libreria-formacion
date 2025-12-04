import { Meta, StoryObj } from '@storybook/angular';
import { within, expect, fn } from '@storybook/test';
import { DcxNgButtonComponent } from '../../dcx-ng-components/dcx-ng-button/dcx-ng-button.component';

const ActionsData = {
  buttonClick: fn(),
};

const meta: Meta<DcxNgButtonComponent> = {
  title: 'DCXLibrary/Button/Class based',
  component: DcxNgButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Texto visible del botón' },
    ariaLabel: {
      control: 'text',
      description: 'Nombre accesible (úsalo en botones de solo icono)',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Tipo nativo del botón',
    },
    disabled: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'link', 'icon'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'block'],
    },
    // Icono (usando dcx-ng-icon internamente)
    iconName: {
      control: 'text',
      description: 'Nombre de Material Icons (p.ej. "save", "settings")',
    },
    iconPosition: {
      control: 'inline-radio',
      options: ['start', 'end'],
    },
    iconSize: {
      control: 'select',
      options: ['s', 'm', 'l', 'xl'],
    },
    iconSpacing: {
      control: 'select',
      options: ['none', 'compact', 'spacious'],
    },
    iconColor: { control: 'color' },

    // Evento
    buttonClick: { action: 'buttonClick', description: 'Output al hacer click' },

    // Clase extra (si mantienes el @Input() class)
    class: { control: 'text', table: { category: 'Styling' } },
  },
  args: {
    label: 'Click me',
    ariaLabel: '',
    type: 'button',
    disabled: false,
    variant: 'primary',
    size: 'medium',
    iconName: '',
    iconPosition: 'start',
    iconSize: undefined,
    iconSpacing: 'none',
    iconColor: '',
    buttonClick: ActionsData.buttonClick,
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<DcxNgButtonComponent>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    label: 'Link',
  },
};

export const WithStartIcon: Story = {
  args: {
    variant: 'primary',
    label: 'Guardar',
    iconName: 'save',
    iconPosition: 'start',
  },
};

export const WithEndIcon: Story = {
  args: {
    variant: 'secondary',
    label: 'Siguiente',
    iconName: 'arrow_forward',
    iconPosition: 'end',
  },
};

export const IconOnlyAccessible: Story = {
  args: {
    variant: 'icon',
    label: '',
    ariaLabel: 'Abrir ajustes',
    iconName: 'settings',
  },
};

export const Sizes: Story = {
  render: (args) => ({
    props: { ...args },
    template: `
      <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
        <dcx-ng-button label="Small"  size="small"  variant="primary" iconName="check"></dcx-ng-button>
        <dcx-ng-button label="Medium" size="medium" variant="primary" iconName="check"></dcx-ng-button>
        <dcx-ng-button label="Large"  size="large"  variant="primary" iconName="check"></dcx-ng-button>
      </div>
    `,
  }),
};

export const Block: Story = {
  render: (args) => ({
    props: { ...args },
    template: `
      <div style="display:flex; flex-direction:column; gap:8px; width:320px;">
        <dcx-ng-button label="Block Primary"   size="block" variant="primary" iconName="arrow_forward"></dcx-ng-button>
        <dcx-ng-button label="Block Secondary" size="block" variant="secondary"></dcx-ng-button>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: (args) => ({
    props: { ...args },
    template: `
      <div style="display:flex; gap:12px; align-items:center;">
        <dcx-ng-button label="Disabled" variant="primary"   [disabled]="true"></dcx-ng-button>
        <dcx-ng-button label="Disabled" variant="secondary" [disabled]="true"></dcx-ng-button>
        <dcx-ng-button label="Disabled" variant="link"      [disabled]="true"></dcx-ng-button>
      </div>
    `,
  }),
};

export const Types: Story = {
  render: (args) => ({
    props: { ...args },
    template: `
      <form onsubmit="event.preventDefault()" style="display:flex; gap:12px; align-items:center;">
        <dcx-ng-button label="Submit" type="submit" variant="primary"></dcx-ng-button>
        <dcx-ng-button label="Reset"  type="reset"  variant="secondary"></dcx-ng-button>
        <dcx-ng-button label="Button" type="button" variant="link"></dcx-ng-button>
      </form>
    `,
  }),
};
