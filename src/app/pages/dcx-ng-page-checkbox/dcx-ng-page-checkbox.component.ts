import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  DcxCheckbox,
  DcxNgButtonComponent,
  DcxNgCheckboxComponent,
  DcxPosition,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'app-dcx-ng-page-checkbox',
  standalone: true,
  imports: [DcxNgCheckboxComponent, ReactiveFormsModule],
  templateUrl: './dcx-ng-page-checkbox.component.html',
  styleUrl: './dcx-ng-page-checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageCheckboxComponent {
  singleCheck = signal<DcxCheckbox[]>([
    {
      id: '1',
      value: true,
      label: 'Chceckbox único',
    },
  ]);

  errorCheck = signal<DcxCheckbox[]>([
    {
      id: '1',
      value: true,
      label: 'Chceckbox erróneo',
      error: true,
      errorMessage: 'Checkbox con error',
    },
  ]);

  disabledCheck = signal<DcxCheckbox[]>([
    {
      id: '1',
      value: true,
      label: 'Chceckbox dehabilitado',
      disabled: true,
    },
  ]);

  diferentsLabelPositionsCheck = signal<DcxCheckbox[]>([
    {
      id: '1',
      value: true,
      label: 'Izquierda',
      labelPosition: 'left',
    },
    {
      id: '2',
      value: true,
      label: 'Derecha',
      labelPosition: 'right',
    },
  ]);
  requiredCheck = signal<DcxCheckbox[]>([
    {
      id: '1',
      value: true,
      label: 'Required',
      labelPosition: 'right',
      required: true,
    },
  ]);

  checkboxGroup = signal<DcxCheckbox[]>([
    {
      id: '1',
      value: true,
      label: 'Válido',
      labelPosition: 'right',
      error: true,
    },
    {
      id: '2',
      value: false,
      label: 'Inválido',
      required: true,
      labelPosition: 'right',
      error: true,
    },
    {
      id: '3',
      value: null,
      label: 'Sin valor',
      labelPosition: 'right',
      error: true,
      errorMessage: 'Description',
    },
  ]);
}
