import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DcxBreadcrumbItem } from '../../core/interfaces';

@Component({
  selector: 'dcx-ng-breadcrumb',
  templateUrl: './dcx-ng-breadcrumb.component.html',
  styleUrl: './dcx-ng-breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgBreadcrumbComponent {
  @Input({ required: true }) items: DcxBreadcrumbItem[] = [];
}
