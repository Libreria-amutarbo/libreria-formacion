import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  href?: string | null;
}

@Component({
  selector: 'dcx-ng-breadcrumb',
  standalone: true,
  templateUrl: './dcx-ng-breadcrumb.component.html',
  styleUrls: ['./dcx-ng-breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgBreadcrumbComponent {
  @Input({ required: true }) items: BreadcrumbItem[] = [];
}
