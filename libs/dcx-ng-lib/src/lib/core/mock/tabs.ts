import { DcxTabItem } from '../interfaces';

export const DcxTabItemDefault: DcxTabItem[] = [
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' },
  { id: 'tab3', label: 'Tab 3' },
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' },
  { id: 'tab3', label: 'Tab 3' },
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' },
  { id: 'tab3', label: 'Tab 3' },
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' },
  { id: 'tab3', label: 'Tab 3' },
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' },
  { id: 'tab3', label: 'Tab 3' },
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

export const DcxTabItemWithComponents: DcxTabItem[] = [
  { id: 'button', label: 'Button', icon: 'check' },
  { id: 'select', label: 'Select', icon: 'house' },
  { id: 'card', label: 'Card', icon: 'search' },
];
