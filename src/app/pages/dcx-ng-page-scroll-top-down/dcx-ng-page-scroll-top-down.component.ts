import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DcxNgScrollTopDownComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-scroll-top-down',
  standalone: true,
  imports: [DcxNgScrollTopDownComponent],
  templateUrl: './dcx-ng-page-scroll-top-down.component.html',
  styleUrl: './dcx-ng-page-scroll-top-down.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageScrollTopDownComponent {
  readonly longContent = Array.from({ length: 12 }, (_, index) => index + 1);
}
