import { Component } from '@angular/core';
import {
  DcxNgInputComponent,
  DcxInputType,
  DcxInputErrorMessage,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-input',
  standalone: true,
  imports: [DcxNgInputComponent],
  templateUrl: './dcx-ng-page-input.component.html',
  styleUrls: ['./dcx-ng-page-input.component.scss'],
})
export class DcxNgPageInputComponent {
  readonly DcxInputType = DcxInputType;

  readonly passwordErrors: DcxInputErrorMessage[] = [
    { type: 'minLength', message: 'Mínimo 8 caracteres.' },
    { type: 'uppercase', message: 'Debe contener una mayúscula.' },
  ];
}
