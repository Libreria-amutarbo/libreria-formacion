import { ContextMenuItem } from '../../dcx-ng-components/dcx-ng-contextMenu/dcx-ng-contextMenu.component';
import { DcxHeaderData, DcxTableRow } from '../interfaces';

// ==================== CONTEXT MENU ITEMS ====================

/** Items básicos para context menu - usado en Default story */
export const CONTEXT_MENU_ITEMS_BASIC: ContextMenuItem[] = [
  {
    label: 'Edit',
    action: () => console.log('Edit clicked'),
  },
  {
    label: 'Delete',
    action: () => console.log('Delete clicked'),
  },
  {
    label: 'Share',
    action: () => console.log('Share clicked'),
  },
];

/** Items simples para context menu - usado en ejemplos básicos */
export const CONTEXT_MENU_ITEMS_SIMPLE: ContextMenuItem[] = [
  {
    label: 'Option 1',
    action: () => console.log('Option 1 clicked'),
  },
  {
    label: 'Option 2',
    action: () => console.log('Option 2 clicked'),
  },
];

/** Item único para context menu - usado en SingleItem story */
export const CONTEXT_MENU_ITEM_SINGLE: ContextMenuItem[] = [
  {
    label: 'Single Option',
    action: () => console.log('Single Option clicked'),
  },
];

/** Items múltiples para context menu - usado en ManyItems story */
export const CONTEXT_MENU_ITEMS_MANY: ContextMenuItem[] = [
  { label: 'Open', action: () => console.log('Open clicked') },
  { label: 'Edit', action: () => console.log('Edit clicked') },
  { label: 'Copy', action: () => console.log('Copy clicked') },
  { label: 'Paste', action: () => console.log('Paste clicked') },
  { label: 'Delete', action: () => console.log('Delete clicked') },
  { label: 'Share', action: () => console.log('Share clicked') },
];

/** Items con iconos para context menu */
export const CONTEXT_MENU_ITEMS_WITH_ICONS: ContextMenuItem[] = [
  {
    label: 'Edit',
    icon: 'pencil',
    action: () => console.log('Edit clicked'),
  },
  {
    label: 'Copy',
    icon: 'copy',
    action: () => console.log('Copy clicked'),
  },
  {
    label: 'Delete',
    icon: 'trash',
    action: () => console.log('Delete clicked'),
  },
  {
    label: 'Share',
    icon: 'share',
    action: () => console.log('Share clicked'),
  },
];

/** Items con iconos, separadores y estado disabled */
export const CONTEXT_MENU_ITEMS_ADVANCED: ContextMenuItem[] = [
  {
    label: 'New File',
    icon: 'file-earmark-plus',
    action: () => console.log('New File'),
  },
  {
    label: 'New Folder',
    icon: 'folder-plus',
    action: () => console.log('New Folder'),
  },
  {
    label: '',
    separator: true,
  },
  {
    label: 'Cut',
    icon: 'scissors',
    action: () => console.log('Cut'),
  },
  {
    label: 'Copy',
    icon: 'copy',
    action: () => console.log('Copy'),
  },
  {
    label: 'Paste',
    icon: 'clipboard',
    action: () => console.log('Paste'),
    disabled: true,
  },
  {
    label: '',
    separator: true,
  },
  {
    label: 'Delete',
    icon: 'trash',
    action: () => console.log('Delete'),
  },
  {
    label: 'Rename',
    icon: 'pencil-square',
    action: () => console.log('Rename'),
  },
  {
    label: '',
    separator: true,
  },
  {
    label: 'Properties',
    icon: 'info-circle',
    action: () => console.log('Properties'),
  },
];

// ==================== TABLE WITH CONTEXT MENU ====================

/** Interface para datos de tabla con context menu */
export interface TableRowWithActions extends DcxTableRow {
  id: number;
  name: string;
  email: string;
  role: string;
}

/** Headers de tabla con columna de acciones - usado en InTable story */
export const TABLE_HEADERS_WITH_ACTIONS: DcxHeaderData[] = [
  { key: 'id', name: 'ID', sortable: false },
  { key: 'name', name: 'Name', sortable: true },
  { key: 'email', name: 'Email', sortable: true },
  { key: 'role', name: 'Role', sortable: false },
  {
    key: 'actions',
    name: 'Actions',
    sortable: false,
    template: 'actions',
    frozen: 'right',
  },
];

/** Datos de tabla para demostración de context menu - usado en InTable story */
export const TABLE_DATA_WITH_ACTIONS: TableRowWithActions[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'User' },
];

/**
 * Genera items de context menu específicos para una fila de tabla
 * @param row - Fila de datos de la tabla
 * @returns Array de items del context menu
 */
export function getRowContextMenuItems(row: TableRowWithActions): ContextMenuItem[] {
  return [
    {
      label: `Edit ${row.name}`,
      action: () => console.log(`Edit action for ${row.name}`),
    },
    {
      label: `Delete ${row.name}`,
      action: () => console.log(`Delete action for ${row.name}`),
    },
    {
      label: 'View Details',
      action: () => console.log(`View details for ${row.name}`),
    },
    {
      label: 'Send Email',
      action: () => console.log(`Send email to ${row.email}`),
    },
  ];
}
