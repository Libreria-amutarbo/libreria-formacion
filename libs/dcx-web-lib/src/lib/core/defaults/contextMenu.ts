import { DcxContextMenuItem } from '../interfaces';

export const CONTEXT_MENU_TEST_ITEMS: DcxContextMenuItem[] = [
  { text: 'Edit', action: () => { void 0; } },
  { text: 'Delete', action: () => { void 0; } },
  { text: 'Copy', action: () => { void 0; } },
];

export const SIMPLE_CONTEXT_MENU_ITEMS: DcxContextMenuItem[] = [
  { text: 'Nuevo archivo', icon: 'file-earmark-plus' },
  { text: 'Abrir', icon: 'folder2-open' },
  { divider: true },
  { text: 'Guardar', icon: 'save' },
  { text: 'Guardar como...', icon: 'save-fill' },
  { divider: true },
  { text: 'Eliminar', icon: 'trash', variant: 'danger' },
  { text: 'Cerrar', icon: 'x-lg' },
];

export const SUBLIST_CONTEXT_MENU_ITEMS: DcxContextMenuItem[] = [
  { text: 'Nuevo', icon: 'file-earmark-plus' },
  { text: 'Abrir', icon: 'folder2-open' },
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
  { text: 'Eliminar', icon: 'trash', variant: 'danger' },
];

export const DEMO_MENU_ITEMS: DcxContextMenuItem[] = [
  { text: 'Nuevo archivo', icon: 'file-earmark-plus' },
  { text: 'Abrir', icon: 'folder2-open' },
  { divider: true },
  { text: 'Guardar', icon: 'save' },
  { text: 'Guardar como...', icon: 'save-fill' },
  { divider: true },
  { text: 'Eliminar', icon: 'trash', variant: 'danger' },
];

export const DEMO_ADVANCED_MENU_ITEMS: DcxContextMenuItem[] = [
  { text: 'Ver perfil', icon: 'person' },
  { text: 'Configuración', icon: 'gear' },
  { divider: true },
  {
    text: 'Más opciones',
    icon: 'three-dots',
    children: [
      { text: 'Opción 1', icon: 'check' },
      { text: 'Opción 2', icon: 'check' },
    ],
  },
  { divider: true },
  { text: 'Cerrar sesión', icon: 'box-arrow-right', variant: 'danger' },
];

export const DEMO_NESTED_MENU_ITEMS: DcxContextMenuItem[] = SUBLIST_CONTEXT_MENU_ITEMS;

export const DEMO_DISABLED_MENU_ITEMS: DcxContextMenuItem[] = [
  { text: 'Nuevo archivo', icon: 'file-earmark-plus' },
  { text: 'Abrir', icon: 'folder2-open' },
  { divider: true },
  { text: 'Guardar', icon: 'save', disabled: true },
  { text: 'Guardar como...', icon: 'save-fill', disabled: true },
  { divider: true },
  { text: 'Cerrar', icon: 'x-lg', disabled: true },
];

export const DEMO_DANGER_MENU_ITEMS: DcxContextMenuItem[] = [
  { text: 'Editar', icon: 'pencil' },
  { text: 'Duplicar', icon: 'copy' },
  { divider: true },
  { text: 'Archivar', icon: 'archive', variant: 'danger' },
  { text: 'Eliminar permanentemente', icon: 'trash', variant: 'danger' },
];
