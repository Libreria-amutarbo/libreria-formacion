import { DcxBreadcrumbItem, DcxBreadCrumbSeparatorIcons } from "../interfaces";

export const DcxBreadCrumbItemMock: DcxBreadcrumbItem[] = [
  { label: 'Inicio', href: '/', icon: 'house' },
  { label: 'Productos', href: '/productos' },
  { label: 'Teclados' },
]

export const DcxBreadCrumbIcon: DcxBreadCrumbSeparatorIcons = 'slash-lg';
export const DcxBreadCrumbIconList: DcxBreadCrumbSeparatorIcons[] = [
  'slash-lg',
  'arrow-right-short',
  'chevron-right'
];