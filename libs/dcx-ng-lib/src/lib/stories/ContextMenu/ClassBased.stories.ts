import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  DcxNgContextMenuComponent,
  DcxNgButtonComponent,
  SIMPLE_CONTEXT_MENU_ITEMS,
  SUBLIST_CONTEXT_MENU_ITEMS,
} from '@dcx-ng-components/dcx-ng-lib';
import { DcxContextMenuItem } from '@dcx-ng-components/dcx-ng-lib';

const DISABLED_ITEMS: DcxContextMenuItem[] = [
  { text: 'Nuevo archivo', icon: 'file-earmark-plus' },
  { text: 'Abrir', icon: 'folder-open' },
  { divider: true },
  { text: 'Guardar', icon: 'save', disabled: true },
  { text: 'Guardar como...', icon: 'save-fill', disabled: true },
  { divider: true },
  { text: 'Eliminar', icon: 'trash', variant: 'danger' },
];

const DANGER_ITEMS: DcxContextMenuItem[] = [
  { text: 'Editar', icon: 'pencil' },
  { text: 'Duplicar', icon: 'copy' },
  { divider: true },
  { text: 'Archivar', icon: 'archive', variant: 'danger' },
  { text: 'Eliminar permanentemente', icon: 'trash', variant: 'danger' },
];

const BUTTON_TRIGGER_ITEMS: DcxContextMenuItem[] = [
  { text: 'Ver perfil', icon: 'person' },
  { text: 'Configuración', icon: 'gear' },
  { divider: true },
  { text: 'Cerrar sesión', icon: 'box-arrow-right', variant: 'danger' },
];

const meta: Meta<DcxNgContextMenuComponent> = {
  title: 'DCXLibrary/Components/ContextMenu',
  component: DcxNgContextMenuComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DcxNgButtonComponent],
    }),
  ],
  argTypes: {
    items: {
      name: 'items',
      control: { type: 'object' },
      description: 'Array de elementos del menú contextual',
      table: {
        category: 'Atributos',
        type: { summary: 'DcxContextMenuItem[]' },
      },
    },
    position: {
      name: 'position',
      control: { type: 'object' },
      description: 'Posición del menú (x, y) en píxeles',
      table: {
        category: 'Atributos',
        type: { summary: '{ x: number; y: number }' },
        defaultValue: { summary: '{ x: 0, y: 0 }' },
      },
    },
    positionMode: {
      name: 'positionMode',
      control: { type: 'select' },
      options: ['fixed', 'absolute'],
      description:
        'Estrategia de posicionamiento: `fixed` se posiciona relativo al viewport; `absolute` relativo al contenedor padre.',
      table: {
        category: 'Atributos',
        type: { summary: "'fixed' | 'absolute'" },
        defaultValue: { summary: "'fixed'" },
      },
    },
    itemSelected: {
      name: 'itemSelected',
      action: 'itemSelected',
      description: 'Evento emitido cuando se selecciona un item del menú',
      table: {
        category: 'Eventos',
        type: { summary: '(item: DcxContextMenuItem) => void' },
        defaultValue: { summary: '-' },
      },
    },
    menuClosed: {
      name: 'menuClosed',
      action: 'menuClosed',
      description: 'Evento emitido cuando el menú se cierra',
      table: {
        category: 'Eventos',
        type: { summary: '() => void' },
        defaultValue: { summary: '-' },
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
type Story = StoryObj<DcxNgContextMenuComponent>;

const rightClickTemplate = (label: string) => `
  <div style="padding: 2rem;">
    <div #area
      (contextmenu)="openContextMenu(contextMenu, $event, area)"
      style="
        border: 2px dashed #ccc;
        padding: 3rem;
        text-align: center;
        cursor: context-menu;
        background: #f9f9f9;
        border-radius: 6px;
      ">
      <p style="margin: 0;">${label}</p>
    </div>
    <dcx-ng-context-menu
      #contextMenu
      [items]="items"
      [position]="_computedPosition || position"
      [positionMode]="positionMode"
      (itemSelected)="onItemSelected($event)">
    </dcx-ng-context-menu>
  </div>
`;

const rightClickProps = (args: any) => ({
  items: args.items,
  position: args.position,
  positionMode: args.positionMode,
  openContextMenu(
    menu: DcxNgContextMenuComponent,
    event: MouseEvent,
    area: HTMLElement,
  ) {
    event.preventDefault();
    (this as any)._computedPosition = { x: event.clientX, y: event.clientY };
    setTimeout(() => menu.open(), 0);
  },
  onItemSelected(item: DcxContextMenuItem) {
    console.log('Item seleccionado:', item);
  },
});

export const ContextMenuOnRightClick: Story = {
  render: args => ({
    props: rightClickProps(args),
    template: rightClickTemplate(
      'Haz clic derecho aquí para abrir el menú contextual',
    ),
  }),
};

export const ContextMenuWithSublists: Story = {
  render: args => ({
    props: rightClickProps(args),
    template: rightClickTemplate(
      'Haz clic derecho aquí para abrir el menú con sublistas',
    ),
  }),
  args: {
    items: SUBLIST_CONTEXT_MENU_ITEMS,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Menú contextual con items anidados en varios niveles. Usa `ArrowRight` para navegar al submenú con teclado.',
      },
    },
  },
};

export const WithDisabledItems: Story = {
  render: args => ({
    props: rightClickProps(args),
    template: rightClickTemplate(
      'Haz clic derecho para ver items desactivados',
    ),
  }),
  args: {
    items: DISABLED_ITEMS,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Items desactivados no responden a clics y tienen `aria-disabled="true"` para lectores de pantalla.',
      },
    },
  },
};

