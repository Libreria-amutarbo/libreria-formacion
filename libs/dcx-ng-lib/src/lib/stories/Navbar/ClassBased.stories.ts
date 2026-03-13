import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { Component, signal } from '@angular/core';
import {
  DcxNgNavbarComponent,
  DcxNgButtonComponent,
  navbarDefaultBrand,
  navbarBrandWithLogo,
  navbarItems,
  navbarItemsWithDisabled,
} from '@dcx-ng-components/dcx-ng-lib';

// ─── Actions ─────────────────────────────────────────────────────────────────

const ActionsData = {
  itemClick: fn(),
};

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<DcxNgNavbarComponent> = {
  title: 'DCXLibrary/Components/Navbar',
  component: DcxNgNavbarComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
  },
  decorators: [
    moduleMetadata({
      imports: [DcxNgNavbarComponent, DcxNgButtonComponent],
    }),
  ],
  argTypes: {
    brand: {
      control: { type: 'object' },
      description: 'Título y logo opcional del brand',
      table: {
        category: 'Attributes',
        type: { summary: 'DcxNavbarBrand' },
        defaultValue: { summary: "{ title: 'App' }" },
      },
    },
    items: {
      control: { type: 'object' },
      description: 'Lista de items de navegación',
      table: {
        category: 'Attributes',
        type: { summary: 'DcxNavItem[]' },
        defaultValue: { summary: '[]' },
      },
    },
    activeValue: {
      control: 'text',
      description: 'Value del item activo (controlado desde fuera)',
      table: {
        category: 'Attributes',
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
      },
    },
    vertical: {
      control: 'boolean',
      description: 'Activa el modo sidebar vertical',
      table: {
        category: 'Attributes',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    itemClick: {
      action: 'itemClick',
      description: 'Emite el value del item clickado',
      table: {
        category: 'Events',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    brand: navbarDefaultBrand,
    items: navbarItems,
    activeValue: 'home',
    vertical: false,
  },
};

export default meta;
type Story = StoryObj<DcxNgNavbarComponent>;

// ─── Stories ─────────────────────────────────────────────────────────────────

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
  render: args => ({
    props: {
      ...args,
      itemClick: ActionsData.itemClick,
    },
    template: `
      <dcx-ng-navbar
        [brand]="brand"
        [items]="items"
        [activeValue]="activeValue"
        (itemClick)="itemClick($event)"
      >
        <dcx-ng-button label="Login" size="s" variant="secondary" />
        <dcx-ng-button label="Registrarse" size="s" variant="primary" />
      </dcx-ng-navbar>
    `,
  }),
  args: {
    brand: navbarBrandWithLogo,
    activeValue: 'home',
  },
};

// ─── Vertical wrapper (necesita estado interno para interactividad) ───────────

@Component({
  selector: 'dcx-ng-navbar-vertical-story',
  standalone: true,
  imports: [DcxNgNavbarComponent, DcxNgButtonComponent],
  template: `
    <div style="display: flex; height: 480px;">
      <dcx-ng-navbar
        [brand]="brand"
        [items]="items"
        [activeValue]="activeValue()"
        [vertical]="true"
        (itemClick)="activeValue.set($event)"
      >
        <dcx-ng-button label="Login" size="s" variant="secondary" />
      </dcx-ng-navbar>
      <div style="padding: 1.5rem; flex: 1; font-family: var(--font-family-primary); color: var(--text-body);">
        <p style="font-size: var(--font-size-h6); font-weight: 600;">Contenido principal</p>
        <p>Item activo: <strong>{{ activeValue() }}</strong></p>
      </div>
    </div>
  `,
})
class VerticalStoryComponent {
  brand = navbarBrandWithLogo;
  items = navbarItems;
  activeValue = signal('home');
}

export const Vertical: Story = {
  name: 'Vertical (sidebar)',
  render: () => ({
    props: {},
    template: `<dcx-ng-navbar-vertical-story />`,
  }),
  decorators: [
    moduleMetadata({
      imports: [VerticalStoryComponent],
    }),
  ],
  parameters: {
    controls: { disable: true },
  },
};
