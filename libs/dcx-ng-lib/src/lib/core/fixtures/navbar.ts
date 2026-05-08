import { DcxNavbarBrand, DcxNavItem } from '../interfaces';

export const navbarDefaultBrand: DcxNavbarBrand = { title: 'DCX Library' };

export const navbarBrandWithLogo: DcxNavbarBrand = {
  title: 'DCX Library',
  logo: '/cap-logo.svg',
};

export const navbarItems: DcxNavItem[] = [
  { label: 'Inicio', value: 'home', icon: 'house' },
  { label: 'Componentes', value: 'components', icon: 'grid' },
  { label: 'Guías', value: 'guides', icon: 'book' },
  { label: 'Recursos', value: 'resources', icon: 'box' },
];

export const navbarItemsWithDisabled: DcxNavItem[] = [
  { label: 'Inicio', value: 'home', icon: 'house' },
  { label: 'Componentes', value: 'components', icon: 'grid' },
  { label: 'Bloqueado', value: 'blocked', disabled: true },
  { label: 'Recursos', value: 'resources', icon: 'box' },
];
