import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgInputComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-dcx-ng-input',
  standalone: true,
  imports: [CommonModule, DcxNgInputComponent],
  templateUrl: './dcx-ng-page-input.component.html',
  styleUrls: ['./dcx-ng-page-input.component.scss'],
})
export class DcxNgPageInputComponent {

  showValue() {
    console.log('Valor cambiado');
  }
}
