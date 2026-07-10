import { Component } from '@angular/core';
import {
  DcxNgProgressbarComponent,
  DcxProgressStep,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'app-dcx-ng-page-progressbar',
  standalone: true,
  imports: [DcxNgProgressbarComponent],
  templateUrl: './dcx-ng-page-progressbar.component.html',
  styleUrl: './dcx-ng-page-progressbar.component.scss',
})
export class DcxNgPageProgressbarComponent {
  numberedSteps: DcxProgressStep[] = [
    { label: 'Datos' },
    { label: 'Verificación' },
    { label: 'Pago' },
    { label: 'Confirmación' },
  ];

  checkmarkSteps: DcxProgressStep[] = [
    { label: 'Completado' },
    { label: 'Completado' },
    { label: 'En proceso' },
    { label: 'Pendiente' },
  ];

  processSteps: DcxProgressStep[] = [
    { label: 'Carrito' },
    { label: 'Envío' },
    { label: 'Revisión' },
    { label: 'Pago' },
  ];
}
