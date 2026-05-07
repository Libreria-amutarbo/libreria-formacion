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
export class DcxNgPageBreadcrumbComponent {
  dcxBreadCrumbItem: DcxBreadcrumbItem[] = [
    { label: 'Inicio', href: '#', disabled: false },
    { label: 'Proyectos', href: '#', disabled: false },
    { label: 'Cloud Migration', disabled: false },
  ];

  dcxBreadCrumbSlashes: DcxBreadcrumbItem[] = [
    { label: 'Inicio', href: '#', disabled: false },
    { label: 'Clientes', href: '#', disabled: false },
    { label: 'Airbus', href: '#', disabled: false },
    { label: 'SAP S/4HANA', disabled: false },
  ];

  dcxBreadCrumbDisabled: DcxBreadcrumbItem[] = [
    { label: 'Inicio', href: '#', disabled: false },
    { label: 'Práctica (deshabilitado)', href: '#', disabled: true },
    { label: 'Página actual', disabled: false },
  ];

  dcxBreadCrumbWithIcon: DcxBreadcrumbItem[] = [
    { label: 'Inicio', href: '/', icon: 'house', disabled: false },
    { label: 'Componentes', href: '/', icon: 'grid', disabled: false },
    { label: 'Breadcrumb', icon: 'link-45deg', disabled: false },
  ];
}
