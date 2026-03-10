import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DcxCheckbox,
  DcxCheckboxGroup,
  DcxDiferentsLabelPositionsCheck,
  DcxDisabledCheck,
  DcxErrorCheck,
  DcxNgCheckboxComponent,
  DcxRequiredCheck,
  DcxSingleCheck,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'app-dcx-ng-page-checkbox',
  standalone: true,
  imports: [DcxNgCheckboxComponent],
  templateUrl: './dcx-ng-page-checkbox.component.html',
  styleUrl: './dcx-ng-page-checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageCheckboxComponent {
  singleCheck = signal<DcxCheckbox[]>(DcxSingleCheck);

  errorCheck = signal<DcxCheckbox[]>(DcxErrorCheck);

  disabledCheck = signal<DcxCheckbox[]>(DcxDisabledCheck);

  diferentsLabelPositionsCheck = signal<DcxCheckbox[]>(
    DcxDiferentsLabelPositionsCheck,
  );
  requiredCheck = signal<DcxCheckbox[]>(DcxRequiredCheck);

  checkboxGroup = signal<DcxCheckbox[]>(DcxCheckboxGroup);

  changeLabel(checkbox: DcxCheckbox[]) {
    checkbox.map((cb: DcxCheckbox) => {
      switch (cb.value) {
        case true:
          cb.label = 'Válido';
          break;
        case false:
          cb.label = 'Inválido';
          break;
        case null:
        default:
          cb.label = 'Sin valor';
          break;
      }
    });
  }
}
