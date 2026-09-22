import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj } from '@storybook/web-components';

import '../../dcx-web-components/dcx-web-navbar/dcx-web-navbar.component';
import '../../dcx-web-components/dcx-web-button/dcx-web-button.component';
import {
  navbarDefaultBrand,
  navbarBrandWithLogo,
  navbarItems,
  navbarItemsWithDisabled,
} from '../../core/fixtures/navbar';

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Navbar',
  component: 'dcx-web-navbar',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
  },
  argTypes: {
    brand: {
      control: 'object',
      description: 'Título y logo opcional del brand.',
      table: { category: 'Atributos' },
    },
    items: {
      control: 'object',
      description: 'Lista de items de navegación.',
      table: { category: 'Atributos' },
    },
    activeValue: {
      control: 'text',
      description: 'Value del item activo (controlado desde fuera).',
      table: { category: 'Atributos' },
    },
    ariaLabel: {
      control: 'text',
      description: 'Etiqueta accesible para el landmark <nav>.',
      table: { category: 'Atributos' },
    },
    vertical: {
      control: 'boolean',
      description: 'Activa el modo sidebar vertical.',
      table: { category: 'Atributos' },
    },
    onItemClick: {
      action: 'itemClick',
      table: { category: 'Eventos' },
    },
    onBrandClick: {
      action: 'brandClick',
      table: { category: 'Eventos' },
    },
  },
  args: {
    brand: navbarDefaultBrand,
    items: navbarItems,
    activeValue: null,
    vertical: false,
    ariaLabel: 'Navegación principal',
  },
  render: args => html`
    <dcx-web-navbar
      .brand=${args.brand}
      .items=${args.items}
      .activeValue=${args.activeValue}
      .vertical=${args.vertical}
      aria-label=${ifDefined(args.ariaLabel)}
      @itemClick=${args.onItemClick}
      @brandClick=${args.onBrandClick}
    ></dcx-web-navbar>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    brand: navbarDefaultBrand,
    items: navbarItems,
    activeValue: null,
  },
};

export const ConLogo: Story = {
  name: 'Con logo',
  args: {
    brand: navbarBrandWithLogo,
    items: navbarItems,
    activeValue: 'components',
  },
};

export const ConItemActivo: Story = {
  name: 'Con item activo',
  args: {
    brand: navbarBrandWithLogo,
    items: navbarItems,
    activeValue: 'guides',
  },
};

export const ConItemDeshabilitado: Story = {
  name: 'Con item deshabilitado',
  args: {
    brand: navbarDefaultBrand,
    items: navbarItemsWithDisabled,
    activeValue: 'home',
  },
};

export const ConAcciones: Story = {
  name: 'Con acciones (slot)',
  render: args => html`
    <dcx-web-navbar
      .brand=${args.brand}
      .items=${args.items}
      .activeValue=${args.activeValue}
      .vertical=${args.vertical}
      aria-label=${ifDefined(args.ariaLabel)}
      @itemClick=${args.onItemClick}
      @brandClick=${args.onBrandClick}
    >
      <dcx-web-button label="Login" size="s" variant="secondary"></dcx-web-button>
      <dcx-web-button label="Registrarse" size="s" variant="primary"></dcx-web-button>
    </dcx-web-navbar>
  `,
  args: {
    brand: navbarBrandWithLogo,
    items: navbarItems,
    activeValue: 'home',
  },
};

export const Vertical: Story = {
  name: 'Vertical (sidebar)',
  render: () => {
    const navbarId = 'vertical-sidebar-navbar';
    const activeTextId = 'vertical-sidebar-active-text';

    return html`
      <div style="display: flex; height: 480px;">
        <dcx-web-navbar
          id="${navbarId}"
          .brand=${navbarBrandWithLogo}
          .items=${navbarItems}
          .activeValue=${'home'}
          .vertical=${true}
          aria-label="Navegación principal"
          @itemClick=${(event: CustomEvent<string>) => {
            const navbar = document.getElementById(navbarId) as any | null;
            const activeText = document.getElementById(activeTextId);

            if (navbar) {
              navbar.activeValue = event.detail;
            }

            if (activeText) {
              activeText.textContent = event.detail;
            }
          }}
        >
          <dcx-web-button label="Login" size="s" variant="secondary"></dcx-web-button>
        </dcx-web-navbar>

        <div style="padding: 1.5rem; flex: 1; font-family: var(--ff-base, 'Inter', sans-serif); color: var(--text-dark, #1e2226);">
          <p style="font-size: var(--fs-base, 14px); font-weight: 600; margin: 0;">Contenido principal</p>
          <p style="margin: 0.75rem 0 0 0;">Item activo: <strong id="${activeTextId}">home</strong></p>
        </div>
      </div>
    `;
  },
  parameters: {
    controls: { disable: true },
  },
};

export const MenuMovilAbierto: Story = {
  name: 'Menú móvil abierto',
  render: () => html`
    <div style="max-width: 360px; border: 1px solid var(--border-light, #d1d5db); border-radius: 8px; overflow: hidden;">
      <dcx-web-navbar
        .brand=${navbarDefaultBrand}
        .items=${navbarItems}
        activeValue="home"
        aria-label="Navegación móvil de ejemplo"
      ></dcx-web-navbar>
    </div>
  `,
  parameters: {
    controls: { disable: true },
  },
};
