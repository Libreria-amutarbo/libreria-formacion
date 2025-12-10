import { DcxBreadcrumbItem, DcxBreadCrumbSeparatorIcons } from '../interfaces';

export const DcxBreadCrumbItemDefault: DcxBreadcrumbItem[] = [
  { label: 'Inicio', href: '/', disabled: false },
  { label: 'Catálogo', href: '/catalogo', disabled: false },
  { label: 'Portáiles', disabled: false },
];

export const DcxBreadCrumbItemWithIcon: DcxBreadcrumbItem[] = [
  { label: 'Inicio', href: '/', icon: 'house', disabled: false },
  { label: 'Catálogo', href: '/catalogo', icon: 'grid', disabled: true },
  { label: 'Portáiles', icon: 'laptop', disabled: false },
];

export const DcxBreadCrumbDisabled: DcxBreadcrumbItem[] = [
  { label: 'Inicio', href: '/', disabled: true },
  { label: 'Catálogo', href: '/catalogo', disabled: true },
  { label: 'Portáiles', disabled: true },
];

export const DcxBreadCrumbSlashIcon: DcxBreadCrumbSeparatorIcons = 'slash-lg';
export const DcxBreadCrumbArrowhIcon: DcxBreadCrumbSeparatorIcons =
  'arrow-right-short';
export const DcxBreadChevronSlashIcon: DcxBreadCrumbSeparatorIcons =
  'chevron-right';

export const DcxBreadCrumbIconList: DcxBreadCrumbSeparatorIcons[] = [
  'slash-lg',
  'arrow-right-short',
  'chevron-right',
];
