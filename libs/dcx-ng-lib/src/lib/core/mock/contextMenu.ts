import { DcxContextMenuItem } from '../interfaces/contextMenu';

export const SIMPLE_CONTEXT_MENU_ITEMS: DcxContextMenuItem[] = [
    { text: 'Nuevo archivo', icon: 'file-earmark-plus' },
    { text: 'Abrir', icon: 'folder-open' },
    { divider: true },
    { text: 'Guardar', icon: 'save' },
    { text: 'Guardar como...', icon: 'save-fill' },
    { divider: true },
    { text: 'Cerrar', icon: 'x-lg' },
];

export const CONTEXT_MENU_WITH_DISABLED: DcxContextMenuItem[] = [
    { text: 'Copiar', icon: 'clipboard' },
    { text: 'Pegar', icon: 'clipboard-check', disabled: true },
    { text: 'Cortar', icon: 'scissors' },
    { divider: true },
    { text: 'Deshacer', icon: 'arrow-counterclockwise' },
    { text: 'Rehacer', icon: 'arrow-clockwise', disabled: true },
];

export const CONTEXT_MENU_WITH_ACTIONS: DcxContextMenuItem[] = [
    {
        text: 'Eliminar',
        icon: 'trash',
        action: () => console.log('Elemento eliminado'),
    },
    {
        text: 'Duplicar',
        icon: 'files',
        action: () => console.log('Elemento duplicado'),
    },
    { divider: true },
    {
        text: 'Propiedades',
        icon: 'gear',
        action: () => console.log('Mostrando propiedades'),
    },
];
