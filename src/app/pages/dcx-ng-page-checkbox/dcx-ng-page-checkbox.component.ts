import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DcxNgCheckboxComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'app-dcx-ng-page-checkbox',
  standalone: true,
  imports: [DcxNgCheckboxComponent],
  templateUrl: './dcx-ng-page-checkbox.component.html',
  styleUrl: './dcx-ng-page-checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageCheckboxComponent {
  checked1 = false;
  checked2 = false;

  onSelectionChange(selectedValues: string[]): void {
    console.log('Selección cambiada:', selectedValues);
  }
}
