import { Component } from '@angular/core';
import {
  DcxBreadcrumbItem,
  DcxNgBreadcrumbComponent,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-breadcrumb',
  imports: [DcxNgBreadcrumbComponent],
  templateUrl: './dcx-ng-page-breadcrumb.html',
  styleUrl: './dcx-ng-page-breadcrumb.scss',
})
export class DcxNgPageBreadcrumb {
  dcxBreadCrumbItem: DcxBreadcrumbItem[] = [
    { label: 'Inicio', href: '/', icon: 'house', disabled: false },
    { label: 'Productos', href: '/productos', disabled: false },
    { label: 'Teclados', disabled: false },
  ];

  dcxBreadCrumbItemWithIcon: DcxBreadcrumbItem[] = [
    { label: 'Inicio', href: '/', icon: 'house', disabled: false },
    { label: 'Productos', href: '/productos', icon: 'bag', disabled: false },
    { label: 'Teclados', icon: 'keyboard', disabled: false },
  ];

  dcxBreadCrumbDisabled: DcxBreadcrumbItem[] = [
    { label: 'Inicio', href: '/', icon: 'house', disabled: true },
    { label: 'Productos', href: '/productos', disabled: true },
    { label: 'Teclados', disabled: true },
  ];
}
