import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgRadioComponent } from '../../../../libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-radio/dcx-ng-radio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dcx-ng-page-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DcxNgRadioComponent,FormsModule],
  templateUrl: './dcx-ng-page-radio.component.html',
  styleUrl: './dcx-ng-page-radio.component.scss',
})
export class DcxNgPageRadioComponent {
  tamanioSeleccionado: string = '';
  colorSeleccionado: string = '';
  bebidaSeleccionada: string = '';
  resumen = false;

  mostrarResumen() {
    this.resumen = true;
  }
}
