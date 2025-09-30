import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgInputComponent } from '@dcx-ng-components/dcx-ng-lib';
import { InputSize, InputType } from '../../../../libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-input/dcx-ng-input.component';

@Component({
  selector: 'dcx-ng-dcx-ng-input',
  standalone: true,
  imports: [CommonModule, DcxNgInputComponent],
  templateUrl: './dcx-ng-page-input.component.html',
  styleUrls: ['./dcx-ng-page-input.component.scss'],
})
export class DcxNgPageInputComponent {
  valor = '';

  // Exponemos los enums para uso en el template
  readonly InputType = InputType;
  readonly InputSize = InputSize;

  showValue(value: string | null) {
    this.valor = value || '';
  }
}