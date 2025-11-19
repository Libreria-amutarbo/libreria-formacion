import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DcxNgIconFieldComponent } from "@dcx-ng-components/dcx-ng-lib";

@Component({
  selector: 'app-dcx-ng-page-icon-field',
  standalone: true,
  imports: [DcxNgIconFieldComponent],
  templateUrl: './dcx-ng-page-iconField.component.html',
  styleUrls: ['./dcx-ng-page-iconField.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageIconFieldComponent {

}
