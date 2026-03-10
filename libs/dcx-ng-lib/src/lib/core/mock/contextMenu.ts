import { DcxContextMenuItem } from "@dcx-ng-components/dcx-ng-lib";

export const CONTEXT_MENU_TEST_ITEMS: DcxContextMenuItem[] = [
    { text: 'Edit', action: () => {} },
    { text: 'Delete', action: () => {} },
    { text: 'Copy', action: () => {} },
];

export const SIMPLE_CONTEXT_MENU_ITEMS: DcxContextMenuItem[] = [
    { text: 'Nuevo archivo', icon: 'file-earmark-plus' },
    { text: 'Abrir', icon: 'folder-open' },
    { divider: true },
    { text: 'Guardar', icon: 'save' },
    { text: 'Guardar como...', icon: 'save-fill' },
    { divider: true },
    { text: 'Cerrar', icon: 'x-lg' },
];

export const SUBLIST_CONTEXT_MENU_ITEMS: DcxContextMenuItem[] = [
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
