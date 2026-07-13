import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DcxNgSpinnerComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-dcx-ng-page-spinner',
  standalone: true,
  imports: [DcxNgSpinnerComponent],
  templateUrl: './dcx-ng-page-spinner.component.html',
  styleUrl: './dcx-ng-page-spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageSpinnerComponent {}
