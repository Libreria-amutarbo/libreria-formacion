import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { ifDefined } from 'lit/directives/if-defined.js';
import { DcxWebButton } from '../../dcx-web-components/dcx-web-button/dcx-web-button.component';

// Import the component registration
import '../../../index';

// Mock icon for Storybook
const IconSvg = (name: string, slotName = 'dcx-icon') => {
  if (name === 'save') return html`<svg slot=${slotName} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>`;
  if (name === 'arrow-right') return html`<svg slot=${slotName} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
  if (name === 'trash') return html`<svg slot=${slotName} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2-2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;
  if (name === 'search') return html`<svg slot=${slotName} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`;
  if (name === 'chevron-left') return html`<svg slot=${slotName} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`;
  if (name === 'chevron-right') return html`<svg slot=${slotName} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
  if (name === 'star-fill') return html`<svg slot=${slotName} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
  return html``;
};

const meta: Meta<DcxWebButton & { onButtonClick: () => void }> = {
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
      options: [
        'primary',
        'secondary',
        'terciary',
        'danger',
        'text',
        'icon-only',
      ],
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
    ariaChecked: {
      control: 'select',
      options: ['true', 'false', 'mixed'],
      description: 'Estado del checkbox (ARIA)',
      table: { category: 'Atributos' },
    },
    onButtonClick: {
      action: 'buttonClick',
      table: { category: 'Eventos' },
    },
  },
  args: {
    label: 'Click me',
    ariaLabel: '',
    type: 'button',
    variant: 'primary',
    size: 'm',
    disabled: false,
    pressed: false,
    hover: false,
    focused: false,
    icon: false,
    iconName: '',
    iconRightName: '',
    iconPosition: 'left',
    iconSize: 'm',
    iconSpacing: 'none',
    iconColor: '',
    isCheckbox: false,
    checkboxError: false,
  },
  render: ({
    label,
    ariaLabel,
    type,
    disabled,
    pressed,
    hover,
    focused,
    variant,
    size,
    icon,
    iconName,
    iconRightName,
    iconPosition,
    iconSize,
    iconSpacing,
    iconColor,
    isCheckbox,
    checkboxError,
    ariaChecked,
    onButtonClick,
  }) => html`
    <dcx-web-button
      .label=${label}
      .ariaLabel=${ariaLabel}
      .type=${type}
      .disabled=${disabled}
      .pressed=${pressed}
      .hover=${hover}
      .focused=${focused}
      .variant=${variant}
      .size=${size}
      .iconPosition=${iconPosition}
      .iconSize=${iconSize}
      .iconSpacing=${iconSpacing}
      .iconColor=${iconColor}
      .isCheckbox=${isCheckbox}
      .checkboxError=${checkboxError}
      .ariaChecked=${ariaChecked}
      @buttonClick=${onButtonClick}
    >
      ${iconName || icon || variant === 'icon-only' ? IconSvg(iconName || 'star-fill', 'dcx-icon') : ''}
      ${iconRightName ? IconSvg(iconRightName, 'button-trailing') : ''}
    </dcx-web-button>
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
      <dcx-web-button aria-label="Icon only" size="m" variant="icon-only">
        ${IconSvg('star-fill', 'dcx-icon')}
      </dcx-web-button>
    </div>
  `,
};

export const WithIcons: Story = {
  render: () => html`
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
      <dcx-web-button label="Guardar"   size="m" variant="primary" icon-position="left" icon-size="m">
        ${IconSvg('save', 'dcx-icon')}
      </dcx-web-button>
      <dcx-web-button label="Siguiente" size="m" variant="primary" icon-position="right" icon-size="m">
        ${IconSvg('arrow-right', 'button-trailing')}
      </dcx-web-button>
      <dcx-web-button label="Eliminar"  size="m" variant="danger" icon-position="left" icon-size="m">
        ${IconSvg('trash', 'dcx-icon')}
      </dcx-web-button>
      <dcx-web-button aria-label="Buscar" size="m" variant="icon-only" icon-size="m">
        ${IconSvg('search', 'dcx-icon')}
      </dcx-web-button>
    </div>
  `,
};

export const StatesPrimary: Story = {
  name: 'Estados — Primary',
  render: () => html`
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
      <dcx-web-button label="Default"  size="m" variant="primary"></dcx-web-button>
      <dcx-web-button label="Hover"    size="m" variant="primary" .hover=${true}></dcx-web-button>
      <dcx-web-button label="Pressed"  size="m" variant="primary" .pressed=${true}></dcx-web-button>
      <dcx-web-button label="Focus"    size="m" variant="primary" .focused=${true}></dcx-web-button>
      <dcx-web-button label="Disabled" size="m" variant="primary" .disabled=${true}></dcx-web-button>
    </div>
  `,
};

export const StatesSecondary: Story = {
  name: 'Estados — Secondary',
  render: () => html`
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
      <dcx-web-button label="Default"  size="m" variant="secondary"></dcx-web-button>
      <dcx-web-button label="Hover"    size="m" variant="secondary" .hover=${true}></dcx-web-button>
      <dcx-web-button label="Pressed"  size="m" variant="secondary" .pressed=${true}></dcx-web-button>
      <dcx-web-button label="Focus"    size="m" variant="secondary" .focused=${true}></dcx-web-button>
      <dcx-web-button label="Disabled" size="m" variant="secondary" .disabled=${true}></dcx-web-button>
    </div>
  `,
};

