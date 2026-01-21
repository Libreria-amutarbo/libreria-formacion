import { DcxContextMenuItem } from '../interfaces/contextMenu';
import { DcxHeaderData, DcxTableRow } from '../interfaces';

// ==================== CONTEXT MENU ITEMS ====================

export const CONTEXT_MENU_ITEMS_BASIC: DcxContextMenuItem[] = [
  {
    label: 'Edit',
    action: () => {},
  },
  {
    label: 'Delete',
    action: () => {},
  },
  {
    label: 'Share',
    action: () => {},
  },
];

export const CONTEXT_MENU_ITEMS_SIMPLE: DcxContextMenuItem[] = [
  {
    label: 'Option 1',
    action: () => {},
  },
  {
    label: 'Option 2',
    action: () => {},
  },
];

export const CONTEXT_MENU_ITEM_SINGLE: DcxContextMenuItem[] = [
  {
    label: 'Single Option',
    action: () => {},
  },
];

export const CONTEXT_MENU_ITEMS_MANY: DcxContextMenuItem[] = [
  { label: 'Open', action: () => {} },
  { label: 'Edit', action: () => {} },
  { label: 'Copy', action: () => {} },
  { label: 'Paste', action: () => {} },
  { label: 'Delete', action: () => {} },
  { label: 'Share', action: () => {} },
];

export const CONTEXT_MENU_ITEMS_WITH_ICONS: DcxContextMenuItem[] = [
  {
    label: 'Edit',
    icon: 'pencil',
    action: () => {},
  },
  {
    label: 'Copy',
    icon: 'copy',
    action: () => {},
  },
  {
    label: 'Delete',
    icon: 'trash',
    action: () => {},
  },
  {
    label: 'Share',
    icon: 'share',
    action: () => {},
  },
];

export const CONTEXT_MENU_ITEMS_ADVANCED: DcxContextMenuItem[] = [
  {
    label: 'New File',
    icon: 'file-earmark-plus',
    action: () => {},
  },
  {
    label: 'New Folder',
    icon: 'folder-plus',
    action: () => {},
  },
  {
    label: '',
    separator: true,
  },
  {
    label: 'Cut',
    icon: 'scissors',
    action: () => {},
  },
  {
    label: 'Copy',
    icon: 'copy',
    action: () => {},
  },
  {
    label: 'Paste',
    icon: 'clipboard',
    action: () => {},
    disabled: true,
  },
  {
    label: '',
    separator: true,
  },
  {
    label: 'Delete',
    icon: 'trash',
    action: () => {},
  },
  {
    label: 'Rename',
    icon: 'pencil-square',
    action: () => {},
  },
  {
    label: '',
    separator: true,
  },
  {
    label: 'Properties',
    icon: 'info-circle',
    action: () => {},
  },
];

// ==================== TABLE WITH CONTEXT MENU ====================

export interface TableRowWithActions extends DcxTableRow {
  id: number;
  name: string;
  email: string;
  role: string;
}

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

export const TABLE_DATA_WITH_ACTIONS: TableRowWithActions[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'User' },
];

export function getRowContextMenuItems(row: TableRowWithActions): DcxContextMenuItem[] {
  return [
    {
      label: `Edit ${row.name}`,
      action: () => {},
    },
    {
      label: `Delete ${row.name}`,
      action: () => {},
    },
    {
      label: 'View Details',
      action: () => {},
    },
    {
      label: 'Send Email',
      action: () => {},
    },
  ];
}
