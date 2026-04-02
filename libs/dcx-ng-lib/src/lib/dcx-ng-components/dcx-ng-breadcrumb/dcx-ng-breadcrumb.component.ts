import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  DcxBreadcrumbItem,
  DcxBreadCrumbSeparatorIcons,
  DcxNgIconComponent,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  imports: [DcxNgIconComponent],
  selector: 'dcx-ng-breadcrumb',
  templateUrl: './dcx-ng-breadcrumb.component.html',
  styleUrl: './dcx-ng-breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgBreadcrumbComponent {
  items = input.required<DcxBreadcrumbItem[]>();
  iconSeparator = input.required<DcxBreadCrumbSeparatorIcons>();
}
