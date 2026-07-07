import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import {
  SIMPLE_CONTEXT_MENU_ITEMS,
  SUBLIST_CONTEXT_MENU_ITEMS,
  DEMO_DISABLED_MENU_ITEMS,
  DEMO_DANGER_MENU_ITEMS,
  DEMO_ADVANCED_MENU_ITEMS,
  DcxContextMenuItem,
  DcxWebButton,
} from '../../../index';

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/ContextMenu',
  component: 'dcx-web-context-menu',
  tags: ['autodocs'],
  argTypes: {
    items: {
      name: 'items',
      control: { type: 'object' },
      description: 'Array de elementos del menú contextual',
      table: {
        category: 'Atributos',
      },
    },
    position: {
      name: 'position',
      control: { type: 'object' },
      description: 'Posición del menú (x, y) en píxeles',
      table: {
        category: 'Atributos',
      },
    },
    positionMode: {
      name: 'positionMode',
      control: { type: 'select' },
      options: ['fixed', 'absolute'],
      description: 'Estrategia de posicionamiento',
      table: {
        category: 'Atributos',
      },
    },
  },
  args: {
    items: SIMPLE_CONTEXT_MENU_ITEMS,
    position: { x: 315, y: 70 },
    positionMode: 'fixed',
  },
};

export default meta;
type Story = StoryObj;

const rightClickTemplate = (
  label: string,
  items: DcxContextMenuItem[],
  positionMode: 'fixed' | 'absolute',
  position?: { x: number; y: number }
) => {
  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    const parent = (event.currentTarget as HTMLElement).parentElement;
    const menu = parent?.querySelector('dcx-web-context-menu') as any;
    if (menu) {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      const pos = positionMode === 'absolute'
        ? { x: event.clientX - rect.left, y: event.clientY - rect.top }
        : { x: event.clientX, y: event.clientY };
      menu.position = pos;
      setTimeout(() => {
        menu.open(pos);
      }, 0);
    }
  };

  const handleItemSelected = (event: CustomEvent) => {
    void event;
  };

  return html`
    <div style="padding: 2rem; position: relative;">
      <div
        @contextmenu="${handleContextMenu}"
        style="
          border: 2px dashed #ccc;
          padding: 3rem;
          text-align: center;
          cursor: context-menu;
          background: #f9f9f9;
          border-radius: 6px;
          min-height: 200px;
        "
      >
        <p style="margin: 0;">${label}</p>
      </div>
      <dcx-web-context-menu
        .items="${items}"
        .position="${position || { x: 0, y: 0 }}"
        .positionMode="${positionMode}"
        @item-selected="${handleItemSelected}"
      ></dcx-web-context-menu>
    </div>
  `;
};

export const ContextMenuOnRightClick: Story = {
  render: (args) => rightClickTemplate(
    'Haz clic derecho aquí para abrir el menú contextual',
    args.items,
    args.positionMode,
    args.position
  ),
};

export const ContextMenuWithSublists: Story = {
  render: (args) => rightClickTemplate(
    'Haz clic derecho aquí para abrir el menú con sublistas',
    args.items,
    args.positionMode,
    args.position
  ),
  args: {
    items: SUBLIST_CONTEXT_MENU_ITEMS,
  },
};

export const WithDisabledItems: Story = {
  render: (args) => rightClickTemplate(
    'Haz clic derecho para ver items desactivados',
    args.items,
    args.positionMode,
    args.position
  ),
  args: {
    items: DEMO_DISABLED_MENU_ITEMS,
  },
};

export const WithDangerItems: Story = {
  render: (args) => rightClickTemplate(
    'Haz clic derecho para ver la variante danger',
    args.items,
    args.positionMode,
    args.position
  ),
  args: {
    items: DEMO_DANGER_MENU_ITEMS,
  },
};

export const ButtonTrigger: Story = {
  render: (args) => {
    const handleButtonClick = (event: Event) => {
      const button = event.currentTarget as HTMLElement;
      const menu = button.closest('div')?.parentElement?.querySelector('dcx-web-context-menu') as any;
      if (menu) {
        const rect = button.getBoundingClientRect();
        const pos = { x: rect.left, y: rect.bottom + 4 };
        menu.position = pos;
        setTimeout(() => {
          menu.open(pos);
        }, 0);
      }
    };

    const handleItemSelected = (event: CustomEvent) => {
      void event;
    };

    return html`
      <div style="padding: 2rem;">
        <div style="display: inline-block;">
          <dcx-web-button
            label="Abrir menú"
            variant="primary"
            @click="${handleButtonClick}"
          ></dcx-web-button>
        </div>
        <dcx-web-context-menu
          .items="${args.items}"
          .position="${args.position || { x: 0, y: 0 }}"
          .positionMode="${args.positionMode}"
          @item-selected="${handleItemSelected}"
        ></dcx-web-context-menu>
      </div>
    `;
  },
  args: {
    items: DEMO_ADVANCED_MENU_ITEMS,
  },
};

export const AbsolutePositioning: Story = {
  render: (args) => rightClickTemplate(
    'Clic derecho — menú con positionMode="absolute" (relativo al contenedor)',
    args.items,
    'absolute',
    args.position
  ),
  args: {
    items: SIMPLE_CONTEXT_MENU_ITEMS,
  },
};
