import { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { DcxNgButtonComponent } from '../../dcx-ng-components/dcx-ng-button/dcx-ng-button.component';
import { BOOTSTRAP_ICONS } from '../../../../.storybook/bootstrap-icons';
import {
  BUTTON_VARIANT_LIST,
  DcxIconPositionList,
} from '@dcx-ng-components/dcx-ng-lib';

const ActionsData = { buttonClick: fn() };

const meta: Meta<DcxNgButtonComponent> = {
  title: 'DCXLibrary/Button/Class based',
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
      table: {
        category: 'Attributes',
        defaultValue: {
          summary: 'primary',
        },
      },
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l', 'block'],
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
    // Icono (usando dcx-ng-icon internamente)
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
        'Icono de Bootstrap Icons al final (p.ej. "arrow-right", "chevron-right")',
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
    // class: { control: 'text', table: { category: 'Styling' } },
  },
  args: {
    label: 'Click me',
    ariaLabel: '',
    type: 'button',
    disabled: false,
    variant: 'primary',
    size: 'm',
    icon: false,
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

export const Default: Story = {
  args: { variant: 'primary', label: 'Button' },
};

export const Types: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <form onsubmit="event.preventDefault()" style="display:flex; gap:12px; align-items:center;">
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
        <dcx-ng-button label="Primary"  size="m" variant="primary"></dcx-ng-button>
        <dcx-ng-button label="Medium" size="m" variant="secondary"></dcx-ng-button>
        <dcx-ng-button label="Terciary"  size="m" variant="terciary"></dcx-ng-button>
    </div>
       
       
    `,
  }),
};

export const Sizes: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
        <dcx-ng-button label="Small"  size="s" variant="primary" iconPosition="check"></dcx-ng-button>
        <dcx-ng-button label="Medium" size="m" variant="primary" iconEnd="check"></dcx-ng-button>
        <dcx-ng-button label="Large"  size="l" variant="primary" iconPosition="check"></dcx-ng-button>
         <dcx-ng-button label="Block"  size="block" variant="primary" iconPosition="check"></dcx-ng-button>
      </div>
    `,
  }),
};

export const WithtIcons: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
        <dcx-ng-button label="Guardar"  size="m" variant="primary" icon="true" iconName="save" iconPosition="left" iconSize="m"></dcx-ng-button>
        <dcx-ng-button label="Siguiente" size="m" variant="primary" icon="true" iconName="arrow-right" iconPosition="left" iconSize="m"></dcx-ng-button>
      </div>
    `,
  }),
};

export const IconsButtonPositions: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
        <dcx-ng-button label="Left"  size="m" variant="primary" icon="true" iconName="save" iconPosition="left" iconSize="m"></dcx-ng-button>
        <dcx-ng-button label="Top" size="m" variant="primary" icon="true" iconName="save" iconPosition="top" iconSize="m"></dcx-ng-button>
         <dcx-ng-button label="Right" size="m" variant="primary" icon="true" iconName="save" iconPosition="right" iconSize="m"></dcx-ng-button>
          <dcx-ng-button label="Bottom" size="m" variant="primary" icon="true" iconName="save" iconPosition="bottom" iconSize="m"></dcx-ng-button>
      </div>
    `,
  }),
};

export const IconsButtonSizes: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
        <dcx-ng-button label="Small"  size="m" variant="primary" icon="true" iconName="save" iconPosition="left" iconSize="s"></dcx-ng-button>
        <dcx-ng-button label="Medium" size="m" variant="primary" icon="true" iconName="save" iconPosition="left" iconSize="m"></dcx-ng-button>
         <dcx-ng-button label="Large" size="m" variant="primary" icon="true" iconName="save" iconPosition="left" iconSize="l"></dcx-ng-button>
          <dcx-ng-button label="Extra large" size="m" variant="primary" icon="true" iconName="save" iconPosition="left" iconSize="xl"></dcx-ng-button>
      </div>
    `,
  }),
};
