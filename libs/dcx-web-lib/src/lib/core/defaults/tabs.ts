import { DcxTabItem, DcxTabsVariant } from '../interfaces';

export const DcxTabItemDefault: DcxTabItem[] = [
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' },
  { id: 'tab3', label: 'Tab 3' },
];

export const DcxTabItemWithDisabled: DcxTabItem[] = [
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2', disabled: true },
  { id: 'tab3', label: 'Tab 3' },
];

export const DcxTabItemWithIcons: DcxTabItem[] = [
  { id: 'tab1', label: 'Tab 1', icon: 'check' },
  { id: 'tab2', label: 'Tab 2', icon: 'house' },
  { id: 'tab3', label: 'Tab 3', icon: 'search' },
];

export const DcxTabItemScroll: DcxTabItem[] = Array.from(
  { length: 23 },
  (_, index) => ({
    id: `tab${index + 1}`,
    label: `Tab ${index + 1}`,
  }),
);

export const DcxTabItemWithComponents: DcxTabItem[] = [
  { id: 'button', label: 'Button', icon: 'check' },
  { id: 'select', label: 'Select', icon: 'house' },
  { id: 'card', label: 'Card', icon: 'search' },
];

export const DcxTabItemWithBadges: DcxTabItem[] = [
  { id: 'tab1', label: 'Dashboard', badge: 3 },
  { id: 'tab2', label: 'Proyectos', badge: 12 },
  { id: 'tab3', label: 'Equipo' },
  { id: 'tab4', label: 'Reportes' },
  { id: 'tab5', label: 'Archivados', disabled: true },
];

export const TABS_VARIANT_LIST: DcxTabsVariant[] = [
  'line',
  'pill',
  'brand',
  'subtle',
];
