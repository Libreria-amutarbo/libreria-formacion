import { DcxListItemType } from '../interfaces/list';

export const SIMPLE_LIST_ITEMS: DcxListItemType[] = ['Uno', 'Dos', 'Tres', 'Cuatro'];

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

export const MIXED_LIST_ITEMS: DcxListItemType[] = ['Angular', 'React', 'Vue', 2025];

export const LIST_ITEMS_WITH_ICONS_ALT = [
  { text: 'Dashboard', icon: 'speedometer' },
  { text: 'Usuarios', icon: 'people' },
  { text: 'Ajustes', icon: 'gear-fill' },
  { text: 'Notificaciones', icon: 'bell-fill' },
];
