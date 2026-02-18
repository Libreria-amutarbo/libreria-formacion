import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
    DcxNgContextMenuComponent,
    DcxNgButtonComponent,
    SIMPLE_CONTEXT_MENU_ITEMS,
} from '@dcx-ng-components/dcx-ng-lib';
const SUBLIST_CONTEXT_MENU_ITEMS = [
    { text: 'Nuevo', icon: 'file-earmark-plus' },
    { text: 'Abrir', icon: 'folder-open' },
    { divider: true },
    {
        text: 'Editar',
        icon: 'pencil',
        children: [
            { text: 'Deshacer', icon: 'arrow-counterclockwise' },
            { text: 'Rehacer', icon: 'arrow-clockwise' },
            { divider: true },
            {
                text: 'Transformar',
                icon: 'magic',
                children: [
                    { text: 'Mayúsculas', icon: 'type' },
                    { text: 'Minúsculas', icon: 'type' },
                ],
            },
        ],
    },
    { divider: true },
    { text: 'Eliminar', icon: 'trash', disabled: true },
];

const meta: Meta<DcxNgContextMenuComponent> = {
    title: 'DCXLibrary/ContextMenu/Class based',
    component: DcxNgContextMenuComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [DcxNgButtonComponent],
        }),
    ],
    argTypes: {
        items: {
            control: { type: 'object' },
            description: 'Array de elementos del menú contextual',
        },
        position: {
            control: { type: 'object' },
            description: 'Posición del menú (x, y)',
        },
        itemSelected: {
            action: 'itemSelected',
            description: 'Evento emitido cuando se selecciona un item',
        },
        menuClosed: {
            action: 'menuClosed',
            description: 'Evento emitido cuando se cierra el menú',
        },
    },
    args: {
        items: SIMPLE_CONTEXT_MENU_ITEMS,
        position: { x: 100, y: 100 },
    },
};

export default meta;
type Story = StoryObj<DcxNgContextMenuComponent>;

export const ContextMenuOnRightClick: Story = {
    render: () => ({
        props: {
            items: SIMPLE_CONTEXT_MENU_ITEMS,
            menuPosition: { x: 0, y: 0 },
            openContextMenu(menu: DcxNgContextMenuComponent, event: MouseEvent) {
                event.preventDefault();
                (this as any).menuPosition = { x: event.clientX, y: event.clientY };
                setTimeout(() => menu.open(), 0);
            },
            onItemSelected(item: any) {
                console.log('Item seleccionado:', item);
            },
        },
        template: `
      <div style="padding: 2rem;">
        <div 
          (contextmenu)="openContextMenu(contextMenu, $event)"
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
          [position]="menuPosition"
          (itemSelected)="onItemSelected($event)">
        </dcx-ng-context-menu>
      </div>
    `,
    }),
};

export const ContextMenuWithSublists: Story = {
    render: () => ({
        props: {
            items: SUBLIST_CONTEXT_MENU_ITEMS,
            menuPosition: { x: 0, y: 0 },
            openContextMenu(menu: DcxNgContextMenuComponent, event: MouseEvent) {
                event.preventDefault();
                (this as any).menuPosition = { x: event.clientX, y: event.clientY };
                setTimeout(() => menu.open(), 0);
            },
            onItemSelected(item: any) {
                console.log('Item seleccionado:', item);
            },
        },
        template: `
            <div style="padding: 2rem;">
                <div 
                    (contextmenu)="openContextMenu(contextMenu, $event)"
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
                    [position]="menuPosition"
                    (itemSelected)="onItemSelected($event)">
                </dcx-ng-context-menu>
            </div>
        `,
    }),
};
