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

  checkboxGroup = signal<DcxCheckbox[]>(DcxCheckboxGroup.map(cb => ({ ...cb })));

  changeLabel(checkbox: DcxCheckbox[]): void {
    const updated = checkbox.map(cb => ({
      ...cb,
      label: cb.value === true ? 'Válido' : cb.value === false ? 'Indeterminado' : 'Sin valor',
    }));
    this.checkboxGroup.set(updated);
  }
}