export const WithDangerItems: Story = {
  render: args => ({
    props: rightClickProps(args),
    template: rightClickTemplate(
      'Haz clic derecho para ver la variante danger',
    ),
  }),
  args: {
    items: DANGER_ITEMS,
  },
  parameters: {
    docs: {
      description: {
        story:
          'La variante `danger` marca acciones destructivas (eliminar, archivar) con color rojo.',
      },
    },
  },
};

export const ButtonTrigger: Story = {
  render: args => ({
    props: {
      items: args.items,
      position: args.position,
      positionMode: args.positionMode,
      openFromButton(menu: DcxNgContextMenuComponent, trigger: HTMLElement) {
        const rect = trigger.getBoundingClientRect();
        (this as any)._pos = { x: rect.left, y: rect.bottom + 4 };
        setTimeout(() => menu.open(), 0);
      },
      onItemSelected(item: DcxContextMenuItem) {
        console.log('Item seleccionado:', item);
      },
    },
    template: `
      <div style="padding: 2rem;">
        <div #trigger style="display: inline-block;">
          <dcx-ng-button
            label="Abrir menú"
            variant="primary"
            (buttonClick)="openFromButton(contextMenu, trigger)">
          </dcx-ng-button>
        </div>
        <dcx-ng-context-menu
          #contextMenu
          [items]="items"
          [position]="_pos || position"
          [positionMode]="positionMode"
          (itemSelected)="onItemSelected($event)">
        </dcx-ng-context-menu>
      </div>
    `,
  }),
  args: {
    items: BUTTON_TRIGGER_ITEMS,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Menú contextual abierto programáticamente desde un botón, sin necesidad de clic derecho.',
      },
    },
  },
};

export const AbsolutePositioning: Story = {
  render: args => ({
    props: {
      items: args.items,
      position: args.position,
      positionMode: args.positionMode,
      openContextMenu(
        menu: DcxNgContextMenuComponent,
        event: MouseEvent,
        area: HTMLElement,
      ) {
        event.preventDefault();
        const rect = area.getBoundingClientRect();
        (this as any)._computedPosition = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
        setTimeout(() => menu.open(), 0);
      },
      onItemSelected(item: DcxContextMenuItem) {
        console.log('Item seleccionado:', item);
      },
    },
    template: `
      <div style="padding: 2rem;">
        <div #area
          (contextmenu)="openContextMenu(contextMenu, $event, area)"
          style="
            position: relative;
            border: 2px dashed #ccc;
            padding: 3rem;
            text-align: center;
            cursor: context-menu;
            background: #f9f9f9;
            border-radius: 6px;
            min-height: 200px;
          ">
          <p style="margin: 0;">
            Clic derecho — menú con <code>positionMode="absolute"</code> (relativo al contenedor)
          </p>
          <dcx-ng-context-menu
            #contextMenu
            [items]="items"
            [position]="_computedPosition || position"
            positionMode="absolute"
            (itemSelected)="onItemSelected($event)">
          </dcx-ng-context-menu>
        </div>
      </div>
    `,
  }),
  args: {
    items: SIMPLE_CONTEXT_MENU_ITEMS,
    position: { x: 40, y: 40 },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Con `positionMode="absolute"` el menú se posiciona relativo al contenedor padre en lugar del viewport. Útil dentro de contenedores con scroll.',
      },
    },
  },
};
