import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { ifDefined } from 'lit/directives/if-defined.js';

// Import the component registration
import '../../../index';

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Button',
  component: 'dcx-web-button',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto visible del botón',
      table: { category: 'Atributos' },
    },
    ariaLabel: {
      control: 'text',
      description: 'Nombre accesible (úsalo en botones de solo icono)',
      table: { category: 'Atributos' },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Tipo nativo del botón',
      table: {
        category: 'Atributos',
        defaultValue: { summary: 'button' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita el botón y previene interacción',
      table: {
        category: 'Atributos',
        defaultValue: { summary: 'false' },
      },
    },
    hover: {
      control: 'boolean',
      description: 'Estado hover estático del botón',
      table: {
        category: 'Atributos',
        defaultValue: { summary: 'false' },
      },
    },
    focused: {
      control: 'boolean',
      description: 'Estado focus estático del botón',
      table: {
        category: 'Atributos',
        defaultValue: { summary: 'false' },
      },
    },
    pressed: {
      control: 'boolean',
      description: 'Estado presionado del botón',
      table: {
        category: 'Atributos',
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'terciary', 'danger', 'text', 'icon-only'],
      description: 'Estilo visual del botón',
      table: {
        category: 'Atributos',
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l', 'xl'],
      description: 'Tamaño del botón',
      table: {
        category: 'Atributos',
        defaultValue: { summary: 'm' },
      },
    },
    icon: {
      control: 'boolean',
      table: {
        category: 'Atributos',
        defaultValue: { summary: 'false' },
      },
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Posición del icono',
      table: { category: 'Atributos' },
    },
    iconName: {
      control: 'text',
      description: 'Nombre del icono (Bootstrap Icons)',
      table: { category: 'Atributos' },
    },
    iconRightName: {
      control: 'text',
      description: 'Icono derecho',
      table: { category: 'Atributos' },
    },
    iconSize: {
      control: 'select',
      options: ['s', 'm', 'l', 'xl'],
      table: { category: 'Atributos' },
    },
    iconSpacing: {
      control: 'select',
      options: ['none', 'compact', 'spacious'],
      table: { category: 'Atributos' },
    },
    iconColor: {
      control: 'color',
      table: { category: 'Atributos' },
    },
    isCheckbox: {
      control: 'boolean',
      description: 'Modo checkbox',
      table: {
        category: 'Atributos',
        defaultValue: { summary: 'false' },
      },
    },
    checkboxError: {
      control: 'boolean',
      description: 'Error en modo checkbox',
      table: {
        category: 'Atributos',
        defaultValue: { summary: 'false' },
      },
    },
    onButtonClick: {
      action: 'buttonClick',
      table: { category: 'Eventos' },
    },
  },
  args: {
    label: 'Click me',
    variant: 'primary',
    size: 'm',
    disabled: false,
    icon: false,
    iconPosition: 'left',
    iconSpacing: 'none',
  },
  render: (args) => html`
    <dcx-web-button
      label=${args.label}
      aria-label=${ifDefined(args.ariaLabel)}
      type=${args.type || 'button'}
      ?disabled=${args.disabled}
      ?pressed=${args.pressed}
      ?hover=${args.hover}
      ?focused=${args.focused}
      variant=${args.variant}
      size=${args.size}
      ?icon=${args.icon}
      icon-name=${ifDefined(args.iconName)}
      icon-right-name=${ifDefined(args.iconRightName)}
      icon-position=${ifDefined(args.iconPosition)}
      icon-size=${ifDefined(args.iconSize)}
      icon-spacing=${ifDefined(args.iconSpacing)}
      icon-color=${ifDefined(args.iconColor)}
      ?is-checkbox=${args.isCheckbox}
      ?checkbox-error=${args.checkboxError}
      @buttonClick=${args.onButtonClick}
    ></dcx-web-button>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { label: 'Default', variant: 'primary' },
};

export const Types: Story = {
  render: () => html`
    <div style="display:flex; gap:12px; align-items:center;">
      <dcx-web-button label="Submit" type="submit" variant="primary"></dcx-web-button>
      <dcx-web-button label="Reset"  type="reset"  variant="primary"></dcx-web-button>
      <dcx-web-button label="Button" type="button" variant="primary"></dcx-web-button>
    </div>
  `,
};

export const Disabled: Story = {
  args: { label: 'Disabled', variant: 'primary', disabled: true },
};

export const Variants: Story = {
  render: () => html`
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
      <dcx-web-button label="Primary"   size="m" variant="primary"></dcx-web-button>
      <dcx-web-button label="Secondary" size="m" variant="secondary"></dcx-web-button>
      <dcx-web-button label="Terciary"  size="m" variant="terciary"></dcx-web-button>
      <dcx-web-button label="Danger"    size="m" variant="danger"></dcx-web-button>
      <dcx-web-button label="Text"      size="m" variant="text"></dcx-web-button>
      <dcx-web-button aria-label="Icon only" size="m" variant="icon-only" ?icon=${true} icon-name="search"></dcx-web-button>
    </div>
  `,
};

export const WithIcons: Story = {
  render: () => html`
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
      <dcx-web-button label="Guardar"   size="m" variant="primary" ?icon=${true} icon-name="save"        icon-position="left" icon-size="m"></dcx-web-button>
      <dcx-web-button label="Siguiente" size="m" variant="primary" ?icon=${true} icon-name="arrow-right" icon-position="left" icon-size="m"></dcx-web-button>
    </div>
  `,
};

export const StatesPrimary: Story = {
  name: 'Estados — Primary',
  render: () => html`
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
      <dcx-web-button label="Default"  size="m" variant="primary"></dcx-web-button>
      <dcx-web-button label="Hover"    size="m" variant="primary" ?hover=${true}></dcx-web-button>
      <dcx-web-button label="Pressed"  size="m" variant="primary" ?pressed=${true}></dcx-web-button>
      <dcx-web-button label="Focus"    size="m" variant="primary" ?focused=${true}></dcx-web-button>
      <dcx-web-button label="Disabled" size="m" variant="primary" ?disabled=${true}></dcx-web-button>
    </div>
  `,
};

export const StatesSecondary: Story = {
  name: 'Estados — Secondary',
  render: () => html`
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
      <dcx-web-button label="Default"  size="m" variant="secondary"></dcx-web-button>
      <dcx-web-button label="Hover"    size="m" variant="secondary" ?hover=${true}></dcx-web-button>
      <dcx-web-button label="Pressed"  size="m" variant="secondary" ?pressed=${true}></dcx-web-button>
      <dcx-web-button label="Focus"    size="m" variant="secondary" ?focused=${true}></dcx-web-button>
      <dcx-web-button label="Disabled" size="m" variant="secondary" ?disabled=${true}></dcx-web-button>
    </div>
  `,
};

export const StatesTerciary: Story = {
  name: 'Estados — Terciary',
  render: () => html`
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
      <dcx-web-button label="Default"  size="m" variant="terciary"></dcx-web-button>
      <dcx-web-button label="Hover"    size="m" variant="terciary" ?hover=${true}></dcx-web-button>
      <dcx-web-button label="Pressed"  size="m" variant="terciary" ?pressed=${true}></dcx-web-button>
      <dcx-web-button label="Focus"    size="m" variant="terciary" ?focused=${true}></dcx-web-button>
      <dcx-web-button label="Disabled" size="m" variant="terciary" ?disabled=${true}></dcx-web-button>
    </div>
  `,
};

export const StatesDanger: Story = {
  name: 'Estados — Danger',
  render: () => html`
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
      <dcx-web-button label="Default"  size="m" variant="danger"></dcx-web-button>
      <dcx-web-button label="Hover"    size="m" variant="danger" ?hover=${true}></dcx-web-button>
      <dcx-web-button label="Pressed"  size="m" variant="danger" ?pressed=${true}></dcx-web-button>
      <dcx-web-button label="Focus"    size="m" variant="danger" ?focused=${true}></dcx-web-button>
      <dcx-web-button label="Disabled" size="m" variant="danger" ?disabled=${true}></dcx-web-button>
    </div>
  `,
};

export const StatesText: Story = {
  name: 'Estados — Text',
  render: () => html`
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
      <dcx-web-button label="Default"  size="m" variant="text"></dcx-web-button>
      <dcx-web-button label="Hover"    size="m" variant="text" ?hover=${true}></dcx-web-button>
      <dcx-web-button label="Pressed"  size="m" variant="text" ?pressed=${true}></dcx-web-button>
      <dcx-web-button label="Focus"    size="m" variant="text" ?focused=${true}></dcx-web-button>
      <dcx-web-button label="Disabled" size="m" variant="text" ?disabled=${true}></dcx-web-button>
    </div>
  `,
};

export const VariantsLarge: Story = {
  name: 'Variantes — Large',
  render: () => html`
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
      <dcx-web-button label="Button" size="l" variant="primary"   ?icon=${true} icon-name="chevron-left" icon-position="left" icon-size="s" icon-right-name="chevron-right"></dcx-web-button>
      <dcx-web-button label="Button" size="l" variant="secondary" ?icon=${true} icon-name="chevron-left" icon-position="left" icon-size="s" icon-right-name="chevron-right"></dcx-web-button>
      <dcx-web-button label="Button" size="l" variant="terciary"  ?icon=${true} icon-name="chevron-left" icon-position="left" icon-size="s" icon-right-name="chevron-right"></dcx-web-button>
      <dcx-web-button label="Button" size="l" variant="danger"    ?icon=${true} icon-name="chevron-left" icon-position="left" icon-size="s" icon-right-name="chevron-right"></dcx-web-button>
    </div>
  `,
};

export const VariantsMedium: Story = {
  name: 'Variantes — Medium',
  render: () => html`
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
      <dcx-web-button label="Button" size="m" variant="primary"   ?icon=${true} icon-name="chevron-left" icon-position="left" icon-size="s" icon-right-name="chevron-right"></dcx-web-button>
      <dcx-web-button label="Button" size="m" variant="secondary" ?icon=${true} icon-name="chevron-left" icon-position="left" icon-size="s" icon-right-name="chevron-right"></dcx-web-button>
      <dcx-web-button label="Button" size="m" variant="terciary"  ?icon=${true} icon-name="chevron-left" icon-position="left" icon-size="s" icon-right-name="chevron-right"></dcx-web-button>
      <dcx-web-button label="Button" size="m" variant="danger"    ?icon=${true} icon-name="chevron-left" icon-position="left" icon-size="s" icon-right-name="chevron-right"></dcx-web-button>
    </div>
  `,
};

export const VariantsSmall: Story = {
  name: 'Variantes — Small',
  render: () => html`
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
      <dcx-web-button label="Button" size="s" variant="primary"   ?icon=${true} icon-name="chevron-left" icon-position="left" icon-size="s" icon-right-name="chevron-right"></dcx-web-button>
      <dcx-web-button label="Button" size="s" variant="secondary" ?icon=${true} icon-name="chevron-left" icon-position="left" icon-size="s" icon-right-name="chevron-right"></dcx-web-button>
      <dcx-web-button label="Button" size="s" variant="terciary"  ?icon=${true} icon-name="chevron-left" icon-position="left" icon-size="s" icon-right-name="chevron-right"></dcx-web-button>
      <dcx-web-button label="Button" size="s" variant="danger"    ?icon=${true} icon-name="chevron-left" icon-position="left" icon-size="s" icon-right-name="chevron-right"></dcx-web-button>
    </div>
  `,
};
