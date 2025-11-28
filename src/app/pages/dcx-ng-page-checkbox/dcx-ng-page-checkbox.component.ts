import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DcxNgCheckboxComponent } from 'libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-checkbox/dcx-ng-checkbox.component';

@Component({
  selector: 'app-dcx-ng-page-checkbox',
  standalone: true,
  imports: [DcxNgCheckboxComponent],
  templateUrl: './dcx-ng-page-checkbox.component.html',
  styleUrls: ['./dcx-ng-page-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageCheckboxComponent {
  checked1 = false;
  checked2 = false;
}
