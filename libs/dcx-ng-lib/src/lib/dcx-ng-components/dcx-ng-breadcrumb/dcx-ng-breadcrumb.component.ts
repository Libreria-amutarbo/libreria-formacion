import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import {
  DcxBreadcrumbItem,
  DcxBreadCrumbSeparatorIcons,
  DcxNgIconComponent,
  DcxNgButtonComponent,
} from '@dcx-ng-components/dcx-ng-lib';
import { NgTemplateOutlet } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  imports: [DcxNgIconComponent, DcxNgButtonComponent, RouterModule],
  selector: 'dcx-ng-breadcrumb',
  templateUrl: './dcx-ng-breadcrumb.component.html',
  styleUrl: './dcx-ng-breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgBreadcrumbComponent {
  items = input.required<DcxBreadcrumbItem[]>();
  iconSeparator = input.required<DcxBreadCrumbSeparatorIcons>();

  itemSelected = output<DcxBreadcrumbItem>();

  onItemClick(item: DcxBreadcrumbItem) {
    this.itemSelected.emit(item);
  }
}
