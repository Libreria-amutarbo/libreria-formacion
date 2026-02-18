import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  DcxNgInputComponent,
  DcxInputType,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-dcx-ng-input',
  standalone: true,
  imports: [CommonModule, DcxNgInputComponent],
  templateUrl: './dcx-ng-page-input.component.html',
  styleUrls: ['./dcx-ng-page-input.component.scss'],
})
export class DcxNgPageInputComponent {
  valor = '';

  readonly DcxInputType = DcxInputType;

  showValue(value: string | null) {
    this.valor = value || '';
  }
}
