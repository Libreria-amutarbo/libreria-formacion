import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  DcxInputType,
  DcxNgIconFieldComponent,
  DcxNgInputComponent,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'app-dcx-ng-page-icon-field',
  standalone: true,
  imports: [DcxNgIconFieldComponent, DcxNgInputComponent],
  templateUrl: './dcx-ng-page-iconField.component.html',
  styleUrls: ['./dcx-ng-page-iconField.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageIconFieldComponent {
  readonly inputType = DcxInputType;

  onIconClick() {
    alert('Icono clickado');
  }
}
