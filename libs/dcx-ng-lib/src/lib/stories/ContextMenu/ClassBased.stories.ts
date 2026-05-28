import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  DcxNgContextMenuComponent,
  DcxNgButtonComponent,
  SIMPLE_CONTEXT_MENU_ITEMS,
  SUBLIST_CONTEXT_MENU_ITEMS,
} from '@dcx-ng-components/dcx-ng-lib';

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
      description: 'Posición del menú (x, y)',
      table: {
        category: 'Atributos',
        type: { summary: '{ x: number; y: number }' },
        defaultValue: { summary: '{ x: 100, y: 100 }' },
      },
    },
    itemSelected: {
      name: 'itemSelected',
      action: 'itemSelected',
      description: 'Evento emitido cuando se selecciona un item',
      table: {
        category: 'Eventos',
        type: { summary: '(item: DcxContextMenuItem) => void' },
        defaultValue: { summary: '-' },
      },
    },
    menuClosed: {
      name: 'menuClosed',
      action: 'menuClosed',
      description: 'Evento emitido cuando se cierra el menú',
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
  },
};

export default meta;
type Story = StoryObj<DcxNgContextMenuComponent>;

export const ContextMenuOnRightClick: Story = {
  render: (args) => ({
    props: {
      items: args.items,
      position: args.position,
      openContextMenu(menu: DcxNgContextMenuComponent, event: MouseEvent, area: HTMLElement) {
        event.preventDefault();
        const areaRect = area.getBoundingClientRect();
        const menuWidth = 240;
        const clampedX = Math.max(0, Math.min((this as any).position.x, areaRect.width - menuWidth));
        const clampedY = Math.max(0, Math.min((this as any).position.y, areaRect.height));
        (this as any)._computedPosition = {
          x: areaRect.left + clampedX,
          y: areaRect.top + clampedY,
        };
        setTimeout(() => menu.open(), 0);
      },
      onItemSelected(item: any) {
        console.log('Item seleccionado:', item);
      },
    },
    template: `
      <div style="padding: 2rem;">
        <div #area
          (contextmenu)="openContextMenu(contextMenu, $event, area)"
          style="
            border: 2px dashed #ccc; 
            padding: 3rem; 
            text-align: center; 
            cursor: context-menu;
            background: #f9f9f9;
          ">
          <p style="margin: 0;">Haz clic derecho aquí para abrir el menú contextual</p>
        </div>
        
        <dcx-ng-context-menu 
          #contextMenu
          [items]="items"
          [position]="_computedPosition || position"
          (itemSelected)="onItemSelected($event)">
        </dcx-ng-context-menu>
      </div>
    `,
  }),
};

export const ContextMenuWithSublists: Story = {
  render: (args) => ({
    props: {
      items: args.items,
      position: args.position,
      openContextMenu(menu: DcxNgContextMenuComponent, event: MouseEvent, area: HTMLElement) {
        event.preventDefault();
        const areaRect = area.getBoundingClientRect();
        const menuWidth = 240;
        const clampedX = Math.max(0, Math.min((this as any).position.x, areaRect.width - menuWidth));
        const clampedY = Math.max(0, Math.min((this as any).position.y, areaRect.height));
        (this as any)._computedPosition = {
          x: areaRect.left + clampedX,
          y: areaRect.top + clampedY,
        };
        setTimeout(() => menu.open(), 0);
      },
      onItemSelected(item: any) {
        console.log('Item seleccionado:', item);
      },
    },
    template: `
            <div style="padding: 2rem;">
                <div #area
                    (contextmenu)="openContextMenu(contextMenu, $event, area)"
                    style="
                        border: 2px dashed #ccc; 
                        padding: 3rem; 
                        text-align: center; 
                        cursor: context-menu;
                        background: #f9f9f9;
                    ">
                    <p style="margin: 0;">Haz clic derecho aquí para abrir el menú con sublistas</p>
                </div>
        
                <dcx-ng-context-menu 
                    #contextMenu
                    [items]="items"
                    [position]="_computedPosition || position"
                    (itemSelected)="onItemSelected($event)">
                </dcx-ng-context-menu>
            </div>
        `,
  }),
  args: {
    items: SUBLIST_CONTEXT_MENU_ITEMS,
  },
};
