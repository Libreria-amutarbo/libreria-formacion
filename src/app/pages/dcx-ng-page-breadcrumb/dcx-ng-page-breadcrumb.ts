import { Component } from '@angular/core';
import {
  DcxBreadcrumbItem,
  DcxNgBreadcrumbComponent,
  DcxBreadCrumbItemDefault,
  DcxBreadCrumbItemWithIcon,
  DcxBreadCrumbDisabled,
  DcxBreadCrumbOverflow,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-breadcrumb',
  imports: [DcxNgBreadcrumbComponent],
  templateUrl: './dcx-ng-page-breadcrumb.html',
  styleUrl: './dcx-ng-page-breadcrumb.scss',
})
export class DcxNgPageBreadcrumbComponent {
  readonly itemsChevron: DcxBreadcrumbItem[] = [
    { label: 'Inicio', href: '#', disabled: false },
    { label: 'Proyectos', href: '#', disabled: false },
    { label: 'Cloud Migration', disabled: false },
  ];

  readonly itemsSlash: DcxBreadcrumbItem[] = [
    { label: 'Inicio', href: '#', disabled: false },
    { label: 'Clientes', href: '#', disabled: false },
    { label: 'Airbus', href: '#', disabled: false },
    { label: 'SAP S/4HANA', disabled: false },
  ];

  readonly itemsArrow = DcxBreadCrumbItemDefault;

  readonly itemsWithIcon = DcxBreadCrumbItemWithIcon;

  readonly itemsDisabled = DcxBreadCrumbDisabled;

  readonly itemsOverflow = DcxBreadCrumbOverflow;
}
