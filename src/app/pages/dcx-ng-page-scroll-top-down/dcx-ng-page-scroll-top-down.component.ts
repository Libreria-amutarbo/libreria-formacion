import { Component } from '@angular/core';
import {
  DcxNgDividerComponent,
  DcxNgScrollTopDownComponent,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-scroll-top-down',
  standalone: true,
  imports: [DcxNgDividerComponent, DcxNgScrollTopDownComponent],
  templateUrl: './dcx-ng-page-scroll-top-down.component.html',
  styleUrl: './dcx-ng-page-scroll-top-down.component.scss',
})
export class DcxNgPageScrollTopDownComponent {
  readonly longContent = Array.from({ length: 16 }, (_, index) => index + 1);
}
