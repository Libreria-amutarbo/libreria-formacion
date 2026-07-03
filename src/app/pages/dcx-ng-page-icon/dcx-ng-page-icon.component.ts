import { Component } from '@angular/core';
import {
  DcxNgIconComponent,
  DcxSize,
  DcxIconSpacing,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-icon',
  standalone: true,
  imports: [DcxNgIconComponent],
  templateUrl: './dcx-ng-page-icon.component.html',
  styleUrl: './dcx-ng-page-icon.component.scss',
})
export class DcxNgPageIconComponent {
  readonly sizes: DcxSize[] = ['s', 'm', 'l', 'xl'];
  readonly spacings: DcxIconSpacing[] = ['none', 'compact', 'spacious'];
  readonly colors = ['#0058ab', '#16a34a', '#dc2626', '#d97706'];
}
