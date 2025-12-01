import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DcxNgInputComponent } from '@dcx-ng-components/dcx-ng-lib';
import { DcxInputType } from 'libs/dcx-ng-lib/src/lib/core/interfaces/input';

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