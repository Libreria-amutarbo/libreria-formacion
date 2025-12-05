import { DcxBreadcrumbItem, DcxBreadCrumbSeparatorIcons } from '../interfaces';

export const DcxBreadCrumbItemMock: DcxBreadcrumbItem[] = [
  { label: 'Inicio', href: '/', icon: 'house', disabled: false },
  { label: 'Productos', href: '/productos', disabled: true },
  { label: 'Teclados', disabled: false },
];

export const DcxBreadCrumbIcon: DcxBreadCrumbSeparatorIcons = 'slash-lg';
export const DcxBreadCrumbIconList: DcxBreadCrumbSeparatorIcons[] = [
  'slash-lg',
  'arrow-right-short',
  'chevron-right',
];
