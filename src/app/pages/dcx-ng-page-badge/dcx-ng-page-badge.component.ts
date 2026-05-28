import { Component } from '@angular/core';
import { DcxNgBadgeComponent, DcxNgButtonComponent, DcxNgIconComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-badge',
  standalone: true,
  imports: [DcxNgBadgeComponent, DcxNgButtonComponent, DcxNgIconComponent],
  templateUrl: './dcx-ng-page-badge.component.html',
  styleUrls: ['./dcx-ng-page-badge.component.scss'],
})
export class DcxNgPageBadgeComponent {}
