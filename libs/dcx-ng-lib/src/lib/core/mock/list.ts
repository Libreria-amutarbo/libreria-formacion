import { DcxListItem } from '@dcx-ng-components/dcx-ng-lib';

export const LIST_ITEMS_WITH_DIVIDER: DcxListItem[] = [
  { text: 'Item 1' },
  { divider: true },
  { text: 'Item 2' },
];

export const LIST_ENABLED_DISABLED_ITEMS: DcxListItem[] = [
  { text: 'Enabled' },
  { text: 'Disabled', disabled: true },
];

export const LIST_DISABLED_ONLY: DcxListItem[] = [
  { text: 'Disabled', disabled: true },
];

export const LIST_DIVIDER_ONLY: DcxListItem[] = [{ divider: true }];

export const DEFAULT_LIST_ITEMS: DcxListItem[] = [
  { text: 'One' },
  { text: 'Two', icon: 'star' },
  { text: 'Three', description: 'This is a description' },
  {
    text: 'Nested List',
    children: [{ text: 'Subitem 1' }, { text: 'Subitem 2' }],
  },
];

export const SIMPLE_LIST_ITEMS: DcxListItem[] = [
  { text: 'One' },
  { text: 'Two' },
  { text: 'Three' },
  { text: 'Four' },
];

export const LIST_ITEMS_WITH_ICONS = [
  { text: 'Home', icon: 'house-door' },
  { text: 'Settings', icon: 'gear' },
  { text: 'Profile', icon: 'person' },
  { text: 'Messages', icon: 'envelope' },
];

export const LIST_ITEMS_WITH_SUBLISTS = [
  {
    text: 'Frutas',
    icon: 'basket',
    children: [{ text: 'Manzana' }, { text: 'Naranja' }, { text: 'Plátano' }],
  },
  {
    text: 'Verduras',
    icon: 'basket2',
    children: [{ text: 'Zanahoria' }, { text: 'Lechuga' }],
  },
  {
    text: 'Lácteos',
    icon: 'cup',
  },
];

export const SELECTABLE_LIST_ITEMS = [
  { text: 'Option 1', icon: 'check-circle' },
  { text: 'Option 2', icon: 'check-circle' },
  { text: 'Option 3', icon: 'check-circle' },
  { text: 'Option 4', icon: 'check-circle' },
];

export const MIXED_LIST_ITEMS: DcxListItem[] = [
  { text: 'Angular' },
  { text: 'React' },
  { text: 'Vue' },
  { text: '2025' },
];

export const LIST_ITEMS_WITH_ICONS_AND_DESCRIPTION: DcxListItem[] = [
  {
    text: 'Dashboard',
    icon: 'speedometer',
    description: 'Overview of metrics',
  },
  { text: 'Usuarios', icon: 'people', description: 'Manage users' },
  { text: 'Ajustes', icon: 'gear-fill', description: 'System settings' },
  {
    text: 'Notificaciones',
    icon: 'bell-fill',
    description: 'View notifications',
  },
];

export const MULTI_SELECT_LIST_ITEMS = [
  { text: 'JavaScript', icon: 'code-slash' },
  { text: 'TypeScript', icon: 'file-code' },
  { text: 'Python', icon: 'braces' },
  { text: 'Java', icon: 'cup-hot' },
  { text: 'C++', icon: 'cpu' },
];
