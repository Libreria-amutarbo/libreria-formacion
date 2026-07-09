import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { AfterViewInit, Component, ViewChild, signal } from '@angular/core';
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
  brandClick: fn(),
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
      name: 'brand',
      control: { type: 'object' },
      description: 'Título y logo opcional del brand.',
      table: {
        category: 'Atributos',
        type: { summary: 'DcxNavbarBrand' },
        defaultValue: { summary: "{ title: 'App' }" },
      },
    },
    items: {
      name: 'items',
      control: { type: 'object' },
      description: 'Lista de items de navegación.',
      table: {
        category: 'Atributos',
        type: { summary: 'DcxNavItem[]' },
        defaultValue: { summary: '[]' },
      },
    },
    activeValue: {
      name: 'activeValue',
      control: 'text',
      description: 'Value del item activo (controlado desde fuera).',
      table: {
        category: 'Atributos',
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
      },
    },
    ariaLabel: {
      name: 'ariaLabel',
      control: { type: 'text' },
      description:
        'Etiqueta accesible para el landmark `<nav>`. Usar cuando haya varias navbars en la misma página para que los lectores de pantalla puedan distinguirlas.',
      table: {
        category: 'Atributos',
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
      },
    },
    vertical: {
      name: 'vertical',
      control: 'boolean',
      description: 'Activa el modo sidebar vertical.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    itemClick: {
      name: 'itemClick',
      action: 'itemClick',
      description: 'Emite el value del item clickado.',
      table: {
        category: 'Eventos',
        type: { summary: '(value: string) => void' },
      },
    },
    brandClick: {
      name: 'brandClick',
      action: 'brandClick',
      description: 'Se emite al activar el brand (click, Enter o Space).',
      table: {
        category: 'Eventos',
        type: { summary: '() => void' },
      },
    },
    toggleMenu: {
      name: 'toggleMenu()',
      description: 'Alterna la visibilidad del menú móvil.',
      control: false,
      table: {
        category: 'Métodos',
        type: { summary: '() => void' },
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
        ariaLabel="Navegación principal"
        (itemClick)="activeValue.set($event)"
      >
        <dcx-ng-button label="Login" size="s" variant="secondary" />
      </dcx-ng-navbar>
      <div style="padding: 1.5rem; flex: 1; font-family: var(--ff-base, 'Inter', sans-serif); color: var(--text-dark, #1e2226);">
        <p style="font-size: var(--fs-base, 14px); font-weight: 600;">Contenido principal</p>
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

// ─── Menú móvil abierto (fuerza el layout responsive dentro de un marco fijo) ─

@Component({
  selector: 'dcx-ng-navbar-mobile-story',
  standalone: true,
  imports: [DcxNgNavbarComponent],
  template: `
    <div class="mobile-frame">
      <dcx-ng-navbar
        #nav
        [brand]="brand"
        [items]="items"
        activeValue="home"
        ariaLabel="Navegación móvil de ejemplo"
      />
    </div>
  `,
  styles: [
    `
      .mobile-frame {
        max-width: 360px;
        margin: 2rem auto;
        border: 1px solid var(--border-light, #d1d5db);
        border-radius: 8px;
        overflow: hidden;
      }
      /* Fuerza el layout del breakpoint móvil: el iframe de Storybook suele ser más ancho que 767px */
      .mobile-frame ::ng-deep .dcx-ng-navbar__items {
        display: flex !important;
      }
      .mobile-frame ::ng-deep .dcx-ng-navbar__toggle {
        display: inline-block !important;
      }
    `,
  ],
})
class MobileMenuStoryComponent implements AfterViewInit {
  @ViewChild('nav') nav!: DcxNgNavbarComponent;
  brand = navbarDefaultBrand;
  items = navbarItems;

  ngAfterViewInit(): void {
    this.nav.toggleMenu();
  }
}

export const MenuMovilAbierto: Story = {
  name: 'Menú móvil abierto',
  render: () => ({
    props: {},
    template: `<dcx-ng-navbar-mobile-story />`,
  }),
  decorators: [
    moduleMetadata({
      imports: [MobileMenuStoryComponent],
    }),
  ],
  parameters: {
    controls: { disable: true },
  },
};