export const StatesTerciary: Story = {
  name: 'Estados — Terciary',
  render: () => html`
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
      <dcx-web-button label="Default"  size="m" variant="terciary"></dcx-web-button>
      <dcx-web-button label="Hover"    size="m" variant="terciary" .hover=${true}></dcx-web-button>
      <dcx-web-button label="Pressed"  size="m" variant="terciary" .pressed=${true}></dcx-web-button>
      <dcx-web-button label="Focus"    size="m" variant="terciary" .focused=${true}></dcx-web-button>
      <dcx-web-button label="Disabled" size="m" variant="terciary" .disabled=${true}></dcx-web-button>
    </div>
  `,
};

export const StatesDanger: Story = {
  name: 'Estados — Danger',
  render: () => html`
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
      <dcx-web-button label="Default"  size="m" variant="danger"></dcx-web-button>
      <dcx-web-button label="Hover"    size="m" variant="danger" .hover=${true}></dcx-web-button>
      <dcx-web-button label="Pressed"  size="m" variant="danger" .pressed=${true}></dcx-web-button>
      <dcx-web-button label="Focus"    size="m" variant="danger" .focused=${true}></dcx-web-button>
      <dcx-web-button label="Disabled" size="m" variant="danger" .disabled=${true}></dcx-web-button>
    </div>
  `,
};

export const StatesText: Story = {
  name: 'Estados — Text',
  render: () => html`
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
      <dcx-web-button label="Default"  size="m" variant="text"></dcx-web-button>
      <dcx-web-button label="Hover"    size="m" variant="text" .hover=${true}></dcx-web-button>
      <dcx-web-button label="Pressed"  size="m" variant="text" .pressed=${true}></dcx-web-button>
      <dcx-web-button label="Focus"    size="m" variant="text" .focused=${true}></dcx-web-button>
      <dcx-web-button label="Disabled" size="m" variant="text" .disabled=${true}></dcx-web-button>
    </div>
  `,
};

export const VariantsLarge: Story = {
  name: 'Variantes — Large',
  render: () => html`
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
      <dcx-web-button label="Button" size="l" variant="primary" icon-position="left" icon-size="s">
        ${IconSvg('chevron-left', 'dcx-icon')}
        ${IconSvg('chevron-right', 'button-trailing')}
      </dcx-web-button>
      <dcx-web-button label="Button" size="l" variant="secondary" icon-position="left" icon-size="s">
        ${IconSvg('chevron-left', 'dcx-icon')}
        ${IconSvg('chevron-right', 'button-trailing')}
      </dcx-web-button>
      <dcx-web-button label="Button" size="l" variant="terciary" icon-position="left" icon-size="s">
        ${IconSvg('chevron-left', 'dcx-icon')}
        ${IconSvg('chevron-right', 'button-trailing')}
      </dcx-web-button>
      <dcx-web-button label="Button" size="l" variant="danger" icon-position="left" icon-size="s">
        ${IconSvg('chevron-left', 'dcx-icon')}
        ${IconSvg('chevron-right', 'button-trailing')}
      </dcx-web-button>
    </div>
  `,
};

export const VariantsMedium: Story = {
  name: 'Variantes — Medium',
  render: () => html`
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
      <dcx-web-button label="Button" size="m" variant="primary" icon-position="left" icon-size="s">
        ${IconSvg('chevron-left', 'dcx-icon')}
        ${IconSvg('chevron-right', 'button-trailing')}
      </dcx-web-button>
      <dcx-web-button label="Button" size="m" variant="secondary" icon-position="left" icon-size="s">
        ${IconSvg('chevron-left', 'dcx-icon')}
        ${IconSvg('chevron-right', 'button-trailing')}
      </dcx-web-button>
      <dcx-web-button label="Button" size="m" variant="terciary" icon-position="left" icon-size="s">
        ${IconSvg('chevron-left', 'dcx-icon')}
        ${IconSvg('chevron-right', 'button-trailing')}
      </dcx-web-button>
      <dcx-web-button label="Button" size="m" variant="danger" icon-position="left" icon-size="s">
        ${IconSvg('chevron-left', 'dcx-icon')}
        ${IconSvg('chevron-right', 'button-trailing')}
      </dcx-web-button>
    </div>
  `,
};

export const VariantsSmall: Story = {
  name: 'Variantes — Small',
  render: () => html`
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
      <dcx-web-button label="Button" size="s" variant="primary" icon-position="left" icon-size="s">
        ${IconSvg('chevron-left', 'dcx-icon')}
        ${IconSvg('chevron-right', 'button-trailing')}
      </dcx-web-button>
      <dcx-web-button label="Button" size="s" variant="secondary" icon-position="left" icon-size="s">
        ${IconSvg('chevron-left', 'dcx-icon')}
        ${IconSvg('chevron-right', 'button-trailing')}
      </dcx-web-button>
      <dcx-web-button label="Button" size="s" variant="terciary" icon-position="left" icon-size="s">
        ${IconSvg('chevron-left', 'dcx-icon')}
        ${IconSvg('chevron-right', 'button-trailing')}
      </dcx-web-button>
      <dcx-web-button label="Button" size="s" variant="danger" icon-position="left" icon-size="s">
        ${IconSvg('chevron-left', 'dcx-icon')}
        ${IconSvg('chevron-right', 'button-trailing')}
      </dcx-web-button>
    </div>
  `,
};
