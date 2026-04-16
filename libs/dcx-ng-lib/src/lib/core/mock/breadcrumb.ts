import {
  DcxBreadcrumbItem,
  DcxBreadCrumbSeparatorIcons,
} from '@dcx-ng-components/dcx-ng-lib';

export const DcxBreadCrumbItemDefault: DcxBreadcrumbItem[] = [
  { label: 'Inicio', href: '/', disabled: false },
  { label: 'Catálogo', href: '/catalogo', disabled: false },
  { label: 'Portátiles', disabled: false },
];

export const DcxBreadCrumbItemWithIcon: DcxBreadcrumbItem[] = [
  { label: 'Inicio', href: '/', icon: 'house', disabled: false },
  { label: 'Catálogo', href: '/catalogo', icon: 'grid', disabled: true },
  { label: 'Portátiles', icon: 'laptop', disabled: false },
];

export const DcxBreadCrumbDisabled: DcxBreadcrumbItem[] = [
  { label: 'Inicio', href: '/', disabled: true },
  { label: 'Catálogo', href: '/catalogo', disabled: true },
  { label: 'Portátiles', disabled: true },
];

export const DcxBreadCrumbCurrentPage: DcxBreadcrumbItem[] = [
  { label: 'Inicio', href: '/', disabled: false },
  { label: 'Catálogo', href: '/catalogo', disabled: false },
  { label: 'Portátiles', disabled: false },
];

export const DcxBreadCrumbOverflow: DcxBreadcrumbItem[] = [
  { label: 'Inicio', href: '/', disabled: false },
  { label: 'Electrónica', href: '/electronica', disabled: false },
  { label: 'Ordenadores', href: '/ordenadores', disabled: false },
  { label: 'Portátiles', href: '/portatiles', disabled: false },
  { label: 'Gaming', disabled: false },
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
