import { DcxListItem } from '../interfaces/list';

export const SIMPLE_LIST_ITEMS: DcxListItem[] = [
  { text: 'Uno' },
  { text: 'Dos' },
  { text: 'Tres' },
  { text: 'Cuatro' },
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
    children: [
      { text: 'Manzana' },
      { text: 'Naranja' },
      { text: 'Plátano' },
    ]
  },
  {
    text: 'Verduras',
    icon: 'basket2',
    children: [
      { text: 'Zanahoria' },
      { text: 'Lechuga' },
    ]
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

export const LIST_ITEMS_WITH_ICONS_ALT = [
  { text: 'Dashboard', icon: 'speedometer' },
  { text: 'Usuarios', icon: 'people' },
  { text: 'Ajustes', icon: 'gear-fill' },
  { text: 'Notificaciones', icon: 'bell-fill' },
];

export const MULTI_SELECT_LIST_ITEMS = [
  { text: 'JavaScript', icon: 'code-slash' },
  { text: 'TypeScript', icon: 'file-code' },
  { text: 'Python', icon: 'braces' },
  { text: 'Java', icon: 'cup-hot' },
  { text: 'C++', icon: 'cpu' },
];
