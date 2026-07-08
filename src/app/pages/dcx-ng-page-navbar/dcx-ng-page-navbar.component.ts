import { Component, signal } from '@angular/core';
import {
  DcxNavItem,
  DcxNavbarBrand,
  DcxNgButtonComponent,
  DcxNgNavbarComponent,
  navbarItemsWithDisabled,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-navbar',
  standalone: true,
  imports: [DcxNgNavbarComponent, DcxNgButtonComponent],
  templateUrl: './dcx-ng-page-navbar.component.html',
  styleUrls: ['./dcx-ng-page-navbar.component.scss'],
})
export class DcxNgPageNavbarComponent {
  brand: DcxNavbarBrand = { title: 'Mi Aplicación' };

  brandWithLogo: DcxNavbarBrand = {
    title: 'DCX Library',
    logo: '/cap-logo.svg',
  };

  navItems: DcxNavItem[] = [
    { label: 'Inicio', value: 'home', icon: 'house' },
    { label: 'Componentes', value: 'components', icon: 'grid' },
    { label: 'Guías', value: 'guides', icon: 'book' },
    { label: 'Recursos', value: 'resources', icon: 'box' },
  ];

  navItemsWithDisabled = navbarItemsWithDisabled;

  activeValue = signal('components');

  onItemClick(value: string): void {
    this.activeValue.set(value);
  }
}
