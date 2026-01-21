import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ContextMenuComponent } from '../../dcx-ng-components/dcx-ng-contextMenu/dcx-ng-contextMenu.component';
import { CommonModule } from '@angular/common';
import { DcxNgButtonComponent } from '../../dcx-ng-components/dcx-ng-button/dcx-ng-button.component';
import { DcxNgFullTableComponent } from '../../dcx-ng-components/dcx-ng-full-table/dcx-ng-full-table.component';
import { DcxNgFullTableTemplateDirective } from '../../dcx-ng-components/dcx-ng-full-table/dcx-ng-full-table-template.directive';
import {
  CONTEXT_MENU_ITEMS_BASIC,
  CONTEXT_MENU_ITEM_SINGLE,
  CONTEXT_MENU_ITEMS_MANY,
  CONTEXT_MENU_ITEMS_WITH_ICONS,
  CONTEXT_MENU_ITEMS_ADVANCED,
  TABLE_HEADERS_WITH_ACTIONS,
  TABLE_DATA_WITH_ACTIONS,
  getRowContextMenuItems,
} from '../../core/mock';

const meta: Meta<ContextMenuComponent> = {
  title: 'DCXLibrary/ContextMenu/ClassBased',
  component: ContextMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ContextMenuComponent, DcxNgButtonComponent, DcxNgFullTableComponent, DcxNgFullTableTemplateDirective],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
  },
  argTypes: {
    items: {
      name: 'items',
      control: { type: 'object' },
      description: 'Array de items del menú con label y action',
      table: {
        category: 'Attributes',
        type: { summary: 'ContextMenuItem[]' },
        defaultValue: { summary: '[]' },
      },
    },
    visible: {
      name: 'visible',
      control: { type: 'boolean' },
      description: 'Controla la visibilidad del context menu',
      table: {
        category: 'Attributes',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    position: {
      name: 'position',
      control: { type: 'object' },
      description: 'Posición del context menu (coordenadas x, y)',
      table: {
        category: 'Attributes',
        type: { summary: 'Position' },
        defaultValue: { summary: '{ x: 0, y: 0 }' },
      },
    },
    closeOnClickOutside: {
      name: 'closeOnClickOutside',
      control: { type: 'boolean' },
      description: 'Cerrar menú al hacer click fuera',
      table: {
        category: 'Attributes',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    closed: {
      name: 'closed',
      action: 'closed',
      description: 'Evento emitido cuando se cierra el menú',
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
  },
  args: {
    items: CONTEXT_MENU_ITEMS_BASIC,
    visible: false,
    position: { x: 0, y: 0 },
    closeOnClickOutside: true,
  },
};

export default meta;
type Story = StoryObj<ContextMenuComponent>;

// Ejemplo 1: Menú Básico
export const Basic: Story = {
  render: (args) => ({
    props: {
      ...args,
      menuVisible: false,
      menuPosition: { x: 50, y: 50 },
      onOpenMenu(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        (this as any).menuPosition = { 
          x: event.clientX, 
          y: event.clientY 
        };
        (this as any).menuVisible = true;
      },
      onClosed() {
        (this as any).menuVisible = false;
      },
    },
    template: `
      <div>
        <p style="margin: 0 0 10px 0; color: #666;">Menú contextual con opciones básicas: Edit, Delete, Share.</p>
        <div 
          (contextmenu)="onOpenMenu($event)"
          style="width: 400px; height: 200px; border: 1px dashed #ccc; padding: 20px; cursor: context-menu; display: flex; align-items: center; justify-content: center;">
          <p style="margin: 0; color: #666; user-select: none; text-align: center;">
            <strong>Haz clic derecho</strong> en esta área
          </p>
        </div>
        <dcx-ng-context-menu
          [items]="items"
          [visible]="menuVisible"
          [position]="menuPosition"
          (closed)="onClosed()">
        </dcx-ng-context-menu>
      </div>
    `,
  }),
  args: {
    items: CONTEXT_MENU_ITEMS_BASIC,
  },
};

// Ejemplo 2: Item Único
export const SingleItem: Story = {
  render: (args) => ({
    props: {
      ...args,
      menuVisible: false,
      menuPosition: { x: 50, y: 50 },
      onOpenMenu(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        (this as any).menuPosition = { 
          x: event.clientX, 
          y: event.clientY 
        };
        (this as any).menuVisible = true;
      },
      onClosed() {
        (this as any).menuVisible = false;
      },
    },
    template: `
      <div>
        <p style="margin: 0 0 10px 0; color: #666;">Menú contextual con un único elemento.</p>
        <div 
          (contextmenu)="onOpenMenu($event)"
          style="width: 400px; height: 200px; border: 1px dashed #ccc; padding: 20px; cursor: context-menu; display: flex; align-items: center; justify-content: center;">
          <p style="margin: 0; color: #666; user-select: none; text-align: center;">
            <strong>Haz clic derecho</strong> aquí
          </p>
        </div>
        <dcx-ng-context-menu
          [items]="items"
          [visible]="menuVisible"
          [position]="menuPosition"
          (closed)="onClosed()">
        </dcx-ng-context-menu>
      </div>
    `,
  }),
  args: {
    items: CONTEXT_MENU_ITEM_SINGLE,
  },
};

// Ejemplo 3: Múltiples Items
export const ManyItems: Story = {
  render: (args) => ({
    props: {
      ...args,
      menuVisible: false,
      menuPosition: { x: 50, y: 50 },
      onOpenMenu(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        (this as any).menuPosition = { 
          x: event.clientX, 
          y: event.clientY 
        };
        (this as any).menuVisible = true;
      },
      onClosed() {
        (this as any).menuVisible = false;
      },
    },
    template: `
      <div>
        <p style="margin: 0 0 10px 0; color: #666;">Menú contextual con varias opciones.</p>
        <div 
          (contextmenu)="onOpenMenu($event)"
          style="width: 400px; height: 250px; border: 1px dashed #ccc; padding: 20px; cursor: context-menu; display: flex; align-items: center; justify-content: center;">
          <p style="margin: 0; color: #666; user-select: none; text-align: center;">
            <strong>Haz clic derecho</strong> aquí
          </p>
        </div>
        <dcx-ng-context-menu
          [items]="items"
          [visible]="menuVisible"
          [position]="menuPosition"
          (closed)="onClosed()">
        </dcx-ng-context-menu>
      </div>
    `,
  }),
  args: {
    items: CONTEXT_MENU_ITEMS_MANY,
  },
};

// Ejemplo 4: Con Iconos
export const WithIcons: Story = {
  render: (args) => ({
    props: {
      ...args,
      menuVisible: false,
      menuPosition: { x: 50, y: 50 },
      onOpenMenu(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        (this as any).menuPosition = { 
          x: event.clientX, 
          y: event.clientY 
        };
        (this as any).menuVisible = true;
      },
      onClosed() {
        (this as any).menuVisible = false;
      },
    },
    template: `
      <div>
        <p style="margin: 0 0 10px 0; color: #666;">Menú contextual con iconos en cada opción.</p>
        <div 
          (contextmenu)="onOpenMenu($event)"
          style="width: 400px; height: 200px; border: 1px dashed #ccc; padding: 20px; cursor: context-menu; display: flex; align-items: center; justify-content: center;">
          <p style="margin: 0; color: #666; user-select: none; text-align: center;">
            <strong>Haz clic derecho</strong> aquí
          </p>
        </div>
        <dcx-ng-context-menu
          [items]="items"
          [visible]="menuVisible"
          [position]="menuPosition"
          (closed)="onClosed()">
        </dcx-ng-context-menu>
      </div>
    `,
  }),
  args: {
    items: CONTEXT_MENU_ITEMS_WITH_ICONS,
  },
};

// Ejemplo 5: Menú Avanzado
export const AdvancedMenu: Story = {
  render: (args) => ({
    props: {
      ...args,
      menuVisible: false,
      menuPosition: { x: 50, y: 50 },
      onOpenMenu(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        (this as any).menuPosition = { 
          x: event.clientX, 
          y: event.clientY 
        };
        (this as any).menuVisible = true;
      },
      onClosed() {
        (this as any).menuVisible = false;
      },
    },
    template: `
      <div>
        <p style="margin: 0 0 10px 0; color: #666;">Menú con iconos, separadores y opciones deshabilitadas.</p>
        <div 
          (contextmenu)="onOpenMenu($event)"
          style="width: 400px; height: 300px; border: 1px dashed #ccc; padding: 20px; cursor: context-menu; display: flex; align-items: center; justify-content: center;">
          <p style="margin: 0; color: #666; user-select: none; text-align: center;">
            <strong>Haz clic derecho</strong> aquí
          </p>
        </div>
        <dcx-ng-context-menu
          [items]="items"
          [visible]="menuVisible"
          [position]="menuPosition"
          (closed)="onClosed()">
        </dcx-ng-context-menu>
      </div>
    `,
  }),
  args: {
    items: CONTEXT_MENU_ITEMS_ADVANCED,
  },
};

// Ejemplo 6: En Tabla
export const InTable: Story = {
  render: (args) => ({
    props: {
      ...args,
      activeMenuRow: -1,
      menuPosition: { x: 0, y: 0 },
      tableHeaders: TABLE_HEADERS_WITH_ACTIONS,
      tableData: TABLE_DATA_WITH_ACTIONS,
      onButtonClick(event: MouseEvent, row: any, rowIndex: number) {
        event.preventDefault();
        event.stopPropagation();
        
        const button = event.currentTarget as HTMLElement;
        const buttonRect = button.getBoundingClientRect();
        
        (this as any).menuPosition = {
          x: buttonRect.right + 5,
          y: buttonRect.top
        };
        
        (this as any).activeMenuRow = rowIndex;
      },
      onClosed() {
        (this as any).activeMenuRow = -1;
      },
      getRowActions: getRowContextMenuItems,
    },
    template: `
      <div style="width: 100%; max-width: 800px;">
        <p style="margin: 0 0 16px 0; color: #666;">Menú contextual integrado en una tabla con acciones por fila.</p>
        <p style="margin: 0 0 16px 0; color: #666; user-select: none;">
          <strong>Haz click en el botón (⋮)</strong> de la columna Acciones
        </p>
        
        <dcx-ng-full-table
          [headers]="tableHeaders"
          [rows]="tableData"
          [showGrid]="true"
          [showStripped]="true"
          [scroll]="false"
          [paginator]="false"
          [showRowIndex]="true"
          [rowIndexLabel]="'#'"
          (rowAction)="onRowAction($event)">
          
          <ng-template dcxNgFullTableTemplate="actions" let-row let-key="key" let-rowIndex="rowIndex">
            <div style="position: relative; display: inline-block;" class="action-cell-{{rowIndex}}">
              <dcx-ng-button
                (buttonClick)="onButtonClick($event, row, rowIndex)"
                [label]="''"
                [ariaLabel]="'Open menu for ' + row.name"
                variant="icon"
                size="s"
                iconStart="three-dots-vertical">
              </dcx-ng-button>
              @if (activeMenuRow === rowIndex) {
                <dcx-ng-context-menu
                  [items]="getRowActions(row)"
                  [visible]="true"
                  [position]="menuPosition"
                  (closed)="onClosed()">
                </dcx-ng-context-menu>
              }
            </div>
          </ng-template>
          
        </dcx-ng-full-table>
      </div>
    `,
  }),
  args: {
    items: []
  },
};
