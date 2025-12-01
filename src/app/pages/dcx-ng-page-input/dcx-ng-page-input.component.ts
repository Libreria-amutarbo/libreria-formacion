import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgInputComponent } from '@dcx-ng-components/dcx-ng-lib';
import { InputSize, InputType } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-dcx-ng-input',
  standalone: true,
  imports: [CommonModule, DcxNgInputComponent],
  templateUrl: './dcx-ng-page-input.component.html',
  styleUrls: ['./dcx-ng-page-input.component.scss'],
})
export class DcxNgPageInputComponent {
  valor = '';

  readonly InputType = InputType;
  readonly InputSize = InputSize;

  showValue(value: string | null) {
    this.valor = value || '';
  }
}