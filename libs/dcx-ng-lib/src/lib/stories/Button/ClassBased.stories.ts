import { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { DcxNgButtonComponent } from '../../dcx-ng-components/dcx-ng-button/dcx-ng-button.component';
import { BOOTSTRAP_ICONS } from '../../../../.storybook/bootstrap-icons';

const ActionsData = { buttonClick: fn() };

const meta: Meta<DcxNgButtonComponent> = {
  title: 'DCXLibrary/Button/Class based',
  component: DcxNgButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto visible del botón',
      table: { category: 'Attributes' }
    },
    ariaLabel: {
      control: 'text',
      description: 'Nombre accesible (úsalo en botones de solo icono)',
      table: { category: 'Attributes' }
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Tipo nativo del botón',
      table: { category: 'Attributes' }
    },
    disabled: {
      control: 'boolean', table: { category: 'Attributes' }
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'link', 'icon'],
      table: { category: 'Attributes' }
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l', 'block'],
      table: { category: 'Attributes' }
    },
    // Icono (usando dcx-ng-icon internamente)
    iconStart: {
      control: 'select',
      options: BOOTSTRAP_ICONS,
      description:
        'Icono de Bootstrap Icons al inicio (p.ej. "save", "chevron-left")',
      table: { category: 'Attributes' }
    },
    iconEnd: {
      control: 'select',
      options: BOOTSTRAP_ICONS,
      description:
        'Icono de Bootstrap Icons al final (p.ej. "arrow-right", "chevron-right")',
      table: { category: 'Attributes' }
    },
    iconSize: {
      control: 'select',
      options: ['s', 'm', 'l', 'xl'],
      table: { category: 'Attributes' }
    },
    iconSpacing: {
      control: 'select',
      options: ['none', 'compact', 'spacious'],
      table: { category: 'Attributes' }
    },
    iconColor: {
      control: 'color', table: { category: 'Attributes' }
    },
    buttonClick: {
      action: 'buttonClick',
      description: 'Output al hacer click',
      table: {
        category: 'Eventos',
        type: { summary: '(clicked: boolean) => void' },
        defaultValue: { summary: '-' },
      }
    },
    class: { control: 'text', table: { category: 'Styling' } },
  },
  args: {
    label: 'Click me',
    ariaLabel: '',
    type: 'button',
    disabled: false,
    variant: 'primary',
    size: 'm',
    iconStart: '',
    iconEnd: '',
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
  args: { variant: 'primary', label: 'Primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', label: 'Secondary' },
};

export const Link: Story = {
  args: { variant: 'link', label: 'Link' },
};

export const WithStartIcon: Story = {
  args: {
    variant: 'primary',
    label: 'Guardar',
    iconStart: 'save',
  },
};

export const WithEndIcon: Story = {
  args: {
    variant: 'secondary',
    label: 'Siguiente',
    iconStart: 'arrow_forward',
  },
};

export const IconOnlyAccessible: Story = {
  args: {
    variant: 'icon',
    label: '',
    ariaLabel: 'Abrir ajustes',
    iconStart: 'settings',
  },
};

export const Sizes: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
        <dcx-ng-button label="Small"  size="s" variant="primary" iconStart="check"></dcx-ng-button>
        <dcx-ng-button label="Medium" size="m" variant="primary" iconEnd="check"></dcx-ng-button>
        <dcx-ng-button label="Large"  size="l" variant="primary" iconStart="check"></dcx-ng-button>
      </div>
    `,
  }),
};

export const Block: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <div style="display:flex; flex-direction:column; gap:8px; width:320px;">
        <dcx-ng-button label="Block Primary" size="block" variant="primary" iconStart="arrow_forward"></dcx-ng-button>
        <dcx-ng-button label="Block Secondary" size="block" variant="secondary"></dcx-ng-button>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <div style="display:flex; gap:12px; align-items:center;">
        <dcx-ng-button label="Disabled" variant="primary" [disabled]="true"></dcx-ng-button>
        <dcx-ng-button label="Disabled" variant="secondary" [disabled]="true"></dcx-ng-button>
        <dcx-ng-button label="Disabled" variant="link" [disabled]="true"></dcx-ng-button>
      </div>
    `,
  }),
};

export const Types: Story = {
  render: args => ({
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
